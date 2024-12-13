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

import {
    deleteFileAfterRecordFromBucket
} from "./billingDocuments";

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

export const deleteBillRecord = async (billId, documentData) => {
    try {
        const result = await ConfirmAlert("¿Estás seguro de eliminar esta facturación?", "", "Eliminar", "Cancelar")
        if (result.isConfirmed) {
            getBillRecordCud(billId)
                .then((response) => {
                    documentData.map((document) => {
                        console.log(response[document]);
                        if (response[document] !== "") {
                            deleteFileAfterRecordFromBucket(response[document], "cudBillingDocuments")
                                .then((response) => console.log(response))
                                .catch((error) => console.log(error))
                        }
                    })
                    console.log(response)
                })
                .catch((error) => console.log(error))
            await axios.delete(`${BACKEND_URL}/deleteBillRecord/${billId}`);
            SuccessAlert("¡Facturación eliminada!");
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