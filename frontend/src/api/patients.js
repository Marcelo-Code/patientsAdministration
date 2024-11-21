import axios from "axios";
import {
    BACKEND_URL
} from "./config";
import Swal from 'sweetalert2';




//POST: pacientes
//---------------

export const createPatient = async (newPatient) => {
    console.log("Creando paciente...")
    try {
        const response = await axios.post(`${BACKEND_URL}/createPatient`, newPatient);
        console.log("Paciente creado: ", response.data)
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Paciente ${newPatient.nombreYApellidoPaciente} creado`,
            showConfirmButton: true,
            confirmButtonText: "Aceptar",
        });
        return response;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "¡Error al crear paciente!",
            showConfirmButton: true,
            confirmButtonText: "Aceptar"
        });
        console.log("Error al crear paciente: ", error.message)
    }
}

//GET: pacientes
//--------------

export const getPatients = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getPatients`)
        return (response.data);
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "¡Error al buscar pacientes!",
            showConfirmButton: true,
            confirmButtonText: "Aceptar"
        });
        console.log("Error al buscar pacientes: ", error.message);
    }
}

//GET: paciente por id
//--------------------

export const getPatient = async (patientId) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getPatient/${patientId}`)
        return (response.data);
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "¡Error al buscar paciente!",
            showConfirmButton: true,
            confirmButtonText: "Aceptar"
        });
        console.log("Error al buscar paciente: ", error.message);
    }
}

//DELETE: paciente por id
//-----------------------

export const deletePatient = async (patientId, patientName) => {
    try {
        const result = await Swal.fire({
            title: "¿Estás seguro de eliminar este paciente?",
            text: `Vas a eliminar a ${patientName}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            const response = await axios.delete(`${BACKEND_URL}/deletePatient/${patientId}`);
            Swal.fire({
                title: "¡Eliminado!",
                text: `Acabas de eliminar a ${patientName}`,
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
            text: "¡Error al eliminar paciente!",
            showConfirmButton: true,
            confirmButtonText: "Aceptar"
        });
        console.log("Error al eliminar paciente: ", error.message);
        throw error;
    }
};

//PUT: paciente
//-------------

export const updatePatient = async (patient, patientId) => {
    try {
        const result = await Swal.fire({
            title: "¿Estás seguro de modificar este paciente?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Modificar",
            cancelButtonText: "Cancelar",
        });
        if (result.isConfirmed) {
            const response = await axios.put(`${BACKEND_URL}/updatePatient/${patientId}`, patient);
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
            text: "¡Error al modificar paciente!",
            showConfirmButton: true,
            confirmButtonText: "Aceptar"
        });
        console.log("Error al modificar paciente: ", error.response ? error.response.data : error.message);
        throw error;
    }
}