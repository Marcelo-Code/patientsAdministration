import { useParams } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../../context/GeneralContext.jsx";
import dayjs from "dayjs";
import { Spinner } from "../../../common/spinner/Spinner.jsx";
import { EditProfessional } from "./EditProfessional.jsx";
import {
  getProfessionalRecord,
  updateProfessionalRecord,
} from "../../../../api/professionals.js";
import { Footer } from "../../../layout/footer/Footer.jsx";

export const EditProfessionalContainer = () => {
  const { professionalId } = useParams();
  const { goBackAction, cancelAction, isLoading, setIsLoading } =
    useContext(GeneralContext);

  //hook para guardar los datos que se recuperan de la DB:
  //* Profesional

  const [professionalRecord, setProfessionalRecord] = useState(null);

  //hooks para detectar los cambios

  const initialModifiedState = {
    nombreyapallidoprofesional: false,
    especialidadprofesional: false,
    matriculaprofesional: false,
    cuitprofesional: false,
  };
  const [modified, setModified] = useState(initialModifiedState);
  const [modifiedFlag, setModifiedFlag] = useState(false);

  //Función para guardar los cambios en el registro

  const handleChange = (e) => {
    const { value, name } = e.target;
    setProfessionalRecord({ ...professionalRecord, [name]: value });
    setModified({ ...modified, [name]: true });
    if (!modifiedFlag) setModifiedFlag(true);
  };

  useEffect(() => {
    getProfessionalRecord(professionalId)
      .then((response) => {
        setProfessionalRecord(response);
      })
      .catch((error) => console.log(error));
  }, [professionalId]);

  if (!professionalRecord) return <Spinner />;

  const handleSubmit = () => {
    const today = dayjs().format("YYYY-MM-DD");
    const updatedProfessional = {
      ...professionalRecord,
      fechaultimaactualizacion: today,
    };
    setIsLoading(true);
    updateProfessionalRecord(updatedProfessional, professionalId)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
      })
      .catch((error) => console.log(error.message));
  };

  const props = {
    nombreyapellidoprofesional: professionalRecord.nombreyapellidoprofesional,
    especialidadprofesional: professionalRecord.especialidadprofesional,
    matriculaprofesional: professionalRecord.matriculaprofesional,
    cuitprofesional: professionalRecord.cuitprofesional,
    goBackAction,
    handleChange,
    handleSubmit,
    isLoading,
    modified,
    modifiedFlag,
    cancelAction,
  };

  return (
    <>
      <EditProfessional {...props} />
      <Footer />
    </>
  );
};
