import { Link } from "react-router";
import SearchSort from "../components/SearchSort";
import ThemeController from "../components/ThemeController";
import Sidebar from "../components/Sidebar";
import PatientsSearchBar from "../components/PatientsSearchBar";
import { keymap } from "../utils/keymap";
import { useEffect, useState } from "react";
import { Patient } from "../utils/types.ts"
import { invoke } from "@tauri-apps/api/core";

export const logCurrentTheme = (): void => {
  if (typeof window === 'undefined') return;

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  console.log(`Current theme: ${isDark ? 'dark' : 'light'}`);
};

function Patients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  keymap();

  useEffect(() => {
    async function fetchPatients() {
      try {
        const result = await invoke<Patient[]>("list_patients");
        setPatients(result);
      } catch (error) {
        console.error("Failed to fetch patients: ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPatients();
  }, []);

  const logDocumentTheme = (): void => {
    if (typeof window === 'undefined') return;

    const isDark = document.documentElement.classList.contains('dark');
    console.log(`Current theme: ${isDark ? 'dark' : 'light'}`);
  };

  const listPatients = patients.map(patient =>
    <li key={patient.id}>{patient.lastName}, {patient.firstName} {patient.middleName}</li>
  )

  return (
    <main className="w-full flex">
      <Sidebar page="patients" />
      <div className="w-full bg-slate-50 mt-5 rounded-tl-2xl border border-slate-300 dark:bg-slate-950 dark:border-slate-700 p-3">
        {loading ? (
          <p>Loading patients...</p>
        ) : patients.length === 0 ? (
          <div className="w-full flex justify-center items-center flex-col gap-3">
            <img src="/undraw_file-search_cbur.svg" alt="No Data Yet" width={300} />
            <h1 className="text-2xl text-emerald-900 font-semibold">No patients found in the database. <Link to="/patient/add" className="underline hover:text-emerald-500 transition-colors duration-100 font-bold">Add Patient</Link></h1>
          </div>
        ) : (
          <div className="w-full">
            <div className="w-full grid grid-cols-6 items-center">
              <div className="col-span-4">
                <PatientsSearchBar />
              </div>
              <div className="col-span-2">
                <SearchSort />
              </div>
            </div>
            <ul>
              {listPatients}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}

export default Patients;
