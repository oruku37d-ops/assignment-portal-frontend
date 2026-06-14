import { useEffect, useState } from 'react';
import api from '../../api/client';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import useSocket from '../../hooks/useSocket';

export default function GradesPage() {
  const [submissions, setSubmissions] = useState([]);

  const load = () => api.get('/submissions').then(({ data }) => setSubmissions(data.submissions.filter((s) => s.status === 'GRADED')));

  useEffect(() => { load(); }, []);
  useSocket({ 'submission:graded': () => load() });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-primary dark:text-accent">My Grades</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {submissions.map((s) => (
          <Card key={s.id} title={s.assignment?.title}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl font-bold">{s.grade}</span>
              <span className="text-muted">Score: {s.score}/100</span>
            </div>
            {s.comment && <p className="text-sm border-t border-gray-100 dark:border-gray-800 pt-2 mt-2">{s.comment}</p>}
            <p className="text-xs text-muted mt-2">Graded {s.gradedAt ? new Date(s.gradedAt).toLocaleString() : '—'}</p>
          </Card>
        ))}
        {!submissions.length && <p className="text-muted">No graded submissions yet</p>}
      </div>
    </div>
  );
}
