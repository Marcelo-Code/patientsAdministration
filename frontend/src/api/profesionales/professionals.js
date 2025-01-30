import axios from "axios";
import { BACKEND_URL, bucketName, supabase } from "../config";
import {
  ConfirmAlert,
  ErrorAlert,
  SuccessAlert,
  WarningAlert,
} from "../../components/common/alerts/alerts";
import { documentData } from "../../components/pages/professionals/activeProfessionals/professionalDocumentation/DocumentData";
import { borrarImagen } from "../pacientes/patients";
import { deleteUserRecord, getUsersRecords } from "../usuarios/users";
import { sanitizeFileName } from "../../components/common/sanitizeFileName";

//GET: lista de profesionales
export const getProfessionalsRecords = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/getProfessionalsRecords`);
    return response.data;
  } catch (error) {
    ErrorAlert("¡Error al buscar profesionales!");
    console.log("Error al buscar profesionales: ", error.message);
  }
};

//GET: profesional por id
export const getProfessionalRecord = async (professionalId) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/getProfessionalRecord/${professionalId}`
    );
    return response.data;
  } catch (error) {
    ErrorAlert("¡Error al buscar profesional!");
    console.log("Error al buscar profesional: ", error.message);
  }
};

//POST: crear profesional
export const createProfessionalRecord = async (newProfessional) => {
  console.log("Creando profesional...");
  console.log(newProfessional);
  try {
    const response = await axios.post(
      `${BACKEND_URL}/createProfessionalRecord`,
      newProfessional
    );
    console.log("Profesional creado: ", response.data);
    SuccessAlert(
      `Profesional ${newProfessional.nombreyapellidoprofesional} creado`
    );
    window.history.back();
    return response.data;
  } catch (error) {
    ErrorAlert("¡Error al crear profesional!");
    console.log("Error al crear profesional: ", error.message);
  }
};

//DELETE: eliminar profesional
export const deleteProfessionalRecord = async (
  professionalId,
  professionalName
) => {
  console.log(professionalId);
  console.log(typeof professionalId);
  try {
    const result = await ConfirmAlert(
      "¿Estás seguro de eliminar este profesional?",
      `Vas a eliminar a ${professionalName}`,
      "Eliminar",
      "Cancelar"
    );
    if (result.isConfirmed) {
      getProfessionalRecord(professionalId)
        .then((response) => {
          documentData.map((document) => {
            if (response[document.name] !== "")
              borrarImagen(response[document.name])
                .then((response) => console.log(response))
                .catch((error) => console.log(error));
          });
        })
        .catch((error) => console.log(error));
      const response = await axios.delete(
        `${BACKEND_URL}/deleteProfessionalRecord/${professionalId}`
      );
      SuccessAlert("¡Profesional eliminado!");
      return response.data;
    }
  } catch (error) {
    ErrorAlert("¡Error al eliminar profesional!");
    console.log("Error al eliminar profesional: ", error.message);
    throw error;
  }
};

