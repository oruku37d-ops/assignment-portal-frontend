import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ROLE_HOME = {
  ADMIN: '/admin/dashboard',
  LECTURER: '/lecturer/dashboard',
  STUDENT: '/student/dashboard',
};

export default function ProtectedRoute({ children, roles }) {
  const { token, user } = useSelector((s) => s.auth);

  if (!token || !user) return <Navigate to="/login" replace />;

  if (roles && !roles.includes(user.role)) {
    return <Navigate to={ROLE_HOME[user.role] || '/login'} replace />;
  }

  return children;
}
