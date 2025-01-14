import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { CreateProfessional } from "./CreateProfessional";
import { GeneralContext } from "../../../../../context/GeneralContext";
import {
  createProfessionalRecord,
  getProfessionalsRecords,
} from "../../../../../api/profesionales/professionals";
import { Spinner } from "../../../../common/spinner/Spinner";
import { WarningAlert } from "../../../../common/alerts/alerts";

export const CreateProfessionalContainer = () => {
  const {
    cancelAction,
    goBackAction,
    isLoading,
    setIsLoading,
    updateAlertsList,
    setUpdateAlertsList,
    setPageIsLoading,
  } = useContext(GeneralContext);

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
    activo: true,
  };

  const [professional, setProfessional] = useState(initialState);

  //hooks para detectar los cambios

  const [modifiedFlag, setModifiedFlag] = useState(false);
  const [dniMatch, setDniMatch] = useState(false);
  const [professionalsRecords, setProfessionalsRecords] = useState(null);

  //Función para guardar los cambios en el registro

  const handleChange = (e) => {
    const { value, name } = e.target;
    setProfessional({ ...professional, [name]: value });
    if (name === "dniprofesional") {
      if (
        professionalsRecords.some((record) => record.dniprofesional === value)
      )
        setDniMatch(true);
      else setDniMatch(false);
      console.log(dniMatch);
    }
    if (!modifiedFlag) setModifiedFlag(true);
    console.log(professional);
  };

  //Función para llamar a la función POST

  const handleSubmit = () => {
    if (dniMatch) {
      WarningAlert("DNI existente");
    } else {
      const today = dayjs().format("YYYY-MM-DD");
      const updatedProfessional = {
        ...professional,
        fechaultimaactualizacion: today,
      };
      setIsLoading(true);
      // e.preventDefault();
      createProfessionalRecord(updatedProfessional)
        .then((response) => {
          console.log(response);
          setIsLoading(false);
          setUpdateAlertsList(!updateAlertsList);
        })
        .catch((error) => {
          console.log(error.message);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    setPageIsLoading(true);
  }, [setPageIsLoading]);

  //Importa el usuario desde localStorage
  const [userRolRecord, setUserRolRecord] = useState(null);
  useEffect(() => {
    const userRolRecord = JSON.parse(localStorage.getItem("userRolRecord"));
    setUserRolRecord(userRolRecord);
  }, []);

  useEffect(() => {
    getProfessionalsRecords()
      .then((response) => setProfessionalsRecords(response))
      .catch((error) => console.log(error));
  }, []);

  if (!professionalsRecords) return <Spinner />;

  const createProfessionalProps = {
    handleChange,
    handleSubmit,
    isLoading,
    modifiedFlag,
    goBackAction,
    cancelAction,
    dniMatch,
    setPageIsLoading,
  };
  return (
    <>
      <CreateProfessional {...createProfessionalProps} />
    </>
  );
};
