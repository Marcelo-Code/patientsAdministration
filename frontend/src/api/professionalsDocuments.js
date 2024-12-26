import {
    ConfirmAlert,
    WarningAlert
} from "../components/common/alerts/alerts";
import {
    partialUpdateProfessionalRecord
} from "./professionals";
import {
    bucketName,
    supabase
} from "./supabaseClient";

export const uploadProfessionalDocumentToBucket = async (fileName, record, name, setIsloading) => {
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
            const filePath = `professionalsDocuments/${fileName}.${fileFormat}`;

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

            await partialUpdateProfessionalRecord(updatedRecord, record.id);
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

//DELETE 
//------
export const DeleteProfessionalDocumentFromBucket = async (name, record, folderName) => {
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
                await partialUpdateProfessionalRecord(updatedPatient, record.id)
                    .then((response) => console.log(response))
                    .catch((error) => console.log(error));
            } catch (error) {
                console.error("Error al eliminar la imagen:", error);
            }
        }
    }
};