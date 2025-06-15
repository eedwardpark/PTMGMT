import { IconButton, Tooltip, Typography } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import type { Patient } from "../../models/Patient";
import type { TableConfiguration } from "./interface/TableConfiguration";
import { usePatientStore } from "../../stores/patientStore";

export const PATIENT_TABLE_CONFIG: TableConfiguration<Patient> = {
  columns: [
    { id: "id", label: "No", sortable: true, minWidth: 80 },
    {
      id: "lastName",
      label: "Name",
      sortable: true,
      minWidth: 200,
      render: (patient: Patient) => (
        <Typography variant="body2" fontWeight={500}>
          {patient.lastName}, {patient.firstName}
          {patient.middleName && ` ${patient.middleName}`}
        </Typography>
      ),
    },
    {
      id: "clinic",
      label: "Clinic",
      sortable: true,
      minWidth: 120,
      render: (patient: Patient) => (
        <Tooltip title={patient.clinic?.clinicName || ""} arrow>
          <Typography variant="body2" color="primary">
            {patient.clinic?.acronym || "N/A"}
          </Typography>
        </Tooltip>
      ),
    },
    {
      id: "ltc",
      label: "LTC",
      sortable: false,
      minWidth: 100,
      render: (patient: Patient) => patient.ltc || "-",
    },
    {
      id: "dateOfBirth",
      label: "DOB",
      sortable: true,
      minWidth: 120,
      render: (patient: Patient) =>
        new Date(patient.dateOfBirth).toLocaleDateString(),
    },
    { id: "ehrId", label: "EHR ID", sortable: false, minWidth: 150 },
    {
      id: "phone",
      label: "Phone #",
      sortable: false,
      minWidth: 140,
      render: (patient: Patient) => {
        const cleaned = patient.phone.replace(/\D/g, "");
        return cleaned.length === 10
          ? `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
          : patient.phone;
      },
    },
    {
      id: "actions",
      label: "Actions",
      sortable: false,
      minWidth: 100,
      render: (patient: Patient) => (
        <IconButton
          size="small"
          color="error"
          onClick={() => {
            if (
              window.confirm("Are you sure you want to delete this patient?")
            ) {
              usePatientStore.getState().deletePatient(patient.id);
            }
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
    },
  ],
  defaultSort: "lastName",
  defaultOrder: "asc",
  rowsPerPageOptions: [5, 10, 25, 50],
};
