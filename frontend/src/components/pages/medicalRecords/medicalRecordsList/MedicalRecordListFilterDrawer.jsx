/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import { OptionsMenu } from "../../../common/Menu/OptionsMenu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";

export function MedicalRecordListFilterDrawer({
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
}) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={(e) => e.stopPropagation()} // Evita que el click cierre el Drawer
      onKeyDown={(e) => e.stopPropagation()} // Evita el cierre al presionar teclas
    >
      <div
        style={{
          margin: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          height: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "10px",
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
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <OptionsMenu {...datesFilterProps} />
          <OptionsMenu {...patientsFilterProps} />
          <OptionsMenu {...professionalFilterProps} />
        </div>
      </div>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <SwipeableDrawer
          anchor={"top"}
          open={state["top"]}
          onClose={toggleDrawer("top", false)}
          onOpen={toggleDrawer("top", true)}
          disableScrollLock={true}
          transitionDuration={{ enter: 500, exit: 500 }}
        >
          {list("top")}
        </SwipeableDrawer>
      </React.Fragment>
      <Button
        aria-label="fingerprint"
        size="small"
        onClick={toggleDrawer("top", true)}
        variant="contained"
        sx={{
          width: "auto",
          height: "30px",
          position: "relative",
        }}
        startIcon={<TuneOutlinedIcon />}
      >
        Filtros
      </Button>
    </div>
  );
}
