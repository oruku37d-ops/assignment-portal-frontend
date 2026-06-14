import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import useSocket from '../../hooks/useSocket';

export default function StudentDashboard() {
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  const load = () => {
    api.get('/assignments').then(({ data }) => setAssignments(data.assignments));
    api.get('/submissions').then(({ data }) => setSubmissions(data.submissions));
  };

  useEffect(() => { load(); }, []);

  useSocket({
    'submission:graded': () => load(),
    'report:resolved': () => load(),
  });

  const recentGrades = submissions.filter((s) => s.status === 'GRADED').slice(0, 5);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-primary dark:text-accent">Student Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Upcoming Assignments">
          <div className="space-y-2">
            {assignments.slice(0, 5).map((a) => (
              <div key={a.id} className="flex justify-between text-sm">
                <span>{a.title}</span>
                <span className="text-muted">{a.dueDate ? new Date(a.dueDate).toLocaleDateString() : 'No due date'}</span>
              </div>
            ))}
          </div>
          <Link to="/student/submit" className="mt-4 inline-block"><Button>Submit Work</Button></Link>
        </Card>
        <Card title="Recent Grades">
          <div className="space-y-2">
            {recentGrades.map((s) => (
              <div key={s.id} className="flex justify-between text-sm">
                <span>{s.assignment?.title}</span>
                <Badge status="GRADED">{s.grade} ({s.score})</Badge>
              </div>
            ))}
            {!recentGrades.length && <p className="text-muted text-sm">No grades yet</p>}
          </div>
        </Card>
      </div>
    </div>
  );
}
