import { ReactNode } from "react";
import { Link } from "react-router"

type ChildProps = {
  to: string,
  page: string,
  currentPage: string,
  children: ReactNode
}

function SidebarLink({ to, page, currentPage, children }: ChildProps) {
  return (
    <Link to={to} className={`col-span-1 flex gap-1 items-center py-2 pl-5 pr-16 rounded-lg transition-colors duration-300 ${page === currentPage ? 'bg-white text-slate-600 border border-slate-300 dark:text-slate-400 dark:bg-slate-950 dark:border-slate-700' : 'text-slate-500 hover:bg-slate-300 dark:hover:bg-slate-700'}`}>
      {children}
    </Link>
  )
}

export default SidebarLink;
