/* eslint-disable react/prop-types */
import { Button, FormHelperText, TextareaAutosize } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import "./createMedicalRecord.css";
import { OptionsMenu } from "../../../common/Menu/OptionsMenu";
import { CalendarIcon } from "@mui/x-date-pickers";
import GroupsIcon from "@mui/icons-material/Groups";

export const CreateMedicalRecord = ({
  goBackAction,
  patientsProps,
  professionalsProps,
  meetingsProps,
  handleChange,
  modifiedFlag,
  cancelAction,
  isLoading,
  handleSubmit,
  modified,
  patientId,
  professionalId,
  userProfessionalId,
  // setPageIsLoading,
  errors,
}) => {
  console.log("profesional" + professionalId);
  console.log("paciente" + patientId);

  // useEffect(() => {
  //   setPageIsLoading(false);
  //}, [setPageIsLoading]);
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    with: "300px",
  };

  return (
    <div className="medicalRecordContainer">
      <span
        style={{
          width: "80%",
          minWidth: "280px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          borderBottom: "2px solid black",
          margin: "10px",
          paddingBottom: "10px",
          alignItems: "center",
        }}
      >
        <h2 style={{ marginRight: "10px" }}>Generar Nuevo Report: </h2>
      </span>
      <div
        style={{
          width: "80%",
          minWidth: "280px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: "10px",
          borderBottom: "2px solid black",
          marginBottom: "10px",
          paddingBottom: "10px",
        }}
      >
        <span style={style}>
          {errors.fechaconsulta ? (
            <FormHelperText>{"❌"}</FormHelperText>
          ) : (
            <CalendarIcon />
          )}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: "150px", backgroundColor: "white" }}
              name="fechaConsulta"
              error={!!errors.fechaconsulta} // Error si el campo no es válido
              onChange={(newDate) =>
                handleChange({
                  target: {
                    name: "fechaconsulta",
                    value: dayjs(newDate).format("YYYY-MM-DD"),
                  },
                })
              }
              maxDate={dayjs()}
              format="DD/MM/YYYY"
              label="Fecha"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </LocalizationProvider>
        </span>
        <span style={{ pointerEvents: patientId && "none", ...style }}>
          {errors.idpaciente ? (
            <FormHelperText>{"❌"}</FormHelperText>
          ) : (
            <PersonIcon />
          )}
          <OptionsMenu {...patientsProps} />
        </span>
        <span
          style={{
            pointerEvents: (professionalId || userProfessionalId) && "none",
            ...style,
          }}
        >
          {errors.idprofesional ? (
            <FormHelperText>{"❌"}</FormHelperText>
          ) : (
            <PersonIcon />
          )}
          <OptionsMenu {...professionalsProps} />
        </span>
        <span style={style}>
          {errors.tipoconsulta ? (
            <FormHelperText>{"❌"}</FormHelperText>
          ) : (
            <GroupsIcon />
          )}
          <OptionsMenu {...meetingsProps} />
        </span>
      </div>
      {errors.descripcion && <FormHelperText>{"❌"}</FormHelperText>}
      <TextareaAutosize
        style={{
          maxWidth: "80%",
          width: "80%",
          minWidth: "280px",
          height: "100px",
          borderColor: modified.descripcion ? "red" : "gray",
        }}
        aria-label="minimum height"
        minRows={3}
        placeholder="Escribí el texto de tu consulta"
        name="descripcion"
        onChange={handleChange}
      />
      <div className="buttonMedicalHistory">
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
            onClick={(e) => handleSubmit(e)}
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
    </div>
  );
};
