import { PatientsList } from "./PatientsList";
import "./patientsList.css";
import { useEffect, useState } from "react";
import { Spinner } from "../../../common/spinner/Spinner";
import { getPatientsRecords } from "../../../../api/patients";
import { Footer } from "../../../layout/footer/Footer";
import { NavBar } from "../../../layout/navBar/NavBar";

export const PatientsListContainer = () => {
  const [patientsRecords, setPatientsRecords] = useState(null);
  const [updateList, setUpdateList] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const handleEditModeChange = (e) => {
    setEditMode(e.target.checked);
  };

  useEffect(() => {
    getPatientsRecords()
      .then((response) => {
        setPatientsRecords(response);
      })
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

  return (
    <>
      <NavBar />
      <PatientsList {...props} />;
      <Footer />
    </>
  );
};
