import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, clearError } from '../store/authSlice';
import { useTheme } from '../context/ThemeContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const ROLE_HOME = {
  ADMIN: '/admin/dashboard',
  LECTURER: '/lecturer/dashboard',
  STUDENT: '/student/dashboard',
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user, token } = useSelector((s) => s.auth);
  const { dark, toggle } = useTheme();

  useEffect(() => {
    if (token && user) navigate(ROLE_HOME[user.role]);
  }, [token, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) {
      navigate(ROLE_HOME[result.payload.user.role]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
      <div className="absolute top-4 right-4">
        <button onClick={toggle} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800">
          {dark ? '☀️' : '🌙'}
        </button>
      </div>
      <Card className="w-full max-w-md" title="Academic Assignment Management">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); dispatch(clearError()); }} required />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
        <p className="mt-4 text-xs text-muted text-center">
          Demo: admin@academic.edu / Admin123!
        </p>
      </Card>
    </div>
  );
}
