import type { Patient } from "../utils/types";
import { Age } from "../utils/date";
import AgeDisplay from "./AgeDisplay";

type ChildProps = {
  chosenPatient: Patient;
  patientAge: Age | null;
  ageInDays: number | null;
};

function PatientDisplay({ chosenPatient, patientAge, ageInDays }: ChildProps) {
  return (
    <div>
      <div className="bg-white rounded-md p-3 my-3">
        <h1 className="font-bold text-xl underline">Basic Information</h1>
        <p className="font-medium text-lg mt-2 flex gap-1">
          {chosenPatient.lastName}, {chosenPatient.firstName}{" "}
          {chosenPatient.middleName}
          {chosenPatient.sex === "M" ? (
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
              className="lucide lucide-mars-icon lucide-mars text-blue-500"
            >
              <path d="M16 3h5v5" />
              <path d="m21 3-6.75 6.75" />
              <circle cx="10" cy="14" r="6" />
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
              className="lucide lucide-venus-icon lucide-venus text-pink-500"
            >
              <path d="M12 15v7" />
              <path d="M9 19h6" />
              <circle cx="12" cy="9" r="6" />
            </svg>
          )}
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
          {patientAge && ageInDays !== null ? (
            <AgeDisplay age={patientAge} ageDays={ageInDays} />
          ) : (
            ""
          )}
        </p>
      </div>
    </div>
  );
}

export default PatientDisplay;
