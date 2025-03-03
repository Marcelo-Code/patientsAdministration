import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import pg from "pg";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createTransport } from "nodemailer";

//Aisnación de variables de entorno
const FRONTEND_URL = process.env.FRONTEND_URL;
const PORT = process.env.PORT;
const BACKEND_URL = process.env.BACKEND_URL;

// Variables de la base de datos
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;
const PASSWORD_APP_EMAIL = process.env.PASSWORD_APP_EMAIL;

// Establece la configuración backend con express
const app = express();
const pool = new pg.Pool({
  host: DB_HOST,
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.use(express.json());

app.use(
  cors({
    origin: FRONTEND_URL,
  })
);

// app.listen(PORT, () => {
//   console.log(`server started on port ${PORT}`);
// });

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

//********** FUNCIONES TABLA USUARIOS: **********

// GET: Verificar si el usuario existe por nombre de usuario
app.get("/checkUser/:usuario", async (req, res) => {
  const { usuario } = req.params; // Recibir el parámetro desde la URL
  try {
    // Buscar el usuario en la base de datos
    const result = await pool.query(
      `SELECT 1 FROM usuarios WHERE usuario = $1`,
      [usuario]
    );

    // Si result.rows tiene alguna fila, el usuario existe
    if (result.rows.length > 0) {
      return res.status(200).json({
        exists: true, // El usuario existe
      });
    }

    // Si no se encuentra, el usuario no existe
    return res.status(200).json({
      exists: false, // El usuario no existe
    });
  } catch (error) {
    console.error("Error al verificar usuario:", error);
    res.status(500).json({
      message: "Error del servidor",
      error: error.message,
    });
  }
});

//GET: usuario por usuario y password
app.get("/getUser", async (req, res) => {
  const { usuario, password } = req.query; // Recibir los parámetros desde la URL

  if (!usuario || !password) {
    return res.status(400).json({
      message: "Usuario y contraseña son obligatorios",
    });
  }
  try {
    // Buscar usuario en la base de datos
    const result = await pool.query(
      `SELECT * FROM usuarios WHERE usuario = $1`,
      [usuario]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }
    const user = result.rows[0];
    // Comparar la contraseña ingresada con la almacenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Contraseña incorrecta",
      });
    }
    // Eliminar la contraseña antes de enviar la respuesta
    delete user.password;
    res.status(200).json({
      message: "Usuario encontrado",
      user,
    });
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({
      message: "Error del servidor",
      error: error.message,
    });
  }
});

//GET: lista de usuarios
app.get("/getUsersRecords", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({
      message: "Error del servidor",
      error: error.message,
    });
  }
});

//GET: usuario por id
app.get("/getUserRecord/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE id = $1", [
      id,
    ]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.log("Error al obtener usuario: ", error);
    res.status(500).json({
      error: "Error al obtener usuario: ",
      details: error.message,
    });
  }
});

