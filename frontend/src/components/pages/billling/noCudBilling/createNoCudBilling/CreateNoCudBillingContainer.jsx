import { useContext, useEffect, useState } from "react";
import { createBillRecordNoCud } from "../../../../../api/noCudBilling";
import { CreateNoCudBilling } from "./CreateNoCudBilling";
import { GeneralContext } from "../../../../../context/GeneralContext";
import { getProfessionals } from "../../../../../api/professionals";
import { Spinner } from "../../../../common/spinner/Spinner";
import { getPatient, getPatients } from "../../../../../api/patients";

export const CreateNoCudBillingContainer = () => {
  const { goBackAction, createList, cancelAction } = useContext(GeneralContext);
  const [professionals, setProfessionals] = useState(null);
  const [patients, setPatients] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const initialModifiedState = {
    idprofesional: false,
    nombreyapellidoprofesional: false,
    prestacion: false,
    idpaciente: false,
    nombreyapellidopaciente: false,
    obrasocialpaciente: false,
    periodofacturado: false,
    nrofactura: false,
    montofacturado: false,
    fechapresentacionos: false,
    fecharecepcionos: false,
    fechareclamo: false,
    medioreclamo: false,
    respuestareclamo: false,
    cobradaenfecha: false,
    montopercibido: false,
    percepcion: false,
    montofinalprofesional: false,
  };
  const [modified, setModified] = useState(initialModifiedState);
  const [modifiedFlag, setModifiedFlag] = useState(false);

  const billRecordInitialState = {
    idprofesional: "",
    nombreyapellidoprofesional: "",
    prestacion: "",
    idpaciente: "",
    nombreyapellidopaciente: "",
    modopago: "",
    mediopago: "",
    destinatariopago: "",
    montosesion: 0,
    precepcion: 0,
    montoapercibir: 0,
    fechadepago: null,
    destinatario: "",
    pacienteadeuda: false,
    fechadeuda: null,
    pagomontoadeudado: "",
    fechapagomontoadeudado: null,
    documentofactura: "",
  };

  const [billRecordNoCud, setBillRecordNoCud] = useState(
    billRecordInitialState
  );

  useEffect(() => {
    getProfessionals()
      .then((response) => {
        setProfessionals(response);
      })
      .catch((error) => console.log(error));
    getPatients()
      .then((response) => {
        setPatients(response);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!professionals || !patients) return <Spinner />;

  const handleChange = async (e) => {
    const { name, value, value2 } = e.target;
    const updatedBillRecordNoCud = { ...billRecordNoCud, [name]: value };
    if (name === "montopercibido") {
      updatedBillRecordNoCud.percepcion =
        updatedBillRecordNoCud.montosesion * 0.35;
      updatedBillRecordNoCud.apercibir =
        updatedBillRecordNoCud.montosesion * 0.65;
    }
    if (value2 && name === "idprofesional") {
      updatedBillRecordNoCud.nombreyapellidoprofesional = value2;
    }
    if (value2 && name === "idpaciente") {
      updatedBillRecordNoCud.nombreyapellidopaciente = value2;
      try {
        const response = await getPatient(value);
        updatedBillRecordNoCud.obrasocialpaciente = response.obrasocialpaciente;
      } catch (error) {
        console.log(error);
      }
    }
    setBillRecordNoCud(updatedBillRecordNoCud);
    setModified({ ...modified, [name]: true });
    if (!modifiedFlag) setModifiedFlag(true);
    console.log(updatedBillRecordNoCud);
    // console.log(modified);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    createBillRecordNoCud(billRecordNoCud)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const professionalList = createList(
    professionals,
    "nombreyapellidoprofesional",
    "id",
    false,
    "nombreyapellidoprofesional"
  );

  const patientsList = createList(
    patients,
    "nombreyapellidopaciente",
    "id",
    false,
    "nombreyapellidopaciente"
  );

  const professionalsProps = {
    handleChange: handleChange,
    name: "idprofesional",
    array: professionalList,
    initialValue: "Selecc. Profesional",
  };

  const patientsProps = {
    handleChange: handleChange,
    name: "idpaciente",
    array: patientsList,
    initialValue: "Selecc. Paciente",
  };

  const props = {
    handleChange,
    handleSubmit,
    isLoading,
    cancelAction,
    goBackAction,
    professionalsProps,
    patientsProps,
    modifiedFlag,
    pagomontoadeudado: billRecordNoCud.pagomontoadeudado,
    billRecordNoCud,
  };

  return <CreateNoCudBilling {...props} />;
};
