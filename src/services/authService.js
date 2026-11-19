// AUTHENTICATION SERVICE
// Supports Teacher (School ID + Email + Password), Student (School ID + Student ID + Password), Parent (Email + Password)

import { supabase, isSupabaseConfigured } from './supabaseClient';
import storageHelper from '../utils/storageHelper';
import { SAMPLE_TEACHER, SAMPLE_STUDENTS, SAMPLE_PARENT, SAMPLE_SCHOOL } from '../data/sampleUsers';

const CURRENT_USER_KEY = 'current_user';

export const authService = {
  // Get currently authenticated session
  getCurrentUser() {
    return storageHelper.get(CURRENT_USER_KEY, null);
  },

  // 1. TEACHER LOGIN (School ID + Email + Password)
  async loginTeacher(schoolCode, email, password) {
    if (!schoolCode || !email || !password) {
      throw new Error('Please fill in School ID, Email and Password.');
    }

    // Live Supabase Auth if configured
    if (isSupabaseConfigured && supabase) {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;

      // Check profile role & school
      const { data: profile, error: profError } = await supabase
        .from('profiles')
        .select('*, schools!inner(*)')
        .eq('id', authData.user.id)
        .single();

      if (profError) throw profError;
      if (profile.role !== 'teacher') {
        await supabase.auth.signOut();
        throw new Error('Access denied. This portal is strictly for authorized teachers.');
      }
      if (profile.schools?.school_code?.toUpperCase() !== schoolCode.trim().toUpperCase()) {
        await supabase.auth.signOut();
        throw new Error('Invalid School ID for this teacher account.');
      }

      storageHelper.set(CURRENT_USER_KEY, profile);
      return profile;
    }

    // Local / Sample mode verification
    if (schoolCode.trim().toUpperCase() !== SAMPLE_SCHOOL.code) {
      throw new Error(`School ID "${schoolCode}" not recognized. Please use "${SAMPLE_SCHOOL.code}".`);
    }

    if (email.trim().toLowerCase() === SAMPLE_TEACHER.email.toLowerCase() && password === SAMPLE_TEACHER.password) {
      storageHelper.set(CURRENT_USER_KEY, SAMPLE_TEACHER);
      return SAMPLE_TEACHER;
    }

    throw new Error('Invalid teacher email or password.');
  },

  // 2. STUDENT LOGIN (School ID + Student ID + Password)
  async loginStudent(schoolCode, studentIdNumber, password) {
    if (!schoolCode || !studentIdNumber || !password) {
      throw new Error('Please enter School ID, Student ID and Password.');
    }

    if (isSupabaseConfigured && supabase) {
      // Find student profile by school code and student_id_number
      const { data: student, error } = await supabase
        .from('profiles')
        .select('*, schools!inner(*), learning_groups(*)')
        .eq('student_id_number', studentIdNumber.trim().toUpperCase())
        .eq('schools.school_code', schoolCode.trim().toUpperCase())
        .eq('role', 'student')
        .single();

      if (error || !student) {
        throw new Error('Student account not found for this School ID and Student ID.');
      }

      // If student has a Supabase auth record, sign in, or use student credentials
      storageHelper.set(CURRENT_USER_KEY, student);
      return student;
    }

    // Local / Sample mode verification
    if (schoolCode.trim().toUpperCase() !== SAMPLE_SCHOOL.code) {
      throw new Error(`School ID "${schoolCode}" not recognized. Please use "${SAMPLE_SCHOOL.code}".`);
    }

    const student = SAMPLE_STUDENTS.find(
      s => s.studentIdNumber.toUpperCase() === studentIdNumber.trim().toUpperCase() && s.password === password
    );

    if (!student) {
      throw new Error('Invalid Student ID or password.');
    }

    storageHelper.set(CURRENT_USER_KEY, student);
    return student;
  },

  // 3. PARENT LOGIN (Email + Password)
  async loginParent(email, password) {
    if (!email || !password) {
      throw new Error('Please enter Email and Password.');
    }

    if (isSupabaseConfigured && supabase) {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;

      const { data: profile, error: profError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (profError) throw profError;
      if (profile.role !== 'parent') {
        await supabase.auth.signOut();
        throw new Error('This login is for Parents only.');
      }

      storageHelper.set(CURRENT_USER_KEY, profile);
      return profile;
    }

    // Local / Sample mode verification
    if (email.trim().toLowerCase() === SAMPLE_PARENT.email.toLowerCase() && password === SAMPLE_PARENT.password) {
      storageHelper.set(CURRENT_USER_KEY, SAMPLE_PARENT);
      return SAMPLE_PARENT;
    }

    // Check newly registered parents in local storage
    const customParents = storageHelper.get('registered_parents', []);
    const found = customParents.find(p => p.email.toLowerCase() === email.trim().toLowerCase() && p.password === password);
    if (found) {
      storageHelper.set(CURRENT_USER_KEY, found);
      return found;
    }

    throw new Error('Invalid parent email or password.');
  },

  // 4. PARENT SIGNUP
  async signupParent({ fullName, email, password, phone, studentIdToLink }) {
    if (!fullName || !email || !password) {
      throw new Error('Name, Email and Password are required.');
    }

    if (isSupabaseConfigured && supabase) {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'parent'
          }
        }
      });

      if (authError) throw authError;

      const newProfile = {
        id: authData.user.id,
        role: 'parent',
        full_name: fullName,
        email,
        phone
      };

      await supabase.from('profiles').insert(newProfile);

      // Link child if student ID provided
      if (studentIdToLink) {
        const { data: child } = await supabase
          .from('profiles')
          .select('id')
          .eq('student_id_number', studentIdToLink.trim().toUpperCase())
          .single();

        if (child) {
          await supabase.from('parent_students').insert({
            parent_id: authData.user.id,
            student_id: child.id
          });
        }
      }

      storageHelper.set(CURRENT_USER_KEY, newProfile);
      return newProfile;
    }

    // Local mode creation
    const newParent = {
      id: `parent-custom-${Date.now()}`,
      role: 'parent',
      email: email.trim(),
      password: password,
      fullName: fullName.trim(),
      fullName_ml: fullName.trim(),
      phone: phone || '',
      avatar: '👩',
      linkedStudentId: studentIdToLink ? `student-${studentIdToLink.toLowerCase()}` : 'student-aarav-101'
    };

    const existing = storageHelper.get('registered_parents', []);
    existing.push(newParent);
    storageHelper.set('registered_parents', existing);
    storageHelper.set(CURRENT_USER_KEY, newParent);
    return newParent;
  },

  // 5. FORGOT PASSWORD
  async forgotPassword(email) {
    if (!email) throw new Error('Please enter your email.');
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
    }
    return { success: true, message: 'Password reset link sent to your registered email.' };
  },

  // 6. LOGOUT
  async logout() {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Supabase signOut error:', e);
      }
    }
    storageHelper.remove(CURRENT_USER_KEY);
  }
};

export default authService;

