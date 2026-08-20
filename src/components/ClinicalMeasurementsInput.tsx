import InputField from "./InputField";

type ChildProps = {
  onBlurWeight: () => Promise<void>;
  onBlurHeightOrLength: () => Promise<void>;
  onWeightInput: (weight: number) => void;
  onHeightOrLengthInput: (height: number) => void;
  onSystolicInput: (systolic: number) => void;
  onDiastolicInput: (diastolic: number) => void;
  onHeartRateInput: (heartRate: number) => void;
  onRespiratoryRateInput: (respiratoryRate: number) => void;
  onTempInput: (temp: number) => void;
  weightScore: number | null;
  heightOrLengthScore: number | null;
  ageInDays: number | null;
};
function ClinicalMeasurementsInput({
  onBlurWeight,
  onBlurHeightOrLength,
  onWeightInput,
  onHeightOrLengthInput,
  onSystolicInput,
  onDiastolicInput,
  onHeartRateInput,
  onRespiratoryRateInput,
  onTempInput,
  weightScore,
  heightOrLengthScore,
  ageInDays,
}: ChildProps) {
  return (
    <div className="bg-white rounded-md p-10 flex-col flex">
      <h1 className="font-bold text-xl mb-2">Clinical Measurements</h1>
      <div className="grid grid-cols-4 gap-3">
        <InputField
          label="Weight (kg)"
          type="number"
          className=""
          onBlur={() => onBlurWeight()}
          onChange={(e) => onWeightInput(Number(e.target.value))}
        />
        <InputField
          label="Z-Score"
          type="number"
          className=""
          value={weightScore ? weightScore.toFixed(3) : ""}
          disabled
        />
        <InputField
          label={
            ageInDays ? (ageInDays < 731 ? "Length (cm)" : "Height (cm)") : ""
          }
          type="number"
          className=""
          onBlur={() => onBlurHeightOrLength()}
          onChange={(e) => onHeightOrLengthInput(Number(e.target.value))}
        />
        <InputField
          label="Z-Score"
          type="number"
          className=""
          value={heightOrLengthScore ? heightOrLengthScore.toFixed(3) : ""}
          disabled
        />
        <InputField
          label="Heart Rate"
          type="number"
          className=""
          onChange={(e) => onHeartRateInput(Number(e.target.value))}
        />
        <InputField
          label="Respiratory Rate"
          type="number"
          className=""
          onChange={(e) => onRespiratoryRateInput(Number(e.target.value))}
        />
        <InputField
          label="Temperature"
          type="number"
          className=""
          onChange={(e) => onTempInput(Number(e.target.value))}
        />
        <div className="col-span-1">
          <label className="font-semibold">Blood Pressure</label>

          <div className="flex gap-2">
            <input
              type="number"
              onChange={(e) => onSystolicInput(Number(e.target.value))}
              className="p-2 rounded-md border border-slate-300 bg-slate-50 w-full outline-emerald-400  focus:outline"
              placeholder="Systolic"
            />
            <input
              type="number"
              onChange={(e) => onDiastolicInput(Number(e.target.value))}
              className="p-2 rounded-md border border-slate-300 bg-slate-50 w-full outline-emerald-400  focus:outline"
              placeholder="Diastolic"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClinicalMeasurementsInput;
