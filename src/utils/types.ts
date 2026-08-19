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
