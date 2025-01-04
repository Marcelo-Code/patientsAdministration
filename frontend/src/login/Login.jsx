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
import { login } from "../api/login";

export const Login = ({
  showPassword,
  setShowPassword,
  userName,
  setUserName,
  password,
  setPassword,
  navigate,
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
        <CardActions sx={{ justifyContent: "center" }}>
          <Button
            sx={{ marginTop: "20px", width: "100%" }}
            variant="contained"
            onClick={() => {
              login(userName, password)
                .then((response) => {
                  console.log(response);
                  navigate("/");
                })
                .catch((error) => console.log(error));
            }}
          >
            Iniciar Sesión
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