//POST: crear usuario
app.post("/createUser", async (req, res) => {
  const {
    perfil,
    nombreyapellidousuario,
    idprofesional,
    usuario,
    dni,
    email,
    password,
    fechacreacion,
  } = req.body;
  try {
    // Cifrar la contraseña antes de almacenarla
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insertar el nuevo usuario en la base de datos
    const result = await pool.query(
      `INSERT INTO usuarios (perfil, nombreyapellidousuario, idprofesional, usuario, dni, email, password, fechacreacion) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        perfil || null,
        nombreyapellidousuario || null,
        idprofesional || null,
        usuario,
        dni || null,
        email,
        hashedPassword,
        fechacreacion || new Date(),
      ]
    );
    res.status(201).json({
      message: "Usuario creado con éxito",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({
      message: "Error del servidor",
      error: error.message,
    });
  }
});

//PUT: update usuario
app.put("/updateUserRecord/:id", async (req, res) => {
  const {
    perfil,
    nombreyapellidousuario,
    idprofesional,
    usuario,
    dni,
    email,
    password,
    fechacreacion,
  } = req.body;

  const { id } = req.params;

  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await pool.query(
      `UPDATE usuarios
             SET perfil = $1,
                nombreyapellidousuario = $2,
                idprofesional = $3,
                usuario = $4,
                dni = $5,
                email = $6,
                password = $7,
                fechacreacion = $8
                WHERE id = $9`,
      [
        perfil,
        nombreyapellidousuario,
        idprofesional,
        usuario,
        dni,
        email,
        hashedPassword,
        fechacreacion,
        id,
      ]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Usuario no encontrado: ",
      });
    }
    res.status(200).json({
      message: "Usuario actualizado correctamente: ",
    });
  } catch (error) {
    console.log("Error al actualizar usuario: ", error);
    res.status(500).json({
      error: "Error al actualizar usuario: ",
      details: error.message,
    });
  }
});

//DELETE: eliminar usuario
app.delete("/deleteUserRecord/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM usuarios WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount > 0) {
      res.status(200).json({
        message: "Usuario eliminado exitosamente: ",
        deletedPatient: result.rows[0],
      });
    } else {
      res.status(404).json({
        message: "Usuario no encontrado: ",
      });
    }
  } catch (error) {
    console.log("Error al eliminar usuario: ", error);
    res.status(500).json({
      error: "Error al eliminar usuario: ",
      details: error.message,
    });
  }
});

//********** FUNCIONES TABLA PACIENTES **********

//POST: crear paciente
app.post("/createPatientRecord", async (req, res) => {
  const {
    nombreYApellidoPaciente,
    obraSocialPaciente,
    telefonoObraSocial,
    email1ObraSocial,
    email2ObraSocial,
    email3ObraSocial,
    nombreYApellidoReferenteObrasocial,
    nroAfiliadoPaciente,
    dniPaciente,
    direccionPaciente,
    fechaNacimientoPaciente,
    diagnosticoPrevio,
    ciudadPaciente,
    nombreYApellidoResponsable,
    telefonoResponsable,
    escuela,
    direccionEscuela,
    telefonoEscuela,
    anioGradoSala,
    nombreYApellidoDocenteReferenteEscuela,
    nombreYApellidoDirectivoEscuela,
    escuelaEspecial,
    nombreYApellidoDocenteReferenteEscuelaEspecial,
    telefonoDocenteReferenteEscuelaEspecial,
    CUD,
    fechaVencimientoCud,
    fechaInicioTto,
    fechaUltimaActualizacion,
    imgDniFrentePaciente,
    imgDniDorsoPaciente,
    imgDniFrenteTitularOS,
    imgDniDorsoTitularOS,
    imgCarnetOSPaciente,
    imgCarnetOSTitular,
    imgConstanciaAlumnoRegular,
    imgLibretaSanitaria,
    imgCud,
    imgCertificadoEventual,
    activo,
  } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO pacientes (nombreYApellidoPaciente,
                                    obraSocialPaciente,
                                    telefonoObraSocial,
                                    email1ObraSocial,
                                    email2ObraSocial,
                                    email3ObraSocial,
                                    nombreYApellidoReferenteObrasocial,
                                    nroAfiliadoPaciente,
                                    dniPaciente,
                                    direccionPaciente,
                                    fechaNacimientoPaciente,
                                    diagnosticoPrevio,
                                    ciudadPaciente,
                                    nombreYApellidoResponsable,
                                    telefonoResponsable,
                                    escuela,
                                    direccionEscuela,
                                    telefonoEscuela,
                                    anioGradoSala,
                                    nombreYApellidoDocenteReferenteEscuela,
                                    nombreYApellidoDirectivoEscuela,
                                    escuelaEspecial,
                                    nombreYApellidoDocenteReferenteEscuelaEspecial,
                                    telefonoDocenteReferenteEscuelaEspecial,
                                    CUD,
                                    fechaVencimientoCud,
                                    fechaInicioTto,
                                    fechaUltimaActualizacion,
                                    imgDniFrentePaciente,
                                    imgDniDorsoPaciente,
                                    imgDniFrenteTitularOS,
                                    imgDniDorsoTitularOS,
                                    imgCarnetOSPaciente,
                                    imgCarnetOSTitular,
                                    imgConstanciaAlumnoRegular,
                                    imgLibretaSanitaria,
                                    imgCud,
                                    imgCertificadoEventual,
                                    activo
                                    )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39) RETURNING id`,
      [
        nombreYApellidoPaciente,
        obraSocialPaciente,
        telefonoObraSocial,
        email1ObraSocial,
        email2ObraSocial,
        email3ObraSocial,
        nombreYApellidoReferenteObrasocial,
        nroAfiliadoPaciente,
        dniPaciente,
        direccionPaciente,
        fechaNacimientoPaciente,
        diagnosticoPrevio,
        ciudadPaciente,
        nombreYApellidoResponsable,
        telefonoResponsable,
        escuela,
        direccionEscuela,
        telefonoEscuela,
        anioGradoSala,
        nombreYApellidoDocenteReferenteEscuela,
        nombreYApellidoDirectivoEscuela,
        escuelaEspecial,
        nombreYApellidoDocenteReferenteEscuelaEspecial,
        telefonoDocenteReferenteEscuelaEspecial,
        CUD,
        fechaVencimientoCud,
        fechaInicioTto,
        fechaUltimaActualizacion,
        imgDniFrentePaciente,
        imgDniDorsoPaciente,
        imgDniFrenteTitularOS,
        imgDniDorsoTitularOS,
        imgCarnetOSPaciente,
        imgCarnetOSTitular,
        imgConstanciaAlumnoRegular,
        imgLibretaSanitaria,
        imgCud,
        imgCertificadoEventual,
        activo,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log("Error al crear paciente: ", error);
    res.status(500).json({
      error: "Error al crear paciente: ",
      details: error.message,
    });
  }
});

//GET: lista de pacientes
app.get("/getPatientsRecords", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM pacientes");
    res.status(200).json(result.rows);
  } catch (error) {
    console.log("Error al obtener pacientes: ", error);
    res.status(500).json({
      error: "Error al obtener pacientes: ",
      details: error.message,
    });
  }
});

//GET: paciente por id
app.get("/getPatientRecord/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM pacientes WHERE id = $1", [
      id,
    ]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.log("Error al obtener paciente: ", error);
    res.status(500).json({
      error: "Error al obtener paciente: ",
      details: error.message,
    });
  }
});

//DELETE: eliminar paciente
app.delete("/deletePatientRecord/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM pacientes WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount > 0) {
      res.status(200).json({
        message: "Paciente eliminado exitosamente: ",
        deletedPatient: result.rows[0],
      });
    } else {
      res.status(404).json({
        message: "Paciente no encontrado: ",
      });
    }
  } catch (error) {
    console.log("Error al eliminar paciente: ", error);
    res.status(500).json({
      error: "Error al eliminar paciente: ",
      details: error.message,
    });
  }
});

