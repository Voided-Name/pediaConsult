import { Link } from "react-router";
import SearchBar from "../components/SearchBar";
import SearchSort from "../components/SearchSort";
import ThemeController from "../components/ThemeController";
import Sidebar from "../components/Sidebar";
import { keymap } from "../utils/keymap";

export const logCurrentTheme = (): void => {
  if (typeof window === "undefined") return;

  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  console.log(`Current theme: ${isDark ? "dark" : "light"}`);
};

function Index() {
  keymap();

  const logDocumentTheme = (): void => {
    if (typeof window === "undefined") return;

    const isDark = document.documentElement.classList.contains("dark");
    console.log(`Current theme: ${isDark ? "dark" : "light"}`);
  };

  return (
    <main>
      <Sidebar page="visits" />
      <div className="w-full bg-slate-50 mt-5 rounded-tl-2xl border border-slate-300 dark:bg-slate-950 dark:border-slate-700">
        <div className="w-full grid grid-cols-6 p-3 items-center">
          <div className="col-span-4">
            <SearchBar />
          </div>
          <div className="col-span-2">
            <SearchSort />
          </div>
        </div>
        <div className="w-full flex justify-center items-center flex-col gap-3">
          <img
            src="/undraw_file-search_cbur.svg"
            alt="No Data Yet"
            width={300}
          />
          <h1 className="text-2xl text-emerald-900 font-semibold">
            No visits found in the database.{" "}
            <Link
              to="/encounter/add"
              className="underline hover:text-emerald-500 transition-colors duration-100 font-bold"
            >
              Add Visit
            </Link>
          </h1>
        </div>
      </div>
    </main>
  );
}

export default Index;
