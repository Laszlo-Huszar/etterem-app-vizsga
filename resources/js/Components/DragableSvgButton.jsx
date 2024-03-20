export default function DragableSvgButton({ className }) {
  return (
    <svg
      className={`fill-gray-600 stroke-gray-600 dark:fill-gray-400 dark:stroke-gray-400${
        className ? ' ' + className : ''
      }`}
      viewBox="0 0 12 20"
      // viewBox="0 0 32 32"
    >
      <rect x="0" y="0" width="4" height="4" />
      <rect x="8" y="0" width="4" height="4" />
      <rect x="0" y="8" width="4" height="4" />
      <rect x="8" y="8" width="4" height="4" />
      <rect x="0" y="16" width="4" height="4" />
      <rect x="8" y="16" width="4" height="4" />

      {/* <rect x="10" y="6" width="4" height="4" />
      <rect x="18" y="6" width="4" height="4" />
      <rect x="10" y="14" width="4" height="4" />
      <rect x="18" y="14" width="4" height="4" />
      <rect x="10" y="22" width="4" height="4" />
      <rect x="18" y="22" width="4" height="4" /> */}
    </svg>
  );
}
