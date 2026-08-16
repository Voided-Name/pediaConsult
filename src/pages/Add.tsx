import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { calculateAge, calculateAgeInDays, getLocalToday } from "../utils/date";
import EncounterNav from "../components/EncounterNav";
import SelectPatientNewEncounter from "../components/SelectPatientNewEncounter";
import { Age } from "../utils/date";
import AgeDisplay from "../components/AgeDisplay";
import Sidebar from "../components/Sidebar";
import { keymap } from "../utils/keymap";
import { Link } from "react-router";

export type Patient = {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string | null;
  dateOfBirth: string;
  sex: string;
  created_at: string;
};

export type Measure = {
  l_value: number;
  m_value: number;
  s_value: number;
};

function AddPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [chosenPatient, setChosenPatient] = useState<Patient | null>(null);
  const [chosenPatientId, setChosenPatientId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [ageInDays, setAgeInDays] = useState<number | null>(null);
  const [patientAge, setPatientAge] = useState<Age | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [weightScore, setWeightScore] = useState<number | null>(null);

  keymap();

  async function onBlurWeight() {
    if (!weight) {
      return;
    }

    try {
      const z_score = await invoke<number>("get_z_score", {
        indicator: "WFA",
        ageDays: ageInDays,
        value: weight,
      });

      setWeightScore(z_score);
    } catch (error) {
      console.log("Failed to fetch z_score: " + error);
    }
  }

  const handleOnSelectPatientId = (id: number) => {
    setChosenPatientId(id);

    let patient = patients.find((patient) => patient.id === id);

    if (!patient) {
      return;
    }

    setChosenPatient(patient);
    let ageDays = calculateAgeInDays(patient.dateOfBirth);
    setAgeInDays(ageDays);
    setPatientAge(calculateAge(patient.dateOfBirth));
  };

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

  return (
    <main className="w-full flex">
      <Sidebar page="new visit" />
      <div className="w-full bg-slate-50 mt-5 rounded-tl-2xl border border-slate-300 dark:bg-slate-950 dark:border-slate-700">
        <div className="p-3">
          {loading ? (
            <p>Loading patients...</p>
          ) : patients.length === 0 ? (
            <div className="w-full flex justify-center items-center flex-col gap-3">
              <img src="/undraw_file-search_cbur.svg" alt="No Data Yet" width={300} />
              <h1 className="text-2xl text-emerald-900 font-semibold">No patients found in the database. <Link to="/patient/add" className="underline hover:text-emerald-500 transition-colors duration-100 font-bold">Add Patient</Link></h1>
            </div>
          ) : (
            <div>
              <SelectPatientNewEncounter
                patients={patients}
                onSelectPatientId={handleOnSelectPatientId}
              />
            </div>
          )}
          {chosenPatientId && chosenPatient ? (
            <div>
              <div className="bg-white rounded-md p-3 my-3">
                <h1 className="font-bold text-xl underline">Basic Information</h1>
                <p className="font-medium text-lg mt-2">
                  {chosenPatient.lastName}, {chosenPatient.firstName}{" "}
                  {chosenPatient.middleName}
                </p>
                <p className="flex gap-2 text-gray-700">
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
                    className="lucide lucide-cake-icon lucide-cake"
                  >
                    <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
                    <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
                    <path d="M2 21h20" />
                    <path d="M7 8v3" />
                    <path d="M12 8v3" />
                    <path d="M17 8v3" />
                    <path d="M7 4h.01" />
                    <path d="M12 4h.01" />
                    <path d="M17 4h.01" />
                  </svg>
                  {chosenPatient.dateOfBirth}
                </p>
                <p className="flex gap-2 text-gray-700">
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
                    className="lucide lucide-calendar-days-icon lucide-calendar-days"
                  >
                    <path d="M8 2v3" />
                    <path d="M16 2v3" />
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M8 13h.01" />
                    <path d="M12 13h.01" />
                    <path d="M16 13h.01" />
                    <path d="M8 17h.01" />
                    <path d="M12 17h.01" />
                    <path d="M16 17h.01" />
                  </svg>
                  {patientAge && ageInDays ? (
                    <AgeDisplay age={patientAge} ageDays={ageInDays} />
                  ) : (
                    ""
                  )}
                </p>
              </div>
              <div className="bg-white rounded-md p-3 my-3">
                <h1 className="font-bold text-xl underline mb-2">
                  Clinical Measurements
                </h1>
                <label>Weight(kg): </label>
                <input
                  onBlur={() => onBlurWeight()}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  type="number"
                  className="p-2 rounded-md border border-slate-400 bg-white w-30"
                ></input>
                {weightScore ? <p>Z-Score: {weightScore}</p> : ""}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </main>
  );
}

export default AddPage;
