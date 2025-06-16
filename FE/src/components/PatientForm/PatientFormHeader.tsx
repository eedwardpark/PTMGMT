import React from "react";
import { Box, Typography, Alert } from "@mui/material";
import { Person } from "@mui/icons-material";

interface PatientFormHeaderProps {
  submitError: string;
  patientError?: string;
}

export const PatientFormHeader: React.FC<PatientFormHeaderProps> = ({
  submitError,
  patientError,
}) => {
  return (
    <>
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          fontWeight: "bold",
          mb: 4,
        }}
      >
        ➕ Add a New Patient
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "primary.main",
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontWeight: 600,
            }}
          >
            <Person sx={{ fontSize: "1.2rem" }} />
            Patient profile
          </Typography>
          <Typography variant="caption" color="error" sx={{ fontWeight: 500 }}>
            *required field
          </Typography>
        </Box>

        {(submitError || patientError) && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {submitError || patientError}
          </Alert>
        )}
      </Box>
    </>
  );
};
