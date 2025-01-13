import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../../../context/GeneralContext";
import { Spinner } from "../../../../common/spinner/Spinner";
import { age } from "../../../../common/age";
import { getPatientRecord } from "../../../../../api/pacientes/patients";
import { InactivePatientsDetail } from "./InactivePatientsDetail";

export const InactivePatientsDetailContainer = () => {
  const { handleGoBack, setPageIsLoading } = useContext(GeneralContext);

  const [patientRecord, setPatientRecord] = useState(null);

  const { patientId } = useParams();

  //Importa el usuario desde localStorage
  const [userRolRecord, setUserRolRecord] = useState(null);
  useEffect(() => {
    const userRolRecord = JSON.parse(localStorage.getItem("userRolRecord"));
    setUserRolRecord(userRolRecord);
  }, []);

  useEffect(() => {
    setPageIsLoading(true);
  }, [setPageIsLoading]);

  useEffect(() => {
    getPatientRecord(patientId)
      .then((response) => setPatientRecord(response))
      .catch((error) => console.log(error));
  }, [patientId, setPageIsLoading]);

  if (!patientRecord) return <Spinner />;

  const birth = new Date(patientRecord.fechanacimientopaciente);
  const agePatient = age(birth);

  const IiactivePatientsDetailProps = {
    id: patientRecord.id,
    nombreyapellidopaciente: patientRecord.nombreyapellidopaciente,
    obrasocialpaciente: patientRecord.obrasocialpaciente,
    telefonoobrasocial: patientRecord.telefonoobrasocial,
    email1obrasocial: patientRecord.email1obrasocial,
    email2obrasocial: patientRecord.email2obrasocial,
    email3obrasocial: patientRecord.email3obrasocial,
    nombreyapellidoreferenteobrasocial:
      patientRecord.nombreyapellidoreferenteobrasocial,
    nroafiliadopaciente: patientRecord.nroafiliadopaciente,
    dnipaciente: patientRecord.dnipaciente,
    fechanacimientopaciente: patientRecord.fechanacimientopaciente,
    edad: agePatient,
    diagnosticoprevio: patientRecord.diagnosticoprevio,
    direccionpaciente: patientRecord.direccionpaciente,
    ciudadpaciente: patientRecord.ciudadpaciente,
    nombreyapellidoresponsable: patientRecord.nombreyapellidoresponsable,
    telefonoresponsable: patientRecord.telefonoresponsable,
    escuela: patientRecord.escuela,
    direccionescuela: patientRecord.direccionescuela,
    telefonoescuela: patientRecord.telefonoescuela,
    aniogradoSala: patientRecord.aniogradosala,
    nombreyapellidodocentereferenteescuela:
      patientRecord.nombreyapellidodocentereferenteescuela,
    nombreyapellidodirectivoescuela:
      patientRecord.nombreyapellidodirectivoescuela,
    escuelaespecial: patientRecord.escuelaespecial,
    nombreyapellidodocentereferenteescuelaespecial:
      patientRecord.nombreyapellidodocentereferenteescuelaespecial,
    telefonodocentereferenteescuelaespecial:
      patientRecord.telefonodocentereferenteescuelaespecial,
    cud: patientRecord.cud,
    fechavencimientocud: patientRecord.fechavencimientocud,
    fechainiciotto: patientRecord.fechainiciotto,
    fechaultimaactualizacion: patientRecord.fechaultimaactualizacion,
    handleGoBack,
    setPageIsLoading,
    userRolRecord,
  };

  return (
    <>
      <InactivePatientsDetail {...IiactivePatientsDetailProps} />
    </>
  );
};
