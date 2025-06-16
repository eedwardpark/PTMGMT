export interface PatientFormData {
  clinicAcronym: string;
  ltc?: string;
  lastName: string;
  firstName: string;
  middleName?: string;
  gender: 'M' | 'F' | '';
  dateOfBirth: string;
  phone: string;
}

export const initialFormData: PatientFormData = {
  clinicAcronym: '',
  ltc: undefined,
  lastName: '',
  firstName: '',
  middleName: undefined,
  gender: '',
  dateOfBirth: '',
  phone: '',
};