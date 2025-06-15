import React from "react";
import { Box, TextField, Button, InputAdornment } from "@mui/material";
import { Search as SearchIcon, Add as AddIcon } from "@mui/icons-material";
import { ConfigureTable } from "./ConfigureTable";
import { usePatientStoreWithAutoInit } from "../../stores/patientStore";
import { PATIENT_TABLE_CONFIG } from "./PatientTableConfig";

export const PatientTable: React.FC = () => {
  const { patients, loading, searchTerm, setSearchTerm } =
    usePatientStoreWithAutoInit();

  return (
    <Box
      sx={{ p: 3, height: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <TextField
          placeholder="Search Patients"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: 400 }}
        />
        <Button variant="contained" startIcon={<AddIcon />}>
          ADD NEW PATIENT
        </Button>
      </Box>

      <ConfigureTable
        data={patients}
        configuration={PATIENT_TABLE_CONFIG}
        searchTerm={searchTerm}
        searchFields={["firstName", "lastName"]}
        loading={loading}
        emptyMessage="No patients found"
      />
    </Box>
  );
};
