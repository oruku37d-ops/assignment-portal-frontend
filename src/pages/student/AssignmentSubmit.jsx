import { useEffect, useState } from 'react';
import api from '../../api/client';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';

export default function AssignmentSubmit() {
  const [assignments, setAssignments] = useState([]);
  const [assignmentId, setAssignmentId] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    api.get('/assignments').then(({ data }) => setAssignments(data.assignments));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return addToast('Please select a file', 'error');

    const formData = new FormData();
    formData.append('file', file);
    if (title) formData.append('title', title);

    try {
      await api.post(`/assignments/${assignmentId}/submit`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      addToast('Submission uploaded', 'success');
      setFile(null);
      setTitle('');
    } catch (err) {
      addToast(err.response?.data?.error || 'Upload failed', 'error');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-primary dark:text-accent">Submit Assignment</h2>
      <Card className="max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block space-y-1">
            <span className="text-sm font-medium">Assignment</span>
            <select className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" value={assignmentId} onChange={(e) => setAssignmentId(e.target.value)} required>
              <option value="">Select assignment</option>
              {assignments.map((a) => <option key={a.id} value={a.id}>{a.title} ({a.module})</option>)}
            </select>
          </label>
          <Input label="Title / Reference (optional)" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label className="block space-y-1">
            <span className="text-sm font-medium">File (PDF, DOCX, images — max 10MB)</span>
            <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp" onChange={(e) => setFile(e.target.files[0])} className="w-full text-sm" required />
          </label>
          <Button type="submit">Upload Submission</Button>
        </form>
      </Card>
    </div>
  );
}
