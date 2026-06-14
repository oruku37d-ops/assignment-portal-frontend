import { useState } from 'react';
import api from '../../api/client';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';

const TABLES = ['users', 'assignments', 'submissions', 'reports', 'activity', 'grade-history', 'lecturer-students'];

export default function DatabaseOverview() {
  const [table, setTable] = useState('users');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const load = async (t = table, p = page) => {
    setLoading(true);
    try {
      const { data: res } = await api.get(`/admin/records/${t}?page=${p}&limit=20`);
      setData(res.data);
      setTotalPages(res.totalPages);
    } finally {
      setLoading(false);
    }
  };

  const selectTable = (t) => {
    setTable(t);
    setPage(1);
    load(t, 1);
  };

  const columns = data.length
    ? Object.keys(data[0]).slice(0, 6).map((k) => ({ key: k, label: k, render: (r) => String(r[k] ?? '—').slice(0, 40) }))
    : [];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-primary dark:text-accent">Database Overview</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {TABLES.map((t) => (
          <Button key={t} variant={table === t ? 'accent' : 'ghost'} onClick={() => selectTable(t)}>{t}</Button>
        ))}
      </div>
      <Card>
        <Table loading={loading} data={data} columns={columns} />
        <div className="flex justify-between mt-4">
          <Button variant="ghost" disabled={page <= 1} onClick={() => { setPage(page - 1); load(table, page - 1); }}>Previous</Button>
          <span className="text-sm text-muted">Page {page} of {totalPages}</span>
          <Button variant="ghost" disabled={page >= totalPages} onClick={() => { setPage(page + 1); load(table, page + 1); }}>Next</Button>
        </div>
      </Card>
    </div>
  );
}
