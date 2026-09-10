import { ReactNode } from "react";

type ChildProps = {
  children: ReactNode;
};
function PageContent({ children }: ChildProps) {
  return (
    <div className="w-full bg-slate-50 mt-5 rounded-tl-2xl border border-slate-300 dark:bg-slate-950 dark:border-slate-700 overflow-auto">
      <div className="mx-auto max-w-5xl p-3">{children}</div>
    </div>
  );
}

export default PageContent;
