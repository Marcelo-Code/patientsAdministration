import { useContext, useState } from "react";
import { GeneralContext } from "../../../../context/GeneralContext";
import dayjs from "dayjs";
import { createPatientRecord } from "../../../../api/patients";
import { CreatePatient } from "./CreatePatient";
import { Footer } from "../../../layout/footer/Footer";

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

  const handleSubmit = () => {
    const today = dayjs().format("YYYY-MM-DD");
    const updatedPatient = { ...patient, fechaUltimaActualizacion: today };
    setIsLoading(true);
    createPatientRecord(updatedPatient)
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
    patient,
    handleSubmit,
    isLoading,
    cud: patient.CUD,
    modifiedFlag,
    cancelAction,
    goBackAction,
  };
  return (
    <>
      <CreatePatient {...props} />;
      <Footer />
    </>
  );
};
