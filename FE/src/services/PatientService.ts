import { api } from "../api/axios";
import type { Patient } from "../models/Patient";
import type { PatientDto } from "../models/PatientDto";

export class PatientService {
  static async getAll(): Promise<Patient[]> {
    const { data } = await api.get<Patient[]>("/patients");
    return data;
  }

  static async create(dto: PatientDto): Promise<Patient> {
    const { data } = await api.post<Patient>("/patients", dto);
    return data;
  }

  static async remove(id: number): Promise<void> {
    await api.delete(`/patients/${id}`);
  }
}
