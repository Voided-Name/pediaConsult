import { Link } from "react-router";
import SearchBar from "../components/SearchBar";
import SearchSort from "../components/SearchSort";

function Index() {
  return (
    <main className="w-full">
      <div className="w-full grid grid-cols-6 p-3 items-center">
        <div className="col-span-4">
          <SearchBar />
        </div>
        <div className="col-span-1">
          <SearchSort />
        </div>
        <div className="col-span-1">
          <Link to="/encounter/add">
            <button
              type="button"
              className="bg-emerald-700 text-white p-2 rounded-sm w-full hover:bg-emerald-600 transition-colors duration-150 ease-in-out"
            >
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
                  className="lucide lucide-plus-icon lucide-plus"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                <p className="ps-2">New <span className="hidden lg:inline">Encounter</span></p>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Index;
