import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Badge } from "@mui/material";
import { Link } from "react-router-dom";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

export function Alerts() {
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
          height: "100vh",
          backgroundColor: "#373a47",
          padding: 0,
          color: "white",
        }}
      >
        Acá van las alertas
      </div>
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
        <Badge badgeContent={4} color="primary">
          <NotificationsActiveIcon color="action" />
        </Badge>
      </Link>
    </div>
  );
}
