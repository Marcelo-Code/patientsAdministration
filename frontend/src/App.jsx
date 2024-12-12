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
import { EditPatientContainer } from "./components/pages/editPatient/EditPatientContainer";
import { ProfessionalsListContainer } from "./components/pages/professionalsList/professionalsListContainer";
import { CreateProfessionalContainer } from "./components/pages/createProfessional/createProfessionalContainer";
import { EditProfessionalContainer } from "./components/pages/editProfessional/editProfessionalContainer";
import { EditMedicalRecordContainer } from "./components/pages/editMedicalRecord/EditMedicalRecordContainer";
import { MedicalRecordListContainer } from "./components/pages/medicalRecordsList/medicalRecordListContainer";
import { CreateMedicalRecordContainer } from "./components/pages/createMedicalRecord/CreateMedicalRecordContainer";
import { BillingContainerPatient } from "./components/pages/billling/BillingContainerPatient";
import { CreateBillContainer } from "./components/pages/createBill/CreateBillContainer";

function App() {
  return (
    <BrowserRouter>
      <GeneralContextProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<PatientsListContainer />} />
          <Route
            path="/documentation/:patientId"
            element={<DocumentationContainer />}
          />
          <Route
            path={"/patientsDetail/:patientId"}
            element={<PatientsDetailContainer />}
          />
          <Route
            path={"/medicalHistory/:patientId"}
            element={<MedicalHistoryContainer />}
          />
          <Route
            path={"/editPatient/:patientId"}
            element={<EditPatientContainer />}
          />
          <Route
            path={"/editProfessional/:professionalId"}
            element={<EditProfessionalContainer />}
          />
          <Route
            path={"/billingPatient/:patientId"}
            element={<BillingContainerPatient />}
          />
          <Route
            path={"/editMedicalRecord/:medicalRecordId"}
            element={<EditMedicalRecordContainer />}
          />
          <Route
            path={"/professionalsList"}
            element={<ProfessionalsListContainer />}
          />
          <Route
            path={"/createProfessional"}
            element={<CreateProfessionalContainer />}
          />
          <Route path={"/createPatient"} element={<CreatePatientContainer />} />
          <Route path={"/billing"} element={<BillingContainer />} />
          <Route
            path={"/medicalRecordsList"}
            element={<MedicalRecordListContainer />}
          />
          <Route
            path={"/createMedicalRecord"}
            element={<CreateMedicalRecordContainer />}
          />
          <Route path={"/createBill"} element={<CreateBillContainer />} />
        </Routes>
      </GeneralContextProvider>
    </BrowserRouter>
  );
}

export default App;
