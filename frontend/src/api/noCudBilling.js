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


export const getNoCudBills = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getNoCudBills`)
        return (response.data);
    } catch (error) {
        ErrorAlert("¡Error al buscar registros!");
        console.log("Error al buscar registros: ", error.message);
    }
}

export const getBillRecordNoCud = async (billRecordNoCudId) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getBillRecordNoCud/${billRecordNoCudId}`)
        return (response.data);
    } catch (error) {
        ErrorAlert("¡Error al buscar registro!");
        console.log("Error al buscar registro: ", error.message);
    }
}


export const createBillRecordNoCud = async function name(newBillRecordNoCud) {
    console.log("Creando registro...")
    try {
        const response = await axios.post(`${BACKEND_URL}/createBillRecordNoCud`, newBillRecordNoCud);
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

export const updateNoCudBillingRecord = async (noCudbillRecord, noCudbillRecordId) => {
    try {
        const result = await ConfirmAlert("¿Estás seguro de modificar este registro?", "", "Modificar", "Cancelar");
        if (result.isConfirmed) {
            const response = await axios.put(`${BACKEND_URL}/updateNoCudBillingRecord/${noCudbillRecordId}`, noCudbillRecord);
            SuccessAlert("Registro modificado!");
            return (response.data);
        }
    } catch (error) {
        ErrorAlert("¡Error al modificar registro!");
        console.log("Error al modificar registro: ", error.response ? error.response.data : error.message);
        throw error;
    }
}

export const deleteNoCudBillingRecord = async (noCudBillingId, documentData) => {
    try {
        const result = await ConfirmAlert("¿Estás seguro de eliminar esta facturación?", "", "Eliminar", "Cancelar")
        if (result.isConfirmed) {
            getBillRecordNoCud(noCudBillingId)
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
            await axios.delete(`${BACKEND_URL}/deleteNoCudBillingRecord/${noCudBillingId}`);
            SuccessAlert("¡Facturación eliminada!");
        }
    } catch (error) {
        ErrorAlert("¡Error al eliminar facturación!")
        console.log("Error al eliminar facturación: ", error);
        throw error;
    }
}