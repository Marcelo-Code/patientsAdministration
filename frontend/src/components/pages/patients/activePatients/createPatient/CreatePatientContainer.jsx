import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { CreatePatient } from "./CreatePatient";
import { GeneralContext } from "../../../../../context/GeneralContext";
import {
  createPatientRecord,
  getPatientsRecords,
} from "../../../../../api/pacientes/patients";
import { Spinner } from "../../../../common/spinner/Spinner";
import { WarningAlert } from "../../../../common/alerts/alerts";

export const CreatePatientContainer = () => {
  const {
    cancelAction,
    goBackAction,
    isLoading,
    setIsLoading,
    updateAlertsList,
    setUpdateAlertsList,
    setPageIsLoading,
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
    activo: true,
  };

  const [patient, setPatient] = useState(initialState);

  const [patientsRecords, setPatientsRecords] = useState(null);
  const [dniMatch, setDniMatch] = useState(false);

  //hooks para detectar los cambios

  const [modifiedFlag, setModifiedFlag] = useState(false);

  //Validación del formulario

  const [errors, setErrors] = useState({});

  const validateForm = (patient) => {
    const newErrors = {};

    const requiredFields = [
      "nombreYApellidoPaciente",
      "obraSocialPaciente",
      "telefonoObraSocial",
      "email1ObraSocial",
      "nombreYApellidoReferenteObrasocial",
      "nroAfiliadoPaciente",
      "dniPaciente",
      "fechaNacimientoPaciente",
      "diagnosticoPrevio",
      "direccionPaciente",
      "ciudadPaciente",
      "nombreYApellidoResponsable",
      "telefonoResponsable",
      "escuela",
      "direccionEscuela",
      "telefonoEscuela",
      "anioGradoSala",
      "nombreYApellidoDocenteReferenteEscuela",
      "nombreYApellidoDirectivoEscuela",
      "fechaInicioTto",
      // "fechaVencimientoCud" se valida más adelante en función de CUD
    ];

    // Validar campos requeridos generales
    requiredFields.forEach((field) => {
      if (
        field !== "fechaVencimientoCud" &&
        (!patient[field] || patient[field].toString().trim() === "")
      ) {
        newErrors[field] = `${field} es obligatorio`;
      }
    });
    // Validar campos de tipo 'date' (fechaNacimientoPaciente y fechaInicioTto)
    if (!patient.fechaNacimientoPaciente) {
      newErrors.fechaNacimientoPaciente = "Fecha de nacimiento es obligatoria";
    }
    if (!patient.fechaInicioTto) {
      newErrors.fechaInicioTto =
        "Fecha de inicio de tratamiento es obligatoria";
    }
    // Validar CUD y fechaVencimientoCud
    if (patient.CUD === true && !patient.fechaVencimientoCud) {
      newErrors.fechaVencimientoCud =
        "Fecha de vencimiento CUD es obligatoria cuando CUD está habilitado";
    }
    return newErrors;
  };

  //Función para guardar los cambios en el registro

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name == "CUD" && !value) {
      patient.fechaVencimientoCUD = null;
    }
    if (name === "dniPaciente") {
      console.log(patientsRecords);
      if (patientsRecords.some((record) => record.dnipaciente === value))
        setDniMatch(true);
      else setDniMatch(false);
    }
    const updatePatient = { ...patient, [name]: value };
    console.log(updatePatient);
    setPatient(updatePatient);
    if (!modifiedFlag) setModifiedFlag(true);
  };

  //Función para llamar a la función POST

  const handleSubmit = () => {
    const validationErrors = validateForm(patient);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Asumiendo que setErrors actualiza el estado de los errores
      WarningAlert("Verificar los campos incompletos ❌");
      return;
    }
    if (dniMatch) {
      WarningAlert("DNI existente");
      return;
    }
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
    getPatientsRecords()
      .then((response) => {
        setPatientsRecords(response);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!patientsRecords) return <Spinner />;

  const createPatientsProps = {
    handleChange,
    patient,
    handleSubmit,
    isLoading,
    cud: patient.CUD,
    modifiedFlag,
    cancelAction,
    goBackAction,
    dniMatch,
    setPageIsLoading,
    errors,
  };
  return (
    <>
      <CreatePatient {...createPatientsProps} />
    </>
  );
};
