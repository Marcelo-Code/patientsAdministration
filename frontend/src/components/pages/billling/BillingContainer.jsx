import { useContext, useEffect, useState } from "react";
import { Billing } from "./Billing";
import { GeneralContext } from "../../../context/GeneralContext";
import { useParams } from "react-router-dom";

import { Spinner } from "../../common/spinner/Spinner";
import { getNoCudBillingRecords } from "../../../api/facturacionNoCud/noCudBilling";
import {
  getProfessionalRecord,
  getProfessionalsRecords,
} from "../../../api/profesionales/professionals";
import {
  getPatientRecord,
  getPatientsRecords,
} from "../../../api/pacientes/patients";
import { getCudBillingRecords } from "../../../api/facturacionCud/cudBilling";

export const BillingContainer = () => {
  const { handleGoBack, setPageIsLoading } = useContext(GeneralContext);

  const [noCudBillingRecords, setNoCudBillingRecords] = useState(null);
  const [cudBillingRecords, setCudBillingRecords] = useState(null);
  const [filteredNoCudBillingRecords, setFilteredNoCudBillingRecords] =
    useState(null);
  const [filteredCudBillingRecords, setFilteredCudBillingRecords] =
    useState(null);
  const [professionalsRecords, setProfessionalsRecords] = useState(null);
  const [patientsRecords, setPatientsRecords] = useState(null);
  const [patientRecord, setPatientRecord] = useState(null);
  const [updateList, setUpdateList] = useState(false);
  const [name, setName] = useState(null);

  const { patientId = null, professionalId = null } = useParams();

  const [userRolRecord, setUserRolRecord] = useState(null);
  useEffect(() => {
    const userRolRecord = JSON.parse(localStorage.getItem("userRolRecord"));
    setUserRolRecord(userRolRecord);
  }, []);

  useEffect(() => {
    setPageIsLoading(true);
  }, [setPageIsLoading]);

  useEffect(() => {
    if (patientId) {
      getPatientRecord(patientId)
        .then((response) => setPatientRecord(response))
        .catch((error) => console.log(error));
    } else {
      setPatientRecord(null);
    }
    getNoCudBillingRecords()
      .then((response) => {
        let filteredResponse;
        if (patientId) {
          getPatientRecord(patientId)
            .then((response) => setName(response))
            .catch((error) => console.log(error));
          filteredResponse = response.filter(
            (record) => record.idpaciente === parseInt(patientId)
          );
        } else if (professionalId) {
          getProfessionalRecord(professionalId)
            .then((response) => setName(response))
            .catch((error) => console.log(error));
          filteredResponse = response.filter(
            (record) => record.idprofesional === parseInt(professionalId)
          );
        }

        //Si se toma el idprofesional desde el contexto se filtra
        else if (userRolRecord?.user?.idprofesional) {
          filteredResponse = response.filter(
            (record) =>
              record.idprofesional ===
              parseInt(userRolRecord.user.idprofesional)
          );
        } else {
          filteredResponse = response;
        }
        const sortedResponse = filteredResponse.sort((a, b) => {
          return a.nombreyapellidoprofesional.localeCompare(
            b.nombreyapellidoprofesional
          );
        });
        setNoCudBillingRecords(sortedResponse);
        setFilteredNoCudBillingRecords(sortedResponse);
      })
      .catch((error) => console.log(error));
    getCudBillingRecords()
      .then((response) => {
        let filteredResponse;
        if (patientId) {
          filteredResponse = response.filter(
            (record) => record.idpaciente === parseInt(patientId)
          );
        } else if (professionalId) {
          filteredResponse = response.filter(
            (record) => record.idprofesional === parseInt(professionalId)
          );
        }

        //Si se toma el idprofesional desde el contexto se filtra
        else if (userRolRecord?.user?.idprofesional) {
          filteredResponse = response.filter(
            (record) =>
              record.idprofesional ===
              parseInt(userRolRecord.user.idprofesional)
          );
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
        setProfessionalsRecords(response);
      })
      .catch((error) => console.log(error));
    getPatientsRecords()
      .then((response) => {
        setPatientsRecords(response);
      })
      .catch((error) => console.log(error));
  }, [updateList, patientId, professionalId, setPageIsLoading, userRolRecord]);

  if (
    !professionalsRecords ||
    !noCudBillingRecords ||
    !cudBillingRecords ||
    !patientsRecords ||
    (patientId && !patientRecord) ||
    (!name && (professionalId || patientId))
  )
    return <Spinner />;

  const props = {
    handleGoBack,
    patientsRecords,
    professionalsRecords,
    updateList,
    setUpdateList,

    //No Cud
    //------
    setNoCudBillingRecords,
    noCudBillingRecords,
    filteredNoCudBillingRecords,

    //---------------
    //Cud
    setCudBillingRecords,
    cudBillingRecords,
    filteredCudBillingRecords,
    setPageIsLoading,
    patientId,
    professionalId,
    name,

    patientRecord,
  };

  return (
    <>
      <Billing {...props} />
    </>
  );
};
