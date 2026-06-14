import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function LecturerDashboard() {
  const [pending, setPending] = useState(0);
  const [students, setStudents] = useState(0);

  useEffect(() => {
    api.get('/submissions').then(({ data }) => {
      setPending(data.submissions.filter((s) => s.status === 'PENDING').length);
    });
    api.get('/users/students/mine').then(({ data }) => setStudents(data.students.length));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-primary dark:text-accent">Lecturer Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card title="Pending Submissions">
          <p className="text-3xl font-bold">{pending}</p>
        </Card>
        <Card title="Assigned Students">
          <p className="text-3xl font-bold">{students}</p>
        </Card>
      </div>
      <div className="flex gap-3">
        <Link to="/lecturer/submissions"><Button>Review Submissions</Button></Link>
        <Link to="/lecturer/students"><Button variant="ghost">My Students</Button></Link>
      </div>
    </div>
  );
}
