import express from "express";
import cors from "cors";
import pg from "pg";

import {
    DB_DATABASE,
    DB_PASSWORD,
    DB_PORT,
    DB_USER,
    FRONTEND_URL,
    DB_HOST,
    PORT
} from "./config.js"

const app = express();
const pool = new pg.Pool({
    host: DB_HOST,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
})

app.use(express.json());

app.use(cors({
    origin: FRONTEND_URL,
}))

// POST: Pacientes
//----------------

app.post("/createPatient", async (req, res) => {
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
        imgCertificadoEventual
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
                                    imgCertificadoEventual
                                    )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38) RETURNING id`,
            [nombreYApellidoPaciente,
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
                imgCertificadoEventual
            ]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log("Error al crear paciente: ", error);
        res.status(500).json({
            error: "Error al crear paciente: ",
            details: error.message
        });
    }
})

// POST: Consultas
//----------------

app.post("/createMedicalRecord", async (req, res) => {
    const {
        idpaciente,
        idprofesional,
        fechaconsulta,
        tipoconsulta,
        descripcion
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
            [idpaciente,
                idprofesional,
                fechaconsulta,
                tipoconsulta,
                descripcion
            ]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log("Error al crear consulta: ", error);
        res.status(500).json({
            error: "Error al crear consulta: ",
            details: error.message
        });
    }
})

// POST: Profesionales
//--------------------

app.post("/createProfessional", async (req, res) => {
    const {
        nombreYApellidoProfesional,
        especialidadProfesional,
        matriculaProfesional,
        cuitProfesional,
        fechaUltimaActualizacion
    } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO profesionales (nombreYApellidoProfesional,
                                    especialidadProfesional,
                                    matriculaProfesional,
                                    cuitProfesional,
                                    fechaUltimaActualizacion
                                    )
            VALUES ($1, $2, $3, $4, $5) RETURNING id`,
            [nombreYApellidoProfesional,
                especialidadProfesional,
                matriculaProfesional,
                cuitProfesional,
                fechaUltimaActualizacion
            ]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log("Error al crear profesional: ", error);
        res.status(500).json({
            error: "Error al crear profesional: ",
            details: error.message
        });
    }
})

// GET: Pacientes
//---------------

app.get("/getPatients", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM pacientes");
        res.status(200).json(result.rows);
    } catch (error) {
        console.log("Error al obtener pacientes: ", error);
        res.status(500).json({
            error: "Error al obtener pacientes: ",
            details: error.message
        });
    }
});


// GET: Profesionales
//-------------------

app.get("/getProfessionals", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM profesionales");
        res.status(200).json(result.rows);
    } catch (error) {
        console.log("Error al obtener profesionales: ", error);
        res.status(500).json({
            error: "Error al obtener profesionales: ",
            details: error.message
        });
    }
});

// GET: paciente
//--------------

app.get("/getPatient/:id", async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const result = await pool.query("SELECT * FROM pacientes WHERE id = $1", [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log("Error al obtener paciente: ", error);
        res.status(500).json({
            error: "Error al obtener paciente: ",
            details: error.message
        });
    }
});

// GET: profesional
//-----------------

app.get("/getProfessional/:id", async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const result = await pool.query("SELECT * FROM profesionales WHERE id = $1", [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log("Error al obtener profesional: ", error);
        res.status(500).json({
            error: "Error al obtener profesional: ",
            details: error.message
        });
    }
});

// GET: Consulta
//---------------

app.get("/getMedicalRecord/:id", async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const result = await pool.query(
            "SELECT * FROM consultas WHERE id = $1", [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log("Error al obtener consulta: ", error);
        res.status(500).json({
            error: "Error al obtener consulta: ",
            details: error.message
        });
    }
});

// GET: Consulta
//--------------

app.get("/getMedicalHistory/:id", async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const result = await pool.query(
            "SELECT consultas.*, profesionales.nombreyapellidoProfesional,profesionales.matriculaprofesional, profesionales.especialidadprofesional, profesionales.cuitprofesional, pacientes.nombreyapellidopaciente FROM consultas JOIN profesionales ON consultas.idprofesional = profesionales.id JOIN pacientes ON consultas.idpaciente = pacientes.id WHERE consultas.idpaciente = $1", [id]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log("Error al obtener paciente: ", error);
        res.status(500).json({
            error: "Error al obtener paciente: ",
            details: error.message
        });
    }
});

// GET: Consultas
//---------------

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
        console.error("Error al obtener todas las consultas: ", error);
        res.status(500).json({
            error: "Error al obtener todas las consultas: ",
            details: error.message,
        });
    }
});


// GET: Profesionales
//-------------------

app.get("/getProfessionals", async (req, res) => {
    try {
        // Consulta a la base de datos
        const result = await pool.query("SELECT * FROM profesionales");

        // Respuesta con los pacientes en formato JSON
        res.status(200).json(result.rows);
    } catch (error) {
        console.log("Error al obtener pacientes: ", error);
        res.status(500).json({
            error: "Error al obtener pacientes: ",
            details: error.message
        });
    }
});

//DELETE: paciente
//----------------

app.delete("/deletePatient/:id", async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const result = await pool.query("DELETE FROM pacientes WHERE id = $1 RETURNING *", [id]);
        if (result.rowCount > 0) {
            res.status(200).json({
                message: "Paciente eliminado exitosamente: ",
                deletedPatient: result.rows[0]
            });
        } else {
            res.status(404).json({
                message: "Paciente no encontrado: "
            });
        }
    } catch (error) {
        console.log("Error al eliminar paciente: ", error);
        res.status(500).json({
            error: "Error al eliminar paciente: ",
            details: error.message
        });
    }
});

