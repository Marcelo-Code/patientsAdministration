import { useContext, useEffect, useState } from "react";
import { CreateMedicalRecord } from "./CreateMedicalRecord";
import { Spinner } from "../../common/spinner/Spinner";
import { GeneralContext } from "../../../context/GeneralContext";
import { meetings } from "../../common/Menu/meetings";
import {
  createMedicalRecord,
  getMedicalRecords,
} from "../../../api/medicalRecords";

export const CreateMedicalRecordContainer = () => {
  const [records, setRecords] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const initialModifiedState = {
    idprofesional: false,
    fechaconsulta: false,
    tipoconsulta: false,
    descripcion: false,
  };
  const [modified, setModified] = useState(initialModifiedState);
  const [modifiedFlag, setModifiedFlag] = useState(false);

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
      })
      .catch((error) => console.log(error));
  }, []);

  if (!records) return <Spinner />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const updatedMedicalRecord = { ...medicalRecord, [name]: value };
    setMedicalRecord(updatedMedicalRecord);
    setModified({ ...modified, [name]: true });
    if (!modifiedFlag) setModifiedFlag(true);
    // console.log(updatedMedicalRecord);
    console.log(modified);
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

  console.log(professionalList);

  const meetingsList = meetings;

  const patientsProps = {
    handleChange: handleChange,
    name: "idpaciente",
    array: patientsList,
    initialValue: "Selecc. Paciente",
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
  };

  return <CreateMedicalRecord {...props} />;
};
