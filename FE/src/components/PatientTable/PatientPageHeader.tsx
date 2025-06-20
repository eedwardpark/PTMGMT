import React from "react";
import { Box, TextField, Button, InputAdornment } from "@mui/material";
import { Search as SearchIcon, Add as AddIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { usePatientStore } from "../../stores/patientStore";

interface PatientPageHeaderProps {}

export const PatientPageHeader: React.FC<PatientPageHeaderProps> = () => {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm } = usePatientStore();

  const handleAddClick = () => {
    navigate("/patients/new");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
      <TextField
        placeholder={"Search Patients"}
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
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddClick}
        size="small"
        sx={{
          fontSize: "0.875rem",
          px: 2,
          py: 1,
        }}
      >
        {"ADD NEW PATIENT"}
      </Button>
    </Box>
  );
};
