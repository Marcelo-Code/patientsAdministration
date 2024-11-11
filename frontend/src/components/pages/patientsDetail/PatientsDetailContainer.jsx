import { useParams } from "react-router-dom";
import { dataBase } from "../../../dataBase/DataBase";
import { PatientsDetail } from "./PatientsDetail";
import { useContext } from "react";
import { GeneralContext } from "../../../context/GeneralContext";

export const PatientsDetailContainer = () => {
  const { handleGoBack } = useContext(GeneralContext);

  const patients = dataBase;

  const { patientId } = useParams();

  const patient = patients.find(
    (patient) => patient.patientId === Number(patientId)
  );

  const props = {
    patientId: patient.patientId,
    nombre: patient.nombre,
    apellido: patient.apellido,
    dni: patient.dni,
    direccion: patient.direccion,
    personaResponsablePaciente: patient.personaResponsablePaciente,
    telefonoResponsable: patient.telefonoResponsable,
    obraSocial: patient.obraSocial,
    nroAfiliado: patient.nroAfiliado,
    ciudad: patient.ciudad,
    escuela: patient.escuela,
    direccionEscuela: patient.direccionEscuela,
    telefonoEscuela: patient.telefonoEscuela,
    anioGradoSala: patient.anioGradoSala,
    docenteReferente: patient.docenteReferente,
    directivoEscuela: patient.directivoEscuela,
    escuelaEspecial: patient.escuelaEspecial,
    nombreReferenteEscuelaEspecial: patient.nombreReferenteEscuelaEspecial,
    telefonoReferenteEscuelaEspecial: patient.telefonoReferenteEscuelaEspecial,
    certificadoDiscapacidad: patient.certificadoDiscapacidad,
    fechaVencimientoCud: patient.fechaVencimientoCud,
    fechaInicio: patient.fechaInicio,
    imagen: patient.imagen,
    handleGoBack,
  };
  return <PatientsDetail {...props} />;
};
