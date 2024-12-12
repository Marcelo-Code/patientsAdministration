//GET: pacientes
//--------------

import axios from "axios";
import {
    ConfirmAlert,
    ErrorAlert,
    SuccessAlert
} from "../components/common/alerts/alerts";
import {
    BACKEND_URL
} from "./config";

export const getCudBills = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getCudBills`)
        return (response.data);
    } catch (error) {
        ErrorAlert("¡Error al buscar registros!");
        console.log("Error al buscar registros: ", error.message);
    }
}

export const getCudBillPatient = async (patientId) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getCudBillPatient/${patientId}`)
        return (response.data);
    } catch (error) {
        ErrorAlert("¡Error al buscar registros!");
        console.log("Error al buscar registros: ", error.message);
    }
}

export const getBillRecordCud = async (billRecordCudId) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getBillRecordCud/${billRecordCudId}`)
        return (response.data);
    } catch (error) {
        ErrorAlert("¡Error al buscar registro!");
        console.log("Error al buscar registro: ", error.message);
    }
}

export const deleteCudBill = async (billId) => {
    try {
        const result = await ConfirmAlert("¿Estás seguro de eliminar esta facturación?", "", "Eliminar", "Cancelar")
        if (result.isConfirmed) {
            const response = await axios.delete(`${BACKEND_URL}/deleteCudBill/${billId}`)
            SuccessAlert("¡Facturación eliminada!")
            return (response.data);
        }
    } catch (error) {
        ErrorAlert("¡Error al eliminar facturación!")
        console.log("Error al eliminar facturación: ", error);
        throw error;
    }
}

export const createBillRecordCud = async function name(newBillRecordCud) {
    console.log("Creando registro...")
    try {
        const response = await axios.post(`${BACKEND_URL}/createBillRecordCud`, newBillRecordCud);
        console.log("Registro creado: ", response.data)
        SuccessAlert("Registro creado");
        window.history.back();
        return (response.data);
    } catch (error) {
        ErrorAlert("¡Error al crear registro!")
        console.log("Error al crear registro: ", error.message)
        throw error
    }
}

//PUT: facturación
//----------------

export const updateBillRecordCud = async (billRecordCud, billRecordCudId) => {
    try {
        const result = await ConfirmAlert("¿Estás seguro de modificar este registro?", "", "Modificar", "Cancelar");
        if (result.isConfirmed) {
            const response = await axios.put(`${BACKEND_URL}/updateBillRecordCud/${billRecordCudId}`, billRecordCud);
            SuccessAlert("Registro modificado!");
            return (response.data);
        }
    } catch (error) {
        ErrorAlert("¡Error al modificar registro!");
        console.log("Error al modificar registro: ", error.response ? error.response.data : error.message);
        throw error;
    }
}