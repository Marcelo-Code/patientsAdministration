/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import PersonIcon from "@mui/icons-material/Person";
import MedicationIcon from "@mui/icons-material/Medication";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";

import { Link } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es");

export const EditProfessional = (props) => {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    with: "300px",
  };
  const {
    nombreyapellidoprofesional,
    especialidadprofesional,
    matriculaprofesional,
    cuitprofesional,
    goBackAction,
    handleChange,
    handleSubmit,
    isLoading,
    modified,
    modifiedFlag,
    cancelAction,
  } = props;

  return (
    <div className="patientDetail">
      <Card
        sx={{
          minWidth: "320px",
          width: "60%",
          color: "text.secondary",
        }}
      >
        <CardContent
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            "@media (max-width: 900px)": {
              gridTemplateColumns: "1fr",
            },
          }}
        >
          {/* Nombre y Apellido Profesional */}

          <span style={style}>
            <PersonIcon
              style={{
                color: modified.nombreyapellidoprofesional ? "red" : "",
              }}
            />
            <TextField
              style={{ margin: "10px", width: "200px" }}
              id="outlined-basic"
              label="Nombre y Apellido"
              variant="outlined"
              name="nombreyapellidoprofesional"
              onChange={handleChange}
              value={nombreyapellidoprofesional}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </span>

          {/* Especialidad Profesional */}

          <span style={style}>
            <MedicationIcon
              style={{ color: modified.especialidadprofesional ? "red" : "" }}
            />
            <TextField
              style={{ margin: "10px", width: "200px" }}
              id="outlined-basic"
              label="Especialidad"
              variant="outlined"
              name="especialidadprofesional"
              onChange={handleChange}
              value={especialidadprofesional}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </span>

          {/* Matrícula Profesional */}

          <span style={style}>
            <CardMembershipIcon
              style={{ color: modified.matriculaprofesional ? "red" : "" }}
            />
            <TextField
              style={{ margin: "10px", width: "200px" }}
              id="outlined-basic"
              label="Matrícula"
              variant="outlined"
              name="matriculaprofesional"
              onChange={handleChange}
              value={matriculaprofesional}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </span>

          {/* CUIT Profesional */}

          <span style={style}>
            <CardMembershipIcon
              style={{ color: modified.cuitprofesional ? "red" : "" }}
            />
            <TextField
              style={{ margin: "10px", width: "200px" }}
              id="outlined-basic"
              label="CUIT"
              variant="outlined"
              name="cuitprofesional"
              onChange={handleChange}
              value={cuitprofesional}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </span>
        </CardContent>

        {/* Buttons */}

        <CardActions
          sx={{
            justifyContent: "center",
            width: "100%",
            gap: "10px",
            "@media (max-width: 800px)": {
              flexDirection: "column",
              justifyContent: "center",
            },
          }}
        >
          <Link
            style={{
              width: "100%",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <Button
              disabled={!modifiedFlag ? true : false}
              onClick={() => {
                cancelAction();
              }}
              size="small"
              sx={{ width: "100%" }}
              variant="contained"
              startIcon={<CancelIcon />}
            >
              Descartar Cambios
            </Button>
          </Link>
          <Link
            style={{
              width: "100%",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <LoadingButton
              loading={isLoading}
              onClick={handleSubmit}
              size="small"
              sx={{ width: "100%" }}
              variant="contained"
              startIcon={<SaveIcon />}
            >
              Guardar
            </LoadingButton>
          </Link>
        </CardActions>
        <CardActions>
          <Button
            onClick={() => goBackAction(modifiedFlag)}
            size="small"
            sx={{ height: "2.5em", width: "100%", margin: "auto" }}
          >
            Volver
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
