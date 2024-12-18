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
} from "./billingDocuments";

//GET: facturación no CUD
//-----------------------

export const getNoCudBillingRecords = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getNoCudBillingRecords`)
        return (response.data);
    } catch (error) {
        ErrorAlert("¡Error al buscar registros!");
        console.log("Error al buscar registros: ", error.message);
    }
}

//GET: facturaciones no CUD
//------------------------

export const getNoCudBillingRecord = async (noCudBillingRecordId) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getNoCudBillingRecord/${noCudBillingRecordId}`)
        return (response.data);
    } catch (error) {
        ErrorAlert("¡Error al buscar registro!");
        console.log("Error al buscar registro: ", error.message);
    }
}

//POST: facturación no CUD
//------------------------

export const createNoCudBillingRecord = async function name(noCudNewBillingRecord) {
    console.log("Creando registro...")
    try {
        const response = await axios.post(`${BACKEND_URL}/createNoCudBillingRecord`, noCudNewBillingRecord);
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

//PUT: facturación no CUD
//-----------------------

export const updateNoCudBillingRecord = async (noCudbillingRecord, noCudbillingRecordId) => {
    try {
        const result = await ConfirmAlert("¿Estás seguro de modificar este registro?", "", "Modificar", "Cancelar");
        if (result.isConfirmed) {
            const response = await axios.put(`${BACKEND_URL}/updateNoCudBillingRecord/${noCudbillingRecordId}`, noCudbillingRecord);
            SuccessAlert("Registro modificado!");
            return (response.data);
        }
    } catch (error) {
        ErrorAlert("¡Error al modificar registro!");
        console.log("Error al modificar registro: ", error.response ? error.response.data : error.message);
        throw error;
    }
}

//DELETE: facturación no CUD
//--------------------------

export const deleteNoCudBillingRecord = async (noCudBillingRecordId, documentData) => {
    try {
        const result = await ConfirmAlert("¿Estás seguro de eliminar esta facturación?", "", "Eliminar", "Cancelar")
        if (result.isConfirmed) {
            getNoCudBillingRecord(noCudBillingRecordId)
                .then((response) => {
                    documentData.map((document) => {
                        console.log(response[document]);
                        if (response[document] !== "") {
                            deleteFileAfterRecordFromBucket(response[document], "noCudBillingDocuments")
                                .then((response) => console.log(response))
                                .catch((error) => console.log(error))
                        }
                    })
                    console.log(response)
                })
                .catch((error) => console.log(error))
            await axios.delete(`${BACKEND_URL}/deleteNoCudBillingRecord/${noCudBillingRecordId}`);
            SuccessAlert("¡Facturación eliminada!");
        }
    } catch (error) {
        ErrorAlert("¡Error al eliminar facturación!")
        console.log("Error al eliminar facturación: ", error);
        throw error;
    }
}