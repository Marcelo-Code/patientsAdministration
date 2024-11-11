/* eslint-disable react/prop-types */
import { Button } from "@mui/material";

export const Billing = (props) => {
  const { handleGoBack } = props;

  return (
    <div
      style={{
        position: "absolute",
        top: "80px",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button sx={{ margin: "0 auto", width: "300px" }} onClick={handleGoBack}>
        Volver
      </Button>
    </div>
  );
};
