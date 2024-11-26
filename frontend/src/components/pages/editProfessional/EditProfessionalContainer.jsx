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
  const { goBackAction, cancelAction, isLoading, setIsLoading } =
    useContext(GeneralContext);

  //hook para guardar los datos que se recuperan de la DB:
  //* Profesional

  const [professional, setProfessional] = useState(null);

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
    setProfessional({ ...professional, [name]: value });
    setModified({ ...modified, [name]: true });
    if (!modifiedFlag) setModifiedFlag(true);
  };

  useEffect(() => {
    getProfessional(professionalId)
      .then((response) => {
        setProfessional(response);
      })
      .catch((error) => console.log(error));
  }, [professionalId]);

  if (!professional) return <Spinner />;

  const handleSubmit = () => {
    const today = dayjs().format("YYYY-MM-DD");
    const updatedProfessional = {
      ...professional,
      fechaultimaactualizacion: today,
    };
    setIsLoading(true);
    updateProfessional(updatedProfessional, professionalId)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
      })
      .catch((error) => console.log(error.message));
  };

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
