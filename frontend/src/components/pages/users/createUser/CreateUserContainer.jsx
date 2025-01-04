import { useContext, useState } from "react";
import { GeneralContext } from "../../../../context/GeneralContext";
import dayjs from "dayjs";
import { createUser } from "../../../../api/users";
import { CreateUser } from "./createUser";

export const CreateUserContainer = () => {
  const { cancelAction, goBackAction, isLoading, setIsLoading } =
    useContext(GeneralContext);

  //hook para guardar los datos del nuevo paciente

  const initialState = {
    usuario: "",
    nombreyapellidousuario: "",
    dni: "",
    password: "",
    email: "",
    rol: "",
    fechacreacion: "",
  };

  const [userRecord, setUserRecord] = useState(initialState);

  //hooks para detectar los cambios

  const [modifiedFlag, setModifiedFlag] = useState(false);

  //Función para guardar los cambios en el registro

  const handleChange = (e) => {
    const { value, name } = e.target;
    const updateUserRecord = { ...userRecord, [name]: value };
    console.log(updateUserRecord);
    setUserRecord(updateUserRecord);
    if (!modifiedFlag) setModifiedFlag(true);
  };

  //Función para llamar a la función POST

  const handleSubmit = () => {
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
  };

  const createUserProps = {
    handleChange,
    userRecord,
    handleSubmit,
    isLoading,
    modifiedFlag,
    cancelAction,
    goBackAction,
  };
  return (
    <>
      <CreateUser {...createUserProps} />
    </>
  );
};
