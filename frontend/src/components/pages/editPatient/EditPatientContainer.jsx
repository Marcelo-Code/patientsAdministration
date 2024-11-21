import { useParams } from "react-router-dom";
import { EditPatient } from "./EditPatient";
import { getPatient, updatePatient } from "../../../api/patients";
import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../context/GeneralContext";
import dayjs from "dayjs";
import { Spinner } from "../../common/spinner/Spinner";

export const EditPatientContainer = () => {
  const { patientId } = useParams();
  const [cud, setCud] = useState(false);
  const { goBackAction, handleGoBack, isLoading, setIsLoading, cancelAction } =
    useContext(GeneralContext);
  const [modifiedFlag, setModifiedFlag] = useState(false);
  const [patient, setPatient] = useState(null);

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

  const handleChange = (e) => {
    const { value, name } = e.target;
    setPatient({ ...patient, [name]: value });
    setModified({ ...modified, [name]: true });
    setModifiedFlag(true);
  };

  const handleDateChange = (name, newDate) => {
    const formattedDate = dayjs(newDate).format("YYYY-MM-DD");
    setPatient((prevPatient) => ({ ...prevPatient, [name]: formattedDate }));
    setPatient((prevPatient) => ({ ...prevPatient, [name]: formattedDate }));
    setModified({ ...modified, [name]: true });
    setModifiedFlag(true);
  };

  const handleRadioChange = (e) => {
    const newCud = e.target.value === "yes";
    setCud(newCud);
    console.log(cud);
    setPatient({ ...patient, cud: newCud });
    setModified({ ...modified, cud: true });
    setModifiedFlag(true);
  };

  const handleSubmit = () => {
    const today = dayjs().format("YYYY-MM-DD");
    const updatedPatient = { ...patient, fechaultimaactualizacion: today };
    setIsLoading(true);
    updatePatient(updatedPatient, patientId)
      .then((response) => {
        console.log(response),
          setIsLoading(false),
          setModified(false),
          handleGoBack();
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    setIsLoading(true);
    getPatient(patientId)
      .then((response) => {
        setPatient(response);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [patientId, setIsLoading]);

  if (!patient) return <Spinner />;

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
    handleDateChange,
    handleRadioChange,
    handleSubmit,
    isLoading,
    modified,
    modifiedFlag,
    setModifiedFlag,
    cancelAction,
  };

  return <EditPatient {...props} />;
};
