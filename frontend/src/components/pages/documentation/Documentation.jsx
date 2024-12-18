/* eslint-disable react/prop-types */
import { Android12Switch } from "../../common/switchEditionMode/SwitchEditionMode";
import { DocumentCard } from "./DocumentCard";
import { Button } from "@mui/material";
import "./documentCard.css";

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
        <DocumentCard {...propsDocumentCard} />
        <Button
          sx={{ margin: "20px auto", width: "80%" }}
          onClick={handleGoBack}
        >
          Volver
        </Button>
      </div>
    </>
  );
};