//PUT: update paciente
app.put("/updatePatientRecord/:id", async (req, res) => {
  const {
    nombreyapellidopaciente,
    obrasocialpaciente,
    telefonoobrasocial,
    email1obrasocial,
    email2obrasocial,
    email3obrasocial,
    nombreyapellidoreferenteobrasocial,
    nroafiliadopaciente,
    dnipaciente,
    direccionpaciente,
    fechanacimientopaciente,
    diagnosticoprevio,
    ciudadpaciente,
    nombreyapellidoresponsable,
    telefonoresponsable,
    escuela,
    direccionescuela,
    telefonoescuela,
    aniogradosala,
    nombreyapellidodocentereferenteescuela,
    nombreyapellidodirectivoescuela,
    escuelaespecial,
    nombreyapellidodocentereferenteescuelaespecial,
    telefonodocentereferenteescuelaespecial,
    cud,
    fechavencimientocud,
    fechainiciotto,
    fechaultimaactualizacion,
    imgdnifrentepaciente,
    imgdnidorsopaciente,
    imgdnifrentetitularos,
    imgdnidorsotitularos,
    imgcarnetospaciente,
    imgcarnetostitular,
    imgconstanciaalumnoregular,
    imglibretasanitaria,
    imgcud,
    imgcertificadoeventual,
    activo,
  } = req.body;

  const { id } = req.params;

  try {
    const result = await pool.query(
      `UPDATE pacientes
             SET nombreyapellidopaciente = $1,
                obrasocialpaciente = $2,
                telefonoobrasocial = $3,
                email1obrasocial = $4,
                email2obrasocial = $5,
                email3obrasocial = $6,
                nombreyapellidoreferenteobrasocial = $7,
                nroafiliadopaciente = $8,
                dnipaciente = $9,
                direccionpaciente = $10,
                fechanacimientopaciente = $11,
                diagnosticoprevio = $12,
                ciudadpaciente = $13,
                nombreyapellidoresponsable = $14,
                telefonoresponsable = $15,
                escuela = $16,
                direccionescuela = $17,
                telefonoescuela = $18,
                aniogradosala = $19,
                nombreyapellidodocentereferenteescuela = $20,
                nombreyapellidodirectivoescuela = $21,
                escuelaespecial = $22,
                nombreyapellidodocentereferenteescuelaespecial = $23,
                telefonodocentereferenteescuelaespecial = $24,
                cud = $25,
                fechavencimientocud = $26,
                fechainiciotto = $27,
                fechaultimaactualizacion = $28,
                imgdnifrentepaciente = $29,
                imgdnidorsopaciente = $30,
                imgdnifrentetitularos = $31,
                imgdnidorsotitularos = $32,
                imgcarnetospaciente = $33,
                imgcarnetostitular = $34,
                imgconstanciaalumnoregular = $35,
                imglibretasanitaria = $36,
                imgcud = $37,
                imgcertificadoeventual = $38,
                activo = $39
                WHERE id = $40`,
      [
        nombreyapellidopaciente,
        obrasocialpaciente,
        telefonoobrasocial,
        email1obrasocial,
        email2obrasocial,
        email3obrasocial,
        nombreyapellidoreferenteobrasocial,
        nroafiliadopaciente,
        dnipaciente,
        direccionpaciente,
        fechanacimientopaciente,
        diagnosticoprevio,
        ciudadpaciente,
        nombreyapellidoresponsable,
        telefonoresponsable,
        escuela,
        direccionescuela,
        telefonoescuela,
        aniogradosala,
        nombreyapellidodocentereferenteescuela,
        nombreyapellidodirectivoescuela,
        escuelaespecial,
        nombreyapellidodocentereferenteescuelaespecial,
        telefonodocentereferenteescuelaespecial,
        cud,
        fechavencimientocud,
        fechainiciotto,
        fechaultimaactualizacion,
        imgdnifrentepaciente,
        imgdnidorsopaciente,
        imgdnifrentetitularos,
        imgdnidorsotitularos,
        imgcarnetospaciente,
        imgcarnetostitular,
        imgconstanciaalumnoregular,
        imglibretasanitaria,
        imgcud,
        imgcertificadoeventual,
        activo,
        id,
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Paciente no encontrado: ",
      });
    }

    res.status(200).json({
      message: "Paciente actualizado correctamente: ",
    });
  } catch (error) {
    console.log("Error al actualizar paciente: ", error);
    res.status(500).json({
      error: "Error al actualizar paciente: ",
      details: error.message,
    });
  }
});

//PATCH: update paciente
app.patch("/partialUpdatePatientRecord/:id", async (req, res) => {
  const { id } = req.params;
  const fieldsToUpdate = req.body;

  try {
    // Validar si el paciente existe
    const { rows } = await pool.query("SELECT * FROM pacientes WHERE id = $1", [
      id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({
        error: "Paciente no encontrado: ",
      });
    }

    // Construir dinámicamente la consulta para actualizar solo los campos enviados
    const keys = Object.keys(fieldsToUpdate);
    const values = Object.values(fieldsToUpdate);

    const setQuery = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    // Ejecutar la consulta dinámica
    const result = await pool.query(
      `UPDATE pacientes SET ${setQuery} WHERE id = $${keys.length + 1}`,
      [...values, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Paciente no encontrado: ",
      });
    }

    res.status(200).json({
      message: "Paciente actualizado correctamente: ",
    });
  } catch (error) {
    console.log("Error al actualizar paciente: ", error);
    res.status(500).json({
      error: "Error al actualizar paciente: ",
      details: error.message,
    });
  }
});

//PATCH: soft eliminar paciente
app.patch("/softDeletePatientRecord/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Actualiza la propiedad "activo" a false en el usuario con el ID dado
    const result = await pool.query(
      "UPDATE pacientes SET activo = false WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount > 0) {
      res.status(200).json({
        message: "Paciente marcado como inactivo exitosamente",
        updatedUser: result.rows[0],
      });
    } else {
      res.status(404).json({
        message: "Paciente no encontrado",
      });
    }
  } catch (error) {
    console.log("Error al realizar soft delete del paciente: ", error);
    res.status(500).json({
      error: "Error al realizar soft delete",
      details: error.message,
    });
  }
});

