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

app.use(cors({
    origin: FRONTEND_URL,
}))

app.get("/ping", async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log(result);
        res.send({
            pong: result.rows[0].now,
        })
    } catch (error) {
        console.log("Error en consulta: ", error);
        res.status(500).send({
            error: "Error al conectarse a la DB"
        });
    }
});

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});