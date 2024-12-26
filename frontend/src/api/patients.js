import axios from 'axios';
import {
    ConfirmAlert,
    ErrorAlert,
    SuccessAlert
} from "../components/common/alerts/alerts";
import {
    documentData
} from "../components/pages/documentation/DocumentData";
import {
    borrarImagen
} from "./Images";
import {
    BACKEND_URL
} from './config';

//POST: pacientes
//---------------

export const createPatientRecord = async (newPatientRecord) => {
    console.log("Creando paciente...")
    try {
        const response = await axios.post(`${BACKEND_URL}/createPatientRecord`, newPatientRecord);
        console.log("Paciente creado: ", response.data)
        SuccessAlert(`Paciente ${newPatientRecord.nombreYApellidoPaciente} creado`);
        window.history.back();
        return response;
    } catch (error) {
        ErrorAlert("¡Error al crear paciente!")
        console.log("Error al crear paciente: ", error.message)
    }
}

//GET: pacientes
//--------------

export const getPatientsRecords = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getPatientsRecords`)
        return (response.data);
    } catch (error) {
        ErrorAlert("¡Error al buscar pacientes!");
        console.log("Error al buscar pacientes: ", error.message);
    }
}

//GET: paciente
//-------------

export const getPatientRecord = async (patientRecordId) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getPatientRecord/${patientRecordId}`)
        return (response.data);
    } catch (error) {
        ErrorAlert("¡Error al buscar paciente!");
        console.log("Error al buscar paciente: ", error.message);
    }
}

//DELETE: paciente
//----------------

export const deletePatientRecord = async (patientRecordId, patientName) => {
    try {
        const result = await ConfirmAlert("¿Estás seguro de eliminar este paciente?", `Vas a eliminar a ${patientName}`, "Eliminar", "Cancelar");
        if (result.isConfirmed) {
            getPatientRecord(patientRecordId)
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

            const response = await axios.delete(`${BACKEND_URL}/deletePatientRecord/${patientRecordId}`);

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

export const updatePatientRecord = async (patientRecord, patientRecordId) => {
    try {
        const result = await ConfirmAlert("¿Estás seguro de modificar este paciente?", "", "Modificar", "Cancelar")
        console.log(result.isConfirmed);
        if (result.isConfirmed) {
            const response = await axios.put(`${BACKEND_URL}/updatePatientRecord/${patientRecordId}`, patientRecord);
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

export const partialUpdatePatientRecord = async (patientRecord, patientRecordId) => {
    const response = await axios.patch(`${BACKEND_URL}/partialUpdatePatientRecord/${patientRecordId}`, patientRecord)
    try {
        SuccessAlert("¡Paciente modificado!");
        return response.data;
    } catch (error) {
        ErrorAlert("¡Error al modificar paciente!");
        console.log("Error al modificar paciente: ", error.response ? error.response.data : error.message);
        throw error;
    }
}