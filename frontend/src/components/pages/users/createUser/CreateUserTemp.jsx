/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  FormGroup,
  FormHelperText,
  TextField,
} from "@mui/material";
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
import { OptionsMenu } from "../../../common/Menu/OptionsMenu";
import { useEffect } from "react";

export const CreateUser = ({
  handleChange,
  userRecord,
  handleSubmit,
  isLoading,
  modifiedFlag,
  cancelAction,
  goBackAction,
  professionalsProps,
  usersTypeProps,
  passwordMatch,
  userMatch,
  setPageIsLoading,
  errors,
}) => {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    with: "300px",
  };

  useEffect(() => {
    setPageIsLoading(false);
  }, [setPageIsLoading]);

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
              {errors.perfil ? (
                <FormHelperText>{"❌"}</FormHelperText>
              ) : (
                <BuildIcon />
              )}
              <OptionsMenu {...usersTypeProps} />
            </span>

            {/* Si perfil profesional que muestre las opciones */}

            {userRecord.perfil === "profesional" && (
              <span style={style}>
                {errors.idprofesional ? (
                  <FormHelperText>{"❌"}</FormHelperText>
                ) : (
                  <PersonIcon />
                )}
                <OptionsMenu {...professionalsProps} />
              </span>
            )}

            {/* Si es perfil admin que permita ingresar nombre y apellido */}

            {userRecord.perfil === "admin" && (
              <span style={style}>
                {errors.nombreyapellidousuario ? (
                  <FormHelperText>{"❌"}</FormHelperText>
                ) : (
                  <PersonIcon />
                )}
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
            )}
            <span style={style}>
              {errors.usuario ? (
                <FormHelperText>{"❌"}</FormHelperText>
              ) : userMatch ? (
                <span>❌</span>
              ) : (
                <span>✔️</span>
              )}
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Usuario"
                variant="outlined"
                value={userRecord.usuario}
                name="usuario"
                onChange={(e) => {
                  const value = e.target.value
                    .toLowerCase()
                    .replace(/\s+/g, "") // Elimina los espacios
                    .replace(/[^a-z0-9]/g, ""); // Elimina caracteres que no sean letras o números
                  handleChange({
                    target: { name: "usuario", value },
                  });
                }}
              />
            </span>

            <span style={style}>
              {errors.email ? (
                <FormHelperText>{"❌"}</FormHelperText>
              ) : (
                <CardMembershipIcon />
              )}
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
            <span style={style}>
              {errors.password ? (
                <FormHelperText>{"❌"}</FormHelperText>
              ) : (
                <KeyIcon />
              )}
              <TextField
                style={{
                  margin: "10px",
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                type="password"
                label="password"
                variant="outlined"
                name="password"
                value={userRecord.password}
                onChange={(e) => {
                  const value = e.target.value
                    .toLowerCase()
                    .replace(/\s+/g, "") // Elimina los espacios
                    .replace(/[^a-z0-9]/g, ""); // Elimina caracteres que no sean letras o números
                  handleChange({
                    target: { name: "password", value },
                  });
                }}
              />
            </span>
            {userRecord.password !== "" && (
              <span style={style}>
                {passwordMatch ? <span>✔️</span> : <span>❌</span>}
                <TextField
                  style={{
                    margin: "10px",
                    width: "200px",
                    backgroundColor: "white",
                  }}
                  id="outlined-basic"
                  type="password"
                  label="repetir password"
                  variant="outlined"
                  name="passwordrepeat"
                  value={userRecord.passwordrepeat}
                  onChange={(e) => {
                    const value = e.target.value
                      .toLowerCase()
                      .replace(/\s+/g, "") // Elimina los espacios
                      .replace(/[^a-z0-9]/g, ""); // Elimina caracteres que no sean letras o números
                    handleChange({
                      target: { name: "passwordrepeat", value },
                    });
                  }}
                />
              </span>
            )}
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
