import { ChangeEvent, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import Sidebar from "../components/Sidebar";
import { inputStyle } from "../utils/style";
import { keymap } from "../utils/keymap";
import toast from "react-hot-toast";
import InputField from "../components/InputField";

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

      setSuccess(true);
      setFirstName("");
      setLastName("");
      setMiddleName("");
      setDateOfBirth("");
      setSex("F");
    } catch (error) {
      toast.error("Failed to add patient");

      setError(typeof error === "string" ? error : "Failed to add patient.");
    } finally {
      setSaving(false);
      toast.success("Patient added");
    }
  }
  return (
    <main className="w-full flex">
      <Sidebar page="new patient" />
      <div className="w-full bg-slate-50 mt-5 rounded-tl-2xl border border-slate-300 dark:bg-slate-950 dark:border-slate-700 p-3">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mt-3 gap-3 max-w-5xl mx-auto p-10 shadow-sm rounded-md bg-white">
            <h1 className="font-bold text-xl">Patient Information</h1>
            <div className="grid grid-cols-3 gap-3">
              <InputField
                label="First Name"
                type="text"
                className=""
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <InputField
                label="Last Name"
                type="text"
                className=""
                autoFocus
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <InputField
                label="Middle Name"
                type="text"
                className=""
                autoFocus
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-1">
                <label className="font-semibold">Birth Date</label>

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
                  className="p-2 rounded-md border border-slate-300 bg-slate-50 w-full outline-emerald-400  focus:outline"
                />
              </div>
              <div className="col-span-1">
                <label className="font-semibold">Sex</label>

                <select
                  className="p-2 rounded-md border border-slate-300 bg-slate-50 w-full outline-emerald-400  focus:outline"
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                >
                  <option value="F">Female</option>
                  <option value="M">Male</option>
                </select>
              </div>
            </div>
            <hr className="border-slate-400" />

            <button
              className="p-3 bg-slate-900 border-slate-700 text-white rounded-md hover:bg-slate-800 dark:bg-slate-300 dark:text-slate-950 dark:hover:bg-slate-400 transition-colors duration-300 w-3xs ms-auto"
              type="submit"
              disabled={saving}
            >
              {saving ? "Adding Patient..." : "Add Patient"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default AddPatient;
