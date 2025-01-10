import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../../context/GeneralContext";
import dayjs from "dayjs";

import { Spinner } from "../../../common/spinner/Spinner";
import { usersTypeRecords } from "../usersType";
import {
  getProfessionalRecord,
  getProfessionalsRecords,
} from "../../../../api/profesionales/professionals";
import { createUser } from "../../../../api/usuarios/users";
import { CreateUser } from "./CreateUserTemp";
import { WarningAlert } from "../../../common/alerts/alerts";

export const CreateUserContainer = () => {
  const { cancelAction, goBackAction, isLoading, setIsLoading, createList } =
    useContext(GeneralContext);

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
      console.log(updatedUserRecord);
      if (updatedUserRecord.password === updatedUserRecord.passwordrepeat)
        setPasswordMatch(true);
      else setPasswordMatch(false);
      return updatedUserRecord;
    });
  };

  //Función para llamar a la función POST

  const handleSubmit = () => {
    if (passwordMatch) {
      const today = dayjs().format("YYYY-MM-DD");
      const updateUserRecord = { ...userRecord, fechacreacion: today };
      setIsLoading(true);
      console.log(updateUserRecord);
      createUser(updateUserRecord)
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
  };

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
  };
  return (
    <>
      <CreateUser {...createUserProps} />
    </>
  );
};
