import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container, Box } from "@mui/material";
import PatientListPage from "./page/PatientListPage";
import { PatientForm } from "./components/PatientForm/PatientForm";

export default function App() {
  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <BrowserRouter>
        <Container
          maxWidth={false}
          sx={{
            flex: 1,
            mt: 2,
            mb: 0,
            pt: 0,
            pb: 0,
            height: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/patients" replace />} />
            <Route path="/patients" element={<PatientListPage />} />
            <Route path="/patients/new" element={<PatientForm />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </Box>
  );
}
