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
    documentData
} from "../components/common/documentCard/DocumentData";
import {
    borrarImagen,
    DeleteImage,
} from "./Images";

//POST: pacientes
//---------------

export const createPatient = async (newPatient) => {
    console.log("Creando paciente...")
    try {
        const response = await axios.post(`${BACKEND_URL}/createPatient`, newPatient);
        console.log("Paciente creado: ", response.data)
        SuccessAlert(`Paciente ${newPatient.nombreYApellidoPaciente} creado`);
        window.history.back();
        return response;
    } catch (error) {
        ErrorAlert("¡Error al crear paciente!")
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
        ErrorAlert("¡Error al buscar pacientes!");
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
        ErrorAlert("¡Error al buscar paciente!");
        console.log("Error al buscar paciente: ", error.message);
    }
}

//DELETE: paciente por id
//-----------------------

export const deletePatient = async (patientId, patientName) => {
    try {
        const result = await ConfirmAlert("¿Estás seguro de eliminar este paciente?", `Vas a eliminar a ${patientName}`, "Eliminar", "Cancelar");
        if (result.isConfirmed) {

            getPatient(patientId)
                .then((response) => {
                    documentData.map((document) => {
                        console.log(response[document.name]);
                        if (response[document.name] !== "")
                            borrarImagen(response[document.name])
                            .then((response) => console.log(response))
                            .catch((error) => console.log(error))
                    });
                })
                .catch((error) => console.log(error))

            const response = await axios.delete(`${BACKEND_URL}/deletePatient/${patientId}`);

            SuccessAlert(`Acabas de eliminar a ${patientName}`)
            return response.data;
        }
    } catch (error) {
        ErrorAlert("¡Error al eliminar paciente!");
        console.log("Error al eliminar paciente: ", error.message);
        throw error;
    }
};

//PUT: paciente
//-------------

export const updatePatient = async (patient, patientId) => {
    try {
        const result = await ConfirmAlert("¿Estás seguro de modificar este paciente?", "", "Modificar", "Cancelar")
        console.log(result.isConfirmed);
        if (result.isConfirmed) {
            const response = await axios.put(`${BACKEND_URL}/updatePatient/${patientId}`, patient);
            SuccessAlert("¡Paciente modificado!")
            window.history.back();
            return response.data;
        }
    } catch (error) {
        ErrorAlert("¡Error al modificar paciente!");
        console.log("Error al modificar paciente: ", error.response ? error.response.data : error.message);
        throw error;
    }
}

//PATCH: paciente
//---------------

export const partialUpdatePatient = async (patient, patientId) => {
    const response = await axios.patch(`${BACKEND_URL}/partialUpdatePatient/${patientId}`, patient)
    try {
        SuccessAlert("¡Paciente modificado!");
        return response.data;
    } catch (error) {
        ErrorAlert("¡Error al modificar paciente!");
        console.log("Error al modificar paciente: ", error.response ? error.response.data : error.message);
        throw error;
    }
}