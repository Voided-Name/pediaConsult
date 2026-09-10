import { ReactNode } from "react";

type ChildProps = {
  children: ReactNode;
};
function Card({ children }: ChildProps) {
  return <div className="bg-white shadow-sm rounded-md p-10">{children}</div>;
}

export default Card;
