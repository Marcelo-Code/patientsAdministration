import axios from "axios";
import {
    ConfirmAlert,
    ErrorAlert,
    SuccessAlert
} from "../components/common/alerts/alerts";
import {
    BACKEND_URL
} from "./config";

//POST: consultas médicas
//-----------------------

export const createMedicalRecord = async (newMedicalRecord) => {
    console.log("Creando consulta...")
    try {
        const response = await axios.post(`${BACKEND_URL}/createMedicalRecord`, newMedicalRecord);
        console.log("Consulta médica creada: ", response.data)
        SuccessAlert("Consulta creada");
        window.history.back();
        return (response.data);
    } catch (error) {
        ErrorAlert("¡Error al crear consulta!")
        console.log("Error al crear consulta médica: ", error.message)
    }
}

//GET: consultas médicas por id de paciente
//-----------------------------------------

export const getMedicalHistoryRecord = async (patientRecordId) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getMedicalHistoryRecord/${patientRecordId}`)
        return (response.data);
    } catch (error) {
        console.log("Error al obtener consultas médicas", error.message)
    }
}

//GET: consulta médica por id de paciente
//---------------------------------------

export const getMedicalRecord = async (medicalRecordId) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getMedicalRecord/${medicalRecordId}`)
        return (response.data);
    } catch (error) {
        ErrorAlert("¡Error al obtener consulta!");
        console.log("Error al obtener consulta: ", error.message)
    }
}

//GET: consultas médicas
//----------------------

export const getMedicalRecords = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getMedicalRecords`)
        return (response.data);
    } catch (error) {
        ErrorAlert("¡Error al obtener consultas!")
        console.log("Error al obtener consulta: ", error.message)
    }
}



//DELETE: consulta
//----------------

export const deleteMedicalRecord = async (medicalRecordId) => {
    try {
        const result = await ConfirmAlert("¿Estás seguro de eliminar esta consulta?", "", "Eliminar", "Cancelar");
        if (result.isConfirmed) {
            const response = await axios.delete(`${BACKEND_URL}/deleteMedicalRecord/${medicalRecordId}`);
            SuccessAlert("¡Consulta eliminada!");
            return (response.data);
        }
    } catch (error) {
        ErrorAlert("¡Error al eliminar consulta!");
        console.log("Error al eliminar consulta: ", error)
        throw (error)

    }
}

//PUT: consulta
//-------------

export const updateMedicalRecord = async (medicalRecord, medicalRecordId) => {
    try {
        const result = await ConfirmAlert("¿Estás seguro de modificar esta consulta?", "", "Modificar", "Cancelar");
        if (result.isConfirmed) {
            const response = await axios.put(`${BACKEND_URL}/updateMedicalRecord/${medicalRecordId}`, medicalRecord);
            SuccessAlert("¡Consulta modificada!");
            window.history.back();
            return (response.data);
        }
    } catch (error) {
        ErrorAlert("¡Error al modificar consulta!");
        console.log("Error al modificar consulta: ", error.response ? error.response.data : error.message);
        throw error;
    }
}