import { useContext, useState } from "react";
import { GeneralContext } from "../../../../context/GeneralContext";
import dayjs from "dayjs";
import { CreateProfessional } from "./CreateProfessional";
import { createProfessionalRecord } from "../../../../api/professionals";
import { Footer } from "../../../layout/footer/Footer";
import { NavBarContainer } from "../../../layout/navBar/NavBarContainer";

export const CreateProfessionalContainer = () => {
  const { cancelAction, goBackAction, isLoading, setIsLoading } =
    useContext(GeneralContext);

  //hook para guardar los datos del nuevo profesional

  const initialState = {
    nombreyapellidoprofesional: "",
    especialidadprofesional: "",
    matriculaprofesional: "",
    cuitprofesional: "",
    dniprofesional: "",
    direccionprofesional: "",
    ciudadprofesional: "",
    telefonoprofesional: "",
    emailprofesional: "",
    fechavencimientornpprofesional: null,
    documentoconstanciamatriculaprofesional: "",
    documentocertificadornpprofesional: "",
    documentotitulofrenteprofesional: "",
    documentotitulodorsoprofesional: "",
    documentocvprofesional: "",
    documentoconstanciacuitprofesional: "",
    documentoconstanciacbuprofesional: "",
    documentodnifrenteprofesional: "",
    documentodnidorsoprofesional: "",
    documentoseguroprofesional: "",
    fechaultimaactualizacion: null,
  };

  const [professional, setProfessional] = useState(initialState);

  //hooks para detectar los cambios

  const [modifiedFlag, setModifiedFlag] = useState(false);

  //Función para guardar los cambios en el registro

  const handleChange = (e) => {
    const { value, name } = e.target;
    setProfessional({ ...professional, [name]: value });
    if (!modifiedFlag) setModifiedFlag(true);
    console.log(professional);
  };

  //Función para llamar a la función POST

  const handleSubmit = () => {
    const today = dayjs().format("YYYY-MM-DD");
    const updatedProfessional = {
      ...professional,
      fechaUltimaActualizacion: today,
    };
    setIsLoading(true);
    // e.preventDefault();
    createProfessionalRecord(updatedProfessional)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoading(false);
      });
  };

  const props = {
    handleChange,
    handleSubmit,
    isLoading,
    modifiedFlag,
    goBackAction,
    cancelAction,
  };
  return (
    <>
      <CreateProfessional {...props} />
    </>
  );
};
