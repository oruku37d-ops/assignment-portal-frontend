import { useEffect, useState } from 'react';
import api from '../../api/client';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';
import useSocket from '../../hooks/useSocket';

export default function StudentReportsPage() {
  const [reports, setReports] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [form, setForm] = useState({ submissionId: '', message: '', requestResubmission: false });
  const { addToast } = useToast();

  const load = () => {
    api.get('/reports').then(({ data }) => setReports(data.reports));
    api.get('/submissions').then(({ data }) => setSubmissions(data.submissions.filter((s) => s.status === 'GRADED')));
  };

  useEffect(() => { load(); }, []);
  useSocket({ 'report:resolved': () => load() });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/reports/create', form);
      addToast('Report submitted', 'success');
      setForm({ submissionId: '', message: '', requestResubmission: false });
      load();
    } catch (err) {
      addToast(err.response?.data?.error || 'Failed', 'error');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-primary dark:text-accent">Grade Reports</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="File a Dispute">
          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block space-y-1">
              <span className="text-sm font-medium">Graded Submission</span>
              <select className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" value={form.submissionId} onChange={(e) => setForm({ ...form, submissionId: e.target.value })} required>
                <option value="">Select submission</option>
                {submissions.map((s) => <option key={s.id} value={s.id}>{s.assignment?.title} — {s.grade}</option>)}
              </select>
            </label>
            <textarea className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Explain your concern..." required />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.requestResubmission} onChange={(e) => setForm({ ...form, requestResubmission: e.target.checked })} />
              Request resubmission
            </label>
            <Button type="submit">Submit Report</Button>
          </form>
        </Card>
        <Card title="My Reports">
          <div className="space-y-3">
            {reports.map((r) => (
              <div key={r.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex justify-between">
                  <span className="font-medium">{r.submission?.assignment?.title}</span>
                  <Badge status={r.status}>{r.status}</Badge>
                </div>
                <p className="text-sm mt-1">{r.message}</p>
                {r.lecturerResponse && <p className="text-sm mt-2 text-accent">Response: {r.lecturerResponse}</p>}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
