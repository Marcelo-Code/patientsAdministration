import { useContext, useEffect, useState } from "react";

import { GeneralContext } from "../../../../../context/GeneralContext";
import { Spinner } from "../../../../common/spinner/Spinner";
import { getProfessionalsRecords } from "../../../../../api/professionals";
import { getPatientsRecords } from "../../../../../api/patients";
import { createNoCudBillingRecord } from "../../../../../api/noCudBilling";
import { CreateNoCudBilling } from "./CreateNoCudBilling";
import { Footer } from "../../../../layout/footer/Footer";

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
    retencion: false,
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
    retencion: 0,
    montofinalprofesional: 0,
    fechadepago: null,
    destinatario: "",
    pacienteadeuda: false,
    fechadeuda: null,
    pagomontoadeudado: false,
    fechapagomontoadeudado: null,
    documentofactura: "",
    documentocomprobantepagoretencion: "",
  };

  const [billRecordNoCud, setBillRecordNoCud] = useState(
    billRecordInitialState
  );

  useEffect(() => {
    getProfessionalsRecords()
      .then((response) => {
        setProfessionals(response);
      })
      .catch((error) => console.log(error));
    getPatientsRecords()
      .then((response) => {
        setPatients(response);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!professionals || !patients) return <Spinner />;

  const handleChange = async (e) => {
    const { name, value, value2 } = e.target;
    const updatedBillRecordNoCud = { ...billRecordNoCud, [name]: value };
    if (name === "montosesion") {
      updatedBillRecordNoCud.retencion =
        updatedBillRecordNoCud.montosesion * 0.35;
      updatedBillRecordNoCud.montofinalprofesional =
        updatedBillRecordNoCud.montosesion * 0.65;
    }
    if (name === "pacienteadeuda" && !value) {
      updatedBillRecordNoCud.fechadeuda = null;
      updatedBillRecordNoCud.pagomontoadeudado = false;
      updatedBillRecordNoCud.fechapagomontoadeudado = null;
    }
    if (name === "pagomontoadeudado" && !value)
      updatedBillRecordNoCud.fechapagomontoadeudado = null;
    if (value2 && name === "idprofesional") {
      updatedBillRecordNoCud.nombreyapellidoprofesional = value2;
    }
    if (value2 && name === "idpaciente") {
      updatedBillRecordNoCud.nombreyapellidopaciente = value2;
    }
    setBillRecordNoCud(updatedBillRecordNoCud);
    setModified({ ...modified, [name]: true });
    if (!modifiedFlag) setModifiedFlag(true);
    console.log(updatedBillRecordNoCud);
    // console.log(modified);
    // console.log(billRecordNoCud);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    createNoCudBillingRecord(billRecordNoCud)
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
    billRecordNoCud,
  };

  return (
    <>
      <CreateNoCudBilling {...props} />;
      <Footer />
    </>
  );
};
