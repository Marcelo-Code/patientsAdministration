/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import MedicationIcon from "@mui/icons-material/Medication";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Android12Switch } from "../../../../common/switchEditionMode/SwitchEditionMode";
import "./inactiveProfessionalsList.css";
import { softUnDeleteProfessionalRecord } from "../../../../../api/profesionales/professionals";
import { useEffect } from "react";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";

export const InactiveProfessionalsList = ({
  professionalsRecords,
  editMode,
  setUpdateList,
  handleChange,
  setPageIsLoading,
  setUpdateAlertsList,
  userRolRecord,
}) => {
  useEffect(() => {
    setPageIsLoading(false);
  }, [setPageIsLoading]);

  return (
    <>
      <div className="professionalsContainer">
        <span
          style={{
            position: "sticky",
            top: 0,
            left: 0,
            width: "100%",
            background: "white",
            zIndex: 3,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          <div
            style={{
              fontFamily: "Arial",
              fontSize: "1.2em",
              color: "gray",
            }}
          >
            Edición
            <Android12Switch
              checked={editMode}
              onChange={handleChange}
              sx={{ transform: "scale(1.3)" }}
            />
          </div>
        </span>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        ></div>
        {professionalsRecords.map((professional) => {
          return (
            <Card key={professional.id} sx={{ width: "300px" }}>
              <CardContent
                sx={{ textAlign: "center", color: "text.secondary" }}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                    paddingBottom: "10px",
                    color: "red",
                    fontWeight: "bold",
                  }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  INACTIVO
                </Typography>
                <PersonIcon style={{ fontSize: "4em" }} />
                <Typography
                  sx={{
                    textAlign: "center",
                    paddingBottom: "10px",
                  }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {professional.nombreyapellidoprofesional}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h7"
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <MedicationIcon sx={{ marginRight: "10px" }} />
                  <b style={{ marginRight: "10px" }}>Especialidad:</b>{" "}
                  {professional.especialidadprofesional}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h7"
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CardMembershipIcon sx={{ marginRight: "10px" }} />
                  <b style={{ marginRight: "10px" }}>Matrícula:</b>{" "}
                  {professional.matriculaprofesional}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h7"
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CardMembershipIcon sx={{ marginRight: "10px" }} />
                  <b style={{ marginRight: "10px" }}>CUIT:</b>{" "}
                  {professional.cuitprofesional}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h7"
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CalendarMonthIcon
                    variant="h7"
                    sx={{ marginRight: "10px" }}
                  />
                  <b style={{ marginRight: "10px" }}>Última Act.: </b>
                  {new Date(
                    professional.fechaultimaactualizacion
                  ).toLocaleDateString("es-AR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    timeZone: "UTC",
                  })}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                {editMode ? (
                  <>
                    <Link
                      onClick={() =>
                        softUnDeleteProfessionalRecord(
                          professional.id,
                          professional.nombreyapellidoprofesional
                        )
                          .then((response) => {
                            console.log(response);
                            setUpdateList((prev) => !prev);
                            setUpdateAlertsList((prev) => !prev);
                          })
                          .catch((error) => console.log(error))
                      }
                    >
                      <SettingsBackupRestoreIcon
                        sx={{ margin: "10px", fontSize: "2em" }}
                      />
                    </Link>
                  </>
                ) : (
                  <Link to={`/inactiveProfessionalDetail/${professional.id}`}>
                    <Button size="small">Ver Detalles</Button>
                  </Link>
                )}
              </CardActions>
            </Card>
          );
        })}
      </div>
    </>
  );
};
