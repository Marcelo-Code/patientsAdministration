import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { DocumentationContainer } from "./components/pages/documentation/documentationContainer";
import { GeneralContextProvider } from "./context/GeneralContext";
import { PatientsListContainer } from "./components/pages/patientsList/PatientsListContainer";
import { PatientsDetailContainer } from "./components/pages/patientsDetail/PatientsDetailContainer";
import { MedicalHistoryContainer } from "./components/pages/medicalHistory/MedicalHistoryContainer";
import { BillingContainer } from "./components/pages/billling/BillingContainer";
import { CreatePatientContainer } from "./components/pages/createPatient/CreatePatientContainer";
import { NavBar } from "./components/layout/navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <GeneralContextProvider>
        <Routes>
          <Route path="/" element={<PatientsListContainer />} />
          <Route path="/documentation" element={<DocumentationContainer />} />
          <Route
            path={"/patientsDetail/:patientId"}
            element={<PatientsDetailContainer />}
          />
          <Route
            path={"/medicalHistory/:patientId"}
            element={<MedicalHistoryContainer />}
          />
          <Route path={"/billing"} element={<BillingContainer />} />
          <Route path={"/createPatient"} element={<CreatePatientContainer />} />
        </Routes>
      </GeneralContextProvider>
    </BrowserRouter>
  );
}

export default App;