//PATCH: soft activar paciente
app.patch("/softUnDeletePatientRecord/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Actualiza la propiedad "activo" a false en el usuario con el ID dado
    const result = await pool.query(
      "UPDATE pacientes SET activo = true WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount > 0) {
      res.status(200).json({
        message: "Paciente marcado como activo exitosamente",
        updatedUser: result.rows[0],
      });
    } else {
      res.status(404).json({
        message: "Paciente no encontrado",
      });
    }
  } catch (error) {
    console.log("Error al realizar soft undelete del paciente: ", error);
    res.status(500).json({
      error: "Error al realizar soft undelete",
      details: error.message,
    });
  }
});

//**********FUNCIONES TABLA PROFESIONALES: **********

//GET: lista de profesionales
app.get("/getProfessionalsRecords", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM profesionales");
    res.status(200).json(result.rows);
  } catch (error) {
    console.log("Error al obtener profesionales: ", error);
    res.status(500).json({
      error: "Error al obtener profesionales: ",
      details: error.message,
    });
  }
});

//GET: profesional por id
app.get("/getProfessionalRecord/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM profesionales WHERE id = $1",
      [id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.log("Error al obtener profesional: ", error);
    res.status(500).json({
      error: "Error al obtener profesional: ",
      details: error.message,
    });
  }
});

//PATCH: update profesional
app.patch("/partialUpdateProfessionalRecord/:id", async (req, res) => {
  const { id } = req.params;
  const fieldsToUpdate = req.body;

  try {
    // Validar si el paciente existe
    const { rows } = await pool.query(
      "SELECT * FROM profesionales WHERE id = $1",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({
        error: "Profesional no encontrado: ",
      });
    }

    // Construir dinámicamente la consulta para actualizar solo los campos enviados
    const keys = Object.keys(fieldsToUpdate);
    const values = Object.values(fieldsToUpdate);

    const setQuery = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    // Ejecutar la consulta dinámica
    const result = await pool.query(
      `UPDATE profesionales SET ${setQuery} WHERE id = $${keys.length + 1}`,
      [...values, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Profesional no encontrado: ",
      });
    }

    res.status(200).json({
      message: "Profesional actualizado correctamente: ",
    });
  } catch (error) {
    console.log("Error al actualizar profesional: ", error);
    res.status(500).json({
      error: "Error al actualizar profesional: ",
      details: error.message,
    });
  }
});

//PATCH: soft eliminar profesional
app.patch("/softDeleteProfessionalRecord/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Actualiza la propiedad "activo" a false en el usuario con el ID dado
    const result = await pool.query(
      "UPDATE profesionales SET activo = false WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount > 0) {
      res.status(200).json({
        message: "Profesional marcado como inactivo exitosamente",
        updatedUser: result.rows[0],
      });
    } else {
      res.status(404).json({
        message: "Profesional no encontrado",
      });
    }
  } catch (error) {
    console.log("Error al realizar soft delete del profesional: ", error);
    res.status(500).json({
      error: "Error al realizar soft delete",
      details: error.message,
    });
  }
});

//PATCH: soft activar profesional
app.patch("/softUnDeleteProfessionalRecord/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Actualiza la propiedad "activo" a false en el usuario con el ID dado
    const result = await pool.query(
      "UPDATE profesionales SET activo = true WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount > 0) {
      res.status(200).json({
        message: "Profesional marcado como activo exitosamente",
        updatedUser: result.rows[0],
      });
    } else {
      res.status(404).json({
        message: "Profesional no encontrado",
      });
    }
  } catch (error) {
    console.log("Error al realizar soft undelete del profesional: ", error);
    res.status(500).json({
      error: "Error al realizar soft undelete",
      details: error.message,
    });
  }
});

//PUT: update profesional
app.put("/updateProfessionalRecord/:id", async (req, res) => {
  const {
    nombreyapellidoprofesional,
    especialidadprofesional,
    matriculaprofesional,
    cuitprofesional,
    dniprofesional,
    direccionprofesional,
    ciudadprofesional,
    telefonoprofesional,
    emailprofesional,
    fechavencimientornpprofesional,
    documentoconstanciamatriculaprofesional,
    documentocertificadornpprofesional,
    documentotitulofrenteprofesional,
    documentotitulodorsoprofesional,
    documentocvprofesional,
    documentoconstanciaafipprofesional,
    documentoconstanciacbuprofesional,
    documentodnifrenteprofesional,
    documentodnidorsoprofesional,
    documentoseguroprofesional,
    fechaultimaactualizacion,
    activo,
  } = req.body;

  const { id } = req.params;

  try {
    const result = await pool.query(
      `UPDATE profesionales
                SET nombreyapellidoprofesional = $1,
                        especialidadprofesional = $2,
                        matriculaprofesional = $3,
                        cuitprofesional = $4,
                        dniprofesional = $5,
                        direccionprofesional = $6,
                        ciudadprofesional = $7,
                        telefonoprofesional = $8,
                        emailprofesional = $9,
                        fechavencimientornpprofesional = $10,
                        documentoconstanciamatriculaprofesional = $11,
                        documentocertificadornpprofesional = $12,
                        documentotitulofrenteprofesional = $13,
                        documentotitulodorsoprofesional = $14,
                        documentocvprofesional = $15,
                        documentoconstanciaafipprofesional = $16,
                        documentoconstanciacbuprofesional = $17,
                        documentodnifrenteprofesional = $18,
                        documentodnidorsoprofesional = $19,
                        documentoseguroprofesional = $20,
                        fechaultimaactualizacion = $21,
                        activo = $22
                WHERE id = $23`,
      [
        nombreyapellidoprofesional,
        especialidadprofesional,
        matriculaprofesional,
        cuitprofesional,
        dniprofesional,
        direccionprofesional,
        ciudadprofesional,
        telefonoprofesional,
        emailprofesional,
        fechavencimientornpprofesional,
        documentoconstanciamatriculaprofesional,
        documentocertificadornpprofesional,
        documentotitulofrenteprofesional,
        documentotitulodorsoprofesional,
        documentocvprofesional,
        documentoconstanciaafipprofesional,
        documentoconstanciacbuprofesional,
        documentodnifrenteprofesional,
        documentodnidorsoprofesional,
        documentoseguroprofesional,
        fechaultimaactualizacion,
        activo,
        id,
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Profesional no encontrado: ",
      });
    }

    res.status(200).json({
      message: "Profesional actualizado correctamente: ",
    });
  } catch (error) {
    console.log("Error al actualizar profesional: ", error);
    res.status(500).json({
      error: "Error al actualizar profesional: ",
      details: error.message,
    });
  }
});

