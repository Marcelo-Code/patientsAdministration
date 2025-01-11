/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import { Android12Switch } from "../../../common/switchEditionMode/SwitchEditionMode";
import { NotFoundRecord } from "../../../common/errorPages/NotFoundRecord";
import { deleteUserRecord } from "../../../../api/usuarios/users";
import { useEffect } from "react";

export const UsersList = ({
  handleGoBack,
  setPageIsLoading,
  cancelTableAction,
  editModeFields,
  isLoading,
  handleEditModeChange,
  handleEditModeField,
  handleChange,
  handleSubmit,
  editMode,
  usersRecords,
  updateList,
  setUpdateList,
  setEditModeFields,
  modifiedRecord,
  setModifiedRecord,
  initialModifiedState,
  userRecord,
  passwordMatch,
}) => {
  useEffect(() => {
    setPageIsLoading(false);
  }, [setPageIsLoading]);

  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      <Button sx={{ width: "100%" }} onClick={handleGoBack}>
        Volver
      </Button>
      <h2>Lista de usuarios:</h2>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Link to={"/createUser"}>
          <Button
            variant={"contained"}
            size={"small"}
            startIcon={<PersonAddIcon />}
          >
            Crear Usuario
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
      </div>

      {usersRecords.length === 0 ? (
        <NotFoundRecord />
      ) : (
        <div
          style={{
            width: "100vw",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card>
            <CardContent>
              <div
                style={{
                  // overflowX: "auto",
                  overflowY: "auto",
                  maxHeight: "500px",
                  width: "100%",
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
                              width: "110px",
                              position: "sticky",
                              left: 0,
                              background: "white",
                            }}
                          >
                            Edición
                          </th>
                        )}
                        <th
                          style={{
                            textAlign: "center",
                          }}
                        >
                          Usuario
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                          }}
                        >
                          Nombre y Apellido
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                          }}
                        >
                          DNI
                        </th>

                        <th
                          style={{
                            textAlign: "center",
                          }}
                        >
                          Password
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                          }}
                        >
                          Repeat Password
                        </th>

                        <th
                          style={{
                            textAlign: "center",
                          }}
                        >
                          e-mail
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                          }}
                        >
                          Perfil
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                          }}
                        >
                          Fecha Creación
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersRecords.map((record) => {
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
                                      deleteUserRecord(
                                        record.id,
                                        record.usuario
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
                                            setModifiedRecord(
                                              initialModifiedState
                                            );
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
                                    <TextField
                                      sx={{
                                        margin: "10px",
                                        width: "80%",
                                        border: modifiedRecord.usuario
                                          ? "1px solid red"
                                          : null,
                                      }}
                                      id="outlined-basic"
                                      variant="outlined"
                                      name="usuario"
                                      value={userRecord.usuario}
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
                                      sx={{
                                        margin: "10px",
                                        width: "80%",
                                        border:
                                          modifiedRecord.nombreyapellidousuario
                                            ? "1px solid red"
                                            : null,
                                      }}
                                      id="outlined-basic"
                                      variant="outlined"
                                      name="nombreyapellidousuario"
                                      value={userRecord.nombreyapellidousuario}
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
                                      sx={{
                                        margin: "10px",
                                        width: "80%",
                                        border: modifiedRecord.dni
                                          ? "1px solid red"
                                          : null,
                                      }}
                                      id="outlined-basic"
                                      variant="outlined"
                                      name="dni"
                                      value={userRecord.dni}
                                      onChange={(e) =>
                                        handleChange(e, userRecord.id)
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
                                        border: modifiedRecord.password
                                          ? "1px solid red"
                                          : null,
                                      }}
                                      id="outlined-basic"
                                      variant="outlined"
                                      name="password"
                                      type="password"
                                      value={userRecord.password}
                                      onChange={(e) => {
                                        const value = e.target.value
                                          .toLowerCase()
                                          .replace(/\s+/g, "") // Elimina los espacios
                                          .replace(/[^a-z0-9]/g, ""); // Elimina caracteres que no sean letras o números
                                        handleChange({
                                          target: { name: "password", value },
                                        });
                                      }}
                                      slotProps={{
                                        inputLabel: {
                                          shrink: true,
                                        },
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <span
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      {passwordMatch ? (
                                        <span>✔️</span>
                                      ) : (
                                        <span>❌</span>
                                      )}
                                      <TextField
                                        style={{
                                          margin: "10px",
                                          width: "80%",
                                          border: modifiedRecord.passwordrepeat
                                            ? "1px solid red"
                                            : null,
                                        }}
                                        id="outlined-basic"
                                        variant="outlined"
                                        name="passwordrepeat"
                                        value={userRecord.passwordrepeat}
                                        type="password"
                                        onChange={(e) => {
                                          const value = e.target.value
                                            .toLowerCase()
                                            .replace(/[^a-z0-9]/g, "");
                                          handleChange({
                                            target: {
                                              name: "passwordrepeat",
                                              value,
                                            },
                                          });
                                        }}
                                        slotProps={{
                                          inputLabel: {
                                            shrink: true,
                                          },
                                        }}
                                      />
                                    </span>
                                  </td>
                                  <td>
                                    <TextField
                                      style={{
                                        margin: "10px",
                                        width: "80%",
                                        border: modifiedRecord.email
                                          ? "1px solid red"
                                          : null,
                                      }}
                                      id="outlined-basic"
                                      variant="outlined"
                                      name="email"
                                      value={userRecord.email}
                                      onChange={handleChange}
                                      slotProps={{
                                        inputLabel: {
                                          shrink: true,
                                        },
                                      }}
                                    />
                                  </td>
                                  <td>{userRecord.perfil}</td>
                                  <td>
                                    {new Date(
                                      record.fechacreacion
                                    ).toLocaleDateString("es-AR", {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                    })}
                                  </td>
                                </>
                              )
                            ) : (
                              <>
                                <td style={{ padding: "20px" }}>
                                  {record.usuario}
                                </td>
                                <td style={{ padding: "20px" }}>
                                  {record.nombreyapellidousuario}
                                </td>
                                <td style={{ padding: "20px" }}>
                                  {record.dni}
                                </td>
                                <td>**********</td>
                                <td>**********</td>
                                <td>{record.email}</td>
                                <td>{record.perfil}</td>
                                <td>
                                  {new Date(
                                    record.fechacreacion
                                  ).toLocaleDateString("es-AR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                  })}
                                </td>
                              </>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
