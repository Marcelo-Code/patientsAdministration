import { useContext, useState } from "react";
import { GeneralContext } from "../../../context/GeneralContext";
import dayjs from "dayjs";
import { CreateProfessional } from "./CreateProfessional";
import { createProfessional } from "../../../api/professionals";

export const CreateProfessionalContainer = () => {
  const { handleGoBack, isLoading, setIsLoading } = useContext(GeneralContext);
  const [professional, setProfessional] = useState({
    nombreYApellidoProfesional: "",
    especialidadProfesional: "",
    matriculaProfesional: "",
    cuitProfesional: "",
    fechaUltimaActualizacion: null,
  });

  const handleSubmit = (e) => {
    const today = dayjs().format("YYYY-MM-DD");
    const updatedProfessional = {
      ...professional,
      fechaUltimaActualizacion: today,
    };
    setIsLoading(true);
    e.preventDefault();

    createProfessional(updatedProfessional)
      .then(((response) => console.log(response), setIsLoading(false)))
      .catch((error) => console.log(error.message));
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setProfessional({ ...professional, [name]: value });
    console.log(professional);
  };

  const props = {
    handleGoBack,
    handleChange,
    handleSubmit,
    isLoading,
  };
  return <CreateProfessional {...props} />;
};
