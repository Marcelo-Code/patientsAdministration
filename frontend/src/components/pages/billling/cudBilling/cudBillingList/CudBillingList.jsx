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
import { NotFoundRecord } from "../../../../common/errorPages/NotFoundRecord";
import { OptionsMenu } from "../../../../common/Menu/OptionsMenu";
import { GeneralContext } from "../../../../../context/GeneralContext";
import {
  deleteCudBillingRecord,
  DeleteFileFromBucket,
  uploadCudBillingDocumentToBucket,
} from "../../../../../api/facturacionCud/cudBilling";
// import "./cudBillingList.css";
import CudBillingListShowTable from "./CudBillingListShowTable";

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
  patientId,
  professionalId,
  patientRecord,
}) => {
  const totalProfesional = cudBillingRecords.reduce((acc, record) => {
    return acc + parseFloat(record.montofinalprofesional);
  }, 0);
  const totalRetencion = cudBillingRecords.reduce((acc, record) => {
    return acc + parseFloat(record.retencion);
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

  let createCudBillingUrl;
  if (patientId) createCudBillingUrl = `/createCudBilling/patient/${patientId}`;
  else if (professionalId)
    createCudBillingUrl = `/createCudBilling/professional/${professionalId}`;
  else createCudBillingUrl = "/createCudBilling";

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          padding: "20px",
        }}
      >
        <Link
          to={createCudBillingUrl}
          style={{ pointerEvents: patientRecord?.cud ? "auto" : "none" }}
        >
          <Button
            variant={"contained"}
            size={"small"}
            startIcon={<NoteAddIcon />}
            disabled={!patientRecord?.cud}
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
                      zIndex: "3",
                    }}
                  >
                    <tr
                      style={{
                        paddingBottom: "10px",
                        background: "white",
                      }}
                    >
                      {editMode && (
                        <th
                          style={{
                            width: "120px",
                            position: "sticky",
                            left: 0,
                            background: "white",
                          }}
                        >
                          Edición
                        </th>
                      )}
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
                      <th>Cobrada en Fecha</th>
                      <th>Fecha Reclamo</th>
                      <th>Medio Reclamo</th>
                      <th>Respuesta Reclamo</th>
                      <th>Fecha de Cobro</th>
                      <th>Monto Percibido</th>
                      <th>35% Retención</th>
                      <th>Monto Final Profesional</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cudBillingRecords.map((record) => {
                      return (
                        <tr key={record.id}>
                          {editModeFields === null && editMode ? (
                            <>
                              <td
                                style={{
                                  position: "sticky",
                                  left: 0,
                                  background: "white",
                                }}
                              >
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
                            <td
                              style={{
                                position: "sticky",
                                left: 0,
                                background: "white",
                                zIndex: 2,
                              }}
                            ></td>
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
                                <td
                                  style={{
                                    position: "sticky",
                                    left: 0,
                                    background: "white",
                                    zIndex: 2,
                                  }}
                                >
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
                                  <Link onClick={() => handleSubmit(record.id)}>
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
                                        uploadCudBillingDocumentToBucket(
                                          `Asist_${formatPeriod(
                                            record.periodofacturado
                                          )}_${removeAccentsAndSpecialChars(
                                            record.nombreyapellidoprofesional
                                          )}_${removeAccentsAndSpecialChars(
                                            record.prestacion
                                          )}_${record.id}`,
                                          record,
                                          "imgasistenciamensual",
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
                                        uploadCudBillingDocumentToBucket(
                                          `Inf_Mensual_${formatPeriod(
                                            record.periodofacturado
                                          )}_${removeAccentsAndSpecialChars(
                                            record.nombreyapellidoprofesional
                                          )}_${removeAccentsAndSpecialChars(
                                            record.prestacion
                                          )}_${record.id}`,
                                          record,
                                          "documentoinformemensual",
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
                                        uploadCudBillingDocumentToBucket(
                                          `Factura_Mensual_${formatPeriod(
                                            record.periodofacturado
                                          )}_${removeAccentsAndSpecialChars(
                                            record.nombreyapellidoprofesional
                                          )}_${removeAccentsAndSpecialChars(
                                            record.prestacion
                                          )}_${record.id}`,
                                          record,
                                          "documentofacturamensual",
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
                                      maxDate={dayjs()}
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
                                    onChange={(e) => handleChange(e, record.id)}
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
                                      maxDate={dayjs()}
                                      format="DD/MM/YYYY"
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
                                      maxDate={dayjs()}
                                      format="DD/MM/YYYY"
                                    />
                                  </LocalizationProvider>
                                </td>
                                <td>
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
                                </td>
                                <td>
                                  {!cudBillingRecord.cobradaenfecha ? (
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
                                        maxDate={dayjs()}
                                        format="DD/MM/YYYY"
                                      />
                                    </LocalizationProvider>
                                  ) : (
                                    "Sin reclamo"
                                  )}
                                </td>
                                <td>
                                  {!cudBillingRecord.cobradaenfecha ? (
                                    <TextField
                                      style={{
                                        margin: "10px",
                                        width: "80%",
                                        border: modified.medioreclamo
                                          ? "1px solid red"
                                          : null,
                                      }}
                                      disabled={!cudBillingRecord.fechareclamo}
                                      id="outlined-basic"
                                      variant="outlined"
                                      name="medioreclamo"
                                      value={
                                        cudBillingRecord.fechareclamo &&
                                        cudBillingRecord.medioreclamo
                                      }
                                      onChange={handleChange}
                                      slotProps={{
                                        inputLabel: {
                                          shrink: true,
                                        },
                                      }}
                                    />
                                  ) : (
                                    "Sin reclamo"
                                  )}
                                </td>
                                <td>
                                  {!cudBillingRecord.cobradaenfecha ? (
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
                                      disabled={
                                        !cudBillingRecord.fechareclamo && true
                                      }
                                      value={
                                        cudBillingRecord.fechareclamo &&
                                        cudBillingRecord.respuestareclamo
                                      }
                                      onChange={handleChange}
                                      slotProps={{
                                        inputLabel: {
                                          shrink: true,
                                        },
                                      }}
                                    />
                                  ) : (
                                    "Sin reclamo"
                                  )}
                                </td>
                                <td>
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <MobileDatePicker
                                      sx={{
                                        width: "80%",
                                        border: modified.fechacobro
                                          ? "1px solid red"
                                          : null,
                                      }}
                                      value={dayjs(
                                        cudBillingRecord.fechacobro,
                                        "YYYY-MM-DD"
                                      )}
                                      onChange={(newDate) => {
                                        handleChange({
                                          target: {
                                            name: "fechacobro",
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
                                      maxDate={dayjs()}
                                      format="DD/MM/YYYY"
                                    />
                                  </LocalizationProvider>
                                </td>
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
                                    }).format(cudBillingRecord.retencion)}
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
                            //muestra la lista de facturación
                            <CudBillingListShowTable
                              record={record}
                              trimUrl={trimUrl}
                            />
                          )}
                        </tr>
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
                        colSpan={7}
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
                          }).format(totalRetencion)}
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
    </div>
  );
};
