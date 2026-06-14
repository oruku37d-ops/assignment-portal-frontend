import { useEffect, useState } from 'react';
import api from '../../api/client';
import Card from '../../components/ui/Card';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/stats').then(({ data }) => { setStats(data.stats); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="animate-pulse h-40 bg-gray-200 dark:bg-gray-700 rounded-xl" />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-primary dark:text-accent">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card title="Users">
          <p className="text-3xl font-bold">{stats?.users?.total || 0}</p>
          <p className="text-sm text-muted mt-1">
            {stats?.users?.admin} admin · {stats?.users?.lecturer} lecturer · {stats?.users?.student} student
          </p>
        </Card>
        <Card title="Submissions">
          <p className="text-3xl font-bold">{stats?.submissions?.total || 0}</p>
          <p className="text-sm text-muted mt-1">
            {stats?.submissions?.graded} graded · {stats?.submissions?.pending} pending
          </p>
        </Card>
        <Card title="Grade Distribution">
          <div className="space-y-1">
            {Object.entries(stats?.gradingDistribution || {}).map(([grade, count]) => (
              <div key={grade} className="flex justify-between text-sm">
                <span>{grade}</span><span className="font-medium">{count}</span>
              </div>
            ))}
            {!Object.keys(stats?.gradingDistribution || {}).length && <p className="text-muted text-sm">No grades yet</p>}
          </div>
        </Card>
      </div>
      <Card title="Recent Activity">
        <div className="space-y-2">
          {(stats?.recentActivity || []).map((log) => (
            <div key={log.id} className="text-sm flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
              <span>{log.user?.name || 'System'} — {log.action}</span>
              <span className="text-muted">{new Date(log.createdAt).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
