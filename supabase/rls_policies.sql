-- ==============================================================================
-- ADHD LEARNING WORLD - ROW LEVEL SECURITY (RLS) POLICIES
-- Strict Isolation & Privacy: Students -> own data, Teachers -> assigned students, Parents -> linked child
-- ==============================================================================

-- Enable RLS on all relevant tables
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parent_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.individual_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homework ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homework_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_activity_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classroom_sessions ENABLE ROW LEVEL SECURITY;

-- Helper functions to get current user role and permissions
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS VARCHAR AS $$
    SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_teacher_for_student(p_student_id UUID)
RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.teacher_students 
        WHERE teacher_id = auth.uid() AND student_id = p_student_id
    );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_parent_for_student(p_student_id UUID)
RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.parent_students 
        WHERE parent_id = auth.uid() AND student_id = p_student_id
    );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- 1. PUBLIC CURRICULUM (Learning Groups, Modules, Lessons, Media, Activities, Games, Badges)
-- Authenticated users (Teacher, Student, Parent) can view curriculum content
CREATE POLICY "Curriculum readable by all authenticated users" 
    ON public.learning_groups FOR SELECT 
    TO authenticated USING (true);

CREATE POLICY "Modules readable by all authenticated users" 
    ON public.modules FOR SELECT 
    TO authenticated USING (true);

CREATE POLICY "Lessons readable by all authenticated users" 
    ON public.lessons FOR SELECT 
    TO authenticated USING (true);

CREATE POLICY "Media readable by all authenticated users" 
    ON public.lesson_media FOR SELECT 
    TO authenticated USING (true);

CREATE POLICY "Activities readable by all authenticated users" 
    ON public.activities FOR SELECT 
    TO authenticated USING (true);

CREATE POLICY "Games readable by all authenticated users" 
    ON public.games FOR SELECT 
    TO authenticated USING (true);

CREATE POLICY "Badges readable by all authenticated users" 
    ON public.badges FOR SELECT 
    TO authenticated USING (true);

-- 2. SCHOOLS
CREATE POLICY "Schools readable by authenticated members" 
    ON public.schools FOR SELECT 
    TO authenticated USING (true);

-- 3. PROFILES
-- Users can view their own profile
CREATE POLICY "Users can read own profile" 
    ON public.profiles FOR SELECT 
    TO authenticated 
    USING (id = auth.uid());

-- Teachers can view profiles of their assigned students
CREATE POLICY "Teachers can view assigned student profiles" 
    ON public.profiles FOR SELECT 
    TO authenticated 
    USING (
        public.current_user_role() = 'teacher' 
        AND public.is_teacher_for_student(id)
    );

-- Parents can view profile of linked child
CREATE POLICY "Parents can view linked child profile" 
    ON public.profiles FOR SELECT 
    TO authenticated 
    USING (
        public.current_user_role() = 'parent' 
        AND public.is_parent_for_student(id)
    );

-- Users can update non-privileged fields of their own profile
CREATE POLICY "Users can update own preferences" 
    ON public.profiles FOR UPDATE 
    TO authenticated 
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- 4. TEACHER-STUDENT RELATIONSHIPS
CREATE POLICY "Teachers can view their student assignments" 
    ON public.teacher_students FOR SELECT 
    TO authenticated 
    USING (teacher_id = auth.uid());

-- 5. PARENT-STUDENT RELATIONSHIPS
CREATE POLICY "Parents can view their child linkings" 
    ON public.parent_students FOR SELECT 
    TO authenticated 
    USING (parent_id = auth.uid());

CREATE POLICY "Parents can link child" 
    ON public.parent_students FOR INSERT 
    TO authenticated 
    WITH CHECK (parent_id = auth.uid());

-- 6. INDIVIDUAL ASSESSMENTS & RESULTS
CREATE POLICY "Teachers can create and view assessments" 
    ON public.individual_assessments FOR ALL 
    TO authenticated 
    USING (public.current_user_role() = 'teacher');

