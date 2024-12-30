/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Badge } from "@mui/material";
import { Link } from "react-router-dom";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import "./alerts.css";

export function Alerts({
  patientsExpirationCudRecords,
  professionalsExpirationRnpRecords,
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
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        height: "100%",
        backgroundColor: "#373a47",
        color: "white",
      }}
      role="presentation"
      onClick={(e) => e.stopPropagation()} // Evita que el click cierre el Drawer
      onKeyDown={(e) => e.stopPropagation()} // Evita el cierre al presionar teclas
    >
      <h3
        style={{
          textAlign: "center",
          padding: "30px",
          borderBottom: "1px solid white",
          marginBottom: "20px",
        }}
      >
        Documentos a expirar
      </h3>
      <h3 style={{ textAlign: "center" }}>CUD</h3>
      {patientsExpirationCudRecords.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>No hay vencimientos</h2>
      ) : (
        <div>
          <span
            style={{
              display: "grid",
              gridTemplateColumns: "200px 100px",
              paddingLeft: "10px",
            }}
          >
            <span>
              <h3 style={{ textAlign: "left" }}>Paciente</h3>
            </span>
            <span>
              <h3 style={{ textAlign: "left" }}>Días</h3>
            </span>
          </span>
          {patientsExpirationCudRecords.map((record, index) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "200px 20px",
                paddingLeft: "10px",
              }}
            >
              <span>{record.nombreyapellidopaciente}</span>
              <span style={{ textAlign: "right" }}>
                {record.diasexpiracioncud}
              </span>
            </div>
          ))}
        </div>
      )}
      <h3 style={{ textAlign: "center", marginTop: "30px" }}>RNP</h3>
      {professionalsExpirationRnpRecords.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>No hay vencimientos</h2>
      ) : (
        <div>
          <span
            style={{
              display: "grid",
              gridTemplateColumns: "200px 100px",
              paddingLeft: "10px",
            }}
          >
            <span>
              <h3 style={{ textAlign: "left" }}>Profesional</h3>
            </span>
            <span>
              <h3 style={{ textAlign: "left" }}>Días</h3>
            </span>
          </span>
          {professionalsExpirationRnpRecords.map((record, index) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "200px 20px",
                paddingLeft: "10px",
              }}
            >
              <span>{record.nombreyapellidoprofesional}</span>
              <span style={{ textAlign: "right" }}>
                {record.diasexpiracionrnp}
              </span>
            </div>
          ))}
        </div>
      )}
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <SwipeableDrawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          onOpen={toggleDrawer("right", true)}
          disableScrollLock={true}
          transitionDuration={{ enter: 500, exit: 500 }}
          PaperProps={{ style: { overflowX: "hidden" } }}
        >
          {list("right")}
        </SwipeableDrawer>
      </React.Fragment>

      <Link onClick={toggleDrawer("right", true)}>
        <Badge
          badgeContent={
            patientsExpirationCudRecords.length +
            professionalsExpirationRnpRecords.length
          }
          color="primary"
        >
          <NotificationsActiveIcon color="action" />
        </Badge>
      </Link>
    </div>
  );
}
