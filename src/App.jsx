import { CssBaseline } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./scenes/dashboard/Dashboard";
import Timeline from "./scenes/timeline/Timeline";
import Temperature from "./scenes/temperature/Temperature";
import Medicine from "./scenes/medicine/Medicine";
import TempForm from "./scenes/form/TempForm";
import MedForm from "./scenes/form/MedForm";
import Layout from "./scenes/layout/Layout";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../src/theme";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/temperature" element={<Temperature />} />
              <Route path="/temperature/new" element={<TempForm />} />
              <Route path="/medicine" element={<Medicine />} />
              <Route path="/medicine/new" element={<MedForm />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
