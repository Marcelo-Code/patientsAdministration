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
import dayjs from "dayjs";

import { useContext } from "react";
import { Android12Switch } from "../../../../common/switchEditionMode/SwitchEditionMode";
import { OptionsMenu } from "../../../../common/Menu/OptionsMenu";
import { NotFoundRecord } from "../../../../common/errorPages/NotFoundRecord";
import { GeneralContext } from "../../../../../context/GeneralContext";
import {
  DeleteNoCudBillingDocumentFromBucket,
  deleteNoCudBillingRecord,
  uploadNoCudBillingDocumentToBucket,
} from "../../../../../api/facturacionNoCud/noCudBilling";
import { NoCudBillingListShowTable } from "./noCudBillingListShowTable";

export const NoCudBillingList = ({
  noCudBillingRecords,
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
  noCudBillingRecord,
  modified,
  setModified,
  initialModifiedState,
  setIsLoading,
  isLoading,
  menuFilterProps,
  removeAccentsAndSpecialChars,
  patientId,
  professionalId,
}) => {
  const totalMontoSesion = noCudBillingRecords.reduce((acc, record) => {
    return acc + parseFloat(record.montosesion);
  }, 0);
  const totalRetencion = noCudBillingRecords.reduce((acc, record) => {
    return acc + parseFloat(record.retencion);
  }, 0);
  const totalmontofinalprofesional = noCudBillingRecords.reduce(
    (acc, record) => {
      return acc + parseFloat(record.montofinalprofesional);
    },
    0
  );

  const { trimUrl } = useContext(GeneralContext);

  const documentData = [
    "documentofactura",
    "documentocomprobantepagoretencion",
  ];

  let createNoCudBillingUrl;
  if (patientId)
    createNoCudBillingUrl = `/createNoCudBilling/patient/${patientId}`;
  else if (professionalId)
    createNoCudBillingUrl = `/createNoCudBilling/professional/${professionalId}`;
  else createNoCudBillingUrl = "/createNoCudBilling";

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
        <Link to={createNoCudBillingUrl}>
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
      {noCudBillingRecords.length === 0 ? (
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
                    // borderCollapse: "collapse",
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
                        //   "linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 99%, rgba(0, 0, 0, 1)100%)",
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
                      <th>Modo Pago</th>
                      <th>Medio de Pago</th>
                      <th>Destinatario</th>
                      <th>Monto Sesión</th>
                      <th>35% Retención</th>
                      <th>Monto Final Profesional</th>
                      <th>Fecha de Pago</th>
                      <th>Destinatario</th>
                      <th>Paciente Adeuda</th>
                      <th>Fecha Deuda</th>
                      <th>Pago Monto Adeudado</th>
                      <th>Fecha Pago</th>
                      <th>Factura Familia</th>
                      <th>Comprobante Retención</th>
                    </tr>
                  </thead>
                  <tbody>
                    {noCudBillingRecords.map((record) => {
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
                                    deleteNoCudBillingRecord(
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
                                      noCudBillingRecord.nombreyapellidoprofesional
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
                                    value={noCudBillingRecord.prestacion}
                                    onChange={handleChange}
                                    slotProps={{
                                      inputLabel: {
                                        shrink: true,
                                      },
                                    }}
                                  />
                                </td>
                                <td>
                                  <OptionsMenu
                                    {...patientsProps}
                                    initialValue={
                                      noCudBillingRecord.nombreyapellidopaciente
                                    }
                                  />
                                </td>
                                <td>
                                  <TextField
                                    sx={{
                                      margin: "10px",
                                      width: "80%",
                                      border: modified.modopago
                                        ? "1px solid red"
                                        : null,
                                    }}
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="modopago"
                                    value={noCudBillingRecord.modopago}
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
                                    sx={{
                                      margin: "10px",
                                      width: "80%",
                                      border: modified.mediopago
                                        ? "1px solid red"
                                        : null,
                                    }}
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="mediopago"
                                    value={noCudBillingRecord.mediopago}
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
                                    sx={{
                                      margin: "10px",
                                      width: "80%",
                                      border: modified.destinatario
                                        ? "1px solid red"
                                        : null,
                                    }}
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="destinatario"
                                    value={noCudBillingRecord.destinatario}
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
                                      border: modified.montosesion
                                        ? "1px solid red"
                                        : null,
                                    }}
                                    type="number"
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="montosesion"
                                    value={noCudBillingRecord.montosesion}
                                    onChange={handleChange}
                                    slotProps={{
                                      inputLabel: {
                                        shrink: true,
                                      },
                                    }}
                                  />
                                </td>
                                <td>
                                  {noCudBillingRecord.montosesion !==
                                    undefined &&
                                    new Intl.NumberFormat("es-AR", {
                                      style: "currency",
                                      currency: "ARS",
                                    }).format(noCudBillingRecord.retencion)}
                                </td>
                                <td>
                                  {noCudBillingRecord.montosesion !==
                                    undefined &&
                                    new Intl.NumberFormat("es-AR", {
                                      style: "currency",
                                      currency: "ARS",
                                    }).format(
                                      noCudBillingRecord.montofinalprofesional
                                    )}
                                </td>
                                <td>
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <MobileDatePicker
                                      sx={{
                                        width: "80%",
                                        border: modified.fechadepago
                                          ? "1px solid red"
                                          : null,
                                      }}
                                      value={dayjs(
                                        noCudBillingRecord.fechadepago,
                                        "YYYY-MM-DD"
                                      )}
                                      onChange={(newDate) => {
                                        handleChange({
                                          target: {
                                            name: "fechadepago",
                                            value:
                                              dayjs(newDate).format(
                                                "YYYY-MM-DD"
                                              ),
                                          },
                                        });
                                      }}
                                      maxDate={dayjs()}
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
                                    sx={{
                                      margin: "10px",
                                      width: "80%",
                                      border: modified.destinatario
                                        ? "1px solid red"
                                        : null,
                                    }}
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="destinatario"
                                    value={noCudBillingRecord.destinatario}
                                    onChange={(e) => handleChange(e, record.id)}
                                    slotProps={{
                                      inputLabel: {
                                        shrink: true,
                                      },
                                    }}
                                  />
                                </td>
                                <td>
                                  <span>
                                    <RadioGroup
                                      row
                                      sx={{
                                        margin: "10px",
                                        width: "200px",
                                        justifyContent: "center",
                                        border: modified.pacienteadeuda
                                          ? "1px solid red"
                                          : null,
                                      }}
                                      value={
                                        noCudBillingRecord.pacienteadeuda
                                          ? "yes"
                                          : "no"
                                      }
                                      name="pacienteadeuda"
                                      onChange={(e) => {
                                        const value = e.target.value === "yes";
                                        handleChange({
                                          target: {
                                            name: "pacienteadeuda",
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
                                </td>
                                <td>
                                  {console.log(noCudBillingRecord)}
                                  {noCudBillingRecord.pacienteadeuda ? (
                                    <LocalizationProvider
                                      dateAdapter={AdapterDayjs}
                                    >
                                      <MobileDatePicker
                                        sx={{
                                          width: "80%",
                                          border: modified.fechadeuda
                                            ? "1px solid red"
                                            : null,
                                        }}
                                        value={dayjs(
                                          noCudBillingRecord.fechadeuda,
                                          "YYYY-MM-DD"
                                        )}
                                        onChange={(newDate) => {
                                          handleChange({
                                            target: {
                                              name: "fechadeuda",
                                              value:
                                                dayjs(newDate).format(
                                                  "YYYY-MM-DD"
                                                ),
                                            },
                                          });
                                        }}
                                        maxDate={dayjs()}
                                        format="DD/MM/YYYY"
                                      />
                                    </LocalizationProvider>
                                  ) : (
                                    "Sin fecha"
                                  )}
                                </td>
                                <td>
                                  <span>
                                    {noCudBillingRecord.pacienteadeuda ? (
                                      <RadioGroup
                                        row
                                        sx={{
                                          margin: "10px",
                                          width: "200px",
                                          justifyContent: "center",
                                          border: modified.pagomontoadeudado
                                            ? "1px solid red"
                                            : null,
                                        }}
                                        value={
                                          noCudBillingRecord.pagomontoadeudado
                                            ? "yes"
                                            : "no"
                                        }
                                        name="pagomontoadeudado"
                                        onChange={(e) => {
                                          const value =
                                            e.target.value === "yes";
                                          handleChange({
                                            target: {
                                              name: "pagomontoadeudado",
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
                                    ) : (
                                      "No hay deuda"
                                    )}
                                  </span>
                                </td>
                                <td>
                                  {noCudBillingRecord.pagomontoadeudado ? (
                                    <LocalizationProvider
                                      dateAdapter={AdapterDayjs}
                                    >
                                      <MobileDatePicker
                                        sx={{
                                          width: "80%",
                                          border:
                                            modified.fechapagomontoadeudado
                                              ? "1px solid red"
                                              : null,
                                        }}
                                        value={dayjs(
                                          noCudBillingRecord.fechapagomontoadeudado,
                                          "YYYY-MM-DD"
                                        )}
                                        onChange={(newDate) => {
                                          handleChange({
                                            target: {
                                              name: "fechapagomontoadeudado",
                                              value:
                                                dayjs(newDate).format(
                                                  "YYYY-MM-DD"
                                                ),
                                            },
                                          });
                                        }}
                                        maxDate={dayjs()}
                                        format="DD/MM/YYYY"
                                      />
                                    </LocalizationProvider>
                                  ) : (
                                    "Sin fecha"
                                  )}
                                </td>
                                <td>
                                  <div>
                                    {record.documentofactura !== "" &&
                                      trimUrl(record.documentofactura)}
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
                                        DeleteNoCudBillingDocumentFromBucket(
                                          "documentofactura",
                                          record
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
                                        uploadNoCudBillingDocumentToBucket(
                                          `Factura_${removeAccentsAndSpecialChars(
                                            record.nombreyapellidoprofesional
                                          )}_${removeAccentsAndSpecialChars(
                                            record.prestacion
                                          )}_${record.id}`,
                                          record,
                                          "documentofactura",
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
                                    {record.documentocomprobantepagoretencion !==
                                      "" &&
                                      trimUrl(
                                        record.documentocomprobantepagoretencion
                                      )}
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
                                        DeleteNoCudBillingDocumentFromBucket(
                                          "documentocomprobantepagoretencion",
                                          record
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
                                        uploadNoCudBillingDocumentToBucket(
                                          `Retencion_${removeAccentsAndSpecialChars(
                                            record.nombreyapellidoprofesional
                                          )}_${removeAccentsAndSpecialChars(
                                            record.prestacion
                                          )}_${record.id}`,
                                          record,
                                          "documentocomprobantepagoretencion",
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
                              </>
                            )
                          ) : (
                            <NoCudBillingListShowTable
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
                        colSpan={editMode ? 8 : 7}
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        Totales:
                      </td>
                      <td>
                        {totalMontoSesion !== undefined &&
                          new Intl.NumberFormat("es-AR", {
                            style: "currency",
                            currency: "ARS",
                          }).format(totalMontoSesion)}
                      </td>
                      <td>
                        {totalRetencion !== undefined &&
                          new Intl.NumberFormat("es-AR", {
                            style: "currency",
                            currency: "ARS",
                          }).format(totalRetencion)}
                      </td>
                      <td>
                        {totalmontofinalprofesional !== undefined &&
                          new Intl.NumberFormat("es-AR", {
                            style: "currency",
                            currency: "ARS",
                          }).format(totalmontofinalprofesional)}
                      </td>
                      <td colSpan={7}></td>
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
