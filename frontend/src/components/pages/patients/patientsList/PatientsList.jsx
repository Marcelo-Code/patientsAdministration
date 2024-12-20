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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import { Android12Switch } from "../../../common/switchEditionMode/SwitchEditionMode";
import "./patientsList.css";
import { deletePatientRecord } from "../../../../api/patients";

export const PatientsList = ({
  editMode,
  patientsRecords,
  updateList,
  setUpdateList,
  handleEditModeChange,
}) => {
  return (
    <>
      <div className="patientsContainer">
        <span
          style={{
            position: "fixed",
            top: 120,
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
          <Link to="/createPatient">
            <Button
              aria-label="fingerprint"
              size="small"
              variant="contained"
              startIcon={<PersonAddIcon />}
            >
              Crear Paciente
            </Button>
          </Link>
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
                  {patient.obrasocialpaciente}
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
                        deletePatientRecord(
                          patient.id,
                          patient.nombreyapellidopaciente
                        )
                          .then((response) => {
                            console.log(response);
                            setUpdateList(!updateList);
                          })
                          .catch((error) => console.log(error))
                      }
                    >
                      <DeleteIcon sx={{ margin: "10px", fontSize: "2em" }} />
                    </Link>
                    <Link to={`/editPatient/${patient.id}`}>
                      <EditIcon sx={{ margin: "10px", fontSize: "2em" }} />
                    </Link>
                  </>
                ) : (
                  <Link to={`/patientsDetail/${patient.id}`}>
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
