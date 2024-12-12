import axios from 'axios';
import {
    ConfirmAlert,
    ErrorAlert,
    SuccessAlert
} from '../components/common/alerts/alerts';
import {
    BACKEND_URL
} from './config';
import {
    bucketName,
    supabase
} from './supabaseClient';

//POST: documentos facturación CUD
//--------------------------------

const uploadFileToBucket = async (file, filePath, record, name) => {

    // const fileFormat = file.type.split('/').pop();
    const fileFormat = file.name.split('.').pop();

    console.log(fileFormat);

    const fileName = `${filePath}.${fileFormat}`;
    console.log(fileName);
    try {
        const {
            data,
            error
        } = await supabase.storage
            .from(bucketName)
            .upload(fileName, file, {
                contentType: file.type, // Tipo MIME del archivo
                cacheControl: "3600", // Tiempo de caché en segundos
                upsert: false, // Permitir sobrescribir archivos existentes
            });
        if (error) {
            throw new Error(`Error subiendo archivo: ${error.message}`);
        }
        console.log('Archivo subido exitosamente:', data);

        //Obtener url del archivo
        const {
            data: publicData,
        } = supabase.storage
            .from(bucketName)
            .getPublicUrl(fileName);

        console.log(publicData.publicUrl);

        console.log(data.path);

        if (publicData.publicUrl) {
            const decodedUrl = decodeURIComponent(publicData.publicUrl);
            const updatedRecord = {
                ...record,
                [name]: decodedUrl
            };

            console.log(decodedUrl);

            partialUpdateCudBilling(updatedRecord, record.id)
                .then((response) => console.log(response))
                .catch((error) => console.log(error))
        }
    } catch (error) {
        console.error('Error al subir archivo:', error);
        throw error;
    }
};

export const handleFileSelectionAndUpload = async (fileName, record, name) => {
    try {
        // Crear un input de archivo dinámicamente
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".jpg,.jpeg,.png,.pdf,.doc,.docx";

        // Promesa para manejar la selección de archivo
        const file = await new Promise((resolve, reject) => {
            input.onchange = (event) => {
                const selectedFile = event.target.files[0];
                if (selectedFile) {
                    resolve(selectedFile);
                } else {
                    reject(new Error("No se seleccionó ningún archivo."));
                }
            };
            input.click();
        });

        // Procesar el archivo seleccionado
        const fileFormat = file.name.split(".").pop();
        const filePath = `cudBillingDocuments/${fileName}.${fileFormat}`;

        console.log("Ruta del archivo:", filePath);

        // Subir archivo al bucket
        const {
            data,
            error
        } = await supabase.storage
            .from(bucketName)
            .upload(filePath, file, {
                contentType: file.type,
                cacheControl: "3600",
                upsert: false,
            });

        if (error) {
            throw new Error(`Error subiendo archivo: ${error.message}`);
        }

        console.log("Archivo subido exitosamente:", data);

        // Obtener URL pública del archivo
        const {
            data: publicData
        } = supabase.storage
            .from(bucketName)
            .getPublicUrl(filePath);

        const publicUrl = publicData && publicData.publicUrl;
        if (!publicUrl) {
            throw new Error("No se pudo obtener la URL pública del archivo.");
        }

        const decodedUrl = decodeURIComponent(publicUrl);
        console.log("URL pública del archivo:", decodedUrl);

        // Actualizar registro con la URL del archivo
        const updatedRecord = {
            ...record,
            [name]: decodedUrl
        };

        await partialUpdateCudBilling(updatedRecord, record.id);
        console.log("Registro actualizado correctamente:", updatedRecord);

    } catch (error) {
        console.error("Error durante el proceso de selección y subida del archivo:", error);
        throw error;
    }
};

//PATCH: facturación CUD
//----------------------

export const partialUpdateCudBilling = async (cudBillingRecord, cudBillingRecordId) => {
    const response = await axios.patch(`${BACKEND_URL}/partialUpdateCudBilling/${cudBillingRecordId}`, cudBillingRecord)
    try {
        SuccessAlert("Registro modificado!");
        return response.data;
    } catch (error) {
        ErrorAlert("¡Error al modificar registro!");
        console.log("Error al modificar registro: ", error.response ? error.response.data : error.message);
        throw error;
    }
}


//DELETE: documentos facturación CUD
//----------------------------------
export const DeleteFileFromBucket = async (name, record) => {
    try {
        console.log(record[name])
        const result = await ConfirmAlert("¿Estás seguro de eliminar este documento?", "", "Eliminar", "Cancelar");
        if (result.isConfirmed) {

            if (!record[name]) {
                console.error("No hay documento para eliminar.");
                return;
            }



            //Convierte los segmentos de string separados por / en un array y toma el ultimo, que es el nombre del archivo jpg
            const filePath = record[name].split("/").pop();

            //Convierte los %20 en espacios
            const decodedFilePath = decodeURIComponent(filePath);

            // Elimina la imagen del bucket de Supabase
            const {
                data,
            } = await supabase.storage
                .from(
                    bucketName
                )
                .remove([`cudBillingDocuments/${decodedFilePath}`]);

            console.log("Imagen eliminada con éxito:", data);

            // Actualiza el paciente eliminando el campo de la imagen
            const updatedPatient = {
                ...record,
                [name]: ""
            };
            await partialUpdateCudBilling(updatedPatient, record.id)
                .then((response) => console.log(response))
                .catch((error) => console.log(error));
        }
    } catch (error) {
        console.error("Error al eliminar la imagen:", error);
    }
};