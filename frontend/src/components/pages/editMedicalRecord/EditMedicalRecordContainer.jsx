import { useParams } from "react-router-dom";
import { EditMedicalRecord } from "./EditMedicalRecord";
import { useContext, useEffect, useState } from "react";
import {
  getMedicalRecord,
  updateMedicalRecord,
} from "../../../api/medicalRecords";
import { Spinner } from "../../common/spinner/Spinner";
import { GeneralContext } from "../../../context/GeneralContext";
import { getPatient } from "../../../api/patients";
import { getProfessional, getProfessionals } from "../../../api/professionals";

export const EditMedicalRecordContainer = () => {
  const { updateList, setUpdateList } = useState(false);
  const { medicalRecordId } = useParams();
  const { handleGoBack } = useContext(GeneralContext);
  const [medicalRecord, setMedicalRecord] = useState({
    idpaciente: null,
    idprofesional: null,
    fechaconsulta: null,
    tipoconsulta: null,
    descripcion: "",
  });
  const [patient, setPatient] = useState(null);
  const [professional, setProfessional] = useState(null);
  const [arrayProfessionals, setArrayProfessionals] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedMedicalRecord = { ...medicalRecord, [name]: value };
    setMedicalRecord(updatedMedicalRecord);
  };

  useEffect(() => {
    const getObjects = async () => {
      try {
        const response = await getMedicalRecord(medicalRecordId);
        setMedicalRecord(response);
        if (response) {
          const responsePatient = await getPatient(response.idpaciente);
          setPatient(responsePatient);
          const responseProfessional = await getProfessional(
            response.idprofesional
          );
          setProfessional(responseProfessional);
          const responseArrayProfessionals = await getProfessionals();
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

  const handleSubmit = () => {
    updateMedicalRecord(medicalRecord, medicalRecordId)
      .then((response) => {
        console.log(response);
        handleGoBack();
      })
      .catch((error) => console.log(error.message));
  };

  const props = {
    handleChange,
    handleGoBack,
    handleSubmit,
    medicalRecord,
    patient,
    professional,
    arrayProfessionals,
  };
  return <EditMedicalRecord {...props} />;
};
