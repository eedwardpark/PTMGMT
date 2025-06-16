import type { Clinic } from "./Clinic";

export interface Patient {
  id: number;
  clinic: Clinic;
  ltc: string | null;
  lastName: string;
  firstName: string;
  middleName: string | null;
  gender: "M" | "F";
  dateOfBirth: string;
  phone: string;
  ehrId: string;
  createdAt: string;
}
