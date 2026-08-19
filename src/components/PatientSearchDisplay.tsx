import { Link } from "react-router";
import type { Patient } from "../utils/types";
import SelectPatientNewEncounter from "./SelectPatientNewEncounter";

type ChildProps = {
  loading: boolean;
  patients: Patient[];
  onSelectPatientId: (id: number) => void;
};

function PatientSearchDisplay({
  loading,
  patients,
  onSelectPatientId,
}: ChildProps) {
  if (loading) {
    return <p>Loading patients...</p>;
  } else if (patients.length === 0) {
    return (
      <div className="w-full flex justify-center items-center flex-col gap-3">
        <img src="/undraw_file-search_cbur.svg" alt="No Data Yet" width={300} />
        <h1 className="text-2xl text-emerald-900 font-semibold">
          No patients found in the database.{" "}
          <Link
            to="/patient/add"
            className="underline hover:text-emerald-500 transition-colors duration-100 font-bold"
          >
            Add Patient
          </Link>
        </h1>
      </div>
    );
  } else {
    return (
      <div>
        <SelectPatientNewEncounter
          patients={patients}
          onSelectPatientId={onSelectPatientId}
        />
      </div>
    );
  }
}

export default PatientSearchDisplay;
