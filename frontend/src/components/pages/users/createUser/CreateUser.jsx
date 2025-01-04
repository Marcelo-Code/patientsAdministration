/* eslint-disable react/prop-types */
import { Box, Button, FormGroup, TextField } from "@mui/material";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import PersonIcon from "@mui/icons-material/Person";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import MailIcon from "@mui/icons-material/Mail";
import LoadingButton from "@mui/lab/LoadingButton";
import KeyIcon from "@mui/icons-material/Key";
import BuildIcon from "@mui/icons-material/Build";
import { Link } from "react-router-dom";

import "./createUser.css";

export const CreateUser = ({
  handleChange,
  handleSubmit,
  isLoading,
  modifiedFlag,
  cancelAction,
  goBackAction,
}) => {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    with: "300px",
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        justifyContent: "center",
        position: "relative",
        paddingBottom: "100px",
      }}
    >
      <form>
        <FormGroup>
          <h2
            style={{
              textAlign: "center",
              width: "100%",
              margin: "10px",
              paddingBottom: "10px",
              borderBottom: "2px solid black",
            }}
          >
            Generar nuevo usuario
          </h2>
          <Box
            sx={{
              display: "grid",
              gap: "30px",
              gridTemplateColumns: "1fr 1fr",
              "@media (max-width: 800px)": {
                gridTemplateColumns: "1fr",
              },
            }}
          >
            <span style={style}>
              <PersonIcon />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Nombre y Apellido Usuario"
                variant="outlined"
                name="nombreyapellidousuario"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <PersonIcon />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Usuario"
                variant="outlined"
                name="usuario"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <BuildIcon />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Rol"
                variant="outlined"
                name="rol"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <CardMembershipIcon />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="dni"
                variant="outlined"
                name="dni"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <KeyIcon />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="password"
                variant="outlined"
                name="password"
                onChange={handleChange}
              />
            </span>

            <span style={style}>
              <MailIcon />
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="e-mail"
                variant="outlined"
                name="email"
                onChange={handleChange}
              />
            </span>
          </Box>
          <div className="buttonGroup">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "10px",
                width: "100%",
              }}
            >
              <Link style={{}}>
                <Button
                  disabled={!modifiedFlag ? true : false}
                  onClick={() => {
                    cancelAction();
                  }}
                  size="small"
                  sx={{ width: "280px" }}
                  variant="contained"
                  startIcon={<CancelIcon />}
                >
                  Descartar Cambios
                </Button>
              </Link>
              <LoadingButton
                loading={isLoading}
                onClick={handleSubmit}
                size="small"
                sx={{ width: "280px" }}
                variant="contained"
                startIcon={<SaveIcon />}
              >
                Guardar
              </LoadingButton>
            </div>
            <Button
              onClick={() => goBackAction(modifiedFlag)}
              size="small"
              sx={{
                marginTop: "10px",
                height: "2.5em",
                width: "100%",
              }}
            >
              Volver
            </Button>
          </div>
        </FormGroup>
      </form>
    </div>
  );
};
