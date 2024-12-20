import axios from 'axios';
import {
    ConfirmAlert,
    ErrorAlert,
    SuccessAlert,
    WarningAlert
} from '../components/common/alerts/alerts';
import {
    BACKEND_URL
} from './config';
import {
    bucketName,
    supabase
} from './supabaseClient';

export const uploadCudBillingDocumentToBucket = async (fileName, record, name, setIsloading) => {
    if (record[name] !== "") {
        WarningAlert("Debe eliminarse el documento antes de subir otro")
    } else {
        try {
            // Crear un input de archivo dinámicamente
            const input = document.createElement("input");
            input.type = "file";
            input.accept = ".jpg,.jpeg,.png,.pdf,.doc,.docx";


            // Promesa para manejar la selección de archivo
            const file = await new Promise((resolve, reject) => {

                input.onchange = (event) => {
                    const selectedFile = event.target.files[0];
                    console.log(event);
                    console.log(selectedFile);
                    if (selectedFile !== undefined) {
                        resolve(selectedFile);
                        setIsloading(true);
                    } else {
                        reject(new Error("No se seleccionó ningún archivo."));
                    }
                };
                input.click();
            }).catch(() => {
                return null
            })

            if (!file) {
                console.log("no hay nada")
            }

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

            await partialUpdateCudBillingRecord(updatedRecord, record.id);
            console.log("Registro actualizado correctamente:", updatedRecord);

            return Promise.resolve({
                success: true,
                message: "Archivo subido correctamente",
            });
        } catch (error) {
            console.error("Error durante el proceso de selección y subida del archivo:", error);
            return Promise.reject(error);
        }
    }
};

export const uploadNoCudBillingDocumentToBucket = async (fileName, record, name, setIsloading) => {
    if (record[name] !== "") {
        WarningAlert("Debe eliminarse el documento antes de subir otro")
    } else {
        try {
            // Crear un input de archivo dinámicamente
            const input = document.createElement("input");
            input.type = "file";
            input.accept = ".jpg,.jpeg,.png,.pdf,.doc,.docx";


            // Promesa para manejar la selección de archivo
            const file = await new Promise((resolve, reject) => {

                input.onchange = (event) => {
                    const selectedFile = event.target.files[0];
                    console.log(event);
                    console.log(selectedFile);
                    if (selectedFile !== undefined) {
                        resolve(selectedFile);
                        setIsloading(true);
                    } else {
                        reject(new Error("No se seleccionó ningún archivo."));
                    }
                };
                input.click();
            }).catch(() => {
                return null
            })

            if (!file) {
                console.log("no hay nada")
            }

            // Procesar el archivo seleccionado
            const fileFormat = file.name.split(".").pop();
            const filePath = `noCudBillingDocuments/${fileName}.${fileFormat}`;

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

            await partialUpdateNoCudBillingRecord(updatedRecord, record.id);
            console.log("Registro actualizado correctamente:", updatedRecord);

            return Promise.resolve({
                success: true,
                message: "Archivo subido correctamente",
            });
        } catch (error) {
            console.error("Error durante el proceso de selección y subida del archivo:", error);
            return Promise.reject(error);
        }
    }
};

//PATCH: facturación CUD
//----------------------

export const partialUpdateCudBillingRecord = async (cudBillingRecord, cudBillingRecordId) => {
    const response = await axios.patch(`${BACKEND_URL}/partialUpdateCudBillingRecord/${cudBillingRecordId}`, cudBillingRecord)
    try {
        SuccessAlert("Registro modificado!");
        return response.data;
    } catch (error) {
        ErrorAlert("¡Error al modificar registro!");
        console.log("Error al modificar registro: ", error.response ? error.response.data : error.message);
        throw error;
    }
}

//PATCH: facturación no CUD
//-------------------------

export const partialUpdateNoCudBillingRecord = async (noCudBillingRecord, noCudBillingRecordId) => {
    const response = await axios.patch(`${BACKEND_URL}/partialUpdateNoCudBillingRecord/${noCudBillingRecordId}`, noCudBillingRecord)
    try {
        SuccessAlert("Registro modificado!");
        return response.data;
    } catch (error) {
        ErrorAlert("¡Error al modificar registro!");
        console.log("Error al modificar registro: ", error.response ? error.response.data : error.message);
        throw error;
    }
}


//DELETE: documentos facturación no CUD
//-------------------------------------
export const DeleteNoCudBillingDocumentFromBucket = async (name, record) => {
    if (record[name] === "") {
        WarningAlert("¡No hay documento para eliminar!")
    } else {

        const result = await ConfirmAlert("¿Estás seguro de eliminar este documento?", "", "Eliminar", "Cancelar");
        if (result.isConfirmed) {
            try {
                console.log(record[name])
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
                    .remove([`noCudBillingDocuments/${decodedFilePath}`]);

                console.log("Imagen eliminada con éxito:", data);

                // Actualiza el paciente eliminando el campo de la imagen
                const updatedPatient = {
                    ...record,
                    [name]: ""
                };
                await partialUpdateNoCudBillingRecord(updatedPatient, record.id)
                    .then((response) => console.log(response))
                    .catch((error) => console.log(error));
            } catch (error) {
                console.error("Error al eliminar la imagen:", error);
            }
        }
    }
};


//DELETE: documentos facturación CUD
//----------------------------------
export const DeleteFileFromBucket = async (name, record, folderName) => {
    if (record[name] === "") {
        WarningAlert("¡No hay documento para eliminar!")
    } else {

        const result = await ConfirmAlert("¿Estás seguro de eliminar este documento?", "", "Eliminar", "Cancelar");
        if (result.isConfirmed) {
            try {
                console.log(record[name])
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
                    .remove([`${folderName}/${decodedFilePath}`]);

                console.log("Imagen eliminada con éxito:", data);

                // Actualiza el paciente eliminando el campo de la imagen
                const updatedPatient = {
                    ...record,
                    [name]: ""
                };
                await partialUpdateCudBillingRecord(updatedPatient, record.id)
                    .then((response) => console.log(response))
                    .catch((error) => console.log(error));
            } catch (error) {
                console.error("Error al eliminar la imagen:", error);
            }
        }
    }
};

export const deleteFileAfterRecordFromBucket = async (url, folderName) => {
    try {
        if (!url) {
            throw new Error("La URL de la imagen no es válida o está vacía.");
        }

        // Extraer la ruta relativa desde la URL pública
        const bucketPath = url.split(`${folderName}/`)[1];
        if (!bucketPath) {
            throw new Error("No se pudo extraer la ruta del archivo del URL.");
        }

        const decodedFilePath = decodeURIComponent(bucketPath);
        console.log("Ruta decodificada:", decodedFilePath);

        // Eliminar el archivo del bucket
        const {
            data,
            error
        } = await supabase.storage
            .from(bucketName)
            .remove([`${folderName}/${decodedFilePath}`]);

        if (error) {
            throw new Error(`Error de Supabase: ${error.message}`);
        }

        console.log("Imagen eliminada con éxito:", data);
    } catch (error) {
        console.error("Error al eliminar la imagen:", error.message);
    }
}