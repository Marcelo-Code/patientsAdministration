import { PatientsList } from "./PatientsList";
import "./patientsList.css";
import { useContext, useEffect, useState } from "react";
import { Spinner } from "../../../common/spinner/Spinner";
import { GeneralContext } from "../../../../context/GeneralContext";
import { getPatientsRecords } from "../../../../api/pacientes/patients";

export const PatientsListContainer = () => {
  const { setPageIsLoading, updateAlertsList, setUpdateAlertsList } =
    useContext(GeneralContext);
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
        setPatientsRecords(response);
      })
      .catch((error) => console.log(error));
  }, [updateList, setPageIsLoading]);

  if (!patientsRecords || !userRolRecord) return <Spinner />;

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
