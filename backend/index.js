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
        fechaUltimaActualizacion
    } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO pacientes (nombreYApellidoPaciente,
                                    obraSocialPaciente,
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
                                    fechaUltimaActualizacion
                                    )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) RETURNING id`,
            [nombreYApellidoPaciente,
                obraSocialPaciente,
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
                fechaUltimaActualizacion
            ]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log("Error al crear paciente: ", error);
        res.status(500).json({
            error: "Error al crear paciente",
            details: error.message
        });
    }
})

// POST: Consultas
//----------------

app.post("/createMedicalRecord", async (req, res) => {
    const {
        idPaciente,
        idProfesional,
        fechaConsulta,
        tipoConsulta,
        descripcion
    } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO consultas (idPaciente,
                                    idProfesional,
                                    fechaConsulta,
                                    tipoConsulta,
                                    descripcion
                                    )
            VALUES ($1, $2, $3, $4, $5) RETURNING id`,
            [idPaciente,
                idProfesional,
                fechaConsulta,
                tipoConsulta,
                descripcion
            ]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log("Error al crear consulta: ", error);
        res.status(500).json({
            error: "Error al crear consulta",
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
            error: "Error al crear profesional",
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
            error: "Error al obtener pacientes",
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
            error: "Error al obtener profesionales",
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
            error: "Error al obtener paciente",
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
            error: "Error al obtener profesional",
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
            error: "Error al obtener consulta",
            details: error.message
        });
    }
});

// GET: Consultas
//---------------

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
            error: "Error al obtener paciente",
            details: error.message
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
            error: "Error al obtener pacientes",
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
                message: "Paciente eliminado exitosamente",
                deletedPatient: result.rows[0]
            });
        } else {
            res.status(404).json({
                message: "Paciente no encontrado"
            });
        }
    } catch (error) {
        console.log("Error al eliminar paciente: ", error);
        res.status(500).json({
            error: "Error al eliminar paciente",
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
                message: "Profesional eliminado exitosamente",
                deletedPatient: result.rows[0]
            });
        } else {
            res.status(404).json({
                message: "Profesional no encontrado"
            });
        }
    } catch (error) {
        console.log("Error al eliminar profesional: ", error);
        res.status(500).json({
            error: "Error al eliminar profesional",
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
                message: "Consulta eliminada exitosamente",
                deletedPatient: result.rows[0]
            });
        } else {
            res.status(404).json({
                message: "Consulta no encontrada"
            });
        }
    } catch (error) {
        console.log("Error al eliminar consulta: ", error);
        res.status(500).json({
            error: "Error al eliminar consulta",
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
        fechaultimaactualizacion
    } = req.body;

    const {
        id
    } = req.params;

    try {
        const result = await pool.query(
            `UPDATE pacientes
             SET nombreyapellidopaciente = $1,
                 obrasocialpaciente = $2,
                 nroafiliadopaciente = $3,
                 dnipaciente = $4,
                 direccionpaciente = $5,
                 fechanacimientopaciente = $6,
                 diagnosticoprevio = $7,
                 ciudadpaciente = $8,
                 nombreyapellidoresponsable = $9,
                 telefonoresponsable = $10,
                 escuela = $11,
                 direccionescuela = $12,
                 telefonoescuela = $13,
                 aniogradosala = $14,
                 nombreyapellidodocentereferenteescuela = $15,
                 nombreyapellidodirectivoescuela = $16,
                 escuelaespecial = $17,
                 nombreyapellidodocentereferenteescuelaespecial = $18,
                 telefonodocentereferenteescuelaespecial = $19,
                 cud = $20,
                 fechavencimientocud = $21,
                 fechainiciotto = $22,
                 fechaultimaactualizacion = $23
             WHERE id = $24`,
            [
                nombreyapellidopaciente,
                obrasocialpaciente,
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
                id
            ]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                error: "Paciente no encontrado"
            });
        }

        res.status(200).json({
            message: "Paciente actualizado correctamente"
        });
    } catch (error) {
        console.log("Error al actualizar paciente: ", error);
        res.status(500).json({
            error: "Error al actualizar paciente",
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
                error: "Profesional no encontrado"
            });
        }

        res.status(200).json({
            message: "Profesional actualizado correctamente"
        });
    } catch (error) {
        console.log("Error al actualizar profesional: ", error);
        res.status(500).json({
            error: "Error al actualizar profesional",
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
                error: "Consulta no encontrada"
            });
        }

        res.status(200).json({
            message: "Consulta actualizada correctamente"
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