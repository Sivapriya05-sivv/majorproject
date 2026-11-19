// PRE-CONFIGURED SAMPLE ACCOUNTS & PROFILES
// For Instant Testing, Demonstration and Safe Local Storage Persistence

export const SAMPLE_SCHOOL = {
  id: 'school-kerala-001',
  code: 'SCH001',
  name: 'Kerala Inclusive Model School',
  name_ml: 'കേരള ഇൻക്ലൂസീവ് മോഡൽ സ്കൂൾ',
  city: 'Thiruvananthapuram'
};

export const SAMPLE_STUDENTS = [
  {
    id: 'student-aarav-101',
    schoolId: 'SCH001',
    studentIdNumber: 'STU101',
    password: 'student123',
    role: 'student',
    fullName: 'Aarav Krishna',
    fullName_ml: 'ആരവ് കൃഷ്ണ',
    avatar: '👦',
    groupCode: 'care',
    groupName_en: 'Care Group',
    groupName_ml: 'കെയർ ഗ്രൂപ്പ്',
    stars: 12,
    badges: ['STARTER', 'STAR_COLLECTOR'],
    completedLessons: 4,
    completedGames: 3,
    parentLinkedId: 'parent-lakshmi-01'
  },
  {
    id: 'student-diya-102',
    schoolId: 'SCH001',
    studentIdNumber: 'STU102',
    password: 'student123',
    role: 'student',
    fullName: 'Diya Suresh',
    fullName_ml: 'ദിയ സുരേഷ്',
    avatar: '👧',
    groupCode: 'primary',
    groupName_en: 'Primary Group',
    groupName_ml: 'പ്രൈമറി ഗ്രൂപ്പ്',
    stars: 18,
    badges: ['STARTER', 'STAR_COLLECTOR', 'GAME_CHAMPION'],
    completedLessons: 6,
    completedGames: 5,
    parentLinkedId: null
  },
  {
    id: 'student-advaith-103',
    schoolId: 'SCH001',
    studentIdNumber: 'STU103',
    password: 'student123',
    role: 'student',
    fullName: 'Advaith Menon',
    fullName_ml: 'അദ്വൈത് മേനോൻ',
    avatar: '🧑',
    groupCode: 'secondary',
    groupName_en: 'Secondary Group',
    groupName_ml: 'സെക്കൻഡറി ഗ്രൂപ്പ്',
    stars: 15,
    badges: ['STARTER', 'SUPER_HELPER'],
    completedLessons: 5,
    completedGames: 4,
    parentLinkedId: null
  },
  {
    id: 'student-fathima-104',
    schoolId: 'SCH001',
    studentIdNumber: 'STU104',
    password: 'student123',
    role: 'student',
    fullName: 'Fathima Nizar',
    fullName_ml: 'ഫാത്തിമ നിസാർ',
    avatar: '🧕',
    groupCode: 'vocational',
    groupName_en: 'Vocational Group',
    groupName_ml: 'വൊക്കേഷണൽ ഗ്രൂപ്പ്',
    stars: 20,
    badges: ['STARTER', 'STAR_COLLECTOR', 'GAME_CHAMPION', 'SUPER_HELPER'],
    completedLessons: 7,
    completedGames: 6,
    parentLinkedId: null
  }
];

export const SAMPLE_TEACHER = {
  id: 'teacher-priya-01',
  schoolId: 'SCH001',
  role: 'teacher',
  email: 'teacher@school.edu',
  password: 'password123',
  fullName: 'Priya Lakshmi M.',
  fullName_ml: 'പ്രിയ ലക്ഷ്മി ടീച്ചർ',
  avatar: '👩‍🏫',
  designation: 'Special Educator & Learning Specialist',
  assignedGroups: ['care', 'primary', 'secondary', 'vocational'],
  assignedStudentIds: ['student-aarav-101', 'student-diya-102', 'student-advaith-103', 'student-fathima-104']
};

export const SAMPLE_PARENT = {
  id: 'parent-lakshmi-01',
  role: 'parent',
  email: 'parent@gmail.com',
  password: 'parent123',
  fullName: 'Lakshmi Krishna',
  fullName_ml: 'ലക്ഷ്മി കൃഷ്ണ',
  avatar: '👩',
  phone: '+91 98470 12345',
  linkedStudentId: 'student-aarav-101' // Aarav Krishna
};

export const SAMPLE_HOMEWORK = [
  {
    id: 'hw-001',
    teacherId: 'teacher-priya-01',
    studentId: 'student-aarav-101',
    moduleTitle_ml: 'എനിക്കും എന്റെ പേര് അറിയാം',
    moduleTitle_en: 'I Also Know My Name',
    lessonTitle_ml: 'എന്റെ പേര് ഇതാണ്!',
    lessonTitle_en: 'This Is My Name!',
    gameCode: 'picture_match',
    instructions_ml: 'വീട്ടിൽ അമ്മയോടൊപ്പം ഫോട്ടോ കാർഡ് നോക്കി സ്വന്തം പേര് പറയാൻ പരിശീലിക്കുക.',
    instructions_en: 'Practice pointing to your photo and saying your name with mother at home.',
    dueDate: '2026-11-25',
    status: 'assigned', // 'assigned', 'submitted', 'reviewed'
    starsAwarded: 0,
    submissionNote: '',
    teacherFeedback: ''
  },
  {
    id: 'hw-002',
    teacherId: 'teacher-priya-01',
    studentId: 'student-diya-102',
    moduleTitle_ml: 'സംഖ്യകളും എണ്ണലും',
    moduleTitle_en: 'Numbers and Counting',
    lessonTitle_ml: '1 മുതൽ 5 വരെ എണ്ണാം',
    lessonTitle_en: 'Counting 1 to 5 with Fun Objects',
    gameCode: 'number_train',
    instructions_ml: 'വീട്ടിലെ 5 സ്പൂണുകൾ എണ്ണി വയ്ക്കുക.',
    instructions_en: 'Count 5 spoons at home and arrange them neatly.',
    dueDate: '2026-11-22',
    status: 'submitted',
    starsAwarded: 3,
    submissionNote: 'ദിയ വളരെ സന്തോഷത്തോടെ സ്പൂണുകൾ എണ്ണി വച്ചു!',
    teacherFeedback: 'വളരെ നല്ല പ്രവർത്തനം ദിയാക്കുട്ടി! 3 നക്ഷത്രങ്ങൾ സമ്മാനം.'
  }
];

