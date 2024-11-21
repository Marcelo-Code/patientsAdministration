import axios from "axios";
import {
    BACKEND_URL
} from "./config.js"
import Swal from "sweetalert2";


//POST: consultas médicas
//-----------------------

export const createMedicalRecord = async (newMedicalRecord) => {
    console.log("Creando consulta...")
    try {
        const response = await axios.post(`${BACKEND_URL}/createMedicalRecord`, newMedicalRecord);
        console.log("Consulta médica creada: ", response.data)
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Consulta creada`,
            showConfirmButton: true,
            confirmButtonText: "Aceptar",
        });
        return response;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "¡Error al crear consulta!",
            showConfirmButton: true,
            confirmButtonText: "Aceptar"
        });
        console.log("Error al crear consulta médica: ", error.message)
    }
}

//GET: conusltas médicas por id de paciente
//-----------------------------------------

export const getMedicalHistory = async (patientId) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getMedicalHistory/${patientId}`)
        return response.data;
    } catch (error) {
        console.log("Error al obtener consultas médicas", error.message)
    }
}

//GET: conusltas médicas por id de paciente
//-----------------------------------------

export const getMedicalRecord = async (medicalRecordId) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getMedicalRecord/${medicalRecordId}`)
        return response.data;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "¡Error al obtener consulta!",
            showConfirmButton: true,
            confirmButtonText: "Aceptar"
        });
        console.log("Error al obtener consulta: ", error.message)
    }
}



//DELETE: consulta
//----------------

export const deleteMedicalrecord = async (medicalRecordId) => {
    try {
        const result = await Swal.fire({
            title: "¿Estás seguro de eliminar esta consulta?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
        });
        if (result.isConfirmed) {
            const response = await axios.delete(`${BACKEND_URL}/deleteMedicalRecord/${medicalRecordId}`);
            Swal.fire({
                title: "¡Consulta eliminada!",
                icon: "success",
                showConfirmButton: true,
                confirmButtonText: "Aceptar"
            });
            return response.data;
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "¡Error al eliminar consulta!",
            showConfirmButton: true,
            confirmButtonText: "Aceptar"
        });
        console.log("Error al eliminar consulta: ", error)
        throw (error)

    }
}

//PUT: consulta
//-------------

export const updateMedicalRecord = async (medicalRecord, medicalRecordId) => {
    try {
        const result = await Swal.fire({
            title: "¿Estás seguro de modificar esta consulta?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Modificar",
            cancelButtonText: "Cancelar",
        });
        if (result.isConfirmed) {
            const response = await axios.put(`${BACKEND_URL}/updateMedicalRecord/${medicalRecordId}`, medicalRecord);
            Swal.fire({
                title: "¡Modificado!",
                showConfirmButton: true,
                confirmButtonText: "Aceptar",
                icon: "success",
            });
            return response.data;
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "¡Error al modificar consulta!",
            showConfirmButton: true,
            confirmButtonText: "Aceptar"
        });
        console.log("Error al modificar consulta: ", error.response ? error.response.data : error.message);
        throw error;
    }
}