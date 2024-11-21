import { CircularProgress } from "@mui/material";

export const Spinner = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "40%",
        left: "50%",
      }}
    >
      <CircularProgress size={60} />
    </div>
  );
};
