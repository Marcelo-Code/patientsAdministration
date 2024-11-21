import { useParams } from "react-router-dom";
import {
  getProfessional,
  updateProfessional,
} from "../../../api/professionals.js";
import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../context/GeneralContext";
import dayjs from "dayjs";
import { Spinner } from "../../common/spinner/Spinner";
import { EditProfessional } from "./EditProfessional";

export const EditProfessionalContainer = () => {
  const { professionalId } = useParams();
  const { goBackAction, handleGoBack, isLoading, setIsLoading, cancelAction } =
    useContext(GeneralContext);
  const [modifiedFlag, setModifiedFlag] = useState(false);
  const [professional, setProfessional] = useState(null);

  const initialModifiedState = {
    nombreyapallidoprofesional: false,
    especialidadprofesional: false,
    matriculaprofesional: false,
    cuitprofesional: false,
  };

  const [modified, setModified] = useState(initialModifiedState);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setProfessional({ ...professional, [name]: value });
    setModified({ ...modified, [name]: true });
    setModifiedFlag(true);
  };

  const handleSubmit = () => {
    const today = dayjs().format("YYYY-MM-DD");
    const updatedProfessional = {
      ...professional,
      fechaultimaactualizacion: today,
    };
    setIsLoading(true);
    updateProfessional(updatedProfessional, professionalId)
      .then((response) => {
        console.log(response),
          setIsLoading(false),
          setModified(false),
          handleGoBack();
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    setIsLoading(true);
    getProfessional(professionalId)
      .then((response) => {
        setProfessional(response);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [professionalId, setIsLoading]);

  if (!professional) return <Spinner />;

  const props = {
    nombreyapellidoprofesional: professional.nombreyapellidoprofesional,
    especialidadprofesional: professional.especialidadprofesional,
    matriculaprofesional: professional.matriculaprofesional,
    cuitprofesional: professional.cuitprofesional,
    goBackAction,
    handleChange,
    handleSubmit,
    isLoading,
    modified,
    modifiedFlag,
    cancelAction,
  };

  return <EditProfessional {...props} />;
};
