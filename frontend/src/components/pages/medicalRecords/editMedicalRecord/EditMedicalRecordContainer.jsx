import { useParams } from "react-router-dom";
import { EditMedicalRecord } from "./EditMedicalRecord";
import { useContext, useEffect, useState } from "react";
import {
  getMedicalRecord,
  updateMedicalRecord,
} from "../../../../api/medicalRecords";
import { Spinner } from "../../../common/spinner/Spinner";
import { GeneralContext } from "../../../../context/GeneralContext";
import { getPatientRecord, getPatientsRecords } from "../../../../api/patients";
import {
  getProfessionalRecord,
  getProfessionalsRecords,
} from "../../../../api/professionals";

export const EditMedicalRecordContainer = () => {
  const {
    medicalRecordId,
    patientId = null,
    professionalId = null,
  } = useParams();
  const {
    handleGoBack,
    goBackAction,
    cancelAction,
    isLoading,
    setIsLoading,
    setPageIsLoading,
  } = useContext(GeneralContext);

  //hooks para guardar los datos que se recuperan de la DB:
  //* Paciente de la consulta
  //* Profesional de la consulta
  //* Lista de profesionales
  //* Consulta

  const initialRecordState = {
    idpaciente: null,
    idprofesional: null,
    fechaconsulta: null,
    tipoconsulta: null,
    descripcion: "",
  };

  const [medicalRecord, setMedicalRecord] = useState(initialRecordState);

  const [patientRecord, setPatientRecord] = useState(null);
  const [professionalRecord, setProfessionalRecord] = useState(null);
  const [professionalsRecords, setProfessionalsRecords] = useState([]);
  const [patientsRecords, setPatientRecords] = useState([]);

  //hooks para detectar los cambios

  const initialModifiedState = {
    idprofesional: false,
    fechaconsulta: false,
    tipoconsulta: false,
    descripcion: false,
  };
  const [modified, setModified] = useState(initialModifiedState);
  const [modifiedFlag, setModifiedFlag] = useState(false);

  //Función para guardar los cambios en el registro

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedMedicalRecord = { ...medicalRecord, [name]: value };
    setMedicalRecord(updatedMedicalRecord);
    setModified({ ...modified, [name]: true });
    if (!modifiedFlag) setModifiedFlag(true);
    console.log(updatedMedicalRecord);
  };

  console.log(medicalRecordId);

  useEffect(() => {
    setPageIsLoading(true);
    getMedicalRecord(medicalRecordId)
      .then((response) => {
        console.log(response);
        setMedicalRecord(response);
        getPatientRecord(response.idpaciente)
          .then((response) => setPatientRecord(response))
          .catch((error) => console.log(error));

        //Obtengo el profesional de la consulta
        getProfessionalRecord(response.idprofesional)
          .then((response) => setProfessionalRecord(response))
          .catch((error) => console.log(error));

        //Obtengo el array de profesionales
        getProfessionalsRecords()
          .then((response) => setProfessionalsRecords(response))
          .catch((error) => console.log(error));

        //Obtengo el array de pacientes
        getPatientsRecords()
          .then((response) => setPatientRecords(response))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, [medicalRecordId, setPageIsLoading]);

  if (
    !medicalRecord ||
    !patientRecord ||
    !professionalRecord ||
    !professionalsRecords ||
    !patientsRecords
  )
    return <Spinner />;

  //Función para llamar a la función PUT

  const handleSubmit = () => {
    setIsLoading(true);
    updateMedicalRecord(medicalRecord, medicalRecordId)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
      })
      .catch((error) => console.log(error.message));
  };

  const props = {
    handleChange,
    handleGoBack,
    goBackAction,
    handleSubmit,
    medicalRecord,
    patientRecord,
    professionalRecord,
    professionalsRecords,
    patientsRecords,
    modified,
    modifiedFlag,
    cancelAction,
    isLoading,
    setPageIsLoading,
    professionalId,
    patientId,
  };
  return (
    <>
      <EditMedicalRecord {...props} />
    </>
  );
};
