/* eslint-disable react/prop-types */
import { Box, Button, FormGroup, TextField } from "@mui/material";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import PersonIcon from "@mui/icons-material/Person";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import MedicationIcon from "@mui/icons-material/Medication";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link } from "react-router-dom";

import "./createProfessional.css";

export const CreateProfessional = ({
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
        position: "absolute",
        top: "90px",
      }}
    >
      <form>
        <FormGroup>
          <h2
            style={{
              textAlign: "center",
              width: "100%",
              margin: "10px 0px 10px 0px",
              paddingBottom: "10px",
              borderBottom: "2px solid black",
            }}
          >
            Generar nuevo profesional
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
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                label="Nombre y Apellido Profesional"
                variant="outlined"
                name="nombreYApellidoProfesional"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <MedicationIcon />
              <TextField
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                label="Especialidad"
                variant="outlined"
                name="especialidadProfesional"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <CardMembershipIcon />
              <TextField
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                label="Matrícula"
                variant="outlined"
                name="matriculaProfesional"
                onChange={handleChange}
              />
            </span>
            <span style={style}>
              <ImportContactsIcon />
              <TextField
                style={{ margin: "10px", width: "200px" }}
                id="outlined-basic"
                label="CUIT"
                variant="outlined"
                name="cuitProfesional"
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