//DELETE: eliminar profesional
app.delete("/deleteProfessionalRecord/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM profesionales WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount > 0) {
      res.status(200).json({
        message: "Profesional eliminado exitosamente: ",
        deletedPatient: result.rows[0],
      });
    } else {
      res.status(404).json({
        message: "Profesional no encontrado: ",
      });
    }
  } catch (error) {
    console.log("Error al eliminar profesional: ", error);
    res.status(500).json({
      error: "Error al eliminar profesional: ",
      details: error.message,
    });
  }
});

//POST: crear profesional
app.post("/createProfessionalRecord", async (req, res) => {
  const {
    nombreyapellidoprofesional,
    especialidadprofesional,
    matriculaprofesional,
    cuitprofesional,
    dniprofesional,
    direccionprofesional,
    ciudadprofesional,
    telefonoprofesional,
    emailprofesional,
    fechavencimientornpprofesional,
    documentoconstanciamatriculaprofesional,
    documentocertificadornpprofesional,
    documentotitulofrenteprofesional,
    documentotitulodorsoprofesional,
    documentocvprofesional,
    documentoconstanciaafipprofesional,
    documentoconstanciacbuprofesional,
    documentodnifrenteprofesional,
    documentodnidorsoprofesional,
    documentoseguroprofesional,
    fechaultimaactualizacion,
    activo,
  } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO profesionales (nombreyapellidoprofesional,
                                    especialidadprofesional,
                                    matriculaprofesional,
                                    cuitprofesional,
                                    dniprofesional,
                                    direccionprofesional,
                                    ciudadprofesional,
                                    telefonoprofesional,
                                    emailprofesional,
                                    fechavencimientornpprofesional,
                                    documentoconstanciamatriculaprofesional,
                                    documentocertificadornpprofesional,
                                    documentotitulofrenteprofesional,
                                    documentotitulodorsoprofesional,
                                    documentocvprofesional,
                                    documentoconstanciaafipprofesional,
                                    documentoconstanciacbuprofesional,
                                    documentodnifrenteprofesional,
                                    documentodnidorsoprofesional,
                                    documentoseguroprofesional,
                                    fechaultimaactualizacion,
                                    activo
                                    )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22) RETURNING id`,
      [
        nombreyapellidoprofesional,
        especialidadprofesional,
        matriculaprofesional,
        cuitprofesional,
        dniprofesional,
        direccionprofesional,
        ciudadprofesional,
        telefonoprofesional,
        emailprofesional,
        fechavencimientornpprofesional,
        documentoconstanciamatriculaprofesional,
        documentocertificadornpprofesional,
        documentotitulofrenteprofesional,
        documentotitulodorsoprofesional,
        documentocvprofesional,
        documentoconstanciaafipprofesional,
        documentoconstanciacbuprofesional,
        documentodnifrenteprofesional,
        documentodnidorsoprofesional,
        documentoseguroprofesional,
        fechaultimaactualizacion,
        activo,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log("Error al crear profesional: ", error);
    res.status(500).json({
      error: "Error al crear profesional: ",
      details: error.message,
    });
  }
});

//********** FUNCIONES TABLA CONSULTAS: **********

//POST: crear consulta
app.post("/createMedicalRecord", async (req, res) => {
  const {
    idpaciente,
    idprofesional,
    fechaconsulta,
    tipoconsulta,
    descripcion,
  } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO consultas (idpaciente,
                                    idprofesional,
                                    fechaconsulta,
                                    tipoconsulta,
                                    descripcion
                                    )
            VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [idpaciente, idprofesional, fechaconsulta, tipoconsulta, descripcion]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log("Error al crear consulta: ", error);
    res.status(500).json({
      error: "Error al crear consulta: ",
      details: error.message,
    });
  }
});

//GET: lista de consultas por id de paciente
app.get("/getMedicalHistoryRecord/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT consultas.*, profesionales.nombreyapellidoProfesional,profesionales.matriculaprofesional, profesionales.especialidadprofesional, profesionales.cuitprofesional, pacientes.nombreyapellidopaciente FROM consultas JOIN profesionales ON consultas.idprofesional = profesionales.id JOIN pacientes ON consultas.idpaciente = pacientes.id WHERE consultas.idpaciente = $1",
      [id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.log("Error al obtener consulta: ", error);
    res.status(500).json({
      error: "Error al obtener consulta: ",
      details: error.message,
    });
  }
});

//GET: consulta por id
app.get("/getMedicalRecord/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM consultas WHERE id = $1", [
      id,
    ]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.log("Error al obtener consulta: ", error);
    res.status(500).json({
      error: "Error al obtener consulta: ",
      details: error.message,
    });
  }
});

//GET: lista de consultas
app.get("/getMedicalRecords", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
                consultas.*, 
                profesionales.nombreyapellidoProfesional,
                profesionales.matriculaprofesional,
                profesionales.especialidadprofesional,
                profesionales.cuitprofesional,
                pacientes.nombreyapellidopaciente 
            FROM consultas 
            JOIN profesionales 
                ON consultas.idprofesional = profesionales.id 
            JOIN pacientes 
                ON consultas.idpaciente = pacientes.id`
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener consultas: ", error);
    res.status(500).json({
      error: "Error al obtener las consultas: ",
      details: error.message,
    });
  }
});

