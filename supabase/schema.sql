-- ==============================================================================
-- ADHD LEARNING WORLD - SUPABASE DATABASE SCHEMA
-- PostgreSQL schema for Special Education Platform
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SCHOOLS
CREATE TABLE IF NOT EXISTS public.schools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_code VARCHAR(50) UNIQUE NOT NULL, -- e.g. "SCH001", "KERALA-SPED-01"
    name VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(50),
    email VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. USER PROFILES (Teacher, Student, Parent, Admin)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    school_id UUID REFERENCES public.schools(id) ON DELETE SET NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('teacher', 'student', 'parent', 'admin')),
    full_name VARCHAR(255) NOT NULL,
    full_name_ml VARCHAR(255),
    student_id_number VARCHAR(50), -- e.g. "STU101"
    email VARCHAR(255),
    phone VARCHAR(50),
    avatar_url TEXT,
    learning_group_id UUID, -- Assigned Care/Primary/Secondary/Vocational
    is_active BOOLEAN DEFAULT TRUE,
    preferences JSONB DEFAULT '{"language": "ml", "reducedMotion": false, "audioNarration": true, "highContrast": false}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. LEARNING GROUPS (Care Group, Primary, Secondary, Vocational)
CREATE TABLE IF NOT EXISTS public.learning_groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL, -- 'care', 'primary', 'secondary', 'vocational'
    name_en VARCHAR(100) NOT NULL,
    name_ml VARCHAR(100) NOT NULL,
    description_en TEXT,
    description_ml TEXT,
    icon_name VARCHAR(50) DEFAULT 'Heart',
    theme_color VARCHAR(50) DEFAULT 'purple',
    display_order INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Foreign key for profile -> learning_group
ALTER TABLE public.profiles 
    ADD CONSTRAINT fk_profile_learning_group 
    FOREIGN KEY (learning_group_id) 
    REFERENCES public.learning_groups(id) 
    ON DELETE SET NULL;

-- 4. TEACHER-STUDENT ASSIGNMENTS
CREATE TABLE IF NOT EXISTS public.teacher_students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
    teacher_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    academic_year VARCHAR(20) DEFAULT '2026-2027',
    assigned_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(teacher_id, student_id)
);

-- 5. PARENT-STUDENT LINKING
CREATE TABLE IF NOT EXISTS public.parent_students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    relation_type VARCHAR(50) DEFAULT 'Guardian',
    is_verified BOOLEAN DEFAULT TRUE,
    linked_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(parent_id, student_id)
);

-- 6. MODULES (All 36 Exact Curriculum Modules)
CREATE TABLE IF NOT EXISTS public.modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID NOT NULL REFERENCES public.learning_groups(id) ON DELETE CASCADE,
    module_number INT NOT NULL,
    title_ml VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    description_ml TEXT,
    description_en TEXT,
    icon_name VARCHAR(50) DEFAULT 'BookOpen',
    theme_color VARCHAR(50) DEFAULT 'purple',
    focus_areas TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(group_id, module_number)
);

-- 7. LESSONS (Structured into 4 Phases)
CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
    lesson_number INT NOT NULL,
    title_ml VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    introduction_ml TEXT,
    introduction_en TEXT,
    visual_content JSONB DEFAULT '{}'::jsonb,
    classroom_activity JSONB DEFAULT '{}'::jsonb,
    understanding_check JSONB DEFAULT '{}'::jsonb,
    audio_narration_url TEXT,
    video_url TEXT,
    display_order INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(module_id, lesson_number)
);

-- 8. LESSON MEDIA (Veo 3 Videos & Audio)
CREATE TABLE IF NOT EXISTS public.lesson_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    media_type VARCHAR(20) NOT NULL CHECK (media_type IN ('video', 'audio', 'image', 'demonstration')),
    title_ml VARCHAR(255),
    title_en VARCHAR(255),
    media_url TEXT NOT NULL,
    thumbnail_url TEXT,
    duration_seconds INT DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. COMMON ACTIVITIES
CREATE TABLE IF NOT EXISTS public.activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    title_ml VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    activity_type VARCHAR(50) NOT NULL, -- 'picture_id', 'naming', 'matching', 'turn_taking', 'sorting'
    instructions_ml TEXT,
    instructions_en TEXT,
    activity_data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. GAMES (Interactive, lesson-specific games)
