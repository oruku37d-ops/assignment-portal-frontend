import { useEffect, useState } from 'react';
import api from '../../api/client';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';

export default function SubmissionHistory() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/submissions').then(({ data }) => { setSubmissions(data.submissions); setLoading(false); });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-primary dark:text-accent">Submission History</h2>
      <Card>
        <Table
          loading={loading}
          data={submissions}
          columns={[
            { key: 'assignment', label: 'Assignment', render: (r) => r.assignment?.title },
            { key: 'title', label: 'Reference', render: (r) => r.title || '—' },
            { key: 'status', label: 'Status', render: (r) => <Badge status={r.status}>{r.status}</Badge> },
            { key: 'submittedAt', label: 'Submitted', render: (r) => new Date(r.submittedAt).toLocaleString() },
            { key: 'fileUrl', label: 'File', render: (r) => <a href={r.fileUrl} target="_blank" rel="noreferrer" className="text-accent underline">View</a> },
          ]}
        />
      </Card>
    </div>
  );
}
