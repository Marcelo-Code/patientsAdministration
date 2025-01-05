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


export const delayAlert = (timerInterval) => {
    Swal.fire({
        title: "Auto close alert!",
        html: "I will close in <b></b> milliseconds.",
        timer: timerInterval,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
        }
    });
}