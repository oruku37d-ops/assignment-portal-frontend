import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export default function LecturerSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    api.get('/submissions').then(({ data }) => { setSubmissions(data.submissions); setLoading(false); });
  }, []);

  const filtered = filter === 'ALL' ? submissions : submissions.filter((s) => s.status === filter);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-primary dark:text-accent">Submissions</h2>
      <div className="flex gap-2 mb-4">
        {['ALL', 'PENDING', 'GRADED'].map((f) => (
          <Button key={f} variant={filter === f ? 'accent' : 'ghost'} onClick={() => setFilter(f)}>{f}</Button>
        ))}
      </div>
      <Card>
        <Table
          loading={loading}
          data={filtered}
          columns={[
            { key: 'student', label: 'Student', render: (r) => r.student?.name },
            { key: 'assignment', label: 'Assignment', render: (r) => r.assignment?.title },
            { key: 'status', label: 'Status', render: (r) => <Badge status={r.status}>{r.status}</Badge> },
            { key: 'grade', label: 'Grade', render: (r) => r.grade || '—' },
            { key: 'actions', label: '', render: (r) => <Link to={`/lecturer/grade/${r.id}`}><Button variant="ghost">Review</Button></Link> },
          ]}
        />
      </Card>
    </div>
  );
}
