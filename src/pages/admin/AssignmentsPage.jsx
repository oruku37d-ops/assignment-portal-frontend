import { useEffect, useState } from 'react';
import api from '../../api/client';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/assignments').then(({ data }) => { setAssignments(data.assignments); setLoading(false); });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-primary dark:text-accent">All Assignments</h2>
      <Card>
        <Table
          loading={loading}
          data={assignments}
          columns={[
            { key: 'title', label: 'Title' },
            { key: 'module', label: 'Module' },
            { key: 'createdBy', label: 'Created By', render: (r) => r.createdBy?.name },
            { key: 'dueDate', label: 'Due', render: (r) => r.dueDate ? new Date(r.dueDate).toLocaleDateString() : '—' },
            { key: '_count', label: 'Submissions', render: (r) => r._count?.submissions || 0 },
          ]}
        />
      </Card>
    </div>
  );
}
