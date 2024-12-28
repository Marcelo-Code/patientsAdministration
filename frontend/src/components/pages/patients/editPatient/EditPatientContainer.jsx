import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../../context/GeneralContext";
import dayjs from "dayjs";
import { Spinner } from "../../../common/spinner/Spinner";
import {
  getPatientRecord,
  updatePatientRecord,
} from "../../../../api/patients";
import { EditPatient } from "./EditPatient";
import { Footer } from "../../../layout/footer/Footer";

export const EditPatientContainer = () => {
  const { patientId } = useParams();
  const { goBackAction, cancelAction, setPageIsLoading } =
    useContext(GeneralContext);
  const [isLoading, setIsLoading] = useState(false);

  //hook para guardar los datos que se recuperan de la DB:
  //* Paciente de la consulta

  const [patientRecord, setPatientRecord] = useState(null);

  //hooks para detectar los cambios

  const initialModifiedState = {
    obrasocialpaciente: false,
    nombreyapellidopaciente: false,
    nroafiliadopaciente: false,
    telefonoobrasocial: false,
    email1obrasocial: false,
    email2obrasocial: false,
    email3obrasocial: false,
    nombreyapellidoreferenteobrasocial: false,
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
    setPatientRecord({ ...patientRecord, [name]: value });
    setModified({ ...modified, [name]: true });
    if (!modifiedFlag) setModifiedFlag(true);
    console.log(patientRecord);
  };

  useEffect(() => {
    setPageIsLoading(true),
      getPatientRecord(patientId)
        .then((response) => {
          setPatientRecord(response);
        })
        .catch((error) => console.log(error));
  }, [patientId, setPageIsLoading]);

  if (!patientRecord) return <Spinner />;

  //Función para llamar a la función PUT

  const handleSubmit = () => {
    const today = dayjs().format("YYYY-MM-DD");
    const updatedPatient = {
      ...patientRecord,
      fechaultimaactualizacion: today,
    };
    setIsLoading(true);
    updatePatientRecord(updatedPatient, patientId)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
      })
      .catch((error) => console.log(error.message));
  };

  const props = {
    obrasocialpaciente: patientRecord.obrasocialpaciente,
    nombreyapellidopaciente: patientRecord.nombreyapellidopaciente,
    nroafiliadopaciente: patientRecord.nroafiliadopaciente,
    telefonoobrasocial: patientRecord.telefonoobrasocial,
    email1obrasocial: patientRecord.email1obrasocial,
    email2obrasocial: patientRecord.email2obrasocial,
    email3obrasocial: patientRecord.email3obrasocial,
    nombreyapellidoreferenteobrasocial:
      patientRecord.nombreyapellidoreferenteobrasocial,
    dnipaciente: patientRecord.dnipaciente,
    fechanacimientopaciente: patientRecord.fechanacimientopaciente,
    direccionpaciente: patientRecord.direccionpaciente,
    telefonoresponsable: patientRecord.telefonoresponsable,
    ciudadpaciente: patientRecord.ciudadpaciente,
    nombreyapellidoresponsable: patientRecord.nombreyapellidoresponsable,
    escuela: patientRecord.escuela,
    direccionescuela: patientRecord.direccionescuela,
    telefonoescuela: patientRecord.telefonoescuela,
    aniogradosala: patientRecord.aniogradosala,
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
    diagnosticoprevio: patientRecord.diagnosticoprevio,
    goBackAction,
    handleChange,
    handleSubmit,
    isLoading,
    modified,
    modifiedFlag,
    cancelAction,
    setPageIsLoading,
  };

  return (
    <>
      <EditPatient {...props} />
    </>
  );
};
