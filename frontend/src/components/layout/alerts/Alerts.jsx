/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Badge } from "@mui/material";
import { Link } from "react-router-dom";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import "./alerts.css";

export function Alerts({ patientsExpirationCudRecords }) {
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
        <table>
          <thead>
            <tr>
              <th>
                <h3>Paciente</h3>
              </th>
              <th>
                <h3>Días</h3>
              </th>
            </tr>
          </thead>
          {patientsExpirationCudRecords.map((record, index) => (
            <tr key={index}>
              <td>{record.nombreyapellidopaciente}</td>
              <td>{record.diasexpiracion}</td>
            </tr>
          ))}
        </table>
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
        >
          {list("right")}
        </SwipeableDrawer>
      </React.Fragment>

      <Link onClick={toggleDrawer("right", true)}>
        <Badge
          badgeContent={patientsExpirationCudRecords.length}
          color="primary"
        >
          <NotificationsActiveIcon color="action" />
        </Badge>
      </Link>
    </div>
  );
}
