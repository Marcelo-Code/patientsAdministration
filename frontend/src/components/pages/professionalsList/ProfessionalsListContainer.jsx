import { useEffect, useState } from "react";
import { ProfessionalsList } from "./ProfessionalsList";
import { Button, CircularProgress } from "@mui/material";
import { getProfessionals } from "../../../api/professionals";
import { Android12Switch } from "../../common/switchEditionMode/SwitchEditionMode";
import { Link } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import "./professionalsList.css";
import { Spinner } from "../../common/spinner/Spinner";

export const ProfessionalsListContainer = () => {
  const [professionals, setProfessionals] = useState(null);
  const [updateList, setUpdateList] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const handleChange = (e) => {
    setEditMode(e.target.checked);
  };

  useEffect(() => {
    getProfessionals()
      .then((response) => setProfessionals(response))
      .catch((error) => console.log(error));
  }, [updateList]);

  if (!professionals) return <Spinner />;

  const props = { professionals, editMode, updateList, setUpdateList };

  return (
    <div className="professionalsContainer">
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: "30px",
          marginBottom: "30px",
        }}
      >
        <Link to="/createProfessional">
          <Button
            aria-label="fingerprint"
            size="small"
            variant="contained"
            startIcon={<PersonAddIcon />}
          >
            Crear Profesional
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
            onChange={handleChange}
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
      <ProfessionalsList {...props} />
    </div>
  );
};
