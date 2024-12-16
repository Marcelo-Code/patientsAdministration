/* eslint-disable react/prop-types */
import * as React from "react";
import Zoom from "@mui/material/Zoom";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const Animation = ({ component: Component, props: props }) => {
  const theme = useTheme();
  const [show, setShow] = React.useState(true);

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <Box>
      <Zoom in={show} timeout={transitionDuration} unmountOnExit>
        <Zoom in={show} timeout={transitionDuration} unmountOnExit>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "16px" }}
          >
            <Component {...props} />
          </div>
        </Zoom>
      </Zoom>
    </Box>
  );
};
