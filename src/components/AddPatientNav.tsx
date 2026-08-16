import { Link } from "react-router";

function AddPatientNav() {
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
            <p className="ps-2">Search Visits</p>
          </div>
        </button>
      </Link>
      <Link to="/encounter/add" className="col-span-1">
        <button className="bg-slate-200 text-slate-950 p-2 rounded-sm w-full hover:bg-slate-300 transition-colors duration-150 ease-in-out">
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
              className="lucide lucide-file-plus-corner-icon lucide-file-plus-corner"
            >
              <path d="M11.35 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5.35" />
              <path d="M14 2v5a1 1 0 0 0 1 1h5" />
              <path d="M14 19h6" />
              <path d="M17 16v6" />
            </svg>
            <p className="ps-2">Add Encounter</p>
          </div>
        </button>
      </Link>
    </div>
  );
}

export default AddPatientNav;
