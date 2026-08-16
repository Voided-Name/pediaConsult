import { Age } from "../utils/date";

type ChildProps = {
  age: Age;
  ageDays: number;
};

function AgeDisplay({ age, ageDays }: ChildProps) {
  return (
    <span>
      { age.years > 0 ?  (age.years === 1 ? (age.years + " year ") : (age.years + " years ")) : "" }
      { age.months > 0 ?  (age.months === 1 ? (age.months + " month ") : (age.months + " months ")) : "" }
      { age.days > 0 ?  (age.days === 1 ? (age.days + " day ") : (age.days + " days ")) : "" }

      { (age.years > 0) || (age.months > 0) ? (ageDays === 1 ? "or 1 day" : "or " + ageDays + " days") : "" }
    </span>
  )
}

export default AgeDisplay;
