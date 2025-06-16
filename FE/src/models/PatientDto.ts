export interface PatientDto {
  clinicAcronym: string;
  ltc?: string;
  lastName: string;
  firstName: string;
  middleName?: string;
  gender: "M" | "F";
  dateOfBirth: string;
  phone: string;
  ehrId?: string;
}
