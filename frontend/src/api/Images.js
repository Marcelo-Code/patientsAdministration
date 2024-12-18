import {
    supabase,
    bucketName,
    publicBucketUrl
} from "./supabaseClient";
import {
    ConfirmAlert
} from "../components/common/alerts/alerts";
import {
    partialUpdatePatientRecord
} from "./patients";


//DELETE: Imagenes
//----------------
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


//PUT: Imagenes
//-------------

export const uploadImages = async (file, name, patient) => {

    try {
        // Define la ruta en el bucket
        const fileName = `products/${name}_${patient.dnipaciente}_${patient.nombreyapellidopaciente}.jpg`;

        console.log(fileName);

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
            await partialUpdatePatientRecord(updatedPatient, patient.id);
        }
    } catch (error) {
        console.error("Error al manejar la carga de la imagen:", error);
    }
};


//DownLoad: imagenes
//------------------

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