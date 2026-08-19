import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { calculateAge, calculateAgeInDays } from "../utils/date";
import { Age } from "../utils/date";
import Sidebar from "../components/Sidebar";
import { keymap } from "../utils/keymap";
import { Patient } from "../utils/types.ts";
import { usePatients } from "../hooks/fetchPatients.ts";
import PatientSearchDisplay from "../components/PatientSearchDisplay.tsx";
import PatientDisplay from "../components/PatientDisplay.tsx";
import InformantInfoInput from "../components/InformantInfoInput.tsx";
import ClinicalMeasurementsInput from "../components/ClinicalMeasurementsInput.tsx";

function AddPage() {
  const { patients, loading, refetch } = usePatients();
  const [chosenPatient, setChosenPatient] = useState<Patient | null>(null);
  const [chosenPatientId, setChosenPatientId] = useState<number | null>(null);
  const [ageInDays, setAgeInDays] = useState<number | null>(null);
  const [patientAge, setPatientAge] = useState<Age | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [weightScore, setWeightScore] = useState<number | null>(null);
  const [heightOrLength, setHeightOrLength] = useState<number | null>(null);
  const [heightOrLengthScore, setHeightOrLengthScore] = useState<number | null>(
    null,
  );
  const [systolic, setSystolic] = useState<number | null>(null);
  const [diastolic, setDiastolic] = useState<number | null>(null);
  const [heartRate, setHeartRate] = useState<number | null>(null);
  const [respiratoryRate, setRespiratoryRate] = useState<number | null>(null);
  const [temp, setTemp] = useState<number | null>(null);

  keymap();

  async function onBlurHeightOrLength() {
    if (!heightOrLength) {
      return;
    }

    if (!chosenPatient) {
      return;
    }

    try {
      const z_score = await invoke<number>("get_z_score", {
        indicator: "HFA",
        xVariable: ageInDays,
        value: heightOrLength,
        sex: chosenPatient.sex,
      });

      console.log(chosenPatient);

      setHeightOrLengthScore(z_score);
      console.log(z_score);
      console.debug(z_score);
    } catch (error) {
      console.log("Failed to fetch z_score: " + error);
    }
  }

  async function onBlurWeight() {
    if (!weight) {
      return;
    }

    if (!chosenPatient) {
      return;
    }

    try {
      const z_score = await invoke<number>("get_z_score", {
        indicator: "WFA",
        xVariable: ageInDays,
        value: weight,
        sex: chosenPatient.sex,
      });

      console.log(chosenPatient);

      setWeightScore(z_score);
      console.log(z_score);
      console.debug(z_score);
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

  return (
    <main className="w-full flex">
      <Sidebar page="new visit" />
      <div className="w-full bg-slate-50 mt-5 rounded-tl-2xl border border-slate-300 dark:bg-slate-950 dark:border-slate-700">
        <div className="p-3">
          <PatientSearchDisplay
            loading={loading}
            patients={patients}
            onSelectPatientId={handleOnSelectPatientId}
          />
          {chosenPatient ? (
            <>
              <PatientDisplay
                chosenPatient={chosenPatient}
                patientAge={patientAge}
                ageInDays={ageInDays}
              />
              <InformantInfoInput />
              <ClinicalMeasurementsInput
                onBlurWeight={onBlurWeight}
                onBlurHeightOrLength={onBlurHeightOrLength}
                onWeightInput={(value: number) => setWeight(value)}
                onHeightOrLengthInput={(value: number) =>
                  setHeightOrLength(value)
                }
                onSystolicInput={(value: number) => setSystolic(value)}
                onDiastolicInput={(value: number) => setDiastolic(value)}
                onHeartRateInput={(value: number) => setHeartRate(value)}
                onRespiratoryRateInput={(value: number) =>
                  setRespiratoryRate(value)
                }
                onTempInput={(value: number) => setTemp(value)}
                weightScore={weightScore}
                heightOrLengthScore={heightOrLengthScore}
                ageInDays={ageInDays}
              />
            </>
          ) : null}
        </div>
      </div>
    </main>
  );
}

export default AddPage;
