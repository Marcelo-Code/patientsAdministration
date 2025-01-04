import axios from "axios";
import {
    ConfirmAlert,
    ErrorAlert,
    SuccessAlert
} from "../components/common/alerts/alerts"
import {
    BACKEND_URL
} from "./config"

//POST: usuario
//-------------

export const createUser = async (newUser) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/createUser`, newUser);
        console.log("Registro creado: ", response.data)
        SuccessAlert("Registro creado");
    } catch (error) {
        ErrorAlert("¡Error al crear registro!")
        console.log("Error al crear registro: ", error.message)
        throw error
    }
}

//GET: usuarios
//-------------

export const getUsersRecords = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getUsersRecords`)
        return response.data;
    } catch (error) {
        ErrorAlert("¡Error al buscar usuarios!");
        console.log("Error al buscar usuarios: ", error.message);
    }
}

//GET: usuario
//-------------

export const getUserRecord = async (userRecordId) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getUserRecord/${userRecordId}`)
        return (response.data);
    } catch (error) {
        ErrorAlert("¡Error al buscar usuario!");
        console.log("Error al buscar usuario: ", error.message);
    }
}

//PUT: usuario
//-------------

export const updateUserRecord = async (userRecord, userRecordId) => {
    try {
        const result = await ConfirmAlert("¿Estás seguro de modificar este usuario?", "", "Modificar", "Cancelar")
        console.log(result.isConfirmed);
        if (result.isConfirmed) {
            const response = await axios.put(`${BACKEND_URL}/updateUserRecord/${userRecordId}`, userRecord);
            SuccessAlert("Usuario modificado!")
            return response.data;
        }
    } catch (error) {
        ErrorAlert("¡Error al modificar usuario!");
        console.log("Error al modificar usuario: ", error.response ? error.response.data : error.message);
        throw error;
    }
}

//DELETE: usuario
//----------------

export const deleteUserRecord = async (userRecordId, userName) => {
    try {
        const result = await ConfirmAlert("¿Estás seguro de eliminar este usuario?", `Vas a eliminar a ${userName}`, "Eliminar", "Cancelar");
        if (result.isConfirmed) {
            const response = await axios.delete(`${BACKEND_URL}/deleteUserRecord/${userRecordId}`);
            SuccessAlert(`Acabas de eliminar a ${userName}`)
            return response.data;
        }
    } catch (error) {
        ErrorAlert("¡Error al eliminar usuario!");
        console.log("Error al eliminar usuario: ", error.message);
        throw error;
    }
};