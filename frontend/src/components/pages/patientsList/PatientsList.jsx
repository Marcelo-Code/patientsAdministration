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
import { deletePatient } from "../../../api/patients";
import PersonIcon from "@mui/icons-material/Person";

export const PatientsList = ({
  patients,
  editMode,
  updateList,
  setUpdateList,
}) => {
  return (
    <>
      {patients.map((patient) => {
        return (
          <Card key={patient.id} sx={{ width: "300px" }}>
            <CardContent sx={{ textAlign: "center", color: "text.secondary" }}>
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
                      deletePatient(patient.id, patient.nombreyapellidopaciente)
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
    </>
  );
};
