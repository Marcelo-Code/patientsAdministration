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

export const MedicalHistoryRecord = ({ fecha, consulta }) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
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
            {fecha}
            <div>
              <FormControlLabel
                // required
                control={<Checkbox />}
                // label="Seleccionar para informe"
              />
            </div>
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {consulta}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Link>
            <Button
              size="small"
              sx={{ width: "100px" }}
              variant="contained"
              startIcon={<DeleteIcon />}
            >
              Eliminar
            </Button>
          </Link>
          <Link>
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
