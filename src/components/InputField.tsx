import type { InputHTMLAttributes } from "react";

type ChildProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

function InputField({ label, type, className = "", ...props }: ChildProps) {
  return (
    <div className="col-span-1">
      <label className={props.disabled ? "font-light" : "font-semibold"}>
        {label}
      </label>

      <input
        type={type}
        className={
          props.disabled
            ? `p-2 rounded-md border text-slate-600 border-slate-200 bg-slate-100 w-full outline-emerald-400  focus:outline ${className}`
            : `p-2 rounded-md border border-slate-300 bg-slate-50 w-full outline-emerald-400  focus:outline ${className}`
        }
        {...props}
      />
    </div>
  );
}

export default InputField;
