import axios from 'axios';
import {
    BACKEND_URL,
    bucketName,
    publicBucketUrl,
    supabase
} from '../config';
import {
    ConfirmAlert,
    ErrorAlert,
    SuccessAlert
} from '../../components/common/alerts/alerts';

//POST: crear paciente
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

//GET: lista de pacientes
export const getPatientsRecords = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getPatientsRecords`)
        return (response.data);
    } catch (error) {
        ErrorAlert("¡Error al buscar pacientes!");
        console.log("Error al buscar pacientes: ", error.message);
    }
}

//GET: paciente por id
export const getPatientRecord = async (patientRecordId) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getPatientRecord/${patientRecordId}`)
        return (response.data);
    } catch (error) {
        ErrorAlert("¡Error al buscar paciente!");
        console.log("Error al buscar paciente: ", error.message);
    }
}

//DELETE: eliminar paciente
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

//PUT: update paciente
export const updatePatientRecord = async (patientRecord, patientRecordId) => {
    try {
        const result = await ConfirmAlert("¿Estás seguro de modificar este paciente?", "", "Modificar", "Cancelar")
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

//PATCH: update paciente
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

//********** DOCUMENTACIÓN EN BUCKET **********

//DELETE: eliminar imagenes en paciente
export const DeleteImage = async (name, patient) => {
    try {
        const result = await ConfirmAlert("¿Estás seguro de eliminar esta imagen?", "", "Eliminar", "Cancelar");
        if (result.isConfirmed) {

            if (!patient[name]) {
                console.error("No hay imagen asociada a este paciente para eliminar.");
                return;
            }

            //Convierte los segmentos de string separados por / en un array y toma el ultimo, que es el nombre del archivo jpg
            const filePath = patient[name].split("/").pop();

            //Convierte los %20 en espacios
            const decodedFilePath = decodeURIComponent(filePath);

            // Elimina la imagen del bucket de Supabase
            const {
                data,
            } = await supabase.storage
                .from(
                    bucketName
                )
                .remove([`products/${decodedFilePath}`]);

            console.log("Imagen eliminada con éxito:", data);

            // Actualiza el paciente eliminando el campo de la imagen
            const updatedPatient = {
                ...patient,
                [name]: ""
            };
            await partialUpdatePatientRecord(updatedPatient, patient.id)
                .then((response) => console.log(response))
                .catch((error) => console.log(error));
        }
    } catch (error) {
        console.error("Error al eliminar la imagen:", error);
    }
};

//DELETE: eliminar imagenes de bucket en paciente
export const borrarImagen = async (publicUrl) => {
    // URL pública de ejemplo

    try {
        if (!publicUrl) {
            throw new Error("La URL de la imagen no es válida o está vacía.");
        }

        // Extraer la ruta relativa desde la URL pública
        const bucketPath = publicUrl.replace(
            publicBucketUrl,
            ''
        );
        const decodedFilePath = decodeURIComponent(bucketPath);
        console.log(bucketPath);
        const {
            data,
            error
        } = await supabase.storage
            .from(
                bucketName
            )
            .remove([decodedFilePath]); // Pasa la ruta relativa como un array

        if (error) {
            throw new Error(`Error de Supabase: ${error.message}`);
        }

        console.log("Imagen eliminada con éxito:", data);
    } catch (error) {
        console.error("Error al eliminar la imagen:", error.message);
    }
};

//PUT: upload imagenes a bucket
export const uploadImages = async (file, name, patient) => {
    try {
        // Define la ruta en el bucket
        const fileName = `products/${name}_${patient.dnipaciente}_${patient.nombreyapellidopaciente}.jpg`;

        // Sube el archivo a Supabase
        await supabase.storage
            .from(bucketName)
            .upload(fileName, file, {
                cacheControl: "3600",
                upsert: false,
            });

        // Obtiene la URL pública del archivo subido
        const {
            data: publicData,
        } = supabase.storage
            .from(bucketName)
            .getPublicUrl(fileName);



        // Ejecuta la función de actualizar paciente
        if (publicData.publicUrl) {

            //Reemplaza %20 por un espacio
            const decodedUrl = decodeURIComponent(publicData.publicUrl);
            const updatedPatient = {
                ...patient,
                [name]: decodedUrl
            };
            console.log(updatedPatient);
            await partialUpdatePatientRecord(updatedPatient, patient.id);
        }
    } catch (error) {
        console.error("Error al manejar la carga de la imagen:", error);
    }
};

//DownLoad: imagenes
export const downloadImage = (publicUrl) => {
    const updatedSrc = `${publicUrl}?timestamp=${new Date().getTime()}`;
    const decodedUrl = decodeURIComponent(updatedSrc);
    const link = document.createElement("a");
    link.href = decodedUrl;

    // Especifica el nombre del archivo de descarga (nombre original de la imagen)
    const fileName = decodedUrl.split('/').pop();
    link.download = fileName; // El atributo 'download' debe contener el nombre del archivo

    link.target = "_blank"

    // Simula un clic en el enlace para iniciar la descarga

    document.body.appendChild(link); // Agrega el enlace al DOM
    link.click(); // Dispara el evento de clic
    document.body.removeChild(link); // Elimina el enlace después de la descarga
}