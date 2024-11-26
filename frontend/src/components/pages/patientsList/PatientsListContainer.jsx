import { PatientsList } from "./PatientsList";
// import { dataBase } from "../../../dataBase/DataBase";
import "./patientsList.css";
import { useEffect, useState } from "react";
import { getPatients } from "../../../api/patients";
import { Android12Switch } from "../../common/switchEditionMode/SwitchEditionMode";
import { Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Link } from "react-router-dom";
import { Spinner } from "../../common/spinner/Spinner";

export const PatientsListContainer = () => {
  const [patients, setPatients] = useState(null);
  const [updateList, setUpdateList] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const handleEditModeChange = (e) => {
    setEditMode(e.target.checked);
  };

  useEffect(() => {
    getPatients()
      .then((response) => setPatients(response))
      .catch((error) => console.log(error));
  }, [updateList]);

  if (!patients) return <Spinner />;

  const props = {
    editMode,
    patients,
    updateList,
    setUpdateList,
  };

  return (
    <div className="patientsContainer">
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <Link to="/createPatient">
          <Button
            aria-label="fingerprint"
            size="small"
            variant="contained"
            startIcon={<PersonAddIcon />}
          >
            Crear Paciente
          </Button>
        </Link>
        <div
          style={{
            fontFamily: "Arial",
            fontSize: "1.2em",
            color: "gray",
          }}
        >
          Edición
          <Android12Switch
            checked={editMode}
            onChange={handleEditModeChange}
            sx={{ transform: "scale(1.3)" }}
          />
        </div>
      </span>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      ></div>
      <PatientsList {...props} />
    </div>
  );
};
