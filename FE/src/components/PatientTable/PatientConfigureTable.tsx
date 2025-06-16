import React from "react";
import { ConfigureTable } from "./ConfigureTable";
import { usePatientStoreWithAutoInit } from "../../stores/patientStore";
import { PATIENT_TABLE_CONFIG } from "./PatientTableConfig";

export const PatientConfigureTable: React.FC = () => {
  const { loading, getFilteredPatients } = usePatientStoreWithAutoInit();
  const patients = getFilteredPatients();

  return (
    <ConfigureTable
      data={patients}
      configuration={PATIENT_TABLE_CONFIG}
      loading={loading}
      emptyMessage="No patients found"
    />
  );
};
