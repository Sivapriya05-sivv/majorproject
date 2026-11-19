import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Public Pages
import SplashScreen from '../pages/splash/SplashScreen';
import WelcomePage from '../pages/welcome/WelcomePage';
import TeacherLogin from '../pages/auth/TeacherLogin';
import StudentLogin from '../pages/auth/StudentLogin';
import ParentLogin from '../pages/auth/ParentLogin';
import ParentSignup from '../pages/auth/ParentSignup';
import ForgotPassword from '../pages/auth/ForgotPassword';
import NotFoundPage from '../pages/notfound/NotFoundPage';

// Layouts
import TeacherLayout from '../components/layout/TeacherLayout';
import StudentLayout from '../components/layout/StudentLayout';
import ParentLayout from '../components/layout/ParentLayout';

// Protected Route Guard
import ProtectedRoute from './ProtectedRoute';

// Teacher Pages
import TeacherDashboard from '../pages/teacher/TeacherDashboard';
import TeacherStudents from '../pages/teacher/TeacherStudents';
import TeacherModules from '../pages/teacher/TeacherModules';
import TeacherLessonView from '../pages/teacher/TeacherLessonView';
import TeacherAssessments from '../pages/teacher/TeacherAssessments';
import TeacherHomework from '../pages/teacher/TeacherHomework';
import TeacherSubmissions from '../pages/teacher/TeacherSubmissions';
import TeacherProgress from '../pages/teacher/TeacherProgress';

// Student Pages
import StudentDashboard from '../pages/student/StudentDashboard';
import AdventureMap from '../pages/student/AdventureMap';
import StudentModuleView from '../pages/student/StudentModuleView';
import StudentLessonView from '../pages/student/StudentLessonView';
import StudentGamesHub from '../pages/student/StudentGamesHub';
import StudentGamePlay from '../pages/student/StudentGamePlay';
import StudentHomework from '../pages/student/StudentHomework';
import StudentGarden from '../pages/student/StudentGarden';

// Parent Pages
import ParentDashboard from '../pages/parent/ParentDashboard';
import ParentChildProgress from '../pages/parent/ParentChildProgress';
import ParentHomeActivities from '../pages/parent/ParentHomeActivities';
import ParentHomeworkView from '../pages/parent/ParentHomeworkView';

// Classroom TV Page
import ClassroomTVPage from '../pages/classroom/ClassroomTVPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* 1. Public Splash & Auth Routes */}
      <Route path="/" element={<SplashScreen />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/login/teacher" element={<TeacherLogin />} />
      <Route path="/login/student" element={<StudentLogin />} />
      <Route path="/login/parent" element={<ParentLogin />} />
      <Route path="/signup/parent" element={<ParentSignup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* 2. Teacher Protected Portal */}
      <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<Navigate to="/teacher/dashboard" replace />} />
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="students" element={<TeacherStudents />} />
          <Route path="modules" element={<TeacherModules />} />
          <Route path="lesson/:moduleId" element={<TeacherLessonView />} />
          <Route path="assessments" element={<TeacherAssessments />} />
          <Route path="homework" element={<TeacherHomework />} />
          <Route path="submissions" element={<TeacherSubmissions />} />
          <Route path="progress" element={<TeacherProgress />} />
        </Route>
      </Route>

      {/* 3. Student Protected Portal */}
      <Route element={<ProtectedRoute allowedRoles={['student']} />}>
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Navigate to="/student/dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="adventure" element={<AdventureMap />} />
          <Route path="module/:moduleId" element={<StudentModuleView />} />
          <Route path="lesson/:moduleId/:lessonId" element={<StudentLessonView />} />
          <Route path="games" element={<StudentGamesHub />} />
          <Route path="play/:gameCode" element={<StudentGamePlay />} />
          <Route path="homework" element={<StudentHomework />} />
          <Route path="garden" element={<StudentGarden />} />
        </Route>
      </Route>

      {/* 4. Parent Protected Portal */}
      <Route element={<ProtectedRoute allowedRoles={['parent']} />}>
        <Route path="/parent" element={<ParentLayout />}>
          <Route index element={<Navigate to="/parent/dashboard" replace />} />
          <Route path="dashboard" element={<ParentDashboard />} />
          <Route path="progress" element={<ParentChildProgress />} />
          <Route path="activities" element={<ParentHomeActivities />} />
          <Route path="homework" element={<ParentHomeworkView />} />
        </Route>
      </Route>

      {/* 5. Classroom TV Mode (Accessible to Teachers & Classrooms) */}
      <Route path="/classroom-tv" element={<ClassroomTVPage />} />

      {/* 6. 404 Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;

