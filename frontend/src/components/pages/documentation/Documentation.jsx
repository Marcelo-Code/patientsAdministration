/* eslint-disable react/prop-types */
import { Android12Switch } from "../../common/switchEditionMode/SwitchEditionMode";
import { DocumentCard } from "./DocumentCard";
import { Button } from "@mui/material";
import "./documentCard.css";
import { useEffect } from "react";

export const Documentation = ({
  patient,
  documentData,
  uploadDocumentation,
  handleClick,
  editMode,
  setUpdateList,
  setUploadDocumentation,
  initialStateUploadDocumentation,
  handleEditModeChange,
  handleGoBack,
  isLoading,
  setIsLoading,
  setPageIsLoading,
  userRolRecord,
}) => {
  const propsDocumentCard = {
    patient,
    documentData,
    uploadDocumentation,
    handleClick,
    editMode,
    setUpdateList,
    setUploadDocumentation,
    initialStateUploadDocumentation,
    isLoading,
    setIsLoading,
    userRolRecord,
  };
  useEffect(() => {
    setPageIsLoading(false);
  }, [setPageIsLoading]);
  return (
    <>
      <div className="documentCardContainer">
        <div
          style={{
            fontFamily: "Arial",
            fontSize: "1.2em",
            position: "sticky",
            top: 0,
            width: "100%",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 2,
            boxShadow: "0 0 10px black",
            padding: "10px",
          }}
        >
          <span style={{ color: "gray", padding: "10px" }}>
            Edición
            <Android12Switch
              checked={editMode}
              onChange={handleEditModeChange}
              sx={{ transform: "scale(1.3)" }}
            />
          </span>
          <Button sx={{ width: "80%" }} onClick={handleGoBack}>
            Volver
          </Button>
        </div>
        <h2
          style={{
            textAlign: "center",
            width: "100%",
          }}
        >
          Documentación: {patient.nombreyapellidopaciente}{" "}
          {!patient.activo && (
            <span style={{ fontWeight: "bold", color: "red" }}>INACTIVO</span>
          )}
        </h2>
        <DocumentCard {...propsDocumentCard} />
      </div>
    </>
  );
};
