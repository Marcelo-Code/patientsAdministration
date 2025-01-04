import axios from "axios";
import {
    BACKEND_URL
} from "./config"

export const login = async (usuario, password) => {
    console.log(usuario + password)
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
        if (error.response && error.response.data) {
            console.log("Error de login: ", error.response.data);
        } else {
            console.log("Error de login: ", error.message);
        }
        throw (error);

    }
}