import { ChangeEvent, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import AddPatientNav from "../components/AddPatientNav";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import Sidebar from "../components/Sidebar";
import { inputStyle } from "../utils/style";
import { keymap } from "../utils/keymap";

type Patient = {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string | null;
  dateOfBirth: string;
  sex: string;
  created_at: string;
};

function AddPatient() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [sex, setSex] = useState("F");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  keymap();

  async function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const patient = await invoke<Patient>("create_patient", {
        patient: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          middleName,
          dateOfBirth,
          sex,
        },
      });

      console.log("Patient created: ", patient);

      setSuccess(true);
      setFirstName("");
      setLastName("");
      setMiddleName("");
      setDateOfBirth("");
      setSex("Female");
    } catch (error) {
      console.error("Failed to add patient", error);

      setError(typeof error === "string" ? error : "Failed to add patient.");
    } finally {
      setSaving(false);
    }
  }
  return (
    <main className="w-full flex">
      <Sidebar page="new patient" />
      <div className="w-full bg-slate-50 mt-5 rounded-tl-2xl border border-slate-300 dark:bg-slate-950 dark:border-slate-700 p-3">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mt-3 gap-3">
            <input
              className={inputStyle()}
              autoFocus
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              className={inputStyle()}
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              className={inputStyle()}
              type="text"
              placeholder="Middle Name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
            <Flatpickr
              value={dateOfBirth}
              options={{
                dateFormat: "Y-m-d", // Format sent/stored under the hood
                altInput: true, // Replaces input with a user-friendly display field
                altFormat: "F j, Y", // Visual display format (e.g., DD/MM/YYYY)
                allowInput: true, // Allows manual typing
              }}
              onChange={(selectedDates, dateStr) => {
                setDateOfBirth(dateStr);
              }}
              placeholder="Birth Date"
              className={inputStyle()}
            />
            <select
              className={inputStyle()}
              value={sex}
              onChange={(e) => setSex(e.target.value)}
            >
              <option value="F">Female</option>
              <option value="M">Male</option>
            </select>

            {error && <p className="text-red-600">{error}</p>}

            {success && (
              <p className="text-emerald-700">Patient Added Succesfully.</p>
            )}
            <button
              className="p-3 bg-slate-900 border-slate-700 text-white rounded-md hover:bg-slate-800 dark:bg-slate-300 dark:text-slate-950 dark:hover:bg-slate-400 transition-colors duration-300"
              type="submit"
              disabled={saving}
            >
              {saving ? "Adding Patient..." : "New Patient"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default AddPatient;
