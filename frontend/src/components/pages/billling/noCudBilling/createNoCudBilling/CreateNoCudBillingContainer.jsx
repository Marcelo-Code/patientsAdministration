import { useContext, useEffect, useState } from "react";

import { GeneralContext } from "../../../../../context/GeneralContext";
import { Spinner } from "../../../../common/spinner/Spinner";
import { getProfessionalsRecords } from "../../../../../api/professionals";
import { getPatientsRecords } from "../../../../../api/patients";
import { createNoCudBillingRecord } from "../../../../../api/noCudBilling";
import { CreateNoCudBilling } from "./CreateNoCudBilling";
import { useParams } from "react-router-dom";

export const CreateNoCudBillingContainer = () => {
  const { goBackAction, createList, cancelAction, setPageIsLoading } =
    useContext(GeneralContext);
  const [professionalsRecords, setProfessionalsRecords] = useState(null);
  const [patientsRecords, setPatientsRecords] = useState(null);
  const [patientRecord, setPatientRecord] = useState(null);
  const [professionalRecord, setProfessionalRecord] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { professionalId = null, patientId = null } = useParams();

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
    setPageIsLoading(true);
    getProfessionalsRecords()
      .then((response) => {
        setProfessionalsRecords(response);
        if (professionalId) {
          const foundProfessionalRecord = response.find(
            (record) => record.id === parseInt(professionalId)
          );
          setProfessionalRecord(foundProfessionalRecord);
          console.log(foundProfessionalRecord);
        }
      })
      .catch((error) => console.log(error));
    getPatientsRecords()
      .then((response) => {
        setPatientsRecords(response);
        if (patientId) {
          const foundPatientRecord = response.find(
            (record) => record.id === parseInt(patientId)
          );
          setPatientRecord(foundPatientRecord);
          console.log(foundPatientRecord);
        }
      })
      .catch((error) => console.log(error));
  }, [setPageIsLoading, professionalId, patientId]);

  if (!professionalsRecords || !patientsRecords) return <Spinner />;

  const handleChange = async (e) => {
    const { name, value, value2 } = e.target;
    const updatedNoCudBillRecord = { ...billRecordNoCud, [name]: value };
    if (name === "montosesion") {
      updatedNoCudBillRecord.retencion =
        updatedNoCudBillRecord.montosesion * 0.35;
      updatedNoCudBillRecord.montofinalprofesional =
        updatedNoCudBillRecord.montosesion * 0.65;
    }
    if (name === "pacienteadeuda" && !value) {
      updatedNoCudBillRecord.fechadeuda = null;
      updatedNoCudBillRecord.pagomontoadeudado = false;
      updatedNoCudBillRecord.fechapagomontoadeudado = null;
    }
    if (name === "pagomontoadeudado" && !value)
      updatedNoCudBillRecord.fechapagomontoadeudado = null;
    if (value2 && name === "idprofesional") {
      updatedNoCudBillRecord.nombreyapellidoprofesional = value2;
    }
    if (value2 && name === "idpaciente") {
      updatedNoCudBillRecord.nombreyapellidopaciente = value2;
    }
    if (
      professionalId &&
      !updatedNoCudBillRecord.idprofesional &&
      !updatedNoCudBillRecord.nombreyapellidoprofesional
    ) {
      updatedNoCudBillRecord.idprofesional = professionalRecord.id;
      updatedNoCudBillRecord.nombreyapellidoprofesional =
        professionalRecord.nombreyapellidoprofesional;
    }

    if (
      patientId &&
      !updatedNoCudBillRecord.idpaciente &&
      !updatedNoCudBillRecord.nombreyapellidopaciente
    ) {
      updatedNoCudBillRecord.idpaciente = patientRecord.id;
      updatedNoCudBillRecord.nombreyapellidopaciente =
        patientRecord.nombreyapellidopaciente;
      updatedNoCudBillRecord.obrasocialpaciente =
        patientRecord.obrasocialpaciente;
    }

    setBillRecordNoCud(updatedNoCudBillRecord);
    setModified({ ...modified, [name]: true });
    if (!modifiedFlag) setModifiedFlag(true);
    console.log(updatedNoCudBillRecord);
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
    professionalsRecords,
    "nombreyapellidoprofesional",
    "id",
    false,
    "nombreyapellidoprofesional"
  );

  const patientsList = createList(
    patientsRecords,
    "nombreyapellidopaciente",
    "id",
    false,
    "nombreyapellidopaciente"
  );

  const professionalsProps = {
    handleChange: handleChange,
    name: "idprofesional",
    array: professionalList,
    initialValue: professionalId
      ? professionalRecord.nombreyapellidoprofesional
      : "Selecc. Profesional",
  };

  const patientsProps = {
    handleChange: handleChange,
    name: "idpaciente",
    array: patientsList,
    initialValue: patientId
      ? patientRecord.nombreyapellidopaciente
      : "Selecc. Paciente",
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
    setPageIsLoading,
    professionalId,
    patientId,
    professionalRecord,
    patientRecord,
  };

  return (
    <>
      <CreateNoCudBilling {...props} />
    </>
  );
};
