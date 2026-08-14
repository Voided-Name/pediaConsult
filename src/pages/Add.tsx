import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { getLocalToday } from "../utils/date";
import EncounterNav from "../components/EncounterNav";
import SelectPatientNewEncounter from "../components/SelectPatientNewEncounter";

export type Patient = {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string | null;
  dateOfBirth: string;
  sex: string;
  created_at: string;
};

function AddPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [chosenPatientId, setChosenPatientId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const handleOnSelectPatientId = (id: number) => {
    setChosenPatientId(id);
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
    <main className="p-3">
      <EncounterNav />
      <div className="pt-3">
        {loading ? (
          <p>Loading patients...</p>
        ) : patients.length === 0 ? (
          <p>No patients found. Please add a patient first.</p>
        ) : (
          <div>
            <SelectPatientNewEncounter
              patients={patients}
              onSelectPatientId={handleOnSelectPatientId}
            />
          </div>
        )}
      </div>
    </main>
  );
}

export default AddPage;
