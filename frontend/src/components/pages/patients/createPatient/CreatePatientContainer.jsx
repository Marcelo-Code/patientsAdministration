import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../../context/GeneralContext";
import dayjs from "dayjs";
import { CreatePatient } from "./CreatePatient";
import { createPatientRecord } from "../../../../api/pacientes/patients";

export const CreatePatientContainer = () => {
  const {
    cancelAction,
    goBackAction,
    isLoading,
    setIsLoading,
    updateAlertsList,
    setUpdateAlertsList,
  } = useContext(GeneralContext);

  //hook para guardar los datos del nuevo paciente

  const initialState = {
    nombreYApellidoPaciente: "",
    obraSocialPaciente: "",
    telefonoObraSocial: "",
    email1ObraSocial: "",
    email2ObraSocial: "",
    email3ObraSocial: "",
    nombreYApellidoReferenteObrasocial: "",
    nroAfiliadoPaciente: "",
    dniPaciente: "",
    fechaNacimientoPaciente: null,
    diagnosticoPrevio: "",
    direccionPaciente: "",
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
    imgDniFrentePaciente: "",
    imgDniDorsoPaciente: "",
    imgDniFrenteTitularOS: "",
    imgDniDorsoTitularOS: "",
    imgCarnetOSPaciente: "",
    imgCarnetOSTitular: "",
    imgConstanciaAlumnoRegular: "",
    imgLibretaSanitaria: "",
    imgCud: "",
    imgCertificadoEventual: "",
  };

  const [patient, setPatient] = useState(initialState);

  //hooks para detectar los cambios

  const [modifiedFlag, setModifiedFlag] = useState(false);

  //Función para guardar los cambios en el registro

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name == "CUD" && !value) {
      patient.fechaVencimientoCUD = null;
    }
    const updatePatient = { ...patient, [name]: value };
    console.log(updatePatient);
    setPatient(updatePatient);
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
        setUpdateAlertsList(!updateAlertsList);
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoading(false);
      });
  };

  //Importa el usuario desde localStorage
  const [userRolRecord, setUserRolRecord] = useState(null);
  useEffect(() => {
    const userRolRecord = JSON.parse(localStorage.getItem("userRolRecord"));
    setUserRolRecord(userRolRecord);
  }, []);

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
      <CreatePatient {...props} />
    </>
  );
};
