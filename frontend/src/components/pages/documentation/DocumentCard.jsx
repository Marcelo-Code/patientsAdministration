/* eslint-disable react/prop-types */
import { Card, CardActions, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import { DocumentImage } from "./DocumentImage";
import { UploadContainer } from "./UploadContainer";
import { WarningAlert } from "../../common/alerts/alerts";
import ClearIcon from "@mui/icons-material/Clear";
import { DeleteImage, downloadImage } from "../../../api/pacientes/patients";

export const DocumentCard = ({
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
}) => {
  return (
    <>
      {documentData.map((document, index) => {
        return (
          <Card
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "300px",
              height: "auto",
              color: "text.secondary",
              paddingBottom: "20px",
            }}
          >
            <h3 style={{ margin: "20px" }}>{document.title}</h3>
            {uploadDocumentation[document.name] ? (
              isLoading ? (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress size={30} />
                </div>
              ) : (
                <UploadContainer
                  name={document.name}
                  patient={patient}
                  setUpdateList={setUpdateList}
                  setUploadDocumentation={setUploadDocumentation}
                  initialStateUploadDocumentation={
                    initialStateUploadDocumentation
                  }
                  setIsLoading={setIsLoading}
                />
              )
            ) : patient[document.name] === "" ? (
              <div
                style={{
                  width: "290px",
                  height: "140px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ClearIcon />
              </div>
            ) : !patient[document.name] ? (
              <CircularProgress size={30} />
            ) : (
              <DocumentImage src={patient[document.name]} />
            )}
            {editMode && (
              <CardActions
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                {(!userRolRecord || userRolRecord?.user?.perfil === "admin") &&
                  patient.activo && (
                    <>
                      <Link
                        onClick={() => {
                          patient[document.name] == ""
                            ? WarningAlert("No hay imagen guardada")
                            : (setIsLoading(true),
                              DeleteImage(document.name, patient)
                                .then((response) => {
                                  console.log(response);
                                  setUpdateList((prevState) => !prevState);
                                  setIsLoading(false);
                                })
                                .catch((error) => {
                                  console.log(error);
                                  setIsLoading(false);
                                }));
                        }}
                        style={{
                          pointerEvents: isLoading ? "none" : "auto",
                          cursor: isLoading ? "not-allowed" : "pointer",
                        }}
                      >
                        <DeleteIcon sx={{ margin: "10px", fontSize: "2em" }} />
                      </Link>
                      <Link
                        onClick={() => {
                          patient[document.name] !== ""
                            ? WarningAlert(
                                "Hay que eliminar la imagen antes de subir otra"
                              )
                            : handleClick(document.name);
                        }}
                        style={{
                          pointerEvents: isLoading ? "none" : "auto",
                          cursor: isLoading ? "not-allowed" : "pointer",
                        }}
                      >
                        <UploadIcon sx={{ margin: "10px", fontSize: "2em" }} />
                      </Link>
                    </>
                  )}
                <Link
                  onClick={() => {
                    patient[document.name] == ""
                      ? WarningAlert("No hay imagen para descargar")
                      : downloadImage(patient[document.name]);
                  }}
                  style={{
                    pointerEvents: isLoading ? "none" : "auto",
                    cursor: isLoading ? "not-allowed" : "pointer",
                  }}
                >
                  <DownloadIcon sx={{ margin: "10px", fontSize: "2em" }} />
                </Link>
              </CardActions>
            )}
          </Card>
        );
      })}
    </>
  );
};
