import { PatientsList } from "./PatientsList";
import "./patientsList.css";
import { useContext, useEffect, useState } from "react";
import { Spinner } from "../../../../common/spinner/Spinner";
import { GeneralContext } from "../../../../../context/GeneralContext";
import { getPatientsRecords } from "../../../../../api/pacientes/patients";
import { NotFoundRecord } from "../../../../common/errorPages/NotFoundRecord";

export const PatientsListContainer = () => {
  const { setPageIsLoading, updateAlertsList, setUpdateAlertsList } =
    useContext(GeneralContext);
  const [isLoading, setIsloading] = useState(true);
  const [patientsRecords, setPatientsRecords] = useState(null);
  const [updateList, setUpdateList] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const handleEditModeChange = (e) => {
    setEditMode(e.target.checked);
  };

  //Importa el usuario desde localStorage
  const userRolRecord = JSON.parse(localStorage.getItem("userRolRecord"));

  console.log(userRolRecord);

  useEffect(() => {
    setPageIsLoading(true);
  }, [setPageIsLoading]);

  useEffect(() => {
    getPatientsRecords()
      .then((response) => {
        const filteredResponse = response.filter(
          (record) => record.activo === true
        );
        setPatientsRecords(filteredResponse);
        setIsloading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsloading(false);
      });
  }, [updateList, setPageIsLoading]);

  console.log(patientsRecords);

  if (isLoading) return <Spinner />;
  if (Array.isArray(patientsRecords) && patientsRecords.length === 0)
    return <NotFoundRecord />;

  const props = {
    editMode,
    patientsRecords,
    updateList,
    setUpdateList,
    handleEditModeChange,
    setPageIsLoading,
    updateAlertsList,
    setUpdateAlertsList,
    userRolRecord,
  };

  return (
    <>
      <PatientsList {...props} />
    </>
  );
};
