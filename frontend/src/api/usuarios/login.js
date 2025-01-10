import axios from "axios";
import {
    BACKEND_URL
} from "../config";
import {
    ErrorAlert
} from "../../components/common/alerts/alerts";

//POST: validación usuario y contraseña
export const login = async (usuario, password) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/login`, {
            usuario,
            password
        });
        const {
            token
        } = response.data;
        localStorage.setItem('token', token);
        return token;
    } catch (error) {
        ErrorAlert("Usuario o contraseña incorrecta")
        if (error.response && error.response.data) {
            console.log("Error de login: ", error.response.data);
        } else {
            console.log("Error de login: ", error.message);
        }
        throw (error);

    }
}

//GET: usuario, parámetros usuario y contraseña
export const getUser = async (usuario, password) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getUser`, {
            params: {
                usuario,
                password
            }
        })
        if (response.data) {
            localStorage.setItem("userRolRecord", JSON.stringify(response.data));
        }

        return (response.data);
    } catch (error) {
        console.log(error)
        return null;
    }
}