import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../../context/GeneralContext";
import dayjs from "dayjs";

import { Spinner } from "../../../common/spinner/Spinner";
import { usersTypeRecords } from "../usersType";
import {
  getProfessionalRecord,
  getProfessionalsRecords,
} from "../../../../api/profesionales/professionals";
import {
  checkUser,
  createUser,
  getUsersRecords,
} from "../../../../api/usuarios/users";
import { WarningAlert } from "../../../common/alerts/alerts";
import { CreateUser } from "./CreateUserTemp";

export const CreateUserContainer = () => {
  const {
    cancelAction,
    goBackAction,
    isLoading,
    setIsLoading,
    createList,
    setPageIsLoading,
  } = useContext(GeneralContext);

  //hook para guardar los datos del nuevo paciente

  const initialState = {
    perfil: "",
    nombreyapellidousuario: "",
    idprofesional: "",
    usuario: "",
    dni: "",
    email: "",
    password: "",
    passwordrepeat: "",
    fechacreacion: "",
  };

  const [userRecord, setUserRecord] = useState(initialState);
  const [usersRecords, setUsersRecords] = useState(null);
  const [professionalsRecords, setProfessionalsRecords] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [userMatch, setUserMatch] = useState(false);

  //Validación del formulario

  const [errors, setErrors] = useState({});

  const validateForm = (userRecord) => {
    const newErrors = {};

    const requiredFields = ["perfil", "usuario", "dni", "email", "password"];

    // Validar campos requeridos generales
    requiredFields.forEach((field) => {
      if (!userRecord[field] || userRecord[field].toString().trim() === "") {
        newErrors[field] = `${field} es obligatorio`;
      }
    });

    // Validar nombreyapellidousuario si el perfil es "admin"
    if (
      userRecord.perfil === "admin" &&
      (!userRecord.nombreyapellidousuario ||
        userRecord.nombreyapellidousuario.toString().trim() === "")
    ) {
      newErrors.nombreyapellidousuario =
        "Nombre y Apellido Usuario es obligatorio para perfil admin";
    }

    // Validar idprofesional si el perfil es "profesional"
    if (
      userRecord.perfil === "profesional" &&
      (!userRecord.idprofesional ||
        userRecord.idprofesional.toString().trim() === "")
    ) {
      newErrors.idprofesional =
        "ID Profesional es obligatorio para perfil profesional";
    }

    return newErrors; // Asegúrate de retornar siempre el objeto newErrors
  };

  //hooks para detectar los cambios

  const [modifiedFlag, setModifiedFlag] = useState(false);

  //Función para guardar los cambios en el registro

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUserRecord((prevState) => {
      const updatedUserRecord = { ...prevState, [name]: value };

      // Si el usuario es "admin", se borra el idprofesional
      if (name === "perfil" && value === "admin") {
        updatedUserRecord.idprofesional = "";
      }
      if (name === "idprofesional") {
        getProfessionalRecord(value)
          .then(
            (response) =>
              (updatedUserRecord.nombreyapellidousuario =
                response.nombreyapellidoprofesional)
          )
          .catch((error) => console.log(error));
      }
      if (name === "usuario") {
        if (usersRecords.some((record) => record.usuario === value)) {
          setUserMatch(true);
        } else {
          setUserMatch(false);
        }
      }
      if (updatedUserRecord.password === updatedUserRecord.passwordrepeat)
        setPasswordMatch(true);
      else setPasswordMatch(false);
      return updatedUserRecord;
    });
  };

  //Función para llamar a la función POST

  const handleSubmit = () => {
    const validationErrors = validateForm(userRecord);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Asumiendo que setErrors actualiza el estado de los errores
      console.log(validationErrors);
      WarningAlert("Verificar los campos incompletos ❌");
      return;
    }
    if (userMatch) {
      WarningAlert("Usuario no disponible");
      return;
    }
    if (!passwordMatch) {
      WarningAlert("verificar password");
      return;
    }
    const today = dayjs().format("YYYY-MM-DD");
    const updatedUserRecord = { ...userRecord, fechacreacion: today };
    setIsLoading(true);
    console.log(updatedUserRecord);
    createUser(updatedUserRecord)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        goBackAction();
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setPageIsLoading(true);
  }, [setPageIsLoading]);

  useEffect(() => {
    getProfessionalsRecords()
      .then((response) => setProfessionalsRecords(response))
      .catch((error) => console.log(error));
    getUsersRecords()
      .then((response) => setUsersRecords(response))
      .catch((error) => console.log(error));
  }, []);

  if (!professionalsRecords || !usersRecords) return <Spinner />;

  const professionalsList = createList(
    professionalsRecords,
    "nombreyapellidoprofesional",
    "id",
    false
  );

  const usersTypeList = createList(usersTypeRecords, "name", "name", false);

  const professionalsProps = {
    handleChange: handleChange,
    name: "idprofesional",
    array: professionalsList,
    initialValue: "Selecc. Profesional",
  };

  const usersTypeProps = {
    handleChange: handleChange,
    name: "perfil",
    array: usersTypeList,
    initialValue: "Selecc. Perfil",
  };

  const createUserProps = {
    handleChange,
    userRecord,
    handleSubmit,
    isLoading,
    modifiedFlag,
    cancelAction,
    goBackAction,
    professionalsProps,
    usersTypeProps,
    passwordMatch,
    userMatch,
    setPageIsLoading,
    errors,
  };
  return (
    <>
      <CreateUser {...createUserProps} />
    </>
  );
};
