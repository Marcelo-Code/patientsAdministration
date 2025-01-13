import { useContext, useEffect, useState } from "react";
import { CreateMedicalRecord } from "./CreateMedicalRecord";
import { Spinner } from "../../../common/spinner/Spinner";
import { GeneralContext } from "../../../../context/GeneralContext";
import { meetings } from "../../../common/Menu/meetings";
import { useParams } from "react-router-dom";
import { getPatientsRecords } from "../../../../api/pacientes/patients";
import { getProfessionalsRecords } from "../../../../api/profesionales/professionals";
import { createMedicalRecord } from "../../../../api/consultas/medicalRecords";

export const CreateMedicalRecordContainer = () => {
  const [patientsRecords, setPatientsRecords] = useState([]);
  const [professionalsRecords, setProfessionalsRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { patientId = null, professionalId = null } = useParams();

  const initialModifiedState = {
    idprofesional: false,
    fechaconsulta: false,
    tipoconsulta: false,
    descripcion: false,
  };
  const [modified, setModified] = useState(initialModifiedState);
  const [modifiedFlag, setModifiedFlag] = useState(false);
  const [patientRecord, setPatientRecord] = useState(null);
  const [professionalRecord, setProfessionalRecord] = useState(null);
  const [userProfessionalId, setUserProfessionalId] = useState(null);

  const initialState = {
    idpaciente: "",
    idprofesional: "",
    fechaconsulta: null,
    tipoconsulta: "",
    descripcion: "",
  };
  const [medicalRecord, setMedicalRecord] = useState(initialState);
  const { createList, goBackAction, cancelAction, setPageIsLoading } =
    useContext(GeneralContext);

  const [userRolRecord, setUserRolRecord] = useState(null);
  useEffect(() => {
    const userRolRecord = JSON.parse(localStorage.getItem("userRolRecord"));
    if (userRolRecord?.user?.perfil === "profesional")
      setUserProfessionalId(userRolRecord.user.idprofesional);
    setUserRolRecord(userRolRecord);
  }, []);

  // useEffect(() => {
  //   setPageIsLoading(true);
  // }, [setPageIsLoading]);

  useEffect(() => {
    getPatientsRecords()
      .then((response) => {
        setPatientsRecords(response);
        if (patientId) {
          const foundPatientRecord = response.find(
            (record) => record.id === parseInt(patientId)
          );
          setPatientRecord(foundPatientRecord);
          console.log(foundPatientRecord);
        }
      })
      .catch((error) => console.log(error));
    getProfessionalsRecords()
      .then((response) => {
        setProfessionalsRecords(response);
        if (professionalId) {
          const foundProfessionalRecord = response.find(
            (record) => record.id === parseInt(professionalId)
          );
          setProfessionalRecord(foundProfessionalRecord);
        } else if (userProfessionalId) {
          const foundProfessionalRecord = response.find(
            (record) => record.id === parseInt(userProfessionalId)
          );
          setProfessionalRecord(foundProfessionalRecord);
        }
      })
      .catch((error) => console.log(error));
  }, [patientId, professionalId, setPageIsLoading, userProfessionalId]);

  if (!patientsRecords || !professionalsRecords) return <Spinner />;

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log(name + value);

    console.log(patientId);
    console.log(professionalId);

    // Actualizar el registro médico, incluyendo el idpaciente si existe
    let updatedMedicalRecord = {
      ...medicalRecord,
      [name]: value,
    };

    if (patientId && !updatedMedicalRecord.idpaciente) {
      updatedMedicalRecord = {
        ...updatedMedicalRecord,
        idpaciente: parseInt(patientId),
      };
    }

    if (professionalId && !updatedMedicalRecord.idprofesional) {
      updatedMedicalRecord = {
        ...updatedMedicalRecord,
        idprofesional: parseInt(professionalId),
      };
    }

    if (
      userRolRecord.user.idprofesional &&
      !updatedMedicalRecord.idprofesional
    ) {
      updatedMedicalRecord = {
        ...updatedMedicalRecord,
        idprofesional: parseInt(userRolRecord.user.idprofesional),
      };
    }

    console.log(updatedMedicalRecord);

    setMedicalRecord(updatedMedicalRecord);

    // Actualizar el estado de campos modificados
    setModified({ ...modified, [name]: true });

    // Activar el flag solo si no se ha activado antes
    if (!modifiedFlag) {
      setModifiedFlag(true);
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    console.log(medicalRecord);
    createMedicalRecord(medicalRecord)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const patientsList = createList(
    patientsRecords,
    "nombreyapellidopaciente",
    "id",
    false
  );

  const professionalList = createList(
    professionalsRecords,
    "nombreyapellidoprofesional",
    "id",
    false
  );

  const meetingsList = meetings;

  const patientsProps = {
    name: "idpaciente",
    array: patientsList,
    handleChange: handleChange,
    initialValue: patientRecord
      ? patientRecord.nombreyapellidopaciente
      : "Selecc. Paciente",
  };

  const professionalsProps = {
    name: "idprofesional",
    array: professionalList,
    handleChange: handleChange,
    initialValue: professionalRecord
      ? professionalRecord.nombreyapellidoprofesional
      : "Selecc. Profesional",
  };

  const meetingsProps = {
    handleChange: handleChange,
    name: "tipoconsulta",
    array: meetingsList,
    initialValue: "Selecc. Reunión",
  };

  const createMedicalRecordProps = {
    goBackAction,
    patientsProps,
    professionalsProps,
    meetingsProps,
    handleChange,
    cancelAction,
    isLoading,
    handleSubmit,
    modified,
    modifiedFlag,
    patientId,
    professionalId,
    userProfessionalId,
    setPageIsLoading,
  };

  return (
    <>
      <CreateMedicalRecord {...createMedicalRecordProps} />;
    </>
  );
};
