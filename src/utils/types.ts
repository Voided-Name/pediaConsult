export type Patient = {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string | null;
  dateOfBirth: string;
  sex: string;
  created_at: string;
};

export type Measure = {
  l_value: number;
  m_value: number;
  s_value: number;
};

export type SuggestedBracket = {
  suggested: AgeBracket;
  brackets: AgeBracket[];
};

export type AgeBracket = {
  id: string;
  label: string;
  age: Age;
};

export type Age = {
  unit: String;
  at: number | null;
  min: number | null;
  max_inclusive: number | null;
  max_exclusive: number | null;
};
