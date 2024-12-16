import { PatientsList } from "./PatientsList";
import "./patientsList.css";
import { useEffect, useState } from "react";
import { getPatients } from "../../../../api/patients";
import { Spinner } from "../../../common/spinner/Spinner";

export const PatientsListContainer = () => {
  const [patientsRecords, setPatientsRecords] = useState(null);
  const [updateList, setUpdateList] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const handleEditModeChange = (e) => {
    setEditMode(e.target.checked);
  };

  useEffect(() => {
    getPatients()
      .then((response) => setPatientsRecords(response))
      .catch((error) => console.log(error));
  }, [updateList]);

  if (!patientsRecords) return <Spinner />;

  const props = {
    editMode,
    patientsRecords,
    updateList,
    setUpdateList,
    handleEditModeChange,
  };

  return <PatientsList {...props} />;
};
