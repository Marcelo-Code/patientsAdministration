/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControlLabel,
  Typography,
  Zoom,
} from "@mui/material";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Android12Switch } from "../../../common/switchEditionMode/SwitchEditionMode";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { OptionsMenu } from "../../../common/Menu/OptionsMenu";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import * as React from "react";
import { useTheme } from "@mui/material/styles";

import "./medicalRecordList.css";
import MedicalRecordListFilter from "./MedicalRecordListFilter";
import { MedicalRecordListFilterDrawer } from "./MedicalRecordListFilterDrawer";
import { ExportToWord } from "../../../common/exportToWord/ExportToWord";
import { Animation } from "./Animation";
import { deleteMedicalRecord } from "../../../../api/consultas/medicalRecords";
import { useEffect } from "react";
export const MedicalRecordsList = ({
  records,
  setRecords,
  sortUpDateMode,
  sortUpPatientNameMode,
  sortUpProfessionalNameMode,
  sortRecords,
  setSortUpProfessionalNameMode,
  setSortUpPatientNameMode,
  setSortUpDateMode,
  filterMode,
  handleFilterModeChange,
  editMode,
  handleEditModeChange,
  patientsFilterProps,
  professionalFilterProps,
  datesFilterProps,
  resetFilters,
  isResetEnabled,
  updateFlag,
  setUpdateFlag,
  handleGoBack,
  handleReportModeChange,
  reportMode,
  reportProps,
  meetingsReportProps,
  professionalsReportProps,
  isChecked,
  handleCheckboxChange,
  patientId,
  professionalId,
  setPageIsLoading,
  createMedicalRecordUrl,
  keyPatientsFilterProps,
  keyDatesFilterProps,
  keyProfessionalFilterProps,
}) => {
  const filterProps = {
    filterMode,
    sortUpDateMode,
    sortRecords,
    records,
    setRecords,
    setSortUpDateMode,
    sortUpPatientNameMode,
    setSortUpPatientNameMode,
    sortUpProfessionalNameMode,
    setSortUpProfessionalNameMode,
    datesFilterProps,
    patientsFilterProps,
    professionalFilterProps,
    keyPatientsFilterProps,
    keyDatesFilterProps,
    keyProfessionalFilterProps,
  };

  //Variables para la animación de checkBox
  const theme = useTheme();
  const [show, setShow] = React.useState(true);

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  useEffect(() => {
    setPageIsLoading(false);
  }, [setPageIsLoading]);

  return (
    <div className="medicalRecordsListContainer">
      <span
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100%",
          background: "white",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
          paddingTop: "10px",
          paddingBottom: "10px",
          height: "auto",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Link to={createMedicalRecordUrl}>
            <Button
              aria-label="fingerprint"
              size="small"
              variant="contained"
              sx={{
                width: "auto",
                height: "30px",
                position: "relative",
              }}
              startIcon={<PlaylistAddIcon />}
            >
              Consulta
            </Button>
          </Link>
          <div
            style={{
              width: "125px",
              display: "flex",
              justifyContent: "right",
              gap: "5px",
              alignItems: "center",
            }}
          >
            <Link onClick={resetFilters}>
              {isResetEnabled && (
                <AutorenewIcon sx={{ verticalAlign: "middle" }} />
              )}
            </Link>
            <MedicalRecordListFilterDrawer {...filterProps} />
          </div>

          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            {patientId && (
              <div
                style={{ display: "flex", gap: "5px", alignItems: "center" }}
              >
                Informe
                <Android12Switch
                  checked={reportMode}
                  onChange={handleReportModeChange}
                  sx={{ transform: "scale(1.3)" }}
                />
              </div>
            )}
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              Edición
              <Android12Switch
                checked={editMode}
                onChange={handleEditModeChange}
                sx={{ transform: "scale(1.3)" }}
              />
            </div>
          </div>

          {reportMode && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Animation component={ExportToWord} props={reportProps} />
              <Animation
                component={OptionsMenu}
                props={professionalsReportProps}
              />
              <Animation component={OptionsMenu} props={meetingsReportProps} />
            </div>
          )}
        </div>
        <Button onClick={handleGoBack} sx={{ width: "80%" }}>
          Volver
        </Button>
      </span>
      <MedicalRecordListFilter {...filterProps} />

      <div>{records.length} registros encontrados</div>

      {records.map((record) => {
        return (
          <Card
            key={record.id}
            sx={{
              width: "80%",
              minWidth: "300px",
              minHeight: "250px",
              maxHeight: "350px",
            }}
          >
            <CardContent>
              {reportMode && (
                <span
                  style={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Zoom in={show} timeout={transitionDuration} unmountOnExit>
                      <Zoom
                        in={show}
                        timeout={transitionDuration}
                        unmountOnExit
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              name={`record${record.id}`}
                              checked={isChecked[record.id] || false}
                              onChange={(e) =>
                                handleCheckboxChange(e, record.id)
                              }
                            />
                          }
                        />
                      </Zoom>
                    </Zoom>
                  </Box>
                  <span>Seleccionar para informe</span>
                </span>
              )}
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  borderBottom: "1px solid black",
                  padding: "10px",
                }}
              >
                <span>
                  <b>Paciente:</b> {record.nombreyapellidopaciente}
                </span>
                <span>
                  <b>Profesional:</b> {record.nombreyapellidoprofesional}
                </span>
                <span>
                  <b>Fecha:</b>{" "}
                  {new Date(record.fechaconsulta).toLocaleDateString("es-AR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    timeZone: "UTC",
                  })}
                </span>
                <span>
                  <b>Tipo Consulta:</b> {record.tipoconsulta}
                </span>
              </Typography>
              <Typography
                sx={{
                  marginTop: "10px",
                  height: "100px",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {record.descripcion}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                width: "100%",
                justifyContent: "center",
                marginBottom: "10px",
                backgroundColor: "white",
              }}
            >
              {editMode ? (
                <>
                  <Link
                    onClick={() =>
                      deleteMedicalRecord(record.id)
                        .then((response) => {
                          console.log(response);
                          setUpdateFlag(!updateFlag);
                        })
                        .catch((error) => console.log(error))
                    }
                  >
                    <DeleteIcon sx={{ margin: "10px", fontSize: "2em" }} />
                  </Link>
                  <Link
                    to={`/editMedicalRecord/${record.id}/${professionalId}/${patientId}`}
                  >
                    <EditIcon sx={{ margin: "10px", fontSize: "2em" }} />
                  </Link>
                </>
              ) : (
                <Link to={`/medicalRecordDetail/${record.id}`}>
                  <Button size="small">Ver detalles</Button>
                </Link>
              )}
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
};
