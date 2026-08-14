import { Link } from "react-router";

function EncounterNav() {
  return (
    <div className="grid grid-cols-4 gap-3">
      <Link to="/" className="col-span-1">
        <button className="bg-emerald-700 text-white p-2 rounded-sm w-full hover:bg-emerald-600 transition-colors duration-150 ease-in-out">
          <div className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-book-search-icon lucide-book-search"
            >
              <path d="M11 22H5.5a1 1 0 0 1 0-5h4.501" />
              <path d="m21 22-1.879-1.878" />
              <path d="M3 19.5v-15A2.5 2.5 0 0 1 5.5 2H18a1 1 0 0 1 1 1v8" />
              <circle cx="17" cy="18" r="3" />
            </svg>
            <p className="ps-2">Search Encounters</p>
          </div>
        </button>
      </Link>
      <Link to="/patient/add" className="col-span-1">
        <button className="bg-slate-700 text-white p-2 rounded-sm w-full hover:bg-slate-600 transition-colors duration-150 ease-in-out">
          <div className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-book-search-icon lucide-book-search"
            >
              <path d="M11 22H5.5a1 1 0 0 1 0-5h4.501" />
              <path d="m21 22-1.879-1.878" />
              <path d="M3 19.5v-15A2.5 2.5 0 0 1 5.5 2H18a1 1 0 0 1 1 1v8" />
              <circle cx="17" cy="18" r="3" />
            </svg>
            <p className="ps-2">Add Patient</p>
          </div>
        </button>
      </Link>
    </div>
  )
}

export default EncounterNav;
