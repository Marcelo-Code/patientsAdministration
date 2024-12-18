import axios from "axios";
import {
    BACKEND_URL
} from "./config";
import {
    ConfirmAlert,
    ErrorAlert,
    SuccessAlert
} from "../components/common/alerts/alerts";

import {
    deleteFileAfterRecordFromBucket
} from "./billingDocuments"





//GET: facturaciones CUD
//----------------------

export const getCudBillingRecords = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getCudBillingRecords`)
        return (response.data);
    } catch (error) {
        ErrorAlert("¡Error al buscar registros!");
        console.log("Error al buscar registros: ", error.message);
    }
}

//GET: facturación CUD, paciente
//------------------------------

export const getCudBillingPatientRecord = async (patientRecordId) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getCudBillingPatientRecord/${patientRecordId}`)
        return (response.data);
    } catch (error) {
        ErrorAlert("¡Error al buscar registros!");
        console.log("Error al buscar registros: ", error.message);
    }
}

//GET: facturación CUD
//--------------------

export const getCudBillingRecord = async (cudBillingRecordId) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getCudBillingRecord/${cudBillingRecordId}`)
        return (response.data);
    } catch (error) {
        ErrorAlert("¡Error al buscar registro!");
        console.log("Error al buscar registro: ", error.message);
    }
}

//DELETE: facturación CUD
//-----------------------

export const deleteCudBillingRecord = async (billingRecordId, documentData) => {
    try {
        const result = await ConfirmAlert("¿Estás seguro de eliminar esta facturación?", "", "Eliminar", "Cancelar")
        if (result.isConfirmed) {
            getCudBillingRecord(billingRecordId)
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
            await axios.delete(`${BACKEND_URL}/deleteCudBillingRecord/${billingRecordId}`);
            SuccessAlert("¡Facturación eliminada!");
        }
    } catch (error) {
        ErrorAlert("¡Error al eliminar facturación!")
        console.log("Error al eliminar facturación: ", error);
        throw error;
    }
}

export const createCudBillingRecord = async function name(newCudBillingRecord) {
    console.log("Creando registro...")
    try {
        const response = await axios.post(`${BACKEND_URL}/createCudBillingRecord`, newCudBillingRecord);
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

export const updateCudBillingRecord = async (cudBillingRecord, cudBillingRecordId) => {
    try {
        const result = await ConfirmAlert("¿Estás seguro de modificar este registro?", "", "Modificar", "Cancelar");
        if (result.isConfirmed) {
            const response = await axios.put(`${BACKEND_URL}/updateCudBillingRecord/${cudBillingRecordId}`, cudBillingRecord);
            SuccessAlert("Registro modificado!");
            return (response.data);
        }
    } catch (error) {
        ErrorAlert("¡Error al modificar registro!");
        console.log("Error al modificar registro: ", error.response ? error.response.data : error.message);
        throw error;
    }
}