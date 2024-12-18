//GET: profesionales
//------------------

import axios from "axios";
import {
    BACKEND_URL
} from "./config";
import {
    ConfirmAlert,
    ErrorAlert,
    SuccessAlert
} from "../components/common/alerts/alerts";

export const getProfessionalsRecords = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getProfessionalsRecords`)
        return (response.data);
    } catch (error) {
        ErrorAlert("¡Error al buscar profesionales!")
        console.log("Error al buscar profesionales: ", error.message);
    }
}

//GET: profesional
//----------------

export const getProfessionalRecord = async (professionalId) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getProfessionalRecord/${professionalId}`)
        return (response.data);
    } catch (error) {
        ErrorAlert("¡Error al buscar profesional!");
        console.log("Error al buscar profesional: ", error.message);
    }
}

// POST: Profesional
//------------------

export const createProfessionalRecord = async (newProfessional) => {
    console.log("Creando profesional...")
    try {
        const response = await axios.post(`${BACKEND_URL}/createProfessionalRecord`, newProfessional);
        console.log("Profesional creado: ", response.data)
        SuccessAlert(`Profesional ${newProfessional.nombreYApellidoProfesional} creado`);
        window.history.back();
        return (response.data);
    } catch (error) {
        ErrorAlert("¡Error al crear profesional!");
        console.log("Error al crear profesional: ", error.message)
    }
}

//DELETE: profesional
//-------------------

export const deleteProfessionalRecord = async (professionalId, professionalName) => {
    console.log(professionalId);
    console.log(typeof (professionalId));
    try {
        const result = await ConfirmAlert("¿Estás seguro de eliminar este profesional?", `Vas a eliminar a ${professionalName}`, "Eliminar", "Cancelar");
        if (result.isConfirmed) {
            const response = await axios.delete(`${BACKEND_URL}/deleteProfessionalRecord/${professionalId}`);
            SuccessAlert("¡Profesional eliminado!");
            return (response.data);
        }
    } catch (error) {
        ErrorAlert("¡Error al eliminar profesional!");
        console.log("Error al eliminar profesional: ", error.message);
        throw error;
    }
};

//PUT: profesional
//----------------

export const updateProfessionalRecord = async (professional, profesionalId) => {
    try {
        const result = await ConfirmAlert("¿Estás seguro de modificar este profesional?", "", "Modificar", "Cancelar");
        if (result.isConfirmed) {
            const response = await axios.put(`${BACKEND_URL}/updateProfessionalRecord/${profesionalId}`, professional);
            SuccessAlert("¡Profesional modificado!");
            window.history.back();
            return (response.data);
        }
    } catch (error) {
        ErrorAlert("¡Error al modificar profesional!");
        console.log("Error al modificar profesional: ", error.response ? error.response.data : error.message);
        throw error;
    }
}