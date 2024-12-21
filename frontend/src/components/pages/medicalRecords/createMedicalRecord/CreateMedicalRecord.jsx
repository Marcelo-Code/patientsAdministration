/* eslint-disable react/prop-types */
import { Button, TextareaAutosize } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import "./createMedicalRecord.css";
import { OptionsMenu } from "../../../common/Menu/OptionsMenu";

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
}) => {
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
          marginBottom: "10px",
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ width: "150px", backgroundColor: "white" }}
            name="fechaConsulta"
            onChange={(newDate) =>
              handleChange({
                target: {
                  name: "fechaconsulta",
                  value: dayjs(newDate).format("YYYY-MM-DD"),
                },
              })
            }
            format="DD/MM/YYYY"
            label="Fecha"
            slots={{
              openPickerIcon: () => (
                <CalendarMonthIcon
                  sx={{ color: modified.fechaconsulta ? "red" : "gray" }}
                />
              ),
            }}
          />
        </LocalizationProvider>
        <span style={{ pointerEvents: patientId && "none" }}>
          <OptionsMenu {...patientsProps} />
        </span>
        <span>
          <OptionsMenu {...professionalsProps} />
        </span>
        <span>
          <OptionsMenu {...meetingsProps} />
        </span>
      </div>
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
