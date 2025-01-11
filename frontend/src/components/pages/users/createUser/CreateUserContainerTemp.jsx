import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../../context/GeneralContext";
import dayjs from "dayjs";

import { Spinner } from "../../../common/spinner/Spinner";
import { usersTypeRecords } from "../usersType";
import {
  getProfessionalRecord,
  getProfessionalsRecords,
} from "../../../../api/profesionales/professionals";
import { checkUser, createUser } from "../../../../api/usuarios/users";
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
  const [professionalsRecords, setProfessionalsRecords] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [userMatch, setUserMatch] = useState(false);

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
        checkUser(value)
          .then((response) => {
            if (response) setUserMatch(true);
            else setUserMatch(false);
          })
          .catch((error) => console.log(error));
      }
      if (updatedUserRecord.password === updatedUserRecord.passwordrepeat)
        setPasswordMatch(true);
      else setPasswordMatch(false);
      return updatedUserRecord;
    });
  };

  //Función para llamar a la función POST

  const handleSubmit = () => {
    if (!userMatch) {
      if (passwordMatch) {
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
      } else {
        WarningAlert("verificar password");
      }
    } else {
      WarningAlert("Usuario no disponible");
    }
  };

  useEffect(() => {
    setPageIsLoading(true);
  }, [setPageIsLoading]);

  useEffect(() => {
    getProfessionalsRecords()
      .then((response) => setProfessionalsRecords(response))
      .catch((error) => console.log(error));
  }, []);

  if (!professionalsRecords) return <Spinner />;

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
  };
  return (
    <>
      <CreateUser {...createUserProps} />
    </>
  );
};
