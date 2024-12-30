import { CircularProgress } from "@mui/material";

export const Spinner = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "30%",
        left: "48%",
        zIndex: 3,
      }}
    >
      <CircularProgress size={60} />
    </div>
  );
};