CREATE POLICY "Teachers can manage assessment results" 
    ON public.assessment_results FOR ALL 
    TO authenticated 
    USING (teacher_id = auth.uid() OR public.is_teacher_for_student(student_id));

CREATE POLICY "Students can view own assessment results" 
    ON public.assessment_results FOR SELECT 
    TO authenticated 
    USING (student_id = auth.uid());

CREATE POLICY "Parents can view linked child assessment results" 
    ON public.assessment_results FOR SELECT 
    TO authenticated 
    USING (public.is_parent_for_student(student_id));

-- 7. HOMEWORK & SUBMISSIONS
-- Teachers can manage homework for their assigned students
CREATE POLICY "Teachers manage homework" 
    ON public.homework FOR ALL 
    TO authenticated 
    USING (teacher_id = auth.uid());

-- Students can view homework assigned to them
CREATE POLICY "Students view own homework" 
    ON public.homework FOR SELECT 
    TO authenticated 
    USING (student_id = auth.uid());

-- Parents can view homework of linked child
CREATE POLICY "Parents view child homework" 
    ON public.homework FOR SELECT 
    TO authenticated 
    USING (public.is_parent_for_student(student_id));

-- Submissions
CREATE POLICY "Students create and view own submissions" 
    ON public.homework_submissions FOR ALL 
    TO authenticated 
    USING (student_id = auth.uid())
    WITH CHECK (student_id = auth.uid());

CREATE POLICY "Teachers view and evaluate student submissions" 
    ON public.homework_submissions FOR ALL 
    TO authenticated 
    USING (public.is_teacher_for_student(student_id));

CREATE POLICY "Parents view child submissions" 
    ON public.homework_submissions FOR SELECT 
    TO authenticated 
    USING (public.is_parent_for_student(student_id));

-- 8. GAME RESULTS & PROGRESS
CREATE POLICY "Students record and view own game results" 
    ON public.game_results FOR ALL 
    TO authenticated 
    USING (student_id = auth.uid())
    WITH CHECK (student_id = auth.uid());

CREATE POLICY "Teachers view student game results" 
    ON public.game_results FOR SELECT 
    TO authenticated 
    USING (public.is_teacher_for_student(student_id));

CREATE POLICY "Parents view child game results" 
    ON public.game_results FOR SELECT 
    TO authenticated 
    USING (public.is_parent_for_student(student_id));

-- Activity results
CREATE POLICY "Students manage own activity results" 
    ON public.student_activity_results FOR ALL 
    TO authenticated 
    USING (student_id = auth.uid())
    WITH CHECK (student_id = auth.uid());

CREATE POLICY "Teachers view student activity results" 
    ON public.student_activity_results FOR SELECT 
    TO authenticated 
    USING (public.is_teacher_for_student(student_id));

-- Progress
CREATE POLICY "Students manage own progress" 
    ON public.student_progress FOR ALL 
    TO authenticated 
    USING (student_id = auth.uid());

CREATE POLICY "Teachers view and update student progress" 
    ON public.student_progress FOR ALL 
    TO authenticated 
    USING (public.is_teacher_for_student(student_id));

CREATE POLICY "Parents view child progress" 
    ON public.student_progress FOR SELECT 
    TO authenticated 
    USING (public.is_parent_for_student(student_id));

-- Badges
CREATE POLICY "Students view own badges" 
    ON public.student_badges FOR SELECT 
    TO authenticated 
    USING (student_id = auth.uid());

CREATE POLICY "System/Teacher awards badges" 
    ON public.student_badges FOR INSERT 
    TO authenticated 
    WITH CHECK (student_id = auth.uid() OR public.is_teacher_for_student(student_id));

-- 9. CLASSROOM SESSIONS
CREATE POLICY "Teachers manage classroom sessions" 
    ON public.classroom_sessions FOR ALL 
    TO authenticated 
    USING (teacher_id = auth.uid());

CREATE POLICY "Students and Parents view live classroom sessions" 
    ON public.classroom_sessions FOR SELECT 
    TO authenticated 
    USING (true);

