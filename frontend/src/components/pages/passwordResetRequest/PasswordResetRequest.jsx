/* eslint-disable react/prop-types */
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";

export const PasswordResetRequest = ({
  email,
  setEmail,
  handleSubmit,
  handleGoBack,
  handleChange,
}) => {
  return (
    <div>
      <div
        style={{ width: "100vw", display: "flex", justifyContent: "center" }}
      >
        <Card
          sx={{
            padding: "30px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <CardContent sx={{ display: "flex", flexDirection: "column" }}>
            <h2
              style={{
                textAlign: "center",
                color: "white",
                textShadow: "0 0 10px black",
              }}
            >
              Recuperar Contraseña
            </h2>
            <span className="title">Gestión Cudnocud</span>
            <div style={{ color: "white", marginTop: "20px" }}>email</div>
            <TextField
              sx={{ backgroundColor: "white" }}
              size="small"
              name="email"
              onChange={handleChange}
              // required
            />
          </CardContent>
          <CardActions
            sx={{ alignItems: "center", flexDirection: "column", gap: "20px" }}
          >
            <LoadingButton
              sx={{ marginTop: "20px", width: "100%" }}
              variant="contained"
              // loading={isLoading}
              size="small"
              onClick={handleSubmit}
            >
              Enviar Enlace
            </LoadingButton>
            <Button sx={{ color: "white" }} onClick={handleGoBack}>
              Volver
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};
