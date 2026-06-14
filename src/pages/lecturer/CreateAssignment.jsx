import { useState } from 'react';
import api from '../../api/client';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';

export default function CreateAssignment() {
  const [form, setForm] = useState({ title: '', description: '', module: '', dueDate: '' });
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/assignments/create', { ...form, dueDate: form.dueDate || null });
      addToast('Assignment created', 'success');
      setForm({ title: '', description: '', module: '', dueDate: '' });
    } catch (err) {
      addToast(err.response?.data?.error || 'Failed', 'error');
    }
  };

  return (
    <Card title="Create Assignment">
      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
        <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <Input label="Module" value={form.module} onChange={(e) => setForm({ ...form, module: e.target.value })} required />
        <Input label="Due Date" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
        <label className="block space-y-1">
          <span className="text-sm font-medium">Description</span>
          <textarea className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </label>
        <Button type="submit">Create</Button>
      </form>
    </Card>
  );
}
