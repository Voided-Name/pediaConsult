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
    <div className="bg-white rounded-md p-3 my-3">
      <h1 className="font-bold text-xl underline mb-2">
        Clinical Measurements
      </h1>
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <label className="inline-block min-w-24">Weight(kg): </label>
          <input
            onBlur={() => onBlurWeight()}
            onChange={(e) => onWeightInput(Number(e.target.value))}
            type="number"
            className="p-2 rounded-md border border-slate-400 bg-white w-30"
          ></input>
          {weightScore ? (
            <p className="ms-2">
              <span>Z-Score: </span>
              <span className="p-2">{weightScore.toFixed(3)}</span>
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="flex items-center">
          <label className="inline-block min-w-24">
            {ageInDays ? (ageInDays < 731 ? "Length(cm):" : "Height(cm):") : ""}
          </label>
          <input
            onBlur={() => onBlurHeightOrLength()}
            onChange={(e) => onHeightOrLengthInput(Number(e.target.value))}
            type="number"
            className="p-2 rounded-md border border-slate-400 bg-white w-30"
          ></input>
          {heightOrLengthScore ? (
            <p className="ms-2">
              <span>Z-Score: </span>
              <span className="p-2">{heightOrLengthScore.toFixed(3)}</span>
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="col-span-1">
          <label className="inline-block min-w-24">BP:</label>
          <input
            onChange={(e) => onSystolicInput(Number(e.target.value))}
            type="number"
            className="p-2 rounded-md border border-slate-400 bg-white w-15"
          ></input>
          <input
            onChange={(e) => onDiastolicInput(Number(e.target.value))}
            type="number"
            className="p-2 rounded-md border border-slate-400 bg-white w-15"
          ></input>
        </div>
        <div className="col-span-1">
          <label className="inline-block min-w-24">HR:</label>
          <input
            onChange={(e) => onHeartRateInput(Number(e.target.value))}
            type="number"
            className="p-2 rounded-md border border-slate-400 bg-white w-30"
          ></input>
        </div>
        <div className="col-span-1">
          <label className="inline-block min-w-24">RR:</label>
          <input
            onChange={(e) => onRespiratoryRateInput(Number(e.target.value))}
            type="number"
            className="p-2 rounded-md border border-slate-400 bg-white w-30"
          ></input>
        </div>
        <div className="col-span-1">
          <label className="inline-block min-w-24">Temp:</label>
          <input
            onChange={(e) => onTempInput(Number(e.target.value))}
            type="number"
            className="p-2 rounded-md border border-slate-400 bg-white w-30"
          ></input>
        </div>
      </div>
    </div>
  );
}

export default ClinicalMeasurementsInput;
