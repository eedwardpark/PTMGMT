import React from "react";
import { Box } from "@mui/material";
import { ConfigureTable } from "./ConfigureTable";
import { PatientPageHeader } from "./PatientPageHeader";
import { usePatientStoreWithAutoInit } from "../../stores/patientStore";
import { PATIENT_TABLE_CONFIG } from "./PatientTableConfig";

export const PatientTable: React.FC = () => {
  const { loading, getFilteredPatients } = usePatientStoreWithAutoInit();

  return (
    <Box
      sx={{ p: 3, height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <PatientPageHeader />

      <ConfigureTable
        data={getFilteredPatients()}
        configuration={PATIENT_TABLE_CONFIG}
        loading={loading}
        emptyMessage="No patients found"
      />
    </Box>
  );
};