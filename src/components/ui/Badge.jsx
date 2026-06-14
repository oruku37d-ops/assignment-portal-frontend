const colors = {
  PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  GRADED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  OPEN: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  RESOLVED: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  ADMIN: 'bg-purple-100 text-purple-800',
  LECTURER: 'bg-indigo-100 text-indigo-800',
  STUDENT: 'bg-teal-100 text-teal-800',
};

export default function Badge({ status, children }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
      {children || status}
    </span>
  );
}
