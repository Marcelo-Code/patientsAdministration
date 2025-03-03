import axios from "axios";
import {
    BACKEND_URL,
    bucketName,
    supabase
} from "../config";
import {
    ConfirmAlert,
    ErrorAlert,
    SuccessAlert,
    WarningAlert
} from "../../components/common/alerts/alerts";
import {
    deleteFileAfterRecordFromBucket
} from "../facturacionCud/cudBilling";

//GET: lista facturación no CUD
export const getNoCudBillingRecords = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getNoCudBillingRecords`)
        return (response.data);
    } catch (error) {
        ErrorAlert("¡Error al buscar registros!");
        console.log("Error al buscar registros: ", error.message);
    }
}

//GET: facturación no CUD por id
export const getNoCudBillingRecord = async (noCudBillingRecordId) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getNoCudBillingRecord/${noCudBillingRecordId}`)
        return (response.data);
    } catch (error) {
        ErrorAlert("¡Error al buscar registro!");
        console.log("Error al buscar registro: ", error.message);
    }
}

//POST: crear facturación no CUD
export const createNoCudBillingRecord = async function name(noCudNewBillingRecord) {
    console.log("Creando registro...")
    try {
        const response = await axios.post(`${BACKEND_URL}/createNoCudBillingRecord`, noCudNewBillingRecord);
        console.log("Registro creado: ", response.data)
        SuccessAlert("Registro creado");
        window.history.back();
        return (response.data);
    } catch (error) {
        ErrorAlert("¡Error al crear registro!")
        console.log("Error al crear registro: ", error.message)
        throw error
    }
}

//PUT: update facturación no CUD
export const updateNoCudBillingRecord = async (noCudbillingRecord, noCudbillingRecordId) => {
    try {
        const result = await ConfirmAlert("¿Estás seguro de modificar este registro?", "", "Modificar", "Cancelar");
        if (result.isConfirmed) {
            const response = await axios.put(`${BACKEND_URL}/updateNoCudBillingRecord/${noCudbillingRecordId}`, noCudbillingRecord);
            SuccessAlert("Registro modificado!");
            return (response.data);
        }
    } catch (error) {
        ErrorAlert("¡Error al modificar registro!");
        console.log("Error al modificar registro: ", error.response ? error.response.data : error.message);
        throw error;
    }
}

//DELETE: eliminar facturación no CUD
export const deleteNoCudBillingRecord = async (noCudBillingRecordId, documentData) => {
    try {
        const result = await ConfirmAlert("¿Estás seguro de eliminar esta facturación?", "", "Eliminar", "Cancelar")
        if (result.isConfirmed) {
            getNoCudBillingRecord(noCudBillingRecordId)
                .then((response) => {
                    documentData.map((document) => {
                        console.log(response[document]);
                        if (response[document] !== "") {
                            deleteFileAfterRecordFromBucket(response[document], "noCudBillingDocuments")
                                .then((response) => console.log(response))
                                .catch((error) => console.log(error))
                        }
                    })
                    console.log(response)
                })
                .catch((error) => console.log(error))
            await axios.delete(`${BACKEND_URL}/deleteNoCudBillingRecord/${noCudBillingRecordId}`);
            SuccessAlert("¡Facturación eliminada!");
        }
    } catch (error) {
        ErrorAlert("¡Error al eliminar facturación!")
        console.log("Error al eliminar facturación: ", error);
        throw error;
    }
}

//PATCH: facturación no CUD
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

//********** DOCUMENTACIÓN EN BUCKET **********

//PUT: upload documentación a bucket facturación no CUD
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

//DELETE: eliminar documentación no CUD de bucket
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