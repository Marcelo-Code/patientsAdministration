//GET: profesionales
//------------------

import axios from "axios";
import Swal from "sweetalert2";
import {
    BACKEND_URL
} from "./config";

export const getProfessionals = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getProfessionals`)
        return (response.data);
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "¡Error al buscar profesionales!",
            showConfirmButton: true,
            confirmButtonText: "Aceptar"
        });
        console.log("Error al buscar profesionales: ", error.message);
    }
}

//GET: paciente por id
//--------------------

export const getProfessional = async (professionalId) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getProfessional/${professionalId}`)
        return (response.data);
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "¡Error al buscar profesional!",
            showConfirmButton: true,
            confirmButtonText: "Aceptar"
        });
        console.log("Error al buscar profesional: ", error.message);
    }
}

// POST: Profesionales
//--------------------

export const createProfessional = async (newProfessional) => {
    console.log("Creando profesional...")
    try {
        const response = await axios.post(`${BACKEND_URL}/createProfessional`, newProfessional);
        console.log("Profesional creado: ", response.data)
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Profesional ${newProfessional.nombreYApellidoProfesional} creado`,
            showConfirmButton: true,
            confirmButtonText: "Aceptar",
        });
        window.history.back();
        return response;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "¡Error al crear profesional!",
            showConfirmButton: true,
            confirmButtonText: "Aceptar"
        });
        console.log("Error al crear profesional: ", error.message)
    }
}

//DELETE: profesional por id
//--------------------------

export const deleteProfessional = async (patientId, professionalName) => {
    try {
        const result = await Swal.fire({
            title: "¿Estás seguro de eliminar este profesional?",
            text: `Vas a eliminar a ${professionalName}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            const response = await axios.delete(`${BACKEND_URL}/deleteProfessional/${patientId}`);
            Swal.fire({
                title: "¡Eliminado!",
                text: `Acabas de eliminar a ${professionalName}`,
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
            text: "¡Error al eliminar profesional!",
            showConfirmButton: true,
            confirmButtonText: "Aceptar"
        });
        console.log("Error al eliminar profesional: ", error.message);
        throw error;
    }
};

//PUT: profesional
//----------------

export const updateProfessional = async (professional, profesionalId) => {
    try {
        const result = await Swal.fire({
            title: "¿Estás seguro de modificar este profesional?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Modificar",
            cancelButtonText: "Cancelar",
        });
        if (result.isConfirmed) {
            const response = await axios.put(`${BACKEND_URL}/updateProfessional/${profesionalId}`, professional);
            Swal.fire({
                title: "¡Modificado!",
                showConfirmButton: true,
                confirmButtonText: "Aceptar",
                icon: "success",
            });
            window.history.back();
            return response.data;
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "¡Error al modificar profesional!",
            showConfirmButton: true,
            confirmButtonText: "Aceptar"
        });
        console.log("Error al modificar profesional: ", error.response ? error.response.data : error.message);
        throw error;
    }
}