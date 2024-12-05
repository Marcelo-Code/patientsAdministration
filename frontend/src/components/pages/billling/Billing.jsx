/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Card,
  CardContent,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useState } from "react";
import "./billing.css";
import { Android12Switch } from "../../common/switchEditionMode/SwitchEditionMode";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const Billing = (props) => {
  const [value, setValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const [editMode, setEditMode] = useState(false);
  const handleEditModeChange = (e) => {
    setEditMode(e.target.checked);
  };

  console.log(editMode);

  const { handleGoBack } = props;

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "80px",
        position: "absolute",
        top: "80px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Contenedor de pestañas */}
      <Button onClick={handleGoBack}>Volver</Button>
      <Box
        sx={{
          width: "100%",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="basic tabs example"
          sx={{}}
        >
          <Tab label="Cud" {...a11yProps(0)} />
          <Tab label="No Cud" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <div
          style={{ display: "flex", justifyContent: "center", padding: "20px" }}
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
        </div>
        <Card>
          <CardContent>
            <Typography
              sx={{
                borderBottom: "1px solid black",
                padding: "10px",
                marginBottom: "20px",
              }}
            >
              Nombre del Paciente
            </Typography>
            <div
              style={{
                overflowX: "auto",
                maxWidth: "100%",
                paddingBottom: "50px",
              }}
            >
              <table
                style={{
                  tableLayout: "fixed",
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "1px solid black" }}>
                    {editMode && <th style={{ width: "120px" }}>Edición</th>}
                    <th>Profesional</th>
                    <th>Prestación</th>
                    <th>Paciente</th>
                    <th>Obra Social</th>
                    <th>Período Facturado</th>
                    <th>Nro. Factura</th>
                    <th>Monto Facturado</th>
                    <th>Fecha Presentación O.S.</th>
                    <th>Fecha Aviso Recepción O.S.</th>
                    <th>Reclamos Fecha</th>
                    <th>Medio Reclamo</th>
                    <th>Respuesta Reclamo y Fecha</th>
                    <th>Cobrada en Fecha</th>
                    <th>Monto Percibido</th>
                    <th>35% Percepción</th>
                    <th>Monto Final Profesional</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {editMode && (
                      <td>
                        <Link>
                          <DeleteIcon
                            sx={{ margin: "10px", fontSize: "2em" }}
                          />
                        </Link>
                        <Link>
                          <EditIcon sx={{ margin: "10px", fontSize: "2em" }} />
                        </Link>
                      </td>
                    )}
                    <td>Ejemplo</td>
                    <td>Ejemplo</td>
                    <td>Ejemplo</td>
                    <td>Ejemplo</td>
                    <td>Ejemplo</td>
                    <td>Ejemplo</td>
                    <td>Ejemplo</td>
                    <td>Ejemplo</td>
                    <td>Ejemplo</td>
                    <td>Ejemplo</td>
                    <td>Ejemplo</td>
                    <td>Ejemplo</td>
                    <td>Ejemplo</td>
                    <td>Ejemplo</td>
                  </tr>
                </tbody>
              </table>
              {/* <div>Asistencia Mensual</div>
                <div>Informe Mensual</div>
                <div>Factura Mensual</div> */}
            </div>
          </CardContent>
        </Card>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div
          style={{ display: "flex", justifyContent: "center", padding: "20px" }}
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
        </div>
        <Card>
          <CardContent>
            <Typography
              sx={{
                borderBottom: "1px solid black",
                padding: "10px",
                marginBottom: "20px",
              }}
            >
              Nombre del Paciente
            </Typography>
            <div
              style={{
                overflowX: "auto",
                maxWidth: "100%",
                paddingBottom: "50px",
              }}
            >
              <table
                style={{
                  tableLayout: "fixed",
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "1px solid black" }}>
                    {editMode && <th style={{ width: "120px" }}>Edición</th>}
                    <th>Profesional</th>
                    <th>Prestación</th>
                    <th>Paciente</th>
                    <th>Modo Pago</th>
                    <th>Medio de Pago</th>
                    <th>Destinatario Pago</th>
                    <th>Monto Sesión</th>
                    <th>Fecha Presentación O.S.</th>
                    <th>35% Percepción</th>
                    <th>Monto a Percibir Profesional</th>
                    <th>Medio Reclamo</th>
                    <th>Fecha de Pago Retención</th>
                    <th>Destinatario Percepción</th>
                    <th>Paciente Adeuda y Fecha</th>
                    <th>Pago Monto Adeudado Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {editMode && (
                      <td>
                        <Link>
                          <DeleteIcon
                            sx={{ margin: "10px", fontSize: "2em" }}
                          />
                        </Link>
                        <Link>
                          <EditIcon sx={{ margin: "10px", fontSize: "2em" }} />
                        </Link>
                      </td>
                    )}
                    <td>Ejemplo</td>
                    <td>Ejemplo</td>
                    <td>Ejemplo</td>
                    <td>Ejemplo</td>
                    <td>Ejemplo</td>
                    <td>Ejemplo</td>
                    <td>Ejemplo</td>
                    <td>Ejemplo</td>
                    <td>Ejemplo</td>
                    <td>Ejemplo</td>
                    <td>Ejemplo</td>
                    <td>Ejemplo</td>
                    <td>Ejemplo</td>
                    <td>Ejemplo</td>
                  </tr>
                </tbody>
              </table>
              {/* <div>Asistencia Mensual</div>
                <div>Informe Mensual</div>
                <div>Factura Mensual</div> */}
            </div>
          </CardContent>
        </Card>
      </CustomTabPanel>
    </Box>
  );
};

function CustomTabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
