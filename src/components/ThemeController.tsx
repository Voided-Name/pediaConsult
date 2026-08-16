import { useState } from "react";
import { logCurrentTheme } from "../pages/Index";

function ThemeController() {
  const [dark, setDark] = useState(
    document.documentElement.classList.contains("dark"),
  );

  const toggleTheme = () => {
    if (typeof window === "undefined") return;

    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      console.log("switching to light!");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }

    setDark(!isDark);
    logCurrentTheme();
  };

  return (
    <button
      className="p-1 shadow-sm rounded-md bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-700 text-emerald-600 dark:text-emerald-500 transtion-colors duration-300 cursor-pointer"
      onClick={() => toggleTheme()}
    >
      {dark ? (
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
          className="lucide lucide-sun-icon lucide-sun"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      ) : (
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
          className="lucide lucide-moon-icon lucide-moon"
        >
          <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
        </svg>
      )}
    </button>
  );
}

export default ThemeController;
