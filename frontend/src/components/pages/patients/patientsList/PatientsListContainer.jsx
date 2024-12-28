import { PatientsList } from "./PatientsList";
import "./patientsList.css";
import { useContext, useEffect, useState } from "react";
import { Spinner } from "../../../common/spinner/Spinner";
import { getPatientsRecords } from "../../../../api/patients";
import { Footer } from "../../../layout/footer/Footer";
import { NavBarContainer } from "../../../layout/navBar/NavBarContainer";
import { GeneralContext } from "../../../../context/GeneralContext";

export const PatientsListContainer = () => {
  const { setPageIsLoading } = useContext(GeneralContext);
  const [patientsRecords, setPatientsRecords] = useState(null);
  const [updateList, setUpdateList] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const handleEditModeChange = (e) => {
    setEditMode(e.target.checked);
  };

  useEffect(() => {
    setPageIsLoading(true);
    getPatientsRecords()
      .then((response) => {
        setPatientsRecords(response);
      })
      .catch((error) => console.log(error));
  }, [updateList, setPageIsLoading]);

  if (!patientsRecords) return <Spinner />;

  const props = {
    editMode,
    patientsRecords,
    updateList,
    setUpdateList,
    handleEditModeChange,
    setPageIsLoading,
  };

  return (
    <>
      <PatientsList {...props} />
    </>
  );
};
