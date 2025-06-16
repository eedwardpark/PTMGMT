import React from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import type { PatientFormData } from "./interface/PatientFormData";
import type { Clinic } from "../../models/Clinic";

interface PatientFormFieldsProps {
  formData: PatientFormData;
  formErrors: Partial<PatientFormData>;
  clinics: Clinic[];
  handleInputChange: (
    field: keyof PatientFormData,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (field: keyof PatientFormData) => (event: any) => void;
  handleDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhoneChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PatientFormFields: React.FC<PatientFormFieldsProps> = ({
  formData,
  formErrors,
  clinics,
  handleInputChange,
  handleSelectChange,
  handleDateChange,
  handlePhoneChange,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Clinic and LTC Row */}
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        <Box sx={{ flex: 1, minWidth: "250px" }}>
          <FormControl
            fullWidth
            error={!!formErrors.clinicAcronym}
            variant="standard"
          >
            <InputLabel>Clinic*</InputLabel>
            <Select
              value={formData.clinicAcronym}
              label="Clinic*"
              onChange={handleSelectChange("clinicAcronym")}
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>
              {clinics.map((clinic) => (
                <MenuItem key={clinic.clinicId} value={clinic.acronym}>
                  {clinic.clinicName} ({clinic.acronym})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ flex: 1, minWidth: "250px" }}>
          <TextField
            fullWidth
            label="LTC"
            value={formData.ltc || ""}
            onChange={handleInputChange("ltc")}
            error={!!formErrors.ltc}
            helperText={formErrors.ltc}
            variant="standard"
          />
        </Box>
      </Box>

      {/* Name Row */}
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        <Box sx={{ flex: 1, minWidth: "200px" }}>
          <TextField
            fullWidth
            label="Last Name*"
            value={formData.lastName}
            onChange={handleInputChange("lastName")}
            error={!!formErrors.lastName}
            helperText={formErrors.lastName}
            variant="standard"
            required
          />
        </Box>

        <Box sx={{ flex: 1, minWidth: "200px" }}>
          <TextField
            fullWidth
            label="First Name*"
            value={formData.firstName}
            onChange={handleInputChange("firstName")}
            error={!!formErrors.firstName}
            helperText={formErrors.firstName}
            variant="standard"
            required
          />
        </Box>

        <Box sx={{ flex: 1, minWidth: "200px" }}>
          <TextField
            fullWidth
            label="Middle Name"
            value={formData.middleName || ""}
            onChange={handleInputChange("middleName")}
            error={!!formErrors.middleName}
            helperText={formErrors.middleName}
            variant="standard"
          />
        </Box>
      </Box>

      {/* Gender and DOB Row */}
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        <Box sx={{ flex: 1, minWidth: "250px" }}>
          <FormControl fullWidth error={!!formErrors.gender} variant="standard">
            <InputLabel>Gender*</InputLabel>
            <Select
              value={formData.gender}
              label="Gender*"
              onChange={handleSelectChange("gender")}
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>
              <MenuItem value="M">Male</MenuItem>
              <MenuItem value="F">Female</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ flex: 1, minWidth: "250px" }}>
          <TextField
            fullWidth
            label="Date of Birth*"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleDateChange}
            error={!!formErrors.dateOfBirth}
            helperText={formErrors.dateOfBirth}
            variant="standard"
            required
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CalendarToday
                    sx={{ fontSize: "1rem", color: "text.secondary" }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      {/* Phone Number Row */}
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        <Box sx={{ flex: 1, minWidth: "250px", maxWidth: "400px" }}>
          <TextField
            fullWidth
            label="Phone Number*"
            value={formData.phone}
            onChange={handlePhoneChange}
            error={!!formErrors.phone}
            helperText={formErrors.phone}
            placeholder="###-###-####"
            variant="standard"
            required
            inputProps={{ maxLength: 12 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
