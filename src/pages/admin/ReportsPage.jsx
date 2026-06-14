import { useEffect, useState } from 'react';
import api from '../../api/client';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/reports').then(({ data }) => { setReports(data.reports); setLoading(false); });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-primary dark:text-accent">All Reports</h2>
      <Card>
        <Table
          loading={loading}
          data={reports}
          columns={[
            { key: 'student', label: 'Student', render: (r) => r.student?.name },
            { key: 'submission', label: 'Assignment', render: (r) => r.submission?.assignment?.title },
            { key: 'message', label: 'Message', render: (r) => r.message?.slice(0, 50) + (r.message?.length > 50 ? '...' : '') },
            { key: 'status', label: 'Status', render: (r) => <Badge status={r.status}>{r.status}</Badge> },
            { key: 'createdAt', label: 'Created', render: (r) => new Date(r.createdAt).toLocaleDateString() },
          ]}
        />
      </Card>
    </div>
  );
}