//PUT: update consulta
app.put("/updateMedicalRecord/:id", async (req, res) => {
  const {
    idpaciente,
    idprofesional,
    fechaconsulta,
    tipoconsulta,
    descripcion,
  } = req.body;

  const { id } = req.params;

  try {
    const result = await pool.query(
      `UPDATE consultas
             SET idpaciente = $1,
                 idprofesional = $2,
                 fechaconsulta = $3,
                 tipoconsulta = $4,
                 descripcion = $5
             WHERE id = $6`,
      [idpaciente, idprofesional, fechaconsulta, tipoconsulta, descripcion, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Consulta no encontrada: ",
      });
    }

    res.status(200).json({
      message: "Consulta actualizada correctamente: ",
    });
  } catch (error) {
    console.log("Error al actualizar consulta: ", error);
    res.status(500).json({
      error: "Error al actualizar consulta: ",
      details: error.message,
    });
  }
});

//DELETE: eliminar consulta
app.delete("/deleteMedicalRecord/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM consultas WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount > 0) {
      res.status(200).json({
        message: "Consulta eliminada exitosamente: ",
        deletedPatient: result.rows[0],
      });
    } else {
      res.status(404).json({
        message: "Consulta no encontrada: ",
      });
    }
  } catch (error) {
    console.log("Error al eliminar consulta: ", error);
    res.status(500).json({
      error: "Error al eliminar consulta: ",
      details: error.message,
    });
  }
});

//********** FUNCIONES TABLA FACTURACIONCUD: **********

