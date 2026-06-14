import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NAV = {
  ADMIN: [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/users', label: 'Users' },
    { to: '/admin/assignments', label: 'Assignments' },
    { to: '/admin/submissions', label: 'Submissions' },
    { to: '/admin/reports', label: 'Reports' },
    { to: '/admin/database', label: 'Database' },
  ],
  LECTURER: [
    { to: '/lecturer/dashboard', label: 'Dashboard' },
    { to: '/lecturer/create-assignment', label: 'Create Assignment' },
    { to: '/lecturer/students', label: 'My Students' },
    { to: '/lecturer/submissions', label: 'Submissions' },
    { to: '/lecturer/reports', label: 'Reports' },
  ],
  STUDENT: [
    { to: '/student/dashboard', label: 'Dashboard' },
    { to: '/student/submit', label: 'Submit Work' },
    { to: '/student/history', label: 'History' },
    { to: '/student/grades', label: 'Grades' },
    { to: '/student/reports', label: 'Reports' },
  ],
};

export default function Sidebar() {
  const role = useSelector((s) => s.auth.user?.role);
  const links = NAV[role] || [];

  return (
    <aside className="w-56 shrink-0 bg-primary text-white min-h-screen p-4">
      <h1 className="text-lg font-bold text-accent mb-6">Academic AMS</h1>
      <nav className="space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${isActive ? 'bg-primary-light text-accent' : 'hover:bg-primary-light/60'}`
            }
          >
            {link.label}
          </NavLink>
        ))}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `block px-3 py-2 rounded-lg transition mt-4 ${isActive ? 'bg-primary-light text-accent' : 'hover:bg-primary-light/60'}`
          }
        >
          Profile
        </NavLink>
      </nav>
    </aside>
  );
}
