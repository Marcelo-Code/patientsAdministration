import { useContext, useEffect, useState } from "react";
import { CreateMedicalRecord } from "./CreateMedicalRecord";
import { Spinner } from "../../../common/spinner/Spinner";
import { GeneralContext } from "../../../../context/GeneralContext";
import { meetings } from "../../../common/Menu/meetings";
import {
  createMedicalRecord,
  getMedicalRecords,
} from "../../../../api/medicalRecords";
import { useParams } from "react-router-dom";
import { getPatient } from "../../../../api/patients";

export const CreateMedicalRecordContainer = () => {
  const [records, setRecords] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { patientId = null } = useParams();

  const initialModifiedState = {
    idprofesional: false,
    fechaconsulta: false,
    tipoconsulta: false,
    descripcion: false,
  };
  const [modified, setModified] = useState(initialModifiedState);
  const [modifiedFlag, setModifiedFlag] = useState(false);
  const [patientRecord, setPatientRecord] = useState(null);

  const initialState = {
    idpaciente: "",
    idprofesional: "",
    fechaconsulta: null,
    tipoconsulta: "",
    descripcion: "",
  };
  const [medicalRecord, setMedicalRecord] = useState(initialState);
  const { createList, goBackAction, cancelAction } = useContext(GeneralContext);

  useEffect(() => {
    getMedicalRecords()
      .then((response) => {
        setRecords(response);
        if (patientId) {
          getPatient(patientId)
            .then((response) => setPatientRecord(response))
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  }, [patientId]);

  if (!records) return <Spinner />;

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
    records,
    "nombreyapellidopaciente",
    "idpaciente",
    false
  );

  const professionalList = createList(
    records,
    "nombreyapellidoprofesional",
    "idprofesional",
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
  // console.log(patientsList, professionalList, meetingsList);

  const professionalsProps = {
    handleChange: handleChange,
    name: "idprofesional",
    array: professionalList,
    initialValue: "Selecc. Profesional",
  };

  const meetingsProps = {
    handleChange: handleChange,
    name: "tipoconsulta",
    array: meetingsList,
    initialValue: "Selecc. Reunión",
  };

  // console.log(professionalList);

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
  };

  return <CreateMedicalRecord {...props} />;
};
