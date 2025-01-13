import { useParams } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../../../context/GeneralContext.jsx";
import dayjs from "dayjs";
import { Spinner } from "../../../../common/spinner/Spinner.jsx";
import { EditProfessional } from "./EditProfessional.jsx";
import {
  getProfessionalRecord,
  updateProfessionalRecord,
} from "../../../../../api/profesionales/professionals.js";

export const EditProfessionalContainer = () => {
  const { professionalId } = useParams();
  const {
    goBackAction,
    cancelAction,
    isLoading,
    setIsLoading,
    setPageIsLoading,
    updateAlertsList,
    setUpdateAlertsList,
  } = useContext(GeneralContext);

  //hook para guardar los datos que se recuperan de la DB:
  //* Profesional

  const [professionalRecord, setProfessionalRecord] = useState(null);

  //hooks para detectar los cambios

  const initialModifiedState = {
    nombreyapellidoprofesional: false,
    especialidadprofesional: false,
    matriculaprofesional: false,
    cuitprofesional: false,
    dniprofesional: false,
    direccionprofesional: false,
    ciudadprofesional: false,
    telefonoprofesional: false,
    emailprofesional: false,
    fechavencimientornpprofesional: false,
  };
  const [modified, setModified] = useState(initialModifiedState);
  const [modifiedFlag, setModifiedFlag] = useState(false);

  //Función para guardar los cambios en el registro

  const handleChange = (e) => {
    const { value, name } = e.target;
    setProfessionalRecord({ ...professionalRecord, [name]: value });
    setModified({ ...modified, [name]: true });
    if (!modifiedFlag) setModifiedFlag(true);
    console.log(professionalRecord);
  };

  //Importa el usuario desde localStorage
  const [userRolRecord, setUserRolRecord] = useState(null);
  useEffect(() => {
    const userRolRecord = JSON.parse(localStorage.getItem("userRolRecord"));
    setUserRolRecord(userRolRecord);
  }, []);

  useEffect(() => {
    setPageIsLoading(true);
  }, [setPageIsLoading]);

  useEffect(() => {
    getProfessionalRecord(professionalId)
      .then((response) => {
        setProfessionalRecord(response);
      })
      .catch((error) => console.log(error));
  }, [professionalId, setPageIsLoading]);

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
        setUpdateAlertsList(!updateAlertsList);
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoading(false);
      });
  };

  const props = {
    nombreyapellidoprofesional: professionalRecord.nombreyapellidoprofesional,
    especialidadprofesional: professionalRecord.especialidadprofesional,
    matriculaprofesional: professionalRecord.matriculaprofesional,
    cuitprofesional: professionalRecord.cuitprofesional,
    dniprofesional: professionalRecord.dniprofesional,
    direccionprofesional: professionalRecord.direccionprofesional,
    ciudadprofesional: professionalRecord.ciudadprofesional,
    telefonoprofesional: professionalRecord.telefonoprofesional,
    emailprofesional: professionalRecord.emailprofesional,
    fechavencimientornpprofesional:
      professionalRecord.fechavencimientornpprofesional,
    goBackAction,
    handleChange,
    handleSubmit,
    isLoading,
    modified,
    modifiedFlag,
    cancelAction,
    setPageIsLoading,
  };

  return (
    <>
      <EditProfessional {...props} />
    </>
  );
};
