import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import { DocumentationContainer } from "./components/pages/documentation/DocumentationContainer";
import { BillingContainer } from "./components/pages/billling/BillingContainer";
import { CreateNoCudBillingContainer } from "./components/pages/billling/noCudBilling/createNoCudBilling/CreateNoCudBillingContainer";
import { CreateCudBillingContainer } from "./components/pages/billling/cudBilling/createCudBilling/CreateCudBillingContainer";
import { EditMedicalRecordContainer } from "./components/pages/medicalRecords/editMedicalRecord/EditMedicalRecordContainer";
import { MedicalRecordListContainer } from "./components/pages/medicalRecords/medicalRecordsList/MedicalRecordListContainer";
import { CreateMedicalRecordContainer } from "./components/pages/medicalRecords/createMedicalRecord/CreateMedicalRecordContainer";
import { MedicalRecordDetailContainer } from "./components/pages/medicalRecords/medicalRecordDetail/MedicalRecordDetailContainer";
import { NavBarContainer } from "./components/layout/navBar/NavBarContainer";
import { UsersListContainer } from "./components/pages/users/usersList/UsersListContainer";
import { ProtectedRoute } from "./components/pages/protectedRoute/ProtectedRoute";
import { CreateUserContainer } from "./components/pages/users/createUser/CreateUserContainerTemp.jsx";
import { TokenContextProvider } from "./context/TokenContext.jsx";
import { PasswordResetRequestContainer } from "./components/pages/passwordResetRequest/PasswordResetRequestContainer.jsx";
import { LoginContainer } from "./components/pages/login/LoginContainer.jsx";
import { Footer } from "./components/layout/footer/Footer.jsx";
import { InactivePatientsListContainer } from "./components/pages/patients/inactivePatients/inactivePatientsList/InactivePatientsListContainer_.jsx";
import { PatientsListContainer } from "./components/pages/patients/activePatients/patientsList/PatientsListContainer.jsx";
import { PatientsDetailContainer } from "./components/pages/patients/activePatients/patientDetail/PatientsDetailContainer.jsx";
import { EditPatientContainer } from "./components/pages/patients/activePatients/editPatient/EditPatientContainer.jsx";
import { CreatePatientContainer } from "./components/pages/patients/activePatients/createPatient/CreatePatientContainer.jsx";
import { InactivePatientsDetailContainer } from "./components/pages/patients/inactivePatients/inactivePatientDetail/InactivePatientsDetailContainer.jsx";
import { ProfessionalDocumentationContainer } from "./components/pages/professionals/activeProfessionals/professionalDocumentation/ProfessionalDocumentationContainer.jsx";
import { EditProfessionalContainer } from "./components/pages/professionals/activeProfessionals/editProfessional/EditProfessionalContainer.jsx";
import { ProfessionalDetailContainer } from "./components/pages/professionals/activeProfessionals/professionalDetail/ProfessionalDetailContainer.jsx";
import { CreateProfessionalContainer } from "./components/pages/professionals/activeProfessionals/createProfessional/CreateProfessionalContainer.jsx";
import { ProfessionalsListContainer } from "./components/pages/professionals/activeProfessionals/professionalsList/ProfessionalsListContainer.jsx";
import { InactiveProfessionalsListContainer } from "./components/pages/professionals/inactiveProfessionals/inactiveProfessionalsList/InactiveProfessionalsListContainer.jsx";
import { InactiveProfessionalDetailContainer } from "./components/pages/professionals/inactiveProfessionals/inactiveProfessionalDetail/InactiveProfessionalDetailContainer.jsx";
function App() {
  const location = useLocation();
  const isLoginScreen = location.pathname === "/login";
  const isPasswordResetRequestScreen =
    location.pathname === "/passwordResetRequest";
  return (
    <TokenContextProvider>
      {!isLoginScreen && !isPasswordResetRequestScreen && <NavBarContainer />}
      <Routes>
        <Route
          path="/passwordResetRequest"
          element={<PasswordResetRequestContainer />}
        />
        <Route path="/login" element={<LoginContainer />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<PatientsListContainer />} />
          <Route
            path="/inactivePatientsList"
            element={<InactivePatientsListContainer />}
          />
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
            path={"/inactivePatientsDetail/:patientId"}
            element={<InactivePatientsDetailContainer />}
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
            path={
              "/editMedicalRecord/:medicalRecordId/:professionalId/:patientId"
            }
            element={<EditMedicalRecordContainer />}
          />
          <Route
            path={"/professionalsList/:professionalId"}
            element={<ProfessionalsListContainer />}
          />
          <Route
            path={"/inactiveProfessionalsList"}
            element={<InactiveProfessionalsListContainer />}
          />
          <Route
            path={"/professionalDetail/:professionalId"}
            element={<ProfessionalDetailContainer />}
          />
          <Route
            path={"/inactiveProfessionalDetail/:professionalId"}
            element={<InactiveProfessionalDetailContainer />}
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
            path={"/createMedicalRecord/patient/:patientId"}
            element={<CreateMedicalRecordContainer />}
          />
          <Route
            path={"/createMedicalRecord/professional/:professionalId"}
            element={<CreateMedicalRecordContainer />}
          />
          <Route
            path={"/createMedicalRecord"}
            element={<CreateMedicalRecordContainer />}
          />
          <Route
            path={"/createCudBilling/patient/:patientId"}
            element={<CreateCudBillingContainer />}
          />
          <Route
            path={"/createCudBilling/professional/:professionalId"}
            element={<CreateCudBillingContainer />}
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
            path={"/createNoCudBilling/patient/:patientId"}
            element={<CreateNoCudBillingContainer />}
          />
          <Route
            path={"/createNoCudBilling/professional/:professionalId"}
            element={<CreateNoCudBillingContainer />}
          />
          <Route
            path={"/medicalRecordDetail/:medicalRecordId"}
            element={<MedicalRecordDetailContainer />}
          />
          <Route path={"/createUser"} element={<CreateUserContainer />} />
          <Route path={"/usersList"} element={<UsersListContainer />} />
        </Route>
      </Routes>
      {!isLoginScreen && !isPasswordResetRequestScreen && <Footer />}
    </TokenContextProvider>
  );
}

export default App;
