import { useEffect, useState } from 'react';
import api from '../../api/client';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';

export default function LecturerReportsPage() {
  const [reports, setReports] = useState([]);
  const [selected, setSelected] = useState(null);
  const [response, setResponse] = useState('');
  const [adjustScore, setAdjustScore] = useState('');
  const { addToast } = useToast();

  const load = () => api.get('/reports').then(({ data }) => setReports(data.reports));

  useEffect(() => { load(); }, []);

  const handleRespond = async () => {
    try {
      await api.patch(`/reports/${selected.id}/respond`, {
        lecturerResponse: response,
        adjustScore: adjustScore ? Number(adjustScore) : null,
      });
      addToast('Report resolved', 'success');
      setSelected(null);
      setResponse('');
      setAdjustScore('');
      load();
    } catch (err) {
      addToast(err.response?.data?.error || 'Failed', 'error');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-primary dark:text-accent">Grade Disputes</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Open Reports">
          <div className="space-y-3">
            {reports.filter((r) => r.status === 'OPEN').map((r) => (
              <div key={r.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800" onClick={() => setSelected(r)}>
                <p className="font-medium">{r.student?.name} — {r.submission?.assignment?.title}</p>
                <p className="text-sm text-muted mt-1">{r.message.slice(0, 80)}...</p>
              </div>
            ))}
            {!reports.filter((r) => r.status === 'OPEN').length && <p className="text-muted">No open reports</p>}
          </div>
        </Card>
        {selected && (
          <Card title="Respond">
            <p className="mb-3 text-sm">{selected.message}</p>
            <textarea className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 mb-3" rows={4} value={response} onChange={(e) => setResponse(e.target.value)} placeholder="Your response..." />
            <Input label="Adjust score (optional)" type="number" min="0" max="100" value={adjustScore} onChange={(e) => setAdjustScore(e.target.value)} className="mb-3" />
            <Button onClick={handleRespond}>Resolve Report</Button>
          </Card>
        )}
      </div>
    </div>
  );
}
