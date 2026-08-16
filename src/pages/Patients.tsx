import { Link } from "react-router";
import SearchSort from "../components/SearchSort";
import ThemeController from "../components/ThemeController";
import Sidebar from "../components/Sidebar";
import PatientsSearchBar from "../components/PatientsSearchBar";
import { keymap } from "../utils/keymap";

export const logCurrentTheme = (): void => {
  if (typeof window === 'undefined') return;

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  console.log(`Current theme: ${isDark ? 'dark' : 'light'}`);
};

function Patients() {
  keymap();

  const logDocumentTheme = (): void => {
    if (typeof window === 'undefined') return;

    const isDark = document.documentElement.classList.contains('dark');
    console.log(`Current theme: ${isDark ? 'dark' : 'light'}`);
  };

  return (
    <main className="w-full flex">
      <Sidebar page="patients" />
      <div className="w-full bg-slate-50 mt-5 rounded-tl-2xl border border-slate-300 dark:bg-slate-950 dark:border-slate-700">
        <div className="w-full grid grid-cols-6 p-3 items-center">
          <div className="col-span-4">
            <PatientsSearchBar />
          </div>
          <div className="col-span-2">
            <SearchSort />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Patients;
