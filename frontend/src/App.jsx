import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { DocumentationContainer } from "./components/pages/documentation/documentationContainer";
import { GeneralContextProvider } from "./context/GeneralContext";
import { BillingContainer } from "./components/pages/billling/BillingContainer";
import { NavBar } from "./components/layout/navbar/Navbar";
import { CreateNoCudBillingContainer } from "./components/pages/billling/noCudBilling/createNoCudBilling/CreateNoCudBillingContainer";
import { CreateCudBillingContainer } from "./components/pages/billling/cudBilling/createCudBilling/CreateCudBillingContainer";
import { PatientsListContainer } from "./components/pages/patients/patientsList/PatientsListContainer";
import { PatientsDetailContainer } from "./components/pages/patients/patientDetail/PatientsDetailContainer";
import { CreatePatientContainer } from "./components/pages/patients/createPatient/CreatePatientContainer";
import { EditPatientContainer } from "./components/pages/patients/editPatient/EditPatientContainer";
import { ProfessionalsListContainer } from "./components/pages/professionals/professionalsList/ProfessionalsListContainer";
import { CreateProfessionalContainer } from "./components/pages/professionals/createProfessional/CreateProfessionalContainer";
import { EditProfessionalContainer } from "./components/pages/professionals/editProfessional/EditProfessionalContainer";
import { EditMedicalRecordContainer } from "./components/pages/medicalRecords/editMedicalRecord/EditMedicalRecordContainer";
import { MedicalRecordListContainer } from "./components/pages/medicalRecords/medicalRecordsList/MedicalRecordListContainer";
import { CreateMedicalRecordContainer } from "./components/pages/medicalRecords/createMedicalRecord/CreateMedicalRecordContainer";
import { MedicalRecordDetailContainer } from "./components/pages/medicalRecords/medicalRecordDetail/MedicalRecordDetailContainer";

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
            path={"/editPatient/:patientId"}
            element={<EditPatientContainer />}
          />
          <Route
            path={"/editProfessional/:professionalId"}
            element={<EditProfessionalContainer />}
          />
          <Route
            path={"/billingPatient/:patientId"}
            element={<BillingContainer />}
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
            path={"/medicalRecordsList/:patientId"}
            element={<MedicalRecordListContainer />}
          />
          <Route
            path={"/createMedicalRecord"}
            element={<CreateMedicalRecordContainer />}
          />
          <Route
            path={"/createMedicalRecord/:patientId"}
            element={<CreateMedicalRecordContainer />}
          />
          <Route
            path={"/createMedicalRecord"}
            element={<CreateMedicalRecordContainer />}
          />
          <Route
            path={"/createCudBilling"}
            element={<CreateCudBillingContainer />}
          />
          <Route
            path={"/createNoCudBilling"}
            element={<CreateNoCudBillingContainer />}
          />
          <Route
            path={"/medicalRecordDetail/:medicalRecordId"}
            element={<MedicalRecordDetailContainer />}
          />
        </Routes>
      </GeneralContextProvider>
    </BrowserRouter>
  );
}

export default App;
