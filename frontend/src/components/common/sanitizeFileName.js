export const sanitizeFileName = (fileName) => {
  return fileName
    .normalize("NFD") // Elimina tildes
    .replace(/[\u0300-\u036f]/g, "") // Remueve diacríticos
    .replace(/[^a-zA-Z0-9.-]/g, "_") // Reemplaza espacios y caracteres no válidos
    .toLowerCase(); // Opcional: convertir todo a minúsculas
};
