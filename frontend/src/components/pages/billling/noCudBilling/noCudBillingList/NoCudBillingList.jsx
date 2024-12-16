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
import { NotFoundRecord } from "../../../../common/errorPages/notFoundRecord";
import {
  DeleteFileFromBucket,
  DeleteNoCudBillingDocumentFromBucket,
  uploadFileToBucket,
  uploadNoCudBillingDocumentToBucket,
} from "../../../../../api/billingDocuments";
import { GeneralContext } from "../../../../../context/GeneralContext";
import { deleteNoCudBillingRecord } from "../../../../../api/noCudBilling";

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
  billRecordNoCud,
  modified,
  setModified,
  initialModifiedState,
  setIsLoading,
  isLoading,
  menuFilterProps,
  removeAccentsAndSpecialChars,
}) => {
  const totalMontoSesion = noCudBillingRecords.reduce((acc, record) => {
    return acc + parseFloat(record.montosesion);
  }, 0);
  const totalPercepcion = noCudBillingRecords.reduce((acc, record) => {
    return acc + parseFloat(record.percepcion);
  }, 0);
  const totalmontoapercibir = noCudBillingRecords.reduce((acc, record) => {
    return acc + parseFloat(record.montoapercibir);
  }, 0);

  const { trimUrl } = useContext(GeneralContext);

  const documentData = ["documentofactura"];

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
        <Link to={"/createNoCudBilling"}>
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
                      <th>Modo Pago</th>
                      <th>Medio de Pago</th>
                      <th>Destinatario</th>
                      <th>Monto Sesión</th>
                      <th>Percepción</th>
                      <th>Monto a Percibir</th>
                      <th>Fecha de Pago</th>
                      <th>Destinatario</th>
                      <th>Paciente Adeuda</th>
                      <th>Fecha Deuda</th>
                      <th>Pago Monto Adeudado</th>
                      <th>Fecha Pago</th>
                      <th>Factura</th>
                    </tr>
                  </thead>
                  <tbody>
                    {noCudBillingRecords.map((record) => {
                      return (
                        <tr key={record.id}>
                          {editModeFields === null && editMode ? (
                            <>
                              <td>
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
                                      billRecordNoCud.nombreyapellidoprofesional
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
                                    value={billRecordNoCud.prestacion}
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
                                      billRecordNoCud.nombreyapellidopaciente
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
                                    value={billRecordNoCud.modopago}
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
                                    value={billRecordNoCud.mediopago}
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
                                    value={billRecordNoCud.destinatario}
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
                                    value={billRecordNoCud.montosesion}
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
                                      border: modified.percepcion
                                        ? "1px solid red"
                                        : null,
                                    }}
                                    type="number"
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="percepcion"
                                    value={billRecordNoCud.percepcion}
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
                                      border: modified.montoapercibir
                                        ? "1px solid red"
                                        : null,
                                    }}
                                    type="number"
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="montoapercibir"
                                    value={billRecordNoCud.montoapercibir}
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
                                        border: modified.fechadepago
                                          ? "1px solid red"
                                          : null,
                                      }}
                                      value={dayjs(
                                        billRecordNoCud.fechadepago,
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
                                    value={billRecordNoCud.destinatario}
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
                                        billRecordNoCud.pacienteadeuda
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
                                        billRecordNoCud.fechadeuda,
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
                                      border: modified.pagomontoadeudado
                                        ? "1px solid red"
                                        : null,
                                    }}
                                    type="number"
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="pagomontoadeudado"
                                    value={billRecordNoCud.pagomontoadeudado}
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
                                        border: modified.fechapagomontoadeudado
                                          ? "1px solid red"
                                          : null,
                                      }}
                                      value={dayjs(
                                        billRecordNoCud.fechapagomontoadeudado,
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
                                      slotProps={{
                                        textField: {
                                          inputFormat: "DD/MM/YYYY",
                                        },
                                      }}
                                    />
                                  </LocalizationProvider>
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
                                          `Asist_${removeAccentsAndSpecialChars(
                                            record.nombreyapellidoprofesional
                                          )}_${removeAccentsAndSpecialChars(
                                            record.prestacion
                                          )}`,
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
                              </>
                            )
                          ) : (
                            <>
                              <td>{record.nombreyapellidoprofesional}</td>
                              <td>{record.prestacion}</td>
                              <td>{record.nombreyapellidopaciente}</td>
                              <td>{record.modopago}</td>
                              <td>{record.mediopago}</td>
                              <td>{record.destinatariopago}</td>
                              <td>
                                {record.montosesion !== undefined &&
                                  new Intl.NumberFormat("es-AR", {
                                    style: "currency",
                                    currency: "ARS",
                                  }).format(record.montosesion)}
                              </td>
                              <td>
                                {record.percepcion !== undefined &&
                                  new Intl.NumberFormat("es-AR", {
                                    style: "currency",
                                    currency: "ARS",
                                  }).format(record.percepcion)}
                              </td>
                              <td>
                                {record.montoapercibir !== undefined &&
                                  new Intl.NumberFormat("es-AR", {
                                    style: "currency",
                                    currency: "ARS",
                                  }).format(record.montoapercibir)}
                              </td>
                              <td>
                                {new Date(
                                  record.fechadepago
                                ).toLocaleDateString("es-AR", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                })}
                              </td>
                              <td>{record.destinatario}</td>
                              <td>{record.pacienteadeuda ? "Si" : "No"}</td>
                              <td>
                                {new Date(record.fechadeuda).toLocaleDateString(
                                  "es-AR",
                                  {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                  }
                                )}
                              </td>
                              <td>{record.pagomontoadeudado}</td>
                              <td>
                                {new Date(
                                  record.fechapagomontoadeudado
                                ).toLocaleDateString("es-AR", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                })}
                              </td>
                              <td>
                                {record.documentofactura === "" ? (
                                  // <div>No hay archivo cargado</div>
                                  <ClearIcon />
                                ) : (
                                  <Link
                                    to={`${record.documentofactura}`}
                                    onClick={(e) => {
                                      e.preventDefault(); // Prevenir comportamiento predeterminado del enlace
                                      window.open(
                                        record.documentofactura,
                                        "_blank"
                                      ); // Abrir la URL en una nueva pestaña
                                    }}
                                  >
                                    {trimUrl(record.documentofactura)}
                                  </Link>
                                )}
                              </td>
                            </>
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
                        colSpan={editMode ? 7 : 6}
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
                        {totalPercepcion !== undefined &&
                          new Intl.NumberFormat("es-AR", {
                            style: "currency",
                            currency: "ARS",
                          }).format(totalPercepcion)}
                      </td>
                      <td>
                        {totalmontoapercibir !== undefined &&
                          new Intl.NumberFormat("es-AR", {
                            style: "currency",
                            currency: "ARS",
                          }).format(totalmontoapercibir)}
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
