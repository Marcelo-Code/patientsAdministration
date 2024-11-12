import express from "express";
import cors from "cors";
import pg from "pg";

import {
    DB_DATABASE,
    DB_PASSWORD,
    DB_PORT,
    DB_USER,
    FRONTEND_URL,
    PORT
} from "./config.js"

const app = express();
const pool = new pg.Pool({
    host: DB_HOST,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT
})

app.use(cors({
    origin: FRONTEND_URL,
}))

app.get("/ping", async (req, res) => {

    const result = await pool.query('SELECT NOW()')
    console.log(result);

    res.send({
        pong: result[0].now,
    })
});

app.listen(PORT, () => {
    console.log("server started");
})