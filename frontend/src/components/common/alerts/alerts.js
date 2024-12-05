import Swal from "sweetalert2";

export const ConfirmAlert = async (title, text, confirmButtonText, cancelButtonText) => {
    const result = await Swal.fire({
        title: `${
            title
        }`,
        text: `${
            text
        }` || "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `${confirmButtonText}`,
        cancelButtonText: `${cancelButtonText}`,
    });
    return result
}

export const ErrorAlert = async (text) => {
    Swal.fire({
        icon: "error",
        title: "Ups...",
        text: `${
            text
        }`,
        showConfirmButton: true,
        confirmButtonText: "Aceptar"
    });
}

export const SuccessAlert = (text) => {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${text}`,
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
    });
}

export const WarningAlert = (text) => {
    return Swal.fire({
        title: "Aviso",
        text: `${text}`,
        icon: "info",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
    });
};