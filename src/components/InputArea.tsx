type ChildProps = {
  label: string;
  onChange: (text: string) => void;
};
function InputArea({ label, onChange }: ChildProps) {
  return (
    <div className="flex-col flex col-span-2 mt-10">
      <h1 className="font-bold text-xl mb-2">{label}</h1>
      <textarea
        className="p-2 rounded-md border border-slate-300 bg-slate-50 w-full outline-emerald-400  focus:outline resize max-w-full"
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
    </div>
  );
}

export default InputArea;
