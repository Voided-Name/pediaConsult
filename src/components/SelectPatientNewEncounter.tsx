import { useState } from "react";
import { Patient } from "../pages/Add.tsx";

type ChildProps = {
  patients: Patient[];
  onSelectPatientId: (id: number) => void;
}

function SelectPatientNewEncounter({patients, onSelectPatientId}: ChildProps) {
  const [chosenPatient, setChosenPatient] = useState("");

  const onSelectPatient = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setChosenPatient(name);

    const matchingPatient = patients.find(
      (patient) => `${patient.lastName}, ${patient.firstName} #${patient.id}` === name
    );

    if (!matchingPatient) {
      return
    }
    onSelectPatientId(matchingPatient.id);
  };

  return (
    <div>
      <div className="relative">
        <div className="absolute inset-y-0 inset-s-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-body"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <input
          list="patient-list"
          id="patient-choice"
          value={chosenPatient}
          onChange={(e) => onSelectPatient(e)}
          name="patient-choice"
          placeholder="Search patients..."
          className="block w-full ps-9 pe-3 py-2.5 border border-gray-400 border-default-medium text-heading text-sm rounded-base focus:ring-gray-500 focus:border-gray-500 focus:outline-hadow-xs placeholder:text-body rounded-md bg-white"
        />
      </div>
      <input
        id="patient-choice-id"
        type="hidden"
        name="patient-choice-id"
      />
      <datalist id="patient-list">
        {patients.map((patient) => (
          <option
            value={
              patient.lastName +
              ", " +
              patient.firstName +
              " #" +
              patient.id
            }
            data-id={patient.id}
            key={patient.id}
          ></option>
        ))}
      </datalist>
    </div>
  )
}

export default SelectPatientNewEncounter;
