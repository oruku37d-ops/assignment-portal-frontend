export default function Card({ children, className = '', title }) {
  return (
    <div className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm ${className}`}>
      {title && <h3 className="text-lg font-semibold mb-3 text-primary dark:text-accent">{title}</h3>}
      {children}
    </div>
  );
}
