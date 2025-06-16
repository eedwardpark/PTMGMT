import { Box } from "@mui/material";
import { PatientPageHeader } from "./PatientPageHeader";
import { PatientConfigureTable } from "./PatientConfigureTable";

export const PatientTable: React.FC = () => (
  <Box sx={{ p: 3, height: "100vh", display: "flex", flexDirection: "column" }}>
    <PatientPageHeader />
    <PatientConfigureTable />
  </Box>
);
