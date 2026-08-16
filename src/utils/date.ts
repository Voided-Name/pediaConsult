export type Age = {
  years: number;
  months: number;
  days: number;
};

export function getLocalToday(): string {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function calculateAgeInDays(dateOfBirth: string): number {
  const [year, month, day] = dateOfBirth.split("-").map(Number);

  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  // Normalize both dates to midnight
  birthDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  return Math.floor(
    (today.getTime() - birthDate.getTime()) / millisecondsPerDay
  );
}


export function calculateAge(dateOfBirth: string): Age {
  const [year, month, day] = dateOfBirth.split("-").map(Number);

  const today = new Date();

  let years = today.getFullYear() - year;
  let months = today.getMonth() - (month - 1);
  let days = today.getDate() - day;

  if (days < 0) {
    months--;

    // Number of days in the previous month
    const daysInPreviousMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();

    days += daysInPreviousMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    years,
    months,
    days,
  };
}

export function getSystemTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
