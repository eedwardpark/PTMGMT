import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppBar, Container } from "@mui/material";
import PatientListPage from "./page/PatientListPage";

export default function App() {
  return (
    <BrowserRouter>
      <AppBar position="static"></AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/patients" replace />} />
          <Route path="/patients" element={<PatientListPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
