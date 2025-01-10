/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./login.css";
import LoadingButton from "@mui/lab/LoadingButton";
import { getUser, login } from "../../../api/usuarios/login";

export const Login = ({
  showPassword,
  setShowPassword,
  userName,
  setUserName,
  password,
  setPassword,
  navigate,
  isLoading,
  setIsLoading,
  probeToken,
  setUserRolRecord,
}) => {
  return (
    <div style={{ width: "100vw", display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          padding: "30px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <span className="title">Gestión Cudnocud</span>
          <div style={{ color: "white", marginTop: "20px" }}>Usuario</div>
          <TextField
            sx={{ backgroundColor: "white" }}
            size="small"
            onChange={(e) => setUserName(e.target.value)}
            name="username"
          />
          <span style={{ color: "white", marginTop: "20px" }}>Contraseña</span>
          <TextField
            sx={{ backgroundColor: "white" }}
            size="small"
            type={showPassword ? "text" : "password"} // Alterna entre texto y oculto
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </CardContent>
        <CardActions
          sx={{ alignItems: "center", flexDirection: "column", gap: "20px" }}
        >
          <LoadingButton
            sx={{ marginTop: "20px", width: "100%" }}
            variant="contained"
            loading={isLoading}
            onClick={() => {
              setIsLoading(true);
              login(userName, password)
                .then((response) => {
                  if (response) {
                    probeToken()
                      .then((response) => {
                        if (response) navigate("/");
                        setIsLoading(false);
                        getUser(userName, password)
                          .then((response) => console.log(response))
                          .catch((error) => console.log(error));
                      })
                      .catch((error) => {
                        console.log(error);
                        setIsLoading(false);
                      });
                  }
                })
                .catch((error) => {
                  console.log(error);
                  setIsLoading(false);
                });
            }}
            size="small"
          >
            Iniciar Sesión
          </LoadingButton>

          <Button
            size="small"
            sx={{ color: "white" }}
            onClick={() => navigate("/passwordResetRequest")}
          >
            ¿Olvidaste la Contraseña?
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
