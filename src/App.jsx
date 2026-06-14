import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/Layout/MainLayout';
import { ToastProvider } from './components/ui/Toast';
import Login from './pages/Login';
import ProfilePage from './pages/ProfilePage';

import AdminDashboard from './pages/admin/AdminDashboard';
import UsersPage from './pages/admin/UsersPage';
import AssignmentsPage from './pages/admin/AssignmentsPage';
import SubmissionsPage from './pages/admin/SubmissionsPage';
import ReportsPage from './pages/admin/ReportsPage';
import DatabaseOverview from './pages/admin/DatabaseOverview';

import LecturerDashboard from './pages/lecturer/LecturerDashboard';
import MyStudents from './pages/lecturer/MyStudents';
import LecturerSubmissions from './pages/lecturer/LecturerSubmissions';
import GradingPage from './pages/lecturer/GradingPage';
import LecturerReportsPage from './pages/lecturer/LecturerReportsPage';
import CreateAssignment from './pages/lecturer/CreateAssignment';

import StudentDashboard from './pages/student/StudentDashboard';
import AssignmentSubmit from './pages/student/AssignmentSubmit';
import SubmissionHistory from './pages/student/SubmissionHistory';
import GradesPage from './pages/student/GradesPage';
import StudentReportsPage from './pages/student/StudentReportsPage';

const ROLE_HOME = {
  ADMIN: '/admin/dashboard',
  LECTURER: '/lecturer/dashboard',
  STUDENT: '/student/dashboard',
};

function HomeRedirect() {
  const { token, user } = useSelector((s) => s.auth);
  if (token && user) return <Navigate to={ROLE_HOME[user.role]} replace />;
  return <Navigate to="/login" replace />;
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
            <button onClick={() => window.location.reload()} className="text-accent underline">Reload page</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomeRedirect />} />

          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/profile" element={<ProfilePage />} />

            <Route path="/admin/dashboard" element={<ProtectedRoute roles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute roles={['ADMIN']}><UsersPage /></ProtectedRoute>} />
            <Route path="/admin/assignments" element={<ProtectedRoute roles={['ADMIN']}><AssignmentsPage /></ProtectedRoute>} />
            <Route path="/admin/submissions" element={<ProtectedRoute roles={['ADMIN']}><SubmissionsPage /></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute roles={['ADMIN']}><ReportsPage /></ProtectedRoute>} />
            <Route path="/admin/database" element={<ProtectedRoute roles={['ADMIN']}><DatabaseOverview /></ProtectedRoute>} />

            <Route path="/lecturer/dashboard" element={<ProtectedRoute roles={['LECTURER', 'ADMIN']}><LecturerDashboard /></ProtectedRoute>} />
            <Route path="/lecturer/students" element={<ProtectedRoute roles={['LECTURER']}><MyStudents /></ProtectedRoute>} />
            <Route path="/lecturer/submissions" element={<ProtectedRoute roles={['LECTURER']}><LecturerSubmissions /></ProtectedRoute>} />
            <Route path="/lecturer/grade/:id" element={<ProtectedRoute roles={['LECTURER']}><GradingPage /></ProtectedRoute>} />
            <Route path="/lecturer/reports" element={<ProtectedRoute roles={['LECTURER']}><LecturerReportsPage /></ProtectedRoute>} />
            <Route path="/lecturer/create-assignment" element={<ProtectedRoute roles={['LECTURER']}><CreateAssignment /></ProtectedRoute>} />

            <Route path="/student/dashboard" element={<ProtectedRoute roles={['STUDENT']}><StudentDashboard /></ProtectedRoute>} />
            <Route path="/student/submit" element={<ProtectedRoute roles={['STUDENT']}><AssignmentSubmit /></ProtectedRoute>} />
            <Route path="/student/history" element={<ProtectedRoute roles={['STUDENT']}><SubmissionHistory /></ProtectedRoute>} />
            <Route path="/student/grades" element={<ProtectedRoute roles={['STUDENT']}><GradesPage /></ProtectedRoute>} />
            <Route path="/student/reports" element={<ProtectedRoute roles={['STUDENT']}><StudentReportsPage /></ProtectedRoute>} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ToastProvider>
    </ErrorBoundary>
  );
}