CREATE TABLE IF NOT EXISTS public.games (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE SET NULL,
    module_id UUID REFERENCES public.modules(id) ON DELETE SET NULL,
    game_code VARCHAR(100) UNIQUE NOT NULL,
    title_ml VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    game_type VARCHAR(50) NOT NULL, -- 'picture_match', 'balloon_pop', 'fruit_basket', 'animal_sounds', etc.
    description_ml TEXT,
    description_en TEXT,
    instructions_ml TEXT,
    instructions_en TEXT,
    difficulty_level VARCHAR(20) DEFAULT 'easy' CHECK (difficulty_level IN ('easy', 'medium', 'hard')),
    config JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. INDIVIDUAL UNDERSTANDING ASSESSMENTS (Teacher evaluated)
CREATE TABLE IF NOT EXISTS public.individual_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    title_ml VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    criteria JSONB DEFAULT '[]'::jsonb, -- array of grading criteria
    max_score INT DEFAULT 10,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. INDIVIDUAL ASSESSMENT RESULTS
CREATE TABLE IF NOT EXISTS public.assessment_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assessment_id UUID NOT NULL REFERENCES public.individual_assessments(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    teacher_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    understanding_level VARCHAR(50) NOT NULL CHECK (understanding_level IN ('independent', 'with_guidance', 'developing', 'needs_practice')),
    score NUMERIC(5,2) DEFAULT 0,
    teacher_notes TEXT,
    evaluated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(assessment_id, student_id)
);

-- 13. INDIVIDUAL HOMEWORK (Teacher assigned to 1 student)
CREATE TABLE IF NOT EXISTS public.homework (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
    teacher_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    module_id UUID REFERENCES public.modules(id) ON DELETE SET NULL,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE SET NULL,
    game_id UUID REFERENCES public.games(id) ON DELETE SET NULL,
    title_ml VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    instructions_ml TEXT,
    instructions_en TEXT,
    due_date DATE,
    status VARCHAR(30) DEFAULT 'assigned' CHECK (status IN ('assigned', 'in_progress', 'submitted', 'reviewed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. HOMEWORK SUBMISSIONS
CREATE TABLE IF NOT EXISTS public.homework_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    homework_id UUID NOT NULL REFERENCES public.homework(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    submission_notes TEXT,
    game_result_id UUID,
    parent_feedback TEXT,
    teacher_feedback TEXT,
    stars_awarded INT DEFAULT 0,
    status VARCHAR(30) DEFAULT 'submitted' CHECK (status IN ('submitted', 'approved', 'needs_revision')),
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ
);

-- 15. STUDENT ACTIVITY RESULTS
CREATE TABLE IF NOT EXISTS public.student_activity_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    activity_id UUID NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT TRUE,
    score INT DEFAULT 0,
    time_spent_seconds INT DEFAULT 0,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. GAME RESULTS
CREATE TABLE IF NOT EXISTS public.game_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    game_id UUID NOT NULL REFERENCES public.games(id) ON DELETE CASCADE,
    score INT DEFAULT 0,
    stars_earned INT DEFAULT 1,
    attempts INT DEFAULT 1,
    time_spent_seconds INT DEFAULT 0,
    completed BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. OVERALL STUDENT PROGRESS (Per Module & Group)
CREATE TABLE IF NOT EXISTS public.student_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
    lessons_completed INT DEFAULT 0,
    games_completed INT DEFAULT 0,
    total_stars INT DEFAULT 0,
    status VARCHAR(30) DEFAULT 'locked' CHECK (status IN ('locked', 'unlocked', 'in_progress', 'completed')),
    last_activity_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, module_id)
);

-- 18. BADGES & REWARDS
CREATE TABLE IF NOT EXISTS public.badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    title_ml VARCHAR(100) NOT NULL,
    title_en VARCHAR(100) NOT NULL,
    description_ml TEXT,
    description_en TEXT,
    icon_name VARCHAR(50) DEFAULT 'Award',
    badge_color VARCHAR(50) DEFAULT 'yellow',
    requirement_type VARCHAR(50) NOT NULL, -- 'first_game', 'five_stars', 'module_complete', etc.
    threshold INT DEFAULT 1
);

-- 19. STUDENT BADGES (Earned)
CREATE TABLE IF NOT EXISTS public.student_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    badge_id UUID NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
    awarded_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, badge_id)
);

-- 20. CLASSROOM SESSIONS (Classroom TV state tracking)
CREATE TABLE IF NOT EXISTS public.classroom_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
    teacher_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    current_phase VARCHAR(50) DEFAULT 'visual_learning', -- 'visual_learning', 'classroom_activity', 'understanding_check', 'games'
    active_turn_student_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    is_live BOOLEAN DEFAULT TRUE,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_profiles_school ON public.profiles(school_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_teacher_students_teacher ON public.teacher_students(teacher_id);
CREATE INDEX IF NOT EXISTS idx_teacher_students_student ON public.teacher_students(student_id);
CREATE INDEX IF NOT EXISTS idx_parent_students_parent ON public.parent_students(parent_id);
CREATE INDEX IF NOT EXISTS idx_parent_students_student ON public.parent_students(student_id);
CREATE INDEX IF NOT EXISTS idx_modules_group ON public.modules(group_id);
CREATE INDEX IF NOT EXISTS idx_lessons_module ON public.lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_games_lesson ON public.games(lesson_id);
CREATE INDEX IF NOT EXISTS idx_homework_student ON public.homework(student_id);
CREATE INDEX IF NOT EXISTS idx_homework_teacher ON public.homework(teacher_id);
CREATE INDEX IF NOT EXISTS idx_game_results_student ON public.game_results(student_id);
CREATE INDEX IF NOT EXISTS idx_student_progress_student ON public.student_progress(student_id);