//POST: crear facturación cud
app.post("/createCudBillingRecord", async (req, res) => {
  const {
    idprofesional,
    nombreyapellidoprofesional,
    prestacion,
    idpaciente,
    nombreyapellidopaciente,
    imgasistenciamensual,
    documentoinformemensual,
    documentofacturamensual,
    obrasocialpaciente,
    periodofacturado,
    nrofactura,
    montofacturado,
    fechapresentacionos,
    fecharecepcionos,
    fechareclamo,
    medioreclamo,
    respuestareclamo,
    cobradaenfecha,
    fechacobro,
    montopercibido,
    retencion,
    montofinalprofesional,
  } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO facturacioncud (idprofesional,
                                    nombreyapellidoprofesional,
                                    prestacion,
                                    idpaciente,
                                    nombreyapellidopaciente,
                                    imgasistenciamensual,
                                    documentoinformemensual,
                                    documentofacturamensual,
                                    obrasocialpaciente,
                                    periodofacturado,
                                    nrofactura,
                                    montofacturado,
                                    fechapresentacionos,
                                    fecharecepcionos,
                                    fechareclamo,
                                    medioreclamo,
                                    respuestareclamo,
                                    cobradaenfecha,
                                    fechacobro,
                                    montopercibido,
                                    retencion,
                                    montofinalprofesional
                                    )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22) RETURNING id`,
      [
        idprofesional,
        nombreyapellidoprofesional,
        prestacion,
        idpaciente,
        nombreyapellidopaciente,
        imgasistenciamensual,
        documentoinformemensual,
        documentofacturamensual,
        obrasocialpaciente,
        periodofacturado,
        nrofactura,
        montofacturado,
        fechapresentacionos,
        fecharecepcionos,
        fechareclamo,
        medioreclamo,
        respuestareclamo,
        cobradaenfecha,
        fechacobro,
        montopercibido,
        retencion,
        montofinalprofesional,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log("Error al crear registro: ", error);
    res.status(500).json({
      error: "Error al crear registro: ",
      details: error.message,
    });
  }
});

//GET: lista facturación cud
app.get("/getCudBillingRecords", async (req, res) => {
  try {
    // Consulta a la base de datos
    const result = await pool.query("SELECT * FROM facturacioncud");

    // Respuesta con los pacientes en formato JSON
    res.status(200).json(result.rows);
  } catch (error) {
    console.log("Error al obtener registros: ", error);
    res.status(500).json({
      error: "Error al obtener registros: ",
      details: error.message,
    });
  }
});

//GET: facturación cud por id
app.get("/getCudBillingRecord/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM facturacioncud WHERE id = $1",
      [id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.log("Error al obtener registro: ", error);
    res.status(500).json({
      error: "Error al obtener registro: ",
      details: error.message,
    });
  }
});

//GET: facturación cud por paciente
app.get("/getCudBillingPatientRecord/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;

    // Consulta a la base de datos
    const result = await pool.query(
      "SELECT * FROM facturacioncud WHERE idpaciente = $1",
      [patientId]
    );

    // Respuesta con los pacientes en formato JSON
    res.status(200).json(result.rows);
  } catch (error) {
    console.log("Error al obtener registros: ", error);
    res.status(500).json({
      error: "Error al obtener registros: ",
      details: error.message,
    });
  }
});

//PUT: update facturación cud
app.put("/updateCudBillingRecord/:id", async (req, res) => {
  const {
    idprofesional,
    nombreyapellidoprofesional,
    prestacion,
    idpaciente,
    nombreyapellidopaciente,
    imgasistenciamensual,
    documentoinformemensual,
    documentofacturamensual,
    obrasocialpaciente,
    periodofacturado,
    nrofactura,
    montofacturado,
    fechapresentacionos,
    fecharecepcionos,
    fechareclamo,
    medioreclamo,
    respuestareclamo,
    cobradaenfecha,
    fechacobro,
    montopercibido,
    retencion,
    montofinalprofesional,
  } = req.body;

  const { id } = req.params;

  try {
    const result = await pool.query(
      `UPDATE facturacioncud
             SET    idprofesional = $1,
                    nombreyapellidoprofesional = $2,
                    prestacion = $3,
                    idpaciente = $4,
                    nombreyapellidopaciente = $5,
                    imgasistenciamensual = $6,
                    documentoinformemensual = $7,
                    documentofacturamensual = $8,
                    obrasocialpaciente = $9,
                    periodofacturado = $10,
                    nrofactura = $11,
                    montofacturado = $12,
                    fechapresentacionos = $13,
                    fecharecepcionos = $14,
                    fechareclamo = $15,
                    medioreclamo = $16,
                    respuestareclamo = $17,
                    cobradaenfecha = $18,
                    fechacobro = $19,
                    montopercibido = $20,
                    retencion = $21,
                    montofinalprofesional = $22 
             WHERE id = $23`,
      [
        idprofesional,
        nombreyapellidoprofesional,
        prestacion,
        idpaciente,
        nombreyapellidopaciente,
        imgasistenciamensual,
        documentoinformemensual,
        documentofacturamensual,
        obrasocialpaciente,
        periodofacturado,
        nrofactura,
        montofacturado,
        fechapresentacionos,
        fecharecepcionos,
        fechareclamo,
        medioreclamo,
        respuestareclamo,
        cobradaenfecha,
        fechacobro,
        montopercibido,
        retencion,
        montofinalprofesional,
        id,
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Registro no encontrado: ",
      });
    }

    res.status(200).json({
      message: "Registro actualizado correctamente: ",
    });
  } catch (error) {
    console.log("Error al actualizar registro: ", error);
    res.status(500).json({
      error: "Error al actualizar registro: ",
      details: error.message,
    });
  }
});

//PATCH: update facturación cud
app.patch("/partialUpdateCudBillingRecord/:id", async (req, res) => {
  const { id } = req.params;
  const fieldsToUpdate = req.body;

  try {
    // Validar si el paciente existe
    const { rows } = await pool.query(
      "SELECT * FROM facturacioncud WHERE id = $1",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({
        error: "Registro no encontrado: ",
      });
    }

    // Construir dinámicamente la consulta para actualizar solo los campos enviados
    const keys = Object.keys(fieldsToUpdate);
    const values = Object.values(fieldsToUpdate);

    const setQuery = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    // Ejecutar la consulta dinámica
    const result = await pool.query(
      `UPDATE facturacioncud SET ${setQuery} WHERE id = $${keys.length + 1}`,
      [...values, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Registro no encontrado: ",
      });
    }

    res.status(200).json({
      message: "Registro actualizado correctamente: ",
    });
  } catch (error) {
    console.log("Error al actualizar registro: ", error);
    res.status(500).json({
      error: "Error al actualizar registro: ",
      details: error.message,
    });
  }
});

//DELETE: eliminar facturación cud
app.delete("/deleteCudBillingRecord/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM facturacioncud WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount > 0) {
      res.status(200).json({
        message: "Registro eliminado exitosamente: ",
        deletedPatient: result.rows[0],
      });
    } else {
      res.status(404).json({
        message: "Registro no encontrado: ",
      });
    }
  } catch (error) {
    console.log("Error al eliminar registro: ", error);
    res.status(500).json({
      error: "Error al eliminar registro: ",
      details: error.message,
    });
  }
});

//********** FUNCIONES TABLA FACTURACIONNOCUD: **********

//GET: lista facturación no cud
app.get("/getNoCudBillingRecords", async (req, res) => {
  try {
    // Consulta a la base de datos
    const result = await pool.query("SELECT * FROM facturacionnocud");

    // Respuesta con los pacientes en formato JSON
    res.status(200).json(result.rows);
  } catch (error) {
    console.log("Error al obtener registros: ", error);
    res.status(500).json({
      error: "Error al obtener registros: ",
      details: error.message,
    });
  }
});

//GET: facturación no cud por id
app.get("/getNoCudBillingRecord/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM facturacionnocud WHERE id = $1",
      [id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.log("Error al obtener registro: ", error);
    res.status(500).json({
      error: "Error al obtener registro: ",
      details: error.message,
    });
  }
});

//PUT: update facturación no cud
app.put("/updateNoCudBillingRecord/:id", async (req, res) => {
  const {
    idprofesional,
    nombreyapellidoprofesional,
    prestacion,
    idpaciente,
    nombreyapellidopaciente,
    modopago,
    mediopago,
    destinatariopago,
    montosesion,
    retencion,
    montofinalprofesional,
    fechadepago,
    destinatario,
    pacienteadeuda,
    fechadeuda,
    pagomontoadeudado,
    fechapagomontoadeudado,
    documentofactura,
    documentocomprobantepagoretencion,
  } = req.body;

  const { id } = req.params;

  try {
    const result = await pool.query(
      `UPDATE facturacionnocud
             SET    idprofesional = $1,
                    nombreyapellidoprofesional = $2,
                    prestacion = $3,
                    idpaciente = $4,
                    nombreyapellidopaciente = $5,
                    modopago = $6,
                    mediopago = $7,
                    destinatariopago = $8,
                    montosesion = $9,
                    retencion = $10,
                    montofinalprofesional = $11,
                    fechadepago = $12,
                    destinatario = $13,
                    pacienteadeuda = $14,
                    fechadeuda = $15,
                    pagomontoadeudado = $16,
                    fechapagomontoadeudado = $17,
                    documentofactura = $18,
                    documentocomprobantepagoretencion = $19
             WHERE id = $20`,
      [
        idprofesional,
        nombreyapellidoprofesional,
        prestacion,
        idpaciente,
        nombreyapellidopaciente,
        modopago,
        mediopago,
        destinatariopago,
        montosesion,
        retencion,
        montofinalprofesional,
        fechadepago,
        destinatario,
        pacienteadeuda,
        fechadeuda,
        pagomontoadeudado,
        fechapagomontoadeudado,
        documentofactura,
        documentocomprobantepagoretencion,
        id,
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Registro no encontrado: ",
      });
    }

    res.status(200).json({
      message: "Registro actualizado correctamente: ",
    });
  } catch (error) {
    console.log("Error al actualizar registro: ", error);
    res.status(500).json({
      error: "Error al actualizar registro: ",
      details: error.message,
    });
  }
});

//PATCH: update facturación no cud
app.patch("/partialUpdateNoCudBillingRecord/:id", async (req, res) => {
  const { id } = req.params;
  const fieldsToUpdate = req.body;

  try {
    // Validar si el paciente existe
    const { rows } = await pool.query(
      "SELECT * FROM facturacionnocud WHERE id = $1",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({
        error: "Registro no encontrado: ",
      });
    }

    // Construir dinámicamente la consulta para actualizar solo los campos enviados
    const keys = Object.keys(fieldsToUpdate);
    const values = Object.values(fieldsToUpdate);

    const setQuery = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    // Ejecutar la consulta dinámica
    const result = await pool.query(
      `UPDATE facturacionnocud SET ${setQuery} WHERE id = $${keys.length + 1}`,
      [...values, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Registro no encontrado: ",
      });
    }

    res.status(200).json({
      message: "Registro actualizado correctamente: ",
    });
  } catch (error) {
    console.log("Error al actualizar registro: ", error);
    res.status(500).json({
      error: "Error al actualizar registro: ",
      details: error.message,
    });
  }
});

//DELETE: facturación no cud
app.delete("/deleteNoCudBillingRecord/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM facturacionnocud WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount > 0) {
      res.status(200).json({
        message: "Registro eliminado exitosamente: ",
        deletedPatient: result.rows[0],
      });
    } else {
      res.status(404).json({
        message: "Registro no encontrado: ",
      });
    }
  } catch (error) {
    console.log("Error al eliminar registro: ", error);
    res.status(500).json({
      error: "Error al eliminar registro: ",
      details: error.message,
    });
  }
});

//POST: crear facturación no cud
app.post("/createNoCudBillingRecord", async (req, res) => {
  const {
    idprofesional,
    nombreyapellidoprofesional,
    prestacion,
    idpaciente,
    nombreyapellidopaciente,
    modopago,
    mediopago,
    destinatariopago,
    montosesion,
    retencion,
    montofinalprofesional,
    fechadepago,
    destinatario,
    pacienteadeuda,
    fechadeuda,
    pagomontoadeudado,
    fechapagomontoadeudado,
    documentofactura,
    documentocomprobantepagoretencion,
  } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO facturacionnocud (idprofesional,
                                            nombreyapellidoprofesional,
                                            prestacion,
                                            idpaciente,
                                            nombreyapellidopaciente,
                                            modopago,
                                            mediopago,
                                            destinatariopago,
                                            montosesion,
                                            retencion, 
                                            montofinalprofesional,
                                            fechadepago,
                                            destinatario,
                                            pacienteadeuda,
                                            fechadeuda,
                                            pagomontoadeudado,
                                            fechapagomontoadeudado,
                                            documentofactura,
                                            documentocomprobantepagoretencion
                                        )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING id`,
      [
        idprofesional,
        nombreyapellidoprofesional,
        prestacion,
        idpaciente,
        nombreyapellidopaciente,
        modopago,
        mediopago,
        destinatariopago,
        montosesion,
        retencion,
        montofinalprofesional,
        fechadepago,
        destinatario,
        pacienteadeuda,
        fechadeuda,
        pagomontoadeudado,
        fechapagomontoadeudado,
        documentofactura,
        documentocomprobantepagoretencion,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log("Error al crear registro: ", error);
    res.status(500).json({
      error: "Error al crear registro: ",
      details: error.message,
    });
  }
});

