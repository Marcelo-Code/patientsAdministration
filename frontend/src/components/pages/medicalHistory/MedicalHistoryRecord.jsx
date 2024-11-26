/* eslint-disable react/prop-types */
import {
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
  records,
  editMode,
  isChecked,
  handleCheckboxChange,
  updateList,
  setUpdateList,
  reportMode,
}) => {
  return (
    <>
      {records.map((history) => {
        const {
          id,
          idPaciente,
          idProfesional,
          fechaconsulta,
          tipoconsulta,
          descripcion,
          nombreyapellidoprofesional,
          cuitprofesional,
        } = history;
        return (
          <div
            key={id}
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
                {reportMode && (
                  <span>
                    <FormControlLabel
                      // required
                      control={
                        <Checkbox
                          name={`record${id}`}
                          checked={isChecked[id] || false}
                          onChange={(e) => handleCheckboxChange(e, id)}
                        />
                      }
                      label="Seleccionar para informe"
                    />
                  </span>
                )}
              </CardContent>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ marginRight: "20px" }}>
                      {new Date(fechaconsulta).toLocaleDateString("es-AR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </div>
                    <span style={{ marginRight: "20px" }}>
                      {nombreyapellidoprofesional}{" "}
                    </span>
                    <span>{tipoconsulta}</span>
                  </span>
                </Typography>

                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {descripcion}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                {editMode && (
                  <>
                    <Link
                      onClick={() => {
                        deleteMedicalrecord(id)
                          .then((response) => {
                            console.log(response);
                            setUpdateList(!updateList);
                          })
                          .catch((error) => console.log(error));
                      }}
                    >
                      <DeleteIcon sx={{ margin: "10px", fontSize: "2em" }} />
                    </Link>
                    <Link to={`/editMedicalRecord/${id}`}>
                      <EditIcon sx={{ margin: "10px", fontSize: "2em" }} />
                    </Link>
                  </>
                )}
                <Link to={`/editMedicalRecord/${id}`}></Link>
              </CardActions>
            </Card>
          </div>
        );
      })}
    </>
  );
};
