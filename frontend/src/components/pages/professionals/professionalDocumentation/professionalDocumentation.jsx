import { Button, Card, CardActions, CircularProgress } from "@mui/material";
import { Android12Switch } from "../../../common/switchEditionMode/SwitchEditionMode";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";
import {
  DeleteProfessionalDocumentFromBucket,
  uploadProfessionalDocumentToBucket,
} from "../../../../api/professionalsDocuments";

/* eslint-disable react/prop-types */
export const ProfessionalDocumentation = ({
  professionalRecord,
  handleGoBack,
  documentData,
  handleEditModeChange,
  editMode,
  isLoading,
  setIsLoading,
  updateList,
  setUpdateList,
  trimUrl,
}) => {
  return (
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

      {isLoading && (
        <CircularProgress sx={{ position: "fixed", top: "50%", left: "50%" }} />
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {documentData.map((document, index) => (
          <Card
            sx={{
              width: "300px",
              height: "auto",
              textAlign: "center",
              color: "text.secondary",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            key={index}
          >
            <h3 style={{ margin: "20px" }}>{document.title}</h3>
            <div
              style={{
                padding: "20px",
                wordWrap: "break-word", // Permite que las palabras largas hagan wrap.
                overflowWrap: "break-word", // Funciona como respaldo para algunos navegadores.
                whiteSpace: "normal", // Permite que el texto se ajuste al ancho del contenedor
              }}
            >
              {professionalRecord[document.name] === "" ? (
                <ClearIcon />
              ) : (
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(professionalRecord[document.name], "_blank");
                  }}
                >
                  {trimUrl(professionalRecord[document.name])}
                </Link>
              )}
            </div>

            <CardActions
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              {editMode && (
                <div>
                  <Link
                    onClick={() => {
                      setIsLoading(true);
                      DeleteProfessionalDocumentFromBucket(
                        document.name,
                        professionalRecord,
                        "professionalsDocuments"
                      )
                        .then((response) => {
                          console.log(response);
                          setUpdateList(!updateList);
                          setIsLoading(false);
                        })
                        .catch((error) => {
                          console.log(error);
                          setIsLoading(false);
                        });
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: "2em", margin: "10px" }} />
                  </Link>
                  <Link
                    onClick={() => {
                      setIsLoading(true);
                      uploadProfessionalDocumentToBucket(
                        `${document.name}_${professionalRecord.dniprofesional}_${professionalRecord.nombreyapellidoprofesional}`,
                        professionalRecord,
                        document.name,
                        setIsLoading
                      )
                        .then((response) => {
                          console.log(response);
                          setUpdateList(!updateList);
                          setIsLoading(false);
                        })
                        .catch((error) => {
                          console.log(error);
                          setIsLoading(false);
                        });
                    }}
                  >
                    <UploadIcon sx={{ fontSize: "2em", margin: "10px" }} />
                  </Link>
                </div>
              )}
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};
