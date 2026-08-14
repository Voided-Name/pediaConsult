import { ChangeEvent, useState } from "react";
import { Link } from "react-router";
import { invoke } from "@tauri-apps/api/core";

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
        }
      });

      console.log("Patient created: ", patient)

      setSuccess(true);
      setFirstName("");
      setLastName("");
      setMiddleName("");
      setDateOfBirth("");
      setSex("Female");
    } catch (error) {
      console.error("Failed to add patient", error);

      setError(
        typeof error === "string" ? error : "Failed to add patient."
      );
    } finally {
      setSaving(false);
    }
  }
  return (
    <main className="p-3">
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
              <p className="ps-2">Search Encounters</p>
            </div>
          </button>
        </Link>
        <Link to="/" className="col-span-1">
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
                className="lucide lucide-book-search-icon lucide-book-search"
              >
                <path d="M11 22H5.5a1 1 0 0 1 0-5h4.501" />
                <path d="m21 22-1.879-1.878" />
                <path d="M3 19.5v-15A2.5 2.5 0 0 1 5.5 2H18a1 1 0 0 1 1 1v8" />
                <circle cx="17" cy="18" r="3" />
              </svg>
              <p className="ps-2">Add Encounter</p>
            </div>
          </button>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mt-3 gap-3">
          <input
            className="p-2 rounded-md border border-slate-400 bg-white"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            className="p-2 rounded-md border border-slate-400 bg-white"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            className="p-2 rounded-md border border-slate-400 bg-white"
            type="text"
            placeholder="Middle Name"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
          <input
            className="p-2 rounded-md border border-slate-400 bg-white"
            type="date"
            placeholder="Birth Date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
          <select
            className="p-2 rounded-md border border-slate-400 bg-white"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
          >
            <option value="F">Female</option>
            <option value="M">Male</option>
          </select>

          {error && (
            <p className="text-red-600">{error}</p>
          )}

          {success && (
            <p className="text-emerald-700">Patient Added Succesfully.</p>
          )}
          <button className="p-3 bg-slate-900 border-slate-700 text-white rounded-md hover:bg-slate-800" type="submit" disabled={saving}>{saving ? "Adding Patient..." : "New Patient"}</button>
        </div>
      </form>
    </main>
  );
}

export default AddPatient;
