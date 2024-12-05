/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Android12Switch } from "../../common/switchEditionMode/SwitchEditionMode";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { OptionsMenu } from "../../common/Menu/OptionsMenu";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { deleteMedicalrecord } from "../../../api/medicalRecords";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

import "./medicalRecordList.css";
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
  patientsProps,
  professionalProps,
  datesProps,
  resetFilters,
  isResetEnabled,
  updateFlag,
  setUpdateFlag,
}) => {
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
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <Link to={"/createMedicalRecord"}>
            <Button
              aria-label="fingerprint"
              size="small"
              variant="contained"
              sx={{ width: "200px", height: "30px" }}
              startIcon={<PlaylistAddIcon />}
            >
              Crear Consulta
            </Button>
          </Link>
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "grid",
              gridTemplateColumns: "40px 120px 130px",
            }}
          >
            <Link onClick={resetFilters}>
              {isResetEnabled && <AutorenewIcon />}
            </Link>
            <div>
              Filtro
              <Android12Switch
                checked={filterMode}
                onChange={handleFilterModeChange}
                sx={{ transform: "scale(1.3)" }}
              />
            </div>
            <div>
              Edición
              <Android12Switch
                checked={editMode}
                onChange={handleEditModeChange}
                sx={{ transform: "scale(1.3)" }}
              />
            </div>
          </div>
        </div>

        <Accordion
          expanded={filterMode}
          sx={{
            boxShadow: "none",
            border: "none",
            "&:before": {
              display: "none",
            },
            "&.MuiAccordion-root": {
              "&.Mui-expanded": {
                margin: "0",
              },
            },
          }}
        >
          <AccordionSummary
            sx={{
              minHeight: 0,
              "&.Mui-expanded": {
                minHeight: 0,
                height: 0,
              },
              "& .MuiAccordionSummary-content": {
                margin: 0,
              },
            }}
          ></AccordionSummary>
          <AccordionDetails>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: "20px",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  aria-label="fingerprint"
                  size="small"
                  sx={{ width: "200px" }}
                  onClick={() =>
                    sortUpDateMode
                      ? sortRecords(
                          records,
                          setRecords,
                          "fechaconsulta",
                          "up",
                          setSortUpDateMode
                        )
                      : sortRecords(
                          records,
                          setRecords,
                          "fechaconsulta",
                          "down",
                          setSortUpDateMode
                        )
                  }
                  variant="contained"
                  startIcon={
                    sortUpDateMode ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )
                  }
                >
                  Orden Fecha
                </Button>
                <Button
                  aria-label="fingerprint"
                  size="small"
                  sx={{ width: "200px" }}
                  onClick={() =>
                    sortUpPatientNameMode
                      ? sortRecords(
                          records,
                          setRecords,
                          "nombreyapellidopaciente",
                          "up",
                          setSortUpPatientNameMode
                        )
                      : sortRecords(
                          records,
                          setRecords,
                          "nombreyapellidopaciente",
                          "down",
                          setSortUpPatientNameMode
                        )
                  }
                  variant="contained"
                  startIcon={
                    sortUpPatientNameMode ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )
                  }
                >
                  Orden Paciente
                </Button>
                <Button
                  aria-label="fingerprint"
                  size="small"
                  sx={{ width: "200px" }}
                  onClick={() =>
                    sortUpProfessionalNameMode
                      ? sortRecords(
                          records,
                          setRecords,
                          "nombreyapellidoprofesional",
                          "up",
                          setSortUpProfessionalNameMode
                        )
                      : sortRecords(
                          records,
                          setRecords,
                          "nombreyapellidoprofesional",
                          "down",
                          setSortUpProfessionalNameMode
                        )
                  }
                  variant="contained"
                  sortUpProfessionalNameMode
                  startIcon={
                    sortUpProfessionalNameMode ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )
                  }
                >
                  Orden Profesional
                </Button>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: "30px",
                  flexWrap: "wrap",
                }}
              >
                <OptionsMenu {...datesProps} />
                <OptionsMenu {...patientsProps} />
                <OptionsMenu {...professionalProps} />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>

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
