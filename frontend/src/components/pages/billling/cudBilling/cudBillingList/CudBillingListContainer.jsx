/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";

import { CudBillingList } from "./CudBillingList";
import { GeneralContext } from "../../../../../context/GeneralContext";
import { Spinner } from "../../../../common/spinner/Spinner";

import {
  getCudBillingRecord,
  getCudBillingRecords,
  updateCudBillingRecord,
} from "../../../../../api/cudBilling";
import { getProfessionalsRecords } from "../../../../../api/professionals";
import { getPatientsRecords } from "../../../../../api/patients";
import { Footer } from "../../../../layout/footer/Footer";

export const CudBillingListContainer = ({ patientId }) => {
  const { createList, cancelTableAction } = useContext(GeneralContext);
  const [cudBillingRecords, setCudBillingRecords] = useState(null);
  const [filteredCudBillingRecords, setFilteredCudBillingRecords] =
    useState(null);
  const [updateList, setUpdateList] = useState(false);

  const [editModeFields, setEditModeFields] = useState(null);

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
    retencion: false,
    montofinalprofesional: false,
  };
  const [modified, setModified] = useState(initialModifiedState);
  const [modifiedFlag, setModifiedFlag] = useState(false);
  const [professionals, setProfessionals] = useState(null);
  const [patients, setPatients] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const cudBillingRecordInitialState = {
    idprofesional: "",
    nombreyapellidoprofesional: "",
    prestacion: "",
    idpaciente: "",
    nombreyapellidopaciente: "",
    obrasocialpaciente: "",
    periodofacturado: null,
    nrofactura: "",
    montofacturado: 0,
    fechapresentacionos: null,
    fecharecepcionos: null,
    fechareclamo: null,
    medioreclamo: "",
    respuestareclamo: "",
    cobradaenfecha: true,
    montopercibido: 0,
    retencion: 0,
    montofinalprofesional: 0,
  };
  const [cudBillingRecord, setCudBillingRecord] = useState(
    cudBillingRecordInitialState
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
    // console.log(id);
    getCudBillingRecord(id)
      .then((response) => {
        setCudBillingRecord(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
    // console.log(billRecordCud);
  };

  useEffect(() => {
    getCudBillingRecords()
      .then((response) => {
        let filteredResponse;
        if (patientId) {
          filteredResponse = response.filter(
            (record) => record.idpaciente === parseInt(patientId)
          );
          console.log(filteredResponse);
        } else {
          filteredResponse = response;
        }
        const sortedResponse = filteredResponse.sort((a, b) => {
          return a.nombreyapellidoprofesional.localeCompare(
            b.nombreyapellidoprofesional
          );
        });
        setCudBillingRecords(sortedResponse);
        setFilteredCudBillingRecords(sortedResponse);
      })
      .catch((error) => console.log(error));
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
  }, [updateList, patientId]);

  if (!cudBillingRecords || !patients || !professionals) return <Spinner />;

  // console.log(billingRecords);

  const handleChange = (e) => {
    const { name, value, value2 } = e.target;
    const updatedCudBillingRecord = { ...cudBillingRecord, [name]: value };
    if (value2 && name === "idprofesional")
      updatedCudBillingRecord.nombreyapellidoprofesional = value2;
    if (value2 && name === "idpaciente")
      updatedCudBillingRecord.nombreyapellidopaciente = value2;
    if (name === "montopercibido") {
      updatedCudBillingRecord.retencion = value * 0.35;
      updatedCudBillingRecord.montofinalprofesional = value * 0.65;
    }
    if (name === "fechareclamo" && !value) {
      updateCudBillingRecord.medioreclamo = "";
      updateCudBillingRecord.respuestareclamo = "";
    }
    setCudBillingRecord(updatedCudBillingRecord);
    setModified({ ...modified, [name]: true });
    if (!modifiedFlag) setModifiedFlag(true);
  };

  const handleSubmit = (idCudBillingRecord) => {
    setIsLoading(true);
    updateCudBillingRecord(cudBillingRecord, idCudBillingRecord)
      .then((response) => {
        // console.log(response);
        setEditModeFields(null);
        setUpdateList(!updateList);
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
      setCudBillingRecords(filteredCudBillingRecords);
    } else {
      const filteredRecords = filteredCudBillingRecords.filter(
        (record) => record.periodofacturado === value
      );
      setCudBillingRecords(filteredRecords);
    }
  };

  const billingPeriodFilterList = createList(
    cudBillingRecords,
    "periodofacturado",
    "periodofacturado",
    true,
    "periodofacturado"
  );

  const professionalsList = createList(
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

  const props = {
    cudBillingRecords,
    editMode,
    handleEditModeChange,
    handleEditModeField,
    handleSubmit,
    handleChange,
    setEditModeFields,
    editModeFields,
    setUpdateList,
    updateList,
    cancelTableAction,
    professionalsProps,
    patientsProps,
    cudBillingRecord,
    modified,
    setModified,
    initialModifiedState,
    setIsLoading,
    isLoading,
    menuFilterProps,

    // prestacion: cudBillingRecord.prestacion,
    // cancelAction,
    // modifiedFlag,
    // handleGoBack,
  };
  return (
    <>
      <CudBillingList {...props} />;
      <Footer />
    </>
  );
};
