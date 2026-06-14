import { useEffect, useState } from 'react';
import api from '../../api/client';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';

export default function MyStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState('');
  const { addToast } = useToast();

  const load = () => api.get('/users/students/mine').then(({ data }) => { setStudents(data.students); setLoading(false); });

  useEffect(() => { load(); }, []);

  const handleAssign = async (e) => {
    e.preventDefault();
    try {
      const { data: me } = await api.get('/auth/me');
      await api.post(`/users/${me.user.id}/assign-student`, { studentId });
      addToast('Student assigned', 'success');
      setStudentId('');
      load();
    } catch (err) {
      addToast(err.response?.data?.error || 'Failed', 'error');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-primary dark:text-accent">My Students</h2>
      <Card title="Assign Student" className="mb-6 max-w-md">
        <form onSubmit={handleAssign} className="flex gap-2">
          <Input placeholder="Student user ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} className="flex-1" required />
          <Button type="submit">Assign</Button>
        </form>
      </Card>
      <Card>
        <Table
          loading={loading}
          data={students}
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            { key: 'createdAt', label: 'Joined', render: (r) => new Date(r.createdAt).toLocaleDateString() },
          ]}
        />
      </Card>
    </div>
  );
}
