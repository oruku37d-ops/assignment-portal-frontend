import { useEffect, useState } from 'react';
import api from '../../api/client';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { useToast } from '../../components/ui/Toast';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', name: '', role: 'STUDENT' });
  const { addToast } = useToast();

  const load = () => api.get('/users').then(({ data }) => { setUsers(data.users); setLoading(false); });

  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users', form);
      addToast('User created', 'success');
      setForm({ email: '', password: '', name: '', role: 'STUDENT' });
      load();
    } catch (err) {
      addToast(err.response?.data?.error || 'Failed', 'error');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-primary dark:text-accent">User Management</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Create User" className="lg:col-span-1">
          <form onSubmit={handleCreate} className="space-y-3">
            <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            <label className="block space-y-1">
              <span className="text-sm font-medium">Role</span>
              <select className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="LECTURER">Lecturer</option>
                <option value="STUDENT">Student</option>
              </select>
            </label>
            <Button type="submit" className="w-full">Create User</Button>
          </form>
        </Card>
        <Card title="All Users" className="lg:col-span-2">
          <Table
            loading={loading}
            data={users}
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'role', label: 'Role', render: (r) => <Badge status={r.role}>{r.role}</Badge> },
              { key: 'createdAt', label: 'Joined', render: (r) => new Date(r.createdAt).toLocaleDateString() },
            ]}
          />
        </Card>
      </div>
    </div>
  );
}
