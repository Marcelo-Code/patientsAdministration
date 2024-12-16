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
import { deleteMedicalrecord } from "../../../../api/medicalRecords";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import * as React from "react";
import { useTheme } from "@mui/material/styles";

import "./medicalRecordList.css";
import MedicalRecordListFilter from "./MedicalRecordListFilter";
import { MedicalRecordListFilterDrawer } from "./MedicalRecordListFilterDrawer";
import { ExportToWord } from "../../../common/exportToWord/ExportToWord";
import { Animation } from "./Animation";
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
  };

  //Variables para la animación de checkBox
  const theme = useTheme();
  const [show, setShow] = React.useState(true);

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <div
      style={{
        marginTop: "180px",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        fontFamily: "Arial",
        fontSize: "1.2em",
        color: "gray",
      }}
    >
      <div>{records.length} registros encontrados</div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          flexDirection: "raw",
          gap: "10px",
        }}
      >
        <Link
          to={
            patientId
              ? `/createMedicalRecord/${patientId}`
              : "/createMedicalRecord"
          }
        >
          <Button
            aria-label="fingerprint"
            size="small"
            variant="contained"
            sx={{
              width: "200px",
              height: "30px",
              position: "relative",
            }}
            startIcon={<PlaylistAddIcon />}
          >
            Crear Consulta
          </Button>
        </Link>
        <div
          style={{
            width: "70px",
            paddingTop: "6px",
            display: "flex",
            justifyContent: "right",
            gap: "10px",
          }}
        >
          <Link onClick={resetFilters}>
            {isResetEnabled && <AutorenewIcon />}
          </Link>
          <MedicalRecordListFilterDrawer {...filterProps} />
        </div>
        {patientId && (
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
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
      <Button onClick={handleGoBack} sx={{ width: "80%" }}>
        Volver
      </Button>
      <MedicalRecordListFilter {...filterProps} />

      {reportMode && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Animation component={ExportToWord} props={reportProps} />
          <Animation component={OptionsMenu} props={professionalsReportProps} />
          <Animation component={OptionsMenu} props={meetingsReportProps} />
        </div>
      )}
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
                  {format(new Date(record.fechaconsulta), "dd/MM/yyyy")}
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
                      deleteMedicalrecord(record.id)
                        .then((response) => {
                          console.log(response);
                          setUpdateFlag(!updateFlag);
                        })
                        .catch((error) => console.log(error))
                    }
                  >
                    <DeleteIcon sx={{ margin: "10px", fontSize: "2em" }} />
                  </Link>
                  <Link to={`/editMedicalRecord/${record.id}`}>
                    <EditIcon sx={{ margin: "10px", fontSize: "2em" }} />
                  </Link>
                </>
              ) : (
                <Link>
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
