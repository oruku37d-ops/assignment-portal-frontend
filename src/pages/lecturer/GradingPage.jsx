import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/client';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { useToast } from '../../components/ui/Toast';

export default function GradingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [history, setHistory] = useState([]);
  const [score, setScore] = useState('');
  const [comment, setComment] = useState('');
  const { addToast } = useToast();

  const load = () => {
    api.get(`/submissions/${id}`).then(({ data }) => {
      setSubmission(data.submission);
      setScore(data.submission.score ?? '');
      setComment(data.submission.comment ?? '');
    });
    api.get(`/submissions/${id}/history`).then(({ data }) => setHistory(data.history));
  };

  useEffect(() => { load(); }, [id]);

  const handleGrade = async () => {
    try {
      await api.patch(`/submissions/${id}/grade`, { score: Number(score) });
      addToast('Grade saved', 'success');
      load();
    } catch (err) {
      addToast(err.response?.data?.error || 'Failed', 'error');
    }
  };

  const handleComment = async () => {
    try {
      await api.patch(`/submissions/${id}/comment`, { comment });
      addToast('Comment saved', 'success');
    } catch (err) {
      addToast(err.response?.data?.error || 'Failed', 'error');
    }
  };

  if (!submission) return <div className="animate-pulse h-40 bg-gray-200 dark:bg-gray-700 rounded-xl" />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-2xl font-bold text-primary dark:text-accent">Grade Submission</h2>
        <Card title={submission.assignment?.title}>
          <div className="space-y-2 text-sm">
            <p><strong>Student:</strong> {submission.student?.name}</p>
            <p><strong>Status:</strong> <Badge status={submission.status}>{submission.status}</Badge></p>
            <p><strong>Submitted:</strong> {new Date(submission.submittedAt).toLocaleString()}</p>
            <a href={submission.fileUrl} target="_blank" rel="noreferrer" className="text-accent underline">View submitted file</a>
          </div>
        </Card>
        <Card title="Grade">
          <div className="flex gap-3 items-end">
            <Input label="Score (0-100)" type="number" min="0" max="100" value={score} onChange={(e) => setScore(e.target.value)} className="flex-1" />
            <Button onClick={handleGrade}>Save Grade</Button>
          </div>
        </Card>
        <Card title="Comment">
          <textarea className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 mb-3" rows={4} value={comment} onChange={(e) => setComment(e.target.value)} />
          <Button onClick={handleComment}>Save Comment</Button>
        </Card>
        <Button variant="ghost" onClick={() => navigate('/lecturer/submissions')}>Back</Button>
      </div>
      <Card title="Grade History">
        <div className="space-y-3">
          {history.map((h) => (
            <div key={h.id} className="text-sm border-b border-gray-100 dark:border-gray-800 pb-2">
              <p>{h.previousGrade || '—'} → <strong>{h.newGrade}</strong> ({h.previousScore ?? '—'} → {h.newScore})</p>
              <p className="text-muted">{h.changedBy?.name} · {new Date(h.changedAt).toLocaleString()}</p>
            </div>
          ))}
          {!history.length && <p className="text-muted text-sm">No re-grades yet</p>}
        </div>
      </Card>
    </div>
  );
}
