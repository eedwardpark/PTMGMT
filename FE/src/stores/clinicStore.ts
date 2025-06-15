import { create } from "zustand";
import type { Clinic } from "../models/Clinic";
import { ClinicService } from "../services/ClinicService";

interface ClinicState {
  clinics: Clinic[];
  loading: boolean;
  error: string | null;
  fetchClinics: () => Promise<void>;
}

export const useClinicStore = create<ClinicState>((set) => ({
  clinics: [],
  loading: false,
  error: null,
  fetchClinics: async () => {
    set({ loading: true, error: null });
    try {
      const data = await ClinicService.getAll();
      set({ clinics: data, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to load clinics", loading: false });
    }
  },
}));
