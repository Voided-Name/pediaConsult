function PatientsSearchBar() {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 inset-s-0 flex items-center ps-3 pointer-events-none text-slate-800 dark:text-slate-200">
        <svg
          className="w-4 h-4 text-body"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      <input
        type="text"
        id="input-group-1"
        autoFocus
        className="block w-full ps-9 pe-3 py-2.5 border border-gray-400 border-default-medium text-heading text-sm rounded-base focus:ring-gray-500 focus:border-gray-500 focus:outline-hadow-xs placeholder:text-body rounded-md bg-white dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100"
        placeholder="Search patients..."
      />
    </div>
  )
}

export default PatientsSearchBar;
