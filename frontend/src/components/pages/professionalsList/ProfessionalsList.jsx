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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { deleteProfessional } from "../../../api/professionals";

export const ProfessionalsList = ({
  professionals,
  editMode,
  updateList,
  setUpdateList,
}) => {
  return professionals.map((professional) => {
    return (
      <Card key={professional.id} sx={{ width: "300px" }}>
        <CardContent sx={{ textAlign: "center", color: "text.secondary" }}>
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
            <CalendarMonthIcon variant="h7" sx={{ marginRight: "10px" }} />
            <b style={{ marginRight: "10px" }}>Última Act.: </b>
            {new Date(professional.fechaultimaactualizacion).toLocaleDateString(
              "es-AR",
              {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }
            )}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          {editMode && (
            <>
              <Link
                onClick={() =>
                  deleteProfessional(
                    professional.id,
                    professional.nombreyapellidoprofesional
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
              <Link to={`/editProfessional/${professional.id}`}>
                <EditIcon sx={{ margin: "10px", fontSize: "2em" }} />
              </Link>
            </>
          )}
        </CardActions>
      </Card>
    );
  });
};
