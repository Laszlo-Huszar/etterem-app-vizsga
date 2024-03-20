export default function ResponsiveNavigationButton({
  showingNavigationDropdown,
  setShowingNavigationDropdown,
}) {
  return (
    <div className="-me-2 flex items-center sm:hidden">
      <button
        onClick={() =>
          setShowingNavigationDropdown(previousState => !previousState)
        }
        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
      >
        <svg
          className="h-6 w-6"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
