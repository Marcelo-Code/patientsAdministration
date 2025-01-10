/* eslint-disable react/prop-types */
// UploadImages.jsx

import { useDropzone } from "react-dropzone";
import { uploadImages } from "../../../api/pacientes/patients";

export const UploadContainer = ({
  name,
  patient,
  setUpdateList,
  setUploadDocumentation,
  initialStateUploadDocumentation,
  setIsLoading,
}) => {
  // Función para manejar la carga del archivo
  const onDrop = async (acceptedFiles) => {
    // Toma el primer archivo seleccionado
    const file = acceptedFiles[0];

    setIsLoading(true);

    // Llama a la función lógica para subir la imagen
    uploadImages(file, name, patient)
      .then((response) => {
        console.log(response);
        setUpdateList((prevState) => !prevState);
        setUploadDocumentation(initialStateUploadDocumentation);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // Usamos el hook de react-dropzone para manejar la selección de archivos
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    validator: (file) => {
      const validExtensions = ["jpg", "jpeg", "png", "gif"];
      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (!validExtensions.includes(fileExtension)) {
        return {
          code: "file-invalid-type",
          message: "Extensión de archivo no válida",
        };
      }
      return null;
    },
  });

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
          width: "290px",
          height: "140px",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        <p>
          Arrastrá y soltá una imagen o hacé clic para seleccionar un archivo
        </p>
      </div>
    </div>
  );
};
