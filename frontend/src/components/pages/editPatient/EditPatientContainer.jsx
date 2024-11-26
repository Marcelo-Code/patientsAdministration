import { useParams } from "react-router-dom";
import { EditPatient } from "./EditPatient";
import { getPatient, updatePatient } from "../../../api/patients";
import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../context/GeneralContext";
import dayjs from "dayjs";
import { Spinner } from "../../common/spinner/Spinner";

export const EditPatientContainer = () => {
  const { patientId } = useParams();
  const { goBackAction, cancelAction, isLoading, setIsLoading } =
    useContext(GeneralContext);

  //hook para guardar los datos que se recuperan de la DB:
  //* Paciente de la consulta

  const [patient, setPatient] = useState(null);

  //hooks para detectar los cambios

  const initialModifiedState = {
    obrasocialpaciente: false,
    nombreyapellidopaciente: false,
    nroafiliadopaciente: false,
    dnipaciente: false,
    fechanacimientopaciente: false,
    direccionpaciente: false,
    telefonoresponsable: false,
    ciudadpaciente: false,
    nombreyapellidoresponsable: false,
    escuela: false,
    direccionescuela: false,
    telefonoescuela: false,
    aniogradosala: false,
    nombreyapellidodocentereferenteescuela: false,
    nombreyapellidodirectivoescuela: false,
    escuelaespecial: false,
    nombreyapellidodocentereferenteescuelaespecial: false,
    telefonodocentereferenteescuelaespecial: false,
    cud: false,
    fechavencimientocud: false,
    fechainiciotto: false,
    diagnosticoprevio: false,
  };
  const [modified, setModified] = useState(initialModifiedState);
  const [modifiedFlag, setModifiedFlag] = useState(false);

  //Función para guardar los cambios en el registro

  const handleChange = (e) => {
    const { value, name } = e.target;
    setPatient({ ...patient, [name]: value });
    setModified({ ...modified, [name]: true });
    if (!modifiedFlag) setModifiedFlag(true);
    console.log(patient);
  };

  useEffect(() => {
    getPatient(patientId)
      .then((response) => {
        setPatient(response);
      })
      .catch((error) => console.log(error));
  }, [patientId]);

  if (!patient) return <Spinner />;

  //Función para llamar a la función PUT

  const handleSubmit = () => {
    const today = dayjs().format("YYYY-MM-DD");
    const updatedPatient = { ...patient, fechaultimaactualizacion: today };
    setIsLoading(true);
    updatePatient(updatedPatient, patientId)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
      })
      .catch((error) => console.log(error.message));
  };

  const props = {
    obrasocialpaciente: patient.obrasocialpaciente,
    nombreyapellidopaciente: patient.nombreyapellidopaciente,
    nroafiliadopaciente: patient.nroafiliadopaciente,
    dnipaciente: patient.dnipaciente,
    fechanacimientopaciente: patient.fechanacimientopaciente,
    direccionpaciente: patient.direccionpaciente,
    telefonoresponsable: patient.telefonoresponsable,
    ciudadpaciente: patient.ciudadpaciente,
    nombreyapellidoresponsable: patient.nombreyapellidoresponsable,
    escuela: patient.escuela,
    direccionescuela: patient.direccionescuela,
    telefonoescuela: patient.telefonoescuela,
    aniogradosala: patient.aniogradosala,
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
    diagnosticoprevio: patient.diagnosticoprevio,
    goBackAction,
    handleChange,
    handleSubmit,
    isLoading,
    modified,
    modifiedFlag,
    cancelAction,
  };

  return <EditPatient {...props} />;
};