//DELETE: profesional 
//-------------------


app.delete("/deleteProfessional/:id", async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const result = await pool.query("DELETE FROM profesionales WHERE id = $1 RETURNING *", [id]);
        if (result.rowCount > 0) {
            res.status(200).json({
                message: "Profesional eliminado exitosamente: ",
                deletedPatient: result.rows[0]
            });
        } else {
            res.status(404).json({
                message: "Profesional no encontrado: "
            });
        }
    } catch (error) {
        console.log("Error al eliminar profesional: ", error);
        res.status(500).json({
            error: "Error al eliminar profesional: ",
            details: error.message
        });
    }
});

//DELETE: consulta 
//----------------

app.delete("/deleteMedicalRecord/:id", async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const result = await pool.query("DELETE FROM consultas WHERE id = $1 RETURNING *", [id]);
        if (result.rowCount > 0) {
            res.status(200).json({
                message: "Consulta eliminada exitosamente: ",
                deletedPatient: result.rows[0]
            });
        } else {
            res.status(404).json({
                message: "Consulta no encontrada: "
            });
        }
    } catch (error) {
        console.log("Error al eliminar consulta: ", error);
        res.status(500).json({
            error: "Error al eliminar consulta: ",
            details: error.message
        });
    }
});


//PUT: paciente
//-------------

app.put("/updatePatient/:id", async (req, res) => {
    const {
        nombreyapellidopaciente,
        obrasocialpaciente,
        telefonoObraSocial,
        email1ObraSocial,
        email2ObraSocial,
        email3ObraSocial,
        nombreYApellidoReferenteObrasocial,
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
        imgCertificadoEventual
    } = req.body;

    const {
        id
    } = req.params;

    try {
        const result = await pool.query(
            `UPDATE pacientes
             SET nombreyapellidopaciente = $1,
                obrasocialpaciente = $2,
                telefonoObraSocial = $3,
                email1ObraSocial = $4,
                email2ObraSocial = $5,
                email3ObraSocial = $6,
                nombreYApellidoReferenteObrasocial = $7,
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
                imgCertificadoEventual = $38
                WHERE id = $39`, [
                nombreyapellidopaciente,
                obrasocialpaciente,
                telefonoObraSocial,
                email1ObraSocial,
                email2ObraSocial,
                email3ObraSocial,
                nombreYApellidoReferenteObrasocial,
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
                imgCertificadoEventual,
                id
            ]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                error: "Paciente no encontrado: "
            });
        }

        res.status(200).json({
            message: "Paciente actualizado correctamente: "
        });
    } catch (error) {
        console.log("Error al actualizar paciente: ", error);
        res.status(500).json({
            error: "Error al actualizar paciente: ",
            details: error.message
        });
    }
});

//PUT: profesional
//----------------

app.put("/updateProfessional/:id", async (req, res) => {
    const {
        nombreyapellidoprofesional,
        especialidadprofesional,
        matriculaprofesional,
        cuitprofesional,
        fechaultimaactualizacion
    } = req.body;

    const {
        id
    } = req.params;

    try {
        const result = await pool.query(
            `UPDATE profesionales
             SET nombreyapellidoprofesional = $1,
                 especialidadprofesional = $2,
                 matriculaprofesional = $3,
                 cuitprofesional = $4,
                 fechaultimaactualizacion = $5
             WHERE id = $6`,
            [
                nombreyapellidoprofesional,
                especialidadprofesional,
                matriculaprofesional,
                cuitprofesional,
                fechaultimaactualizacion,
                id
            ]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                error: "Profesional no encontrado: "
            });
        }

        res.status(200).json({
            message: "Profesional actualizado correctamente: "
        });
    } catch (error) {
        console.log("Error al actualizar profesional: ", error);
        res.status(500).json({
            error: "Error al actualizar profesional: ",
            details: error.message
        });
    }
});

//PUT: consulta
//-------------

app.put("/updateMedicalRecord/:id", async (req, res) => {
    const {
        idpaciente,
        idprofesional,
        fechaconsulta,
        tipoconsulta,
        descripcion
    } = req.body;

    const {
        id
    } = req.params;

    try {
        const result = await pool.query(
            `UPDATE consultas
             SET idpaciente = $1,
                 idprofesional = $2,
                 fechaconsulta = $3,
                 tipoconsulta = $4,
                 descripcion = $5
             WHERE id = $6`,
            [
                idpaciente,
                idprofesional,
                fechaconsulta,
                tipoconsulta,
                descripcion,
                id
            ]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                error: "Consulta no encontrada: "
            });
        }

        res.status(200).json({
            message: "Consulta actualizada correctamente: "
        });
    } catch (error) {
        console.log("Error al actualizar consulta: ", error);
        res.status(500).json({
            error: "Error al actualizar consulta",
            details: error.message
        });
    }
});



app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});

//PATCH: paciente
//---------------

app.patch("/partialUpdatePatient/:id", async (req, res) => {
    const {
        id
    } = req.params;
    const fieldsToUpdate = req.body;

    try {
        // Validar si el paciente existe
        const {
            rows
        } = await pool.query("SELECT * FROM pacientes WHERE id = $1", [id]);
        if (rows.length === 0) {
            return res.status(404).json({
                error: "Paciente no encontrado: "
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
                error: "Paciente no encontrado: "
            });
        }

        res.status(200).json({
            message: "Paciente actualizado correctamente: "
        });
    } catch (error) {
        console.log("Error al actualizar paciente: ", error);
        res.status(500).json({
            error: "Error al actualizar paciente: ",
            details: error.message,
        });
    }
});