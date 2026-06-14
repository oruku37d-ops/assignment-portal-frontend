import { useSelector } from 'react-redux';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';

export default function ProfilePage() {
  const user = useSelector((s) => s.auth.user);

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-6 text-primary dark:text-accent">Profile</h2>
      <Card>
        <div className="space-y-4">
          <Input label="Name" value={user?.name || ''} readOnly />
          <Input label="Email" value={user?.email || ''} readOnly />
          <label className="block space-y-1">
            <span className="text-sm font-medium">Role</span>
            <div><Badge status={user?.role}>{user?.role}</Badge></div>
          </label>
        </div>
      </Card>
    </div>
  );
}
