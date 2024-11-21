/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteMedicalrecord } from "../../../api/medicalRecords";

export const MedicalHistoryRecord = ({
  id,
  fecha,
  tipo,
  descripcion,
  profesional,
  updateList,
  setUpdateList,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px",
        gap: "20px",
      }}
    >
      <Card sx={{ width: "80%", minWidth: 300 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <span
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
              }}
            >
              <span>
                {new Date(fecha).toLocaleDateString("es-AR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
              <span>{profesional}</span>
              <span>{tipo}</span>
            </span>
            <div>
              <FormControlLabel
                // required
                control={<Checkbox />}
                // label="Seleccionar para informe"
              />
            </div>
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {descripcion}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button
            size="small"
            sx={{ width: "100px" }}
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => {
              deleteMedicalrecord(id)
                .then((response) => {
                  console.log(response);
                  setUpdateList(!updateList);
                })
                .catch((error) => console.log(error));
            }}
          >
            Eliminar
          </Button>
          <Link to={`/editMedicalRecord/${id}`}>
            <Button
              size="small"
              sx={{ width: "100px" }}
              variant="contained"
              startIcon={<EditIcon />}
            >
              Editar
            </Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
};
