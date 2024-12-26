import { useContext, useEffect, useState } from "react";
import { Billing } from "./Billing";
import { GeneralContext } from "../../../context/GeneralContext";
import { useParams } from "react-router-dom";
import { getNoCudBillingRecords } from "../../../api/noCudBilling";
import { getProfessionalsRecords } from "../../../api/professionals";
import { getPatientsRecords } from "../../../api/patients";
import { Spinner } from "../../common/spinner/Spinner";
import { getCudBillingRecords } from "../../../api/cudBilling";
import { Footer } from "../../layout/footer/Footer";
import { NavBarContainer } from "../../layout/navBar/NavBarContainer";
import { parseSelectedSections } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";

export const BillingContainer = () => {
  const { handleGoBack } = useContext(GeneralContext);
  const [noCudBillingRecords, setNoCudBillingRecords] = useState(null);
  const [cudBillingRecords, setCudBillingRecords] = useState(null);
  const [filteredNoCudBillingRecords, setFilteredNoCudBillingRecords] =
    useState(null);
  const [filteredCudBillingRecords, setFilteredCudBillingRecords] =
    useState(null);
  const [professionalsRecords, setProfessionalsRecords] = useState(null);
  const [patientsRecords, setPatientsRecords] = useState(null);
  const [updateList, setUpdateList] = useState(false);

  const { patientId = null, professionalId = null } = useParams();

  if (professionalId) console.log("id profesional " + professionalId);

  useEffect(() => {
    getNoCudBillingRecords()
      .then((response) => {
        let filteredResponse;
        if (patientId) {
          filteredResponse = response.filter(
            (record) => record.idpaciente === parseInt(patientId)
          );
        }
        if (professionalId) {
          filteredResponse = response.filter(
            (record) => record.idprofesional === parseInt(professionalId)
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
        }
        if (professionalId) {
          filteredResponse = response.filter(
            (record) => record.idprofesional === parseInt(professionalId)
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
  }, [updateList, patientId]);

  if (
    !noCudBillingRecords ||
    !cudBillingRecords ||
    !patientsRecords ||
    !professionalsRecords
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
  };

  return (
    <>
      <NavBarContainer />
      <Billing {...props} />
      <Footer />
    </>
  );
};
