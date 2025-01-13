/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import PersonIcon from "@mui/icons-material/Person";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import { Android12Switch } from "../../../../common/switchEditionMode/SwitchEditionMode";
import "./inactivePatientsList.css";
import { softUnDeletePatientRecord } from "../../../../../api/pacientes/patients";
import { useEffect } from "react";

export const InactivePatientsList = ({
  editMode,
  patientsRecords,
  setUpdateList,
  handleEditModeChange,
  setPageIsLoading,
  setUpdateAlertsList,
  userRolRecord,
}) => {
  useEffect(() => {
    setPageIsLoading(false);
  }, [setPageIsLoading, patientsRecords]);

  return (
    <>
      <div className="patientsContainer">
        {userRolRecord.user.perfil == "admin" && (
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
                onChange={handleEditModeChange}
                sx={{ transform: "scale(1.3)" }}
              />
            </div>
          </span>
        )}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        ></div>

        {patientsRecords.map((patient) => {
          return (
            <Card key={patient.id} sx={{ width: "300px" }}>
              <CardContent
                sx={{ textAlign: "center", color: "text.secondary" }}
              >
                <Typography
                  sx={{
                    textAlign: "left",
                    paddingBottom: "10px",
                  }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <span>{patient.obrasocialpaciente}</span>
                    <span style={{ fontWeight: "bold", color: "red" }}>
                      INACTIVO
                    </span>
                  </div>
                </Typography>
                <PersonIcon style={{ fontSize: "4em" }} />

                <Typography gutterBottom variant="h5" component="div">
                  {patient.nombreyapellidopaciente}
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
                  <b style={{ marginRight: "10px" }}>Nro afiliado:</b>{" "}
                  {patient.nroafiliadopaciente}
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
                  <ImportContactsIcon sx={{ marginRight: "10px" }} />
                  <b style={{ marginRight: "10px" }}>DNI</b>:{" "}
                  {patient.dnipaciente}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                {editMode ? (
                  <>
                    <Link
                      onClick={() =>
                        softUnDeletePatientRecord(
                          patient.id,
                          patient.nombreyapellidopaciente
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
                  <Link to={`/inactivePatientsDetail/${patient.id}`}>
                    <Button size="small">Ver detalles</Button>
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
