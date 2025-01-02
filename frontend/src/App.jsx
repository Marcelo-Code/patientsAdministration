import { Route, Routes } from "react-router-dom";
import "./App.css";

import { DocumentationContainer } from "./components/pages/documentation/DocumentationContainer";
import { BillingContainer } from "./components/pages/billling/BillingContainer";
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
import { ProfessionalDetailContainer } from "./components/pages/professionals/professionalDetail/ProfessionalDetailContainer";
import { ProfessionalDocumentationContainer } from "./components/pages/professionals/professionalDocumentation/professionalDocumentationContainer";
import { NavBarContainer } from "./components/layout/navBar/NavBarContainer";
import { Footer } from "./components/layout/footer/Footer";
function App() {
  return (
    <>
      <NavBarContainer />
      <Routes>
        <Route path="/" element={<PatientsListContainer />} />
        <Route
          path="/documentation/:patientId"
          element={<DocumentationContainer />}
        />
        <Route
          path="/professionalDocumentation/:professionalId"
          element={<ProfessionalDocumentationContainer />}
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
          path={"/professionalBilling/:professionalId"}
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
          path={"/professionalDetail/:professionalId"}
          element={<ProfessionalDetailContainer />}
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
          path={"/professionalMedicalRecordsList/:professionalId"}
          element={<MedicalRecordListContainer />}
        />

        <Route
          path={"/createMedicalRecord"}
          element={<CreateMedicalRecordContainer />}
        />
        <Route
          path={"/createMedicalRecordPatient/:patientId"}
          element={<CreateMedicalRecordContainer />}
        />
        <Route
          path={"/createMedicalRecordProfessional/:professionalId"}
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
      <Footer />
    </>
  );
}

export default App;
