import "./App.css";
import { Routes, Route } from "react-router";
import Index from "./pages/Index";
import AddPage from "./pages/Add";
import AddPatient from "./pages/AddPatient";
import Patients from "./pages/Patients";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/encounter/add" element={<AddPage />} />
      <Route path="/patient" element={<Patients />} />
      <Route path="/patient/add" element={<AddPatient />} />
    </Routes>
  )
}

export default App;
