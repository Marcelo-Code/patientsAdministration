import { CircularProgress } from "@mui/material";

export const Spinner = () => {
  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "400px",
        zIndex: 3,
      }}
    >
      <CircularProgress size={60} />
    </div>
  );
};
