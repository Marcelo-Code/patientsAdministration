/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import UploadIcon from "@mui/icons-material/Upload";
import ClearIcon from "@mui/icons-material/Clear";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { CircularProgress } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import "dayjs/locale/es";
import dayjs from "dayjs";

import { useContext } from "react";
import { Android12Switch } from "../../../../common/switchEditionMode/SwitchEditionMode";
import { NotFoundRecord } from "../../../../common/errorPages/NotFoundRecordTemp";
import { OptionsMenu } from "../../../../common/Menu/OptionsMenu";
import {
  DeleteFileFromBucket,
  uploadFileToBucket,
} from "../../../../../api/billingDocuments";
import { GeneralContext } from "../../../../../context/GeneralContext";
import { deleteCudBillingRecord } from "../../../../../api/cudBilling";

export const CudBillingList = ({
  cudBillingRecords,
  editMode,
  handleEditModeChange,
  handleEditModeField,
  handleSubmit,
  handleChange,
  setEditModeFields,
  editModeFields,
  setUpdateList,
  updateList,
  cancelTableAction,
  professionalsProps,
  patientsProps,
  cudBillingRecord,
  modified,
  setModified,
  initialModifiedState,
  setIsLoading,
  isLoading,
  menuFilterProps,
  patientId = null,
}) => {
  const totalProfesional = cudBillingRecords.reduce((acc, record) => {
    return acc + parseFloat(record.montofinalprofesional);
  }, 0);
  const totalPercepcion = cudBillingRecords.reduce((acc, record) => {
    return acc + parseFloat(record.percepcion);
  }, 0);
  const totalMontoPercibido = cudBillingRecords.reduce((acc, record) => {
    return acc + parseFloat(record.montopercibido);
  }, 0);
  const totalMontoFacturado = cudBillingRecords.reduce((acc, record) => {
    return acc + parseFloat(record.montofacturado);
  }, 0);

  const { trimUrl, formatPeriod, removeAccentsAndSpecialChars } =
    useContext(GeneralContext);

  const documentData = [
    "imgasistenciamensual",
    "documentofacturamensual",
    "documentoinformemensual",
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          padding: "20px",
        }}
      >
        <Link to={"/createCudBilling"}>
          <Button
            variant={"contained"}
            size={"small"}
            startIcon={<NoteAddIcon />}
          >
            Nueva Facturación
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
        <OptionsMenu {...menuFilterProps} />
      </div>
      {cudBillingRecords.length === 0 ? (
        <NotFoundRecord />
      ) : (
        <Card>
          <CardContent>
            <div
              style={{
                overflowX: "auto",
                overflowY: "auto",
                maxHeight: "500px",
                minWidth: "100%",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "block",
                }}
              >
                <table
                  style={{
                    tableLayout: "fixed",
                    width: "100%",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead
                    style={{
                      position: "sticky",
                      top: 0,
                      zIndex: "4",
                    }}
                  >
                    <tr
                      style={{
                        paddingBottom: "10px",
                        background:
                          "linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 99%, rgba(0, 0, 0, 1)100%)",
                      }}
                    >
                      {editMode && <th style={{ width: "120px" }}>Edición</th>}
                      <th>Profesional</th>
                      <th>Prestación</th>
                      <th>Paciente</th>
                      <th>Asistencia Mensual</th>
                      <th>Informe Mensual</th>
                      <th>Factura Mensual</th>
                      <th>Obra Social</th>
                      <th>Período Facturado</th>
                      <th>Nro. Factura</th>
                      <th>Monto Facturado</th>
                      <th>Fecha Presentación O.S.</th>
                      <th>Fecha Aviso Recepción O.S.</th>
                      <th>Fecha Reclamo</th>
                      <th>Medio Reclamo</th>
                      <th>Respuesta Reclamo</th>
                      <th>Cobrada en Fecha</th>
                      <th>Monto Percibido</th>
                      <th>35% Percepción</th>
                      <th>Monto Final Profesional</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cudBillingRecords.map((record) => {
                      return (
                        <>
                          <tr key={record.id}>
                            {editModeFields === null && editMode ? (
                              <>
                                <td>
                                  <Link
                                    onClick={() => {
                                      deleteCudBillingRecord(
                                        record.id,
                                        documentData
                                      )
                                        .then((reponse) => {
                                          console.log(reponse);
                                          setUpdateList(!updateList);
                                        })
                                        .catch((error) => console.log(error));
                                    }}
                                  >
                                    <DeleteIcon
                                      sx={{ margin: "10px", fontSize: "2em" }}
                                    />
                                  </Link>
                                  <Link
                                    onClick={() => {
                                      handleEditModeField(record.id);
                                    }}
                                  >
                                    <EditIcon
                                      sx={{ margin: "10px", fontSize: "2em" }}
                                    />
                                  </Link>
                                </td>
                              </>
                            ) : editModeFields !== record.id && editMode ? (
                              <td></td>
                            ) : null}
                            {editModeFields === record.id ? (
                              isLoading ? (
                                <td>
                                  <CircularProgress
                                    size={20}
                                    sx={{
                                      position: "relative",
                                      left: "10%",
                                    }}
                                  />
                                </td>
                              ) : (
                                <>
                                  <td>
                                    <Link
                                      onClick={() => {
                                        cancelTableAction().then((response) => {
                                          if (response) {
                                            setEditModeFields(null);
                                            setModified(initialModifiedState);
                                          }
                                        });
                                      }}
                                    >
                                      <CancelIcon
                                        sx={{ margin: "10px", fontSize: "2em" }}
                                      />
                                    </Link>
                                    <Link
                                      onClick={() => handleSubmit(record.id)}
                                    >
                                      <SaveIcon
                                        sx={{ margin: "10px", fontSize: "2em" }}
                                      />
                                    </Link>
                                  </td>
                                  <td>
                                    <OptionsMenu
                                      {...professionalsProps}
                                      initialValue={
                                        cudBillingRecord.nombreyapellidoprofesional
                                      }
                                    />
                                  </td>
                                  <td>
                                    <TextField
                                      sx={{
                                        margin: "10px",
                                        width: "80%",
                                        border: modified.prestacion
                                          ? "1px solid red"
                                          : null,
                                      }}
                                      id="outlined-basic"
                                      variant="outlined"
                                      name="prestacion"
                                      value={cudBillingRecord.prestacion}
                                      onChange={handleChange}
                                      slotProps={{
                                        inputLabel: {
                                          shrink: true,
                                        },
                                      }}
                                    />
                                  </td>
                                  <td
                                    style={{
                                      pointerEvents: patientId && "none",
                                    }}
                                  >
                                    <OptionsMenu
                                      {...patientsProps}
                                      initialValue={
                                        cudBillingRecord.nombreyapellidopaciente
                                      }
                                    />
                                  </td>
                                  <td>
                                    <div>
                                      {record.imgasistenciamensual !== "" &&
                                        trimUrl(record.imgasistenciamensual)}
                                    </div>
                                    <div
                                      style={{
                                        marginTop: "10px",
                                        display: "flex",
                                        justifyContent: "space-evenly",
                                      }}
                                    >
                                      <Link
                                        onClick={() => {
                                          setIsLoading(true);
                                          DeleteFileFromBucket(
                                            "imgasistenciamensual",
                                            record,
                                            "cudBillingDocuments"
                                          )
                                            .then((response) => {
                                              console.log(response);
                                              setUpdateList(!updateList);
                                              setEditModeFields(null);
                                              setIsLoading(false);
                                            })
                                            .catch((error) => {
                                              console.log(error);
                                              setIsLoading(false);
                                            });
                                        }}
                                      >
                                        <DeleteIcon />
                                      </Link>
                                      <Link
                                        onClick={() => {
                                          uploadFileToBucket(
                                            `Asist_${formatPeriod(
                                              record.periodofacturado
                                            )}_${removeAccentsAndSpecialChars(
                                              record.nombreyapellidoprofesional
                                            )}_${removeAccentsAndSpecialChars(
                                              record.prestacion
                                            )}`,
                                            record,
                                            "imgasistenciamensual",
                                            "cudBillingDocuments",
                                            setIsLoading
                                          )
                                            .then((response) => {
                                              console.log(response);
                                              setUpdateList(!updateList);
                                              setEditModeFields(null);
                                              setIsLoading(false);
                                            })
                                            .catch((error) => {
                                              console.log(error);
                                              setIsLoading(false);
                                            });
                                        }}
                                      >
                                        <UploadIcon />
                                      </Link>
                                    </div>
                                    {/* {record.imgasistenciamensual} */}
                                  </td>
                                  <td>
                                    {record.documentoinformemensual !== "" &&
                                      trimUrl(record.documentoinformemensual)}
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-evenly",
                                        marginTop: "10px",
                                      }}
                                    >
                                      <Link
                                        onClick={() => {
                                          setIsLoading(true);
                                          DeleteFileFromBucket(
                                            "documentoinformemensual",
                                            record,
                                            "cudBillingDocuments"
                                          )
                                            .then((response) => {
                                              console.log(response);
                                              setUpdateList(!updateList);
                                              setEditModeFields(null);
                                              setIsLoading(false);
                                            })
                                            .catch((error) => {
                                              console.log(error);
                                              setIsLoading(false);
                                            });
                                        }}
                                      >
                                        <DeleteIcon />
                                      </Link>
                                      <Link
                                        onClick={() => {
                                          uploadFileToBucket(
                                            `InformeMensual_${record.nombreyapellidoprofesional}_${record.nrofactura}`,
                                            record,
                                            "documentoinformemensual",
                                            "cudBillingDocuments",
                                            setIsLoading
                                          )
                                            .then((response) => {
                                              console.log(response);
                                              setUpdateList(!updateList);
                                              setEditModeFields(null);
                                              setIsLoading(false);
                                            })
                                            .catch((error) => {
                                              console.log(error);
                                              setIsLoading(false);
                                            });
                                        }}
                                      >
                                        <UploadIcon />
                                      </Link>
                                    </div>
                                  </td>
                                  <td>
                                    <div>
                                      {record.documentofacturamensual !== "" &&
                                        trimUrl(record.documentofacturamensual)}
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-evenly",
                                        marginTop: "10px",
                                      }}
                                    >
                                      <Link
                                        onClick={() => {
                                          setIsLoading(true);
                                          DeleteFileFromBucket(
                                            "documentofacturamensual",
                                            record,
                                            "cudBillingDocuments"
                                          )
                                            .then((response) => {
                                              console.log(response);
                                              setUpdateList(!updateList);
                                              setEditModeFields(null);
                                              setIsLoading(false);
                                            })
                                            .catch((error) => {
                                              console.log(error);
                                              setIsLoading(false);
                                            });
                                        }}
                                      >
                                        <DeleteIcon />
                                      </Link>
                                      <Link
                                        onClick={() => {
                                          uploadFileToBucket(
                                            `FacturaMensual${record.nombreyapellidoprofesional}_${record.nrofactura}`,
                                            record,
                                            "documentofacturamensual",
                                            "cudBillingDocuments",
                                            setIsLoading
                                          )
                                            .then((response) => {
                                              console.log(response);
                                              setUpdateList(!updateList);
                                              setEditModeFields(null);
                                              setIsLoading(false);
                                            })
                                            .catch((error) => {
                                              console.log(error);
                                              setIsLoading(false);
                                            });
                                        }}
                                      >
                                        <UploadIcon />
                                      </Link>
                                    </div>
                                    {/* {record.documentofacturamensual} */}
                                  </td>
                                  <td>{cudBillingRecord.obrasocialpaciente}</td>
                                  <td>
                                    <LocalizationProvider
                                      dateAdapter={AdapterDayjs}
                                    >
                                      <MobileDatePicker
                                        sx={{
                                          width: "80%",
                                          border: modified.periodofacturado
                                            ? "1px solid red"
                                            : null,
                                        }}
                                        defaultValue={dayjs(
                                          cudBillingRecord.periodofacturado
                                        )}
                                        views={["year", "month"]}
                                        inputFormat="MM/YYYY"
                                        onChange={(newDate) => {
                                          handleChange({
                                            target: {
                                              name: "periodofacturado",
                                              value:
                                                dayjs(newDate).format(
                                                  "YYYY-MM-01"
                                                ),
                                            },
                                          });
                                        }}
                                      />
                                    </LocalizationProvider>
                                  </td>
                                  <td>
                                    <TextField
                                      sx={{
                                        margin: "10px",
                                        width: "80%",
                                        border: modified.nrofactura
                                          ? "1px solid red"
                                          : null,
                                      }}
                                      id="outlined-basic"
                                      variant="outlined"
                                      name="nrofactura"
                                      value={cudBillingRecord.nrofactura}
                                      onChange={(e) =>
                                        handleChange(e, record.id)
                                      }
                                      slotProps={{
                                        inputLabel: {
                                          shrink: true,
                                        },
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <TextField
                                      style={{
                                        margin: "10px",
                                        width: "80%",
                                        border: modified.montofacturado
                                          ? "1px solid red"
                                          : null,
                                      }}
                                      type="number"
                                      id="outlined-basic"
                                      variant="outlined"
                                      name="montofacturado"
                                      value={cudBillingRecord.montofacturado}
                                      onChange={handleChange}
                                      slotProps={{
                                        inputLabel: {
                                          shrink: true,
                                        },
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <LocalizationProvider
                                      dateAdapter={AdapterDayjs}
                                    >
                                      <MobileDatePicker
                                        sx={{
                                          width: "80%",
                                          border: modified.fechapresentacionos
                                            ? "1px solid red"
                                            : null,
                                        }}
                                        value={dayjs(
                                          cudBillingRecord.fechapresentacionos,
                                          "YYYY-MM-DD"
                                        )}
                                        onChange={(newDate) => {
                                          handleChange({
                                            target: {
                                              name: "fechapresentacionos",
                                              value:
                                                dayjs(newDate).format(
                                                  "YYYY-MM-DD"
                                                ),
                                            },
                                          });
                                        }}
                                        slotProps={{
                                          textField: {
                                            inputFormat: "DD/MM/YYYY",
                                          },
                                        }}
                                      />
                                    </LocalizationProvider>
                                  </td>
                                  <td>
                                    <LocalizationProvider
                                      dateAdapter={AdapterDayjs}
                                    >
                                      <MobileDatePicker
                                        sx={{
                                          width: "80%",
                                          border: modified.fecharecepcionos
                                            ? "1px solid red"
                                            : null,
                                        }}
                                        value={dayjs(
                                          cudBillingRecord.fecharecepcionos,
                                          "YYYY-MM-DD"
                                        )}
                                        onChange={(newDate) => {
                                          handleChange({
                                            target: {
                                              name: "fecharecepcionos",
                                              value:
                                                dayjs(newDate).format(
                                                  "YYYY-MM-DD"
                                                ),
                                            },
                                          });
                                        }}
                                        slotProps={{
                                          textField: {
                                            inputFormat: "DD/MM/YYYY",
                                          },
                                        }}
                                      />
                                    </LocalizationProvider>
                                  </td>
                                  <td>
                                    <LocalizationProvider
                                      dateAdapter={AdapterDayjs}
                                    >
                                      <MobileDatePicker
                                        sx={{
                                          width: "80%",
                                          border: modified.fechareclamo
                                            ? "1px solid red"
                                            : null,
                                        }}
                                        value={dayjs(
                                          cudBillingRecord.fechareclamo,
                                          "YYYY-MM-DD"
                                        )}
                                        onChange={(newDate) => {
                                          handleChange({
                                            target: {
                                              name: "fechareclamo",
                                              value:
                                                dayjs(newDate).format(
                                                  "YYYY-MM-DD"
                                                ),
                                            },
                                          });
                                        }}
                                        slotProps={{
                                          textField: {
                                            inputFormat: "DD/MM/YYYY",
                                          },
                                        }}
                                      />
                                    </LocalizationProvider>
                                  </td>
                                  <td>
                                    <TextField
                                      style={{
                                        margin: "10px",
                                        width: "80%",
                                        border: modified.medioreclamo
                                          ? "1px solid red"
                                          : null,
                                      }}
                                      id="outlined-basic"
                                      variant="outlined"
                                      name="medioreclamo"
                                      value={cudBillingRecord.medioreclamo}
                                      onChange={handleChange}
                                      slotProps={{
                                        inputLabel: {
                                          shrink: true,
                                        },
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <TextField
                                      style={{
                                        margin: "10px",
                                        width: "80%",
                                        border: modified.respuestareclamo
                                          ? "1px solid red"
                                          : null,
                                      }}
                                      id="outlined-basic"
                                      variant="outlined"
                                      name="respuestareclamo"
                                      value={cudBillingRecord.respuestareclamo}
                                      onChange={handleChange}
                                      slotProps={{
                                        inputLabel: {
                                          shrink: true,
                                        },
                                      }}
                                    />
                                  </td>

                                  <span>
                                    <RadioGroup
                                      row
                                      sx={{
                                        margin: "10px",
                                        width: "200px",
                                        justifyContent: "center",
                                        border: modified.cobradaenfecha
                                          ? "1px solid red"
                                          : null,
                                      }}
                                      value={
                                        cudBillingRecord.cobradaenfecha
                                          ? "yes"
                                          : "no"
                                      }
                                      name="cobradaenfecha"
                                      onChange={(e) => {
                                        const value = e.target.value === "yes";
                                        handleChange({
                                          target: {
                                            name: "cobradaenfecha",
                                            value: value,
                                          },
                                        });
                                      }}
                                    >
                                      <FormControlLabel
                                        value="yes"
                                        control={<Radio />}
                                        label="Si"
                                      />
                                      <FormControlLabel
                                        value="no"
                                        control={<Radio />}
                                        label="No"
                                      />
                                    </RadioGroup>
                                  </span>
                                  <td>
                                    <TextField
                                      style={{
                                        margin: "10px",
                                        width: "80%",
                                        border: modified.montopercibido
                                          ? "1px solid red"
                                          : null,
                                      }}
                                      id="outlined-basic"
                                      variant="outlined"
                                      type="number"
                                      name="montopercibido"
                                      value={cudBillingRecord.montopercibido}
                                      onChange={handleChange}
                                      slotProps={{
                                        inputLabel: {
                                          shrink: true,
                                        },
                                      }}
                                    />
                                  </td>
                                  <td onChange={handleChange}>
                                    {cudBillingRecord.montopercibido !==
                                      undefined &&
                                      new Intl.NumberFormat("es-AR", {
                                        style: "currency",
                                        currency: "ARS",
                                      }).format(cudBillingRecord.percepcion)}
                                  </td>
                                  <td onChange={handleChange}>
                                    {cudBillingRecord.montopercibido !==
                                      undefined &&
                                      new Intl.NumberFormat("es-AR", {
                                        style: "currency",
                                        currency: "ARS",
                                      }).format(
                                        cudBillingRecord.montofinalprofesional
                                      )}
                                  </td>
                                </>
                              )
                            ) : (
                              <>
                                <td>{record.nombreyapellidoprofesional}</td>
                                <td>{record.prestacion}</td>
                                <td>{record.nombreyapellidopaciente}</td>
                                <td>
                                  {record.imgasistenciamensual === "" ? (
                                    // <div>No hay archivo cargado</div>
                                    <ClearIcon />
                                  ) : (
                                    <Link
                                      to={`${record.imgasistenciamensual}`}
                                      onClick={(e) => {
                                        e.preventDefault(); // Prevenir comportamiento predeterminado del enlace
                                        window.open(
                                          record.imgasistenciamensual,
                                          "_blank"
                                        ); // Abrir la URL en una nueva pestaña
                                      }}
                                    >
                                      {trimUrl(record.imgasistenciamensual)}
                                    </Link>
                                  )}
                                </td>
                                <td>
                                  {record.documentoinformemensual === "" ? (
                                    <ClearIcon />
                                  ) : (
                                    // <div>No hay archivo cargado</div>
                                    <Link
                                      to={`${record.documentoinformemensual}`}
                                      onClick={(e) => {
                                        e.preventDefault(); // Prevenir comportamiento predeterminado del enlace
                                        window.open(
                                          record.documentoinformemensual,
                                          "_blank"
                                        ); // Abrir la URL en una nueva pestaña
                                      }}
                                    >
                                      {trimUrl(record.documentoinformemensual)}
                                    </Link>
                                  )}
                                </td>
                                <td>
                                  {record.documentofacturamensual === "" ? (
                                    <ClearIcon />
                                  ) : (
                                    // <div>No hay archivo cargado</div>
                                    <Link
                                      to={`${record.documentofacturamensual}`}
                                      onClick={(e) => {
                                        e.preventDefault(); // Prevenir comportamiento predeterminado del enlace
                                        window.open(
                                          record.documentofacturamensual,
                                          "_blank"
                                        ); // Abrir la URL en una nueva pestaña
                                      }}
                                    >
                                      {trimUrl(record.documentofacturamensual)}
                                    </Link>
                                  )}
                                  {/* {record.documentofacturamensual} */}
                                </td>
                                <td>{record.obrasocialpaciente}</td>
                                <td>
                                  {new Intl.DateTimeFormat("es-AR", {
                                    month: "long",
                                    year: "numeric",
                                  })
                                    .format(new Date(record.periodofacturado))
                                    .replace(" de ", " ")}
                                </td>
                                <td>{record.nrofactura}</td>
                                <td>
                                  {record.montopercibido !== undefined &&
                                    new Intl.NumberFormat("es-AR", {
                                      style: "currency",
                                      currency: "ARS",
                                    }).format(record.montofacturado)}
                                </td>
                                <td>
                                  {new Date(
                                    record.fechapresentacionos
                                  ).toLocaleDateString("es-AR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                  })}
                                </td>
                                <td>
                                  {new Date(
                                    record.fecharecepcionos
                                  ).toLocaleDateString("es-AR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                  })}
                                </td>
                                <td>
                                  {record.fechareclamo
                                    ? new Date(
                                        record.fechareclamo
                                      ).toLocaleDateString("es-AR", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                      })
                                    : "Sin reclamo"}
                                </td>
                                <td>
                                  {record.fechareclamo
                                    ? record.medioreclamo
                                    : "Sin Reclamo"}
                                </td>
                                <td>
                                  {record.fechareclamo
                                    ? record.respuestareclamo
                                    : "Sin reclamo"}
                                </td>
                                <td>{record.cobradaenfecha ? "Si" : "No"}</td>
                                <td>
                                  {record.montopercibido !== undefined &&
                                    new Intl.NumberFormat("es-AR", {
                                      style: "currency",
                                      currency: "ARS",
                                    }).format(record.montopercibido)}
                                </td>
                                <td>
                                  {record.montopercibido !== undefined &&
                                    new Intl.NumberFormat("es-AR", {
                                      style: "currency",
                                      currency: "ARS",
                                    }).format(record.percepcion)}
                                </td>
                                <td>
                                  {record.montopercibido !== undefined &&
                                    new Intl.NumberFormat("es-AR", {
                                      style: "currency",
                                      currency: "ARS",
                                    }).format(record.montofinalprofesional)}
                                </td>
                              </>
                            )}
                          </tr>
                        </>
                      );
                    })}
                  </tbody>

                  <tfoot>
                    <tr
                      style={{
                        position: "sticky",
                        bottom: 0,
                        backgroundColor: "white",
                        background:
                          "linear-gradient(to top, rgba(255, 255, 255, 1)0%,  rgba(255, 255, 255, 1)99%,  rgba(0, 0, 0, 1)100%)",
                      }}
                    >
                      <td
                        colSpan={editMode ? 10 : 9}
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        Totales:
                      </td>
                      <td>
                        {totalMontoFacturado !== undefined &&
                          new Intl.NumberFormat("es-AR", {
                            style: "currency",
                            currency: "ARS",
                          }).format(totalMontoFacturado)}
                      </td>
                      <td
                        colSpan={6}
                        style={{
                          textAlign: "center",
                        }}
                      ></td>
                      <td>
                        {totalMontoFacturado !== undefined &&
                          new Intl.NumberFormat("es-AR", {
                            style: "currency",
                            currency: "ARS",
                          }).format(totalMontoPercibido)}
                      </td>
                      <td>
                        {totalMontoFacturado !== undefined &&
                          new Intl.NumberFormat("es-AR", {
                            style: "currency",
                            currency: "ARS",
                          }).format(totalPercepcion)}
                      </td>
                      <td>
                        {totalMontoFacturado !== undefined &&
                          new Intl.NumberFormat("es-AR", {
                            style: "currency",
                            currency: "ARS",
                          }).format(totalProfesional)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};
