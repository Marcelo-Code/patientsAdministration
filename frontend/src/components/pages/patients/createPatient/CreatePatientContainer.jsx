import { useContext, useState } from "react";
import { GeneralContext } from "../../../../context/GeneralContext";
import dayjs from "dayjs";
import { CreatePatient } from "./CreatePatient";
import { createPatient } from "../../../../api/patients";

export const CreatePatientContainer = () => {
  const { cancelAction, goBackAction, isLoading, setIsLoading } =
    useContext(GeneralContext);

  //hook para guardar los datos del nuevo paciente

  const initialState = {
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
  };

  const [patient, setPatient] = useState(initialState);

  //hooks para detectar los cambios

  const [modifiedFlag, setModifiedFlag] = useState(false);

  //Función para guardar los cambios en el registro

  const handleChange = (e) => {
    const { value, name } = e.target;
    setPatient({ ...patient, [name]: value });
    if (!modifiedFlag) setModifiedFlag(true);
  };

  //Función para llamar a la función POST

  const handleSubmit = (e) => {
    const today = dayjs().format("YYYY-MM-DD");
    const updatedPatient = { ...patient, fechaUltimaActualizacion: today };
    setIsLoading(true);
    e.preventDefault();
    createPatient(updatedPatient)
      .then(((response) => console.log(response), setIsLoading(false)))
      .catch((error) => console.log(error.message));
  };

  const props = {
    handleChange,
    patient,
    handleSubmit,
    isLoading,
    cud: patient.CUD,
    modifiedFlag,
    cancelAction,
    goBackAction,
  };
  return <CreatePatient {...props} />;
};
