/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";

// import osde from "../../../assets/osde.png";

export const PatientsList = (props) => {
  const { patientId, nombre, apellido, dni, nroAfiliado, imagen } = props;
  return (
    <Card sx={{ width: "300px" }}>
      <CardMedia
        component="img"
        sx={{
          width: "auto",
          height: "85px",
          margin: "0 auto",
          paddingTop: "20px",
        }}
        image={imagen}
        title="Obra Social"
      />
      <CardContent sx={{ textAlign: "center", color: "text.secondary" }}>
        <Typography gutterBottom variant="h5" component="div">
          {nombre} {apellido}
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
          <b style={{ marginRight: "10px" }}>Nro afiliado:</b> {nroAfiliado}
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
          <b style={{ marginRight: "10px" }}>DNI</b>: {dni}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Link to={`/patientsDetail/${patientId}`}>
          <Button size="small">Ver detalles</Button>
        </Link>
      </CardActions>
    </Card>
  );
};
