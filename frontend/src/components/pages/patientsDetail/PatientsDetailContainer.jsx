import { useParams } from "react-router-dom";
import { PatientsDetail } from "./PatientsDetail";
import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../context/GeneralContext";
import { getPatient } from "../../../api/patients";
import { Spinner } from "../../common/spinner/Spinner";
import { age } from "../../common/age";

export const PatientsDetailContainer = () => {
  const { handleGoBack } = useContext(GeneralContext);

  const [patient, setPatient] = useState(null);

  const { patientId } = useParams();

  useEffect(() => {
    getPatient(patientId)
      .then((response) => setPatient(response))
      .catch((error) => console.log(error));
  }, [patientId]);

  if (!patient) return <Spinner />;

  const birth = new Date(patient.fechanacimientopaciente);
  const agePatient = age(birth);

  const props = {
    id: patient.id,
    nombreyapellidopaciente: patient.nombreyapellidopaciente,
    obrasocialpaciente: patient.obrasocialpaciente,
    nroafiliadopaciente: patient.nroafiliadopaciente,
    dnipaciente: patient.dnipaciente,
    fechanacimientopaciente: patient.fechanacimientopaciente,
    edad: agePatient,
    diagnosticoprevio: patient.diagnosticoprevio,
    direccionpaciente: patient.direccionpaciente,
    ciudadpaciente: patient.ciudadpaciente,
    nombreyapellidoresponsable: patient.nombreyapellidoresponsable,
    telefonoresponsable: patient.telefonoresponsable,
    escuela: patient.escuela,
    direccionescuela: patient.direccionescuela,
    telefonoescuela: patient.telefonoescuela,
    aniogradoSala: patient.aniogradosala,
    nombreyapellidodocentereferenteescuela:
      patient.nombreyapellidodocentereferenteescuela,
    nombreyapellidodirectivoescuela: patient.nombreyapellidodirectivoescuela,
    escuelaespecial: patient.escuelaespecial,
    nombreyapellidodocentereferenteescuelaespecial:
      patient.nombreyapellidodocentereferenteescuelaespecial,
    telefonodocentereferenteescuelaespecial:
      patient.telefonodocentereferenteescuelaespecial,
    cud: patient.cud,
    fechavencimientocud: patient.fechavencimientocud,
    fechainiciotto: patient.fechainiciotto,
    fechaultimaactualizacion: patient.fechaultimaactualizacion,
    handleGoBack,
  };

  return <PatientsDetail {...props} />;
};
