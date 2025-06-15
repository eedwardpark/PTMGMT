import { create } from "zustand";
import type { PatientDto } from "../models/PatientDto";
import type { Patient } from "../models/Patient";
import React from "react";
import { PatientService } from "../services/PatientService";

interface PatientState {
  patients: Patient[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  getFilteredPatients: () => Patient[];
  fetchPatients: () => Promise<void>;
  addPatient: (dto: PatientDto) => Promise<void>;
  deletePatient: (id: number) => Promise<void>;
}

export const usePatientStore = create<PatientState>((set, get) => ({
  patients: [],
  loading: false,
  error: null,
  searchTerm: "",

  setSearchTerm: (term: string) => set({ searchTerm: term }),

  getFilteredPatients: () => {
    const { patients, searchTerm } = get();

    if (!searchTerm.trim()) {
      return patients;
    }

    const term = searchTerm.toLowerCase();
    return patients.filter(
      (patient) =>
        patient.firstName.toLowerCase().includes(term) ||
        patient.lastName.toLowerCase().includes(term) ||
        (patient.middleName && patient.middleName.toLowerCase().includes(term))
    );
  },

  fetchPatients: async () => {
    set({ loading: true, error: null });
    try {
      const data = await PatientService.getAll();
      set({ patients: data, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to load patients", loading: false });
    }
  },

  addPatient: async (dto) => {
    set({ loading: true, error: null });
    try {
      await PatientService.create(dto);
      await get().fetchPatients();
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Failed to add patient" });
    } finally {
      set({ loading: false });
    }
  },

  deletePatient: async (id) => {
    set({ loading: true, error: null });
    try {
      await PatientService.remove(id);
      await get().fetchPatients();
    } catch (err: any) {
      set({ error: err.message || "Failed to delete patient" });
    } finally {
      set({ loading: false });
    }
  },
}));

export const usePatientStoreWithAutoInit = () => {
  const store = usePatientStore();

  React.useEffect(() => {
    if (store.patients.length === 0 && !store.loading) {
      store.fetchPatients();
    }
  }, []);

  return store;
};
