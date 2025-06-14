import { api } from "../api/axios";
import type { Clinic } from "../models/Clinic";

export class ClinicService {
  static async getAll(): Promise<Clinic[]> {
    const { data } = await api.get<Clinic[]>("/clinics");
    return data;
  }
}