//PUT: update profesional
export const updateProfessionalRecord = async (professional, profesionalId) => {
  try {
    const result = await ConfirmAlert(
      "¿Estás seguro de modificar este profesional?",
      "",
      "Modificar",
      "Cancelar"
    );
    if (result.isConfirmed) {
      const response = await axios.put(
        `${BACKEND_URL}/updateProfessionalRecord/${profesionalId}`,
        professional
      );
      SuccessAlert("¡Profesional modificado!");
      window.history.back();
      return response.data;
    }
  } catch (error) {
    ErrorAlert("¡Error al modificar profesional!");
    console.log(
      "Error al modificar profesional: ",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

//PATCH: update profesional
export const partialUpdateProfessionalRecord = async (
  professionalRecord,
  professionalRecordId
) => {
  const response = await axios.patch(
    `${BACKEND_URL}/partialUpdateProfessionalRecord/${professionalRecordId}`,
    professionalRecord
  );
  try {
    SuccessAlert("¡Profesional modificado!");
    return response.data;
  } catch (error) {
    ErrorAlert("¡Error al modificar profesional!");
    console.log(
      "Error al modificar profesional: ",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

//PATCH: soft undelete profesional
export const softUnDeleteProfessionalRecord = async (
  professionalId,
  professionalName
) => {
  const result = await ConfirmAlert(
    "¿Estás seguro de activar este profesional?",
    `Vas a activar a ${professionalName}`,
    "Activar",
    "Cancelar"
  );
  if (result.isConfirmed) {
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/softUnDeleteProfessionalRecord/${professionalId}`
      );
      SuccessAlert("Profesional activo");
      return response.data;
    } catch (error) {
      ErrorAlert("Error al activar profesional");
      console.log(error);
    }
  }
};
//PATCH: soft delete profesional
export const softDeleteProfessionalRecord = async (
  professionalId,
  professionalName
) => {
  const result = await ConfirmAlert(
    "¿Estás seguro de inactivar este profesional?",
    `Vas a eliminar a ${professionalName}`,
    "Eliminar",
    "Cancelar"
  );
  if (result.isConfirmed) {
    try {
      console.log("eliminar profesional");
      //Busca lista de usuarios
      getUsersRecords()
        .then((response) => {
          console.log(response);
          console.log(professionalId);
          //En caso de encontrar el usuario del profesional lo elimina
          if (
            response.some(
              (record) => parseInt(record.idprofesional) === professionalId
            )
          ) {
            const foundUser = response.find(
              (record) => parseInt(record.idprofesional) === professionalId
            );
            console.log(foundUser);
            deleteUserRecord(foundUser.id, "", true)
              .then((response) => console.log(response))
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => console.log(error));
      const response = await axios.patch(
        `${BACKEND_URL}/softDeleteProfessionalRecord/${professionalId}`
      );
      SuccessAlert("Profesional inactivo");
      return response.data;
    } catch (error) {
      ErrorAlert("Error al inactivar profesional");
      console.log(error);
    }
  }
};

//********** DOCUMENTACIÓN EN BUCKET **********

//PUT: upload documentación profesional a bucket
export const uploadProfessionalDocumentToBucket = async (
  fileName,
  record,
  name,
  setIsLoadingDocument
) => {
  if (record[name]) {
    WarningAlert("Debe eliminarse el documento antes de subir otro");
    return;
  }
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
          setIsLoadingDocument(name);
        } else {
          reject(new Error("No se seleccionó ningún archivo."));
        }
      };
      input.click();
    }).catch(() => {
      return null;
    });

    if (!file) {
      console.log("no hay nada");
    }

    // Procesar el archivo seleccionado
    const fileFormat = sanitizeFileName(file.name.split(".").pop());

    const filePath = `professionalsDocuments/${fileName}.${fileFormat}`;

    console.log("Ruta del archivo:", filePath);

    // Subir archivo al bucket
    const { data, error } = await supabase.storage
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
    const { data: publicData } = supabase.storage
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
      [name]: decodedUrl,
    };

    await partialUpdateProfessionalRecord(updatedRecord, record.id);
    console.log("Registro actualizado correctamente:", updatedRecord);

    return Promise.resolve({
      success: true,
      message: "Archivo subido correctamente",
    });
  } catch (error) {
    console.error(
      "Error durante el proceso de selección y subida del archivo:",
      error
    );
    return Promise.reject(error);
  }
};

//DELETE: documentación profesional desde bucket
export const DeleteProfessionalDocumentFromBucket = async (
  name,
  record,
  folderName
) => {
  if (record[name] === "") {
    WarningAlert("¡No hay documento para eliminar!");
  } else {
    const result = await ConfirmAlert(
      "¿Estás seguro de eliminar este documento?",
      "",
      "Eliminar",
      "Cancelar"
    );
    if (result.isConfirmed) {
      try {
        console.log(record[name]);
        if (!record[name]) {
          console.error("No hay documento para eliminar.");
          return;
        }
        //Convierte los segmentos de string separados por / en un array y toma el ultimo, que es el nombre del archivo jpg
        const filePath = record[name].split("/").pop();

        //Convierte los %20 en espacios
        const decodedFilePath = decodeURIComponent(filePath);

        // Elimina la imagen del bucket de Supabase
        const { data } = await supabase.storage
          .from(bucketName)
          .remove([`${folderName}/${decodedFilePath}`]);

        console.log("Imagen eliminada con éxito:", data);

        // Actualiza el paciente eliminando el campo de la imagen
        const updatedPatient = {
          ...record,
          [name]: "",
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