//********** RECUPERACIÓN DE CONTRASEÑA: **********

const sendResetPasswordEmail = async (email, resetLink) => {
  console.log(email);
  let transporter = createTransport({
    service: "gmail",
    auth: {
      user: "feltesmarcelo@gmail.com", // Tu correo
      pass: PASSWORD_APP_EMAIL, // Tu contraseña de la cuenta de correo
    },
  });

  let info = await transporter.sendMail({
    from: '"Tu Aplicación" <feltesmarcelo@gmail.com>',
    to: email,
    subject: "Restablece tu contraseña",
    text: `Haz clic en este enlace para restablecer tu contraseña: ${resetLink}`,
  });

  console.log("Correo enviado: " + info.response);
};

app.post("/recoverPassword", async (req, res) => {
  const { email } = req.body;
  // Generar enlace de restablecimiento
  const resetLink = `http://localhost:3000/reset-password?email=${email}`;

  // Enviar correo
  await sendResetPasswordEmail(email, resetLink);

  return res.status(200).json({
    message: "Correo enviado con éxito",
  });
});

//********** PANTALLA DE LOGIN: **********

app.post("/login", async (req, res) => {
  const { usuario, password } = req.body;

  // Verifica si el usuario existe en la base de datos
  try {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE usuario = $1",
      [usuario]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "Usuario no encontrado",
      });
    }

    const userData = result.rows[0];

    // Verifica que la contraseña sea correcta
    const passwordMatch = await bcrypt.compare(password, userData.password);

    if (!passwordMatch) {
      return res.status(400).json({
        message: "Contraseña incorrecta",
      });
    }

    // Si el login es exitoso, genera un JWT
    const token = jwt.sign(
      {
        id: userData.id,
        user: userData.usuario,
        role: userData.rol,
      },
      JWT_SECRET, // Clave secreta para firmar el token
      {
        expiresIn: "1h",
      } // El token expirará en 1 hora
    );

    // Devuelve el token
    res.json({
      token,
    });
  } catch (error) {
    console.error("Error al procesar el login:", error);
    res.status(500).json({
      message: "Error del servidor",
      error: error.stack,
    });
  }
});

export default app;
