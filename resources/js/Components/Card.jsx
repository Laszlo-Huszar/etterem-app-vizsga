export default function Card({ className, children }) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 sm:rounded-lg overflow-hidden${
        className ? ' ' + className : ''
      }`}
    >
      {children}
    </div>
  );
}
