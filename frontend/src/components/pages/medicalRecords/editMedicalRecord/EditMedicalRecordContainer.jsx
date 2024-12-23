import { useParams } from "react-router-dom";
import { EditMedicalRecord } from "./EditMedicalRecord";
import { useContext, useEffect, useState } from "react";
import {
  getMedicalRecord,
  updateMedicalRecord,
} from "../../../../api/medicalRecords";
import { Spinner } from "../../../common/spinner/Spinner";
import { GeneralContext } from "../../../../context/GeneralContext";
import { getPatientRecord } from "../../../../api/patients";
import {
  getProfessionalRecord,
  getProfessionalsRecords,
} from "../../../../api/professionals";
import { Footer } from "../../../layout/footer/Footer";
import { NavBarContainer } from "../../../layout/navBar/NavBarContainer";

export const EditMedicalRecordContainer = () => {
  const { medicalRecordId } = useParams();
  const { handleGoBack, goBackAction, cancelAction, isLoading, setIsLoading } =
    useContext(GeneralContext);

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

  const [patient, setPatient] = useState(null);
  const [professional, setProfessional] = useState(null);
  const [arrayProfessionals, setArrayProfessionals] = useState(null);

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

  useEffect(() => {
    const getObjects = async () => {
      try {
        const response = await getMedicalRecord(medicalRecordId);
        setMedicalRecord(response);
        if (response) {
          const responsePatient = await getPatientRecord(response.idpaciente);
          setPatient(responsePatient);
          const responseProfessional = await getProfessionalRecord(
            response.idprofesional
          );
          setProfessional(responseProfessional);
          const responseArrayProfessionals = await getProfessionalsRecords();
          setArrayProfessionals(responseArrayProfessionals);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getObjects();
  }, [medicalRecordId]);

  if (!medicalRecord || !patient || !professional || !arrayProfessionals)
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
    patient,
    professional,
    arrayProfessionals,
    modified,
    modifiedFlag,
    cancelAction,
    isLoading,
  };
  return (
    <>
      <NavBarContainer />
      <EditMedicalRecord {...props} />;
      <Footer />
    </>
  );
};
