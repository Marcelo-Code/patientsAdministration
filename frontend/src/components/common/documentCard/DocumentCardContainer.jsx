/* eslint-disable react/prop-types */
import { DocumentCard } from "./DocumentCard";
import { documentData } from "./documentData";
import "./documentCard.css";
import { useEffect, useState } from "react";
import { getPatient } from "../../../api/patients";
import { Spinner } from "../spinner/Spinner";
import { Button } from "@mui/material";
import { Android12Switch } from "../switchEditionMode/SwitchEditionMode";

export const DocumentCardContainer = ({ patientId, handleGoBack }) => {
  const [patient, setPatient] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updateList, setUpdateList] = useState(false);

  const initialStateUploadDocumentation = {
    imgDniFrente: false,
    imgDniDorso: false,
    carnetObraSocial: false,
    libretaSanitaria: false,
    cAlumnoRegular: false,
    rpYHcMedico: false,
    autorizacionOS: false,
    informesPrevios: false,
    cud: false,
  };
  const [uploadDocumentation, setUploadDocumentation] = useState(
    initialStateUploadDocumentation
  );

  const handleEditModeChange = () => {
    setEditMode(!editMode);
    editMode && setUploadDocumentation(initialStateUploadDocumentation);
  };

  useEffect(() => {
    getPatient(patientId)
      .then((response) => {
        setPatient(response);
        // console.log(response);
      })
      .catch((error) => console.log(error));
  }, [patientId, updateList]);

  const handleClick = (name) => {
    setUploadDocumentation((prevState) => ({
      ...uploadDocumentation,
      [name]: !prevState[name],
    }));
  };

  if (!patient) return <Spinner />;

  const props = {
    patient,
    documentData,
    uploadDocumentation,
    handleClick,
    setEditMode,
    editMode,
    updateList,
    setUpdateList,
    setUploadDocumentation,
    initialStateUploadDocumentation,
  };

  return (
    <>
      <div className="documentCardContainer">
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
        <h2
          style={{
            textAlign: "center",
            width: "100%",
            margin: "10px",
            paddingBottom: "10px",
            borderBottom: "2px solid black",
          }}
        >
          Documentación: {patient.nombreyapellidopaciente}
        </h2>
        <DocumentCard {...props} />
      </div>
      <Button sx={{ margin: "20px auto", width: "80%" }} onClick={handleGoBack}>
        Volver
      </Button>
    </>
  );
};
