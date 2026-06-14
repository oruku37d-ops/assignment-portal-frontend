import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth.user);
  const { dark, toggle } = useTheme();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="flex items-center gap-3">
        <span className="font-medium">{user?.name}</span>
        <Badge status={user?.role}>{user?.role}</Badge>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={toggle} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" title="Toggle theme">
          {dark ? '☀️' : '🌙'}
        </button>
        <Button variant="ghost" onClick={handleLogout}>Logout</Button>
      </div>
    </header>
  );
}
