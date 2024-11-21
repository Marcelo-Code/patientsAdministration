import { useContext, useState } from "react";
import { GeneralContext } from "../../../context/GeneralContext";
import dayjs from "dayjs";
import { CreatePatient } from "./CreatePatient";
import { createPatient } from "../../../api/patients";

export const CreatePatientContainer = () => {
  const { handleGoBack, isLoading, setIsLoading } = useContext(GeneralContext);
  const [selectedValue, setSelectedValue] = useState("no");
  const [patient, setPatient] = useState({
    nombreYApellidoPaciente: "",
    obraSocialPaciente: "",
    nroAfiliadoPaciente: "",
    dniPaciente: "",
    direccionPaciente: "",
    fechaNacimientoPaciente: null,
    diagnosticoPrevio: "",
    ciudadPaciente: "",
    nombreYApellidoResponsable: "",
    telefonoResponsable: "",
    escuela: "",
    direccionEscuela: "",
    telefonoEscuela: "",
    anioGradoSala: "",
    nombreYApellidoDocenteReferenteEscuela: "",
    nombreYApellidoDirectivoEscuela: "",
    escuelaEspecial: "",
    nombreYApellidoDocenteReferenteEscuelaEspecial: "",
    telefonoDocenteReferenteEscuelaEspecial: "",
    CUD: false,
    fechaVencimientoCud: null,
    fechaInicioTto: null,
    fechaUltimaActualizacion: null,
  });

  const handleSubmit = (e) => {
    const today = dayjs().format("YYYY-MM-DD");
    const updatedPatient = { ...patient, fechaUltimaActualizacion: today };
    setIsLoading(true);
    e.preventDefault();
    createPatient(updatedPatient)
      .then(((response) => console.log(response), setIsLoading(false)))
      .catch((error) => console.log(error.message));
  };

  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);
    let cud;
    if (e.target.value === "yes") {
      cud = true;
    } else {
      cud = false;
    }
    setPatient({ ...patient, CUD: cud });
  };

  const handleDateChange = (name, newDate) => {
    if (newDate) {
      const formattedDate = newDate
        ? dayjs(newDate).format("YYYY-MM-DD")
        : null;
      setPatient({ ...patient, [name]: formattedDate });
    } else {
      console.error("Fecha inválida: ", newDate);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const props = {
    handleGoBack,
    handleChange,
    selectedValue,
    patient,
    handleSubmit,
    handleDateChange,
    handleRadioChange,
    isLoading,
  };
  return <CreatePatient {...props} />;
};
