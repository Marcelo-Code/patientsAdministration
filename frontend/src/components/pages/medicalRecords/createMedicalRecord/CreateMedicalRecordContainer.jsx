/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { CreateMedicalRecord } from "./CreateMedicalRecord";
import { Spinner } from "../../../common/spinner/Spinner";
import { GeneralContext } from "../../../../context/GeneralContext";
import { meetings } from "../../../common/Menu/meetings";
import { createMedicalRecord } from "../../../../api/medicalRecords";
import { useParams } from "react-router-dom";
import { getPatientsRecords } from "../../../../api/patients";
import { getProfessionalsRecords } from "../../../../api/professionals";

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

  useEffect(() => {
    setPageIsLoading(true);
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
        }
      })
      .catch((error) => console.log(error));
  }, [patientId, professionalId, setPageIsLoading]);

  if (!patientsRecords || !professionalsRecords) return <Spinner />;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Actualizar el registro médico, incluyendo el idpaciente si existe
    const updatedMedicalRecord = {
      ...medicalRecord,
      [name]: value,
      ...(patientId && { idpaciente: patientId }), // Agregar idpaciente solo si existe
    };

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
    "idpaciente",
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
    handleChange: handleChange,
    name: "idpaciente",
    array: patientsList,
    initialValue: patientRecord
      ? patientRecord.nombreyapellidopaciente
      : "Selecc. Paciente",
  };

  const professionalsProps = {
    handleChange: handleChange,
    name: "idprofesional",
    array: professionalList,
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

  const props = {
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
    setPageIsLoading,
  };

  return (
    <>
      <CreateMedicalRecord {...props} />;
    </>
  );
};
