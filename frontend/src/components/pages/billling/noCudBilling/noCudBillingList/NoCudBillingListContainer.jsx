/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { GeneralContext } from "../../../../../context/GeneralContext";

import { NoCudBillingList } from "./NoCudBillingList";
import {
  getNoCudBillingRecord,
  updateNoCudBillingRecord,
} from "../../../../../api/facturacionNoCud/noCudBilling";

export const NoCudBillingListContainer = ({
  setNoCudBillingRecords,
  noCudBillingRecords,
  patientsRecords,
  professionalsRecords,
  updateList,
  setUpdateList,
  setUpdateNoCudBillingList,
  filteredNoCudBillingRecords,
  patientId,
  professionalId,
}) => {
  const {
    handleGoBack,
    createList,
    cancelAction,
    cancelTableAction,
    removeAccentsAndSpecialChars,
  } = useContext(GeneralContext);

  const [editModeFields, setEditModeFields] = useState(null);

  const initialModifiedState = {
    idprofesional: false,
    nombreyapellidoprofesional: false,
    prestacion: false,
    idpaciente: false,
    nombreyapellidopaciente: false,
    modopago: false,
    mediopago: false,
    destinatariopago: false,
    montosesion: false,
    precepcion: false,
    montofinalprofesional: false,
    fechadepago: false,
    destinatario: false,
    pacienteadeuda: false,
    fechadeuda: false,
    pagomontoadeudado: false,
    fechapagomontoadeudado: false,
    documentofactura: false,
  };
  const [modified, setModified] = useState(initialModifiedState);
  const [modifiedFlag, setModifiedFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    pagomontoadeudado: true,
    fechapagomontoadeudado: null,
    documentofactura: "",
    documentocomprobantepagoretencion: "",
  };
  const [noCudBillingRecord, setNoCudBillingRecord] = useState(
    billRecordInitialState
  );

  const [editMode, setEditMode] = useState(false);
  const handleEditModeChange = (e) => {
    setEditMode(e.target.checked);
    !editMode && setModified(initialModifiedState);
    editMode && setEditModeFields(null);
  };

  const handleEditModeField = (id) => {
    setEditModeFields(id);
    setIsLoading(true);
    getNoCudBillingRecord(id)
      .then((response) => {
        console.log(response);
        setNoCudBillingRecord(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleChange = (e) => {
    const { name, value, value2 } = e.target;
    const updatedNoCudBillingRecord = { ...noCudBillingRecord, [name]: value };
    if (value2 && name === "idprofesional")
      updatedNoCudBillingRecord.nombreyapellidoprofesional = value2;
    if (value2 && name === "idpaciente")
      updatedNoCudBillingRecord.nombreyapellidopaciente = value2;
    if (name === "montosesion") {
      updatedNoCudBillingRecord.retencion =
        updatedNoCudBillingRecord.montosesion * 0.35;
      updatedNoCudBillingRecord.montofinalprofesional =
        updatedNoCudBillingRecord.montosesion * 0.65;
    }
    if (name === "pacienteadeuda" && !value) {
      updatedNoCudBillingRecord.fechadeuda = null;
      updatedNoCudBillingRecord.pagomontoadeudado = false;
      updatedNoCudBillingRecord.fechapagomontoadeudado = null;
    }
    if (name === "pagomontoadeudado" && !value)
      updatedNoCudBillingRecord.fechapagomontoadeudado = null;
    setNoCudBillingRecord(updatedNoCudBillingRecord);
    setModified({ ...modified, [name]: true });
    if (!modifiedFlag) setModifiedFlag(true);
    // console.log(updatedBillRecordCud);
  };

  const handleSubmit = (idRecordCud) => {
    setIsLoading(true);
    updateNoCudBillingRecord(noCudBillingRecord, idRecordCud)
      .then((response) => {
        console.log(response);
        setEditModeFields(null);
        setUpdateNoCudBillingList(!updateList);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    if (value === "Todos") {
      setNoCudBillingRecords(filteredNoCudBillingRecords);
    } else {
      const filteredRecords = filteredNoCudBillingRecords.filter(
        (record) => record.periodofacturado === value
      );
      setNoCudBillingRecords(filteredRecords);
    }
  };

  const billingPeriodFilterList = createList(
    noCudBillingRecords,
    "periodofacturado",
    "periodofacturado",
    true,
    "periodofacturado"
  );

  const professionalsList = createList(
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
    array: professionalsList,
    // initialValue: "Selecc. Profesional",
    modified: modified.idprofesional,
  };

  const patientsProps = {
    handleChange: handleChange,
    name: "idpaciente",
    array: patientsList,
    // initialValue: "Selecc. Paciente",
    modified: modified.idpaciente,
  };

  const menuFilterProps = {
    handleChange: handleFilterChange,
    name: "idProfesional",
    array: billingPeriodFilterList,
    initialValue: "Todos",
    // modified: modified.nombreyapellidopaciente,
    date: true,
  };

  const noCudBillingListProps = {
    noCudBillingRecords,
    editMode,
    handleEditModeChange,
    handleEditModeField,
    handleSubmit,
    handleChange,
    setEditModeFields,
    editModeFields,
    setUpdateNoCudBillingList,
    updateList,
    setUpdateList,
    cancelTableAction,
    professionalsProps,
    patientsProps,
    noCudBillingRecord,
    modified,
    setModified,
    initialModifiedState,
    setIsLoading,
    isLoading,
    menuFilterProps,
    handleGoBack,
    cancelAction,
    modifiedFlag,
    removeAccentsAndSpecialChars,
    patientId,
    professionalId,
  };
  return (
    <>
      <NoCudBillingList {...noCudBillingListProps} />
    </>
  );
};
