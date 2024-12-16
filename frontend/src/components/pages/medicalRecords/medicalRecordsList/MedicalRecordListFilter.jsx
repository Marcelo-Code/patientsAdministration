/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { OptionsMenu } from "../../../common/Menu/OptionsMenu";

const MedicalRecordListFilter = ({
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
}) => {
  return (
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
            <OptionsMenu {...datesFilterProps} />
            <OptionsMenu {...patientsFilterProps} />
            <OptionsMenu {...professionalFilterProps} />
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default MedicalRecordListFilter;
