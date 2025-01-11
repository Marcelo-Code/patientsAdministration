import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../../context/GeneralContext";

import { Spinner } from "../../../common/spinner/Spinner";
import { UsersList } from "./UsersList";
import {
  getUserRecord,
  getUsersRecords,
  updateUserRecord,
} from "../../../../api/usuarios/users";
import { WarningAlert } from "../../../common/alerts/alerts";

export const UsersListContainer = () => {
  const { handleGoBack, setPageIsLoading, cancelTableAction } =
    useContext(GeneralContext);
  const [usersRecords, setUsersRecords] = useState(null);
  const [editModeFields, setEditModeFields] = useState(null);
  const [modifiedFlag, setModifiedFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  const initialModifiedState = {
    perfil: false,
    nombreyapellidousuario: false,
    idprofesional: false,
    usuario: false,
    dni: false,
    email: false,
    password: false,
    passwordrepeat: false,
    fechacreacion: false,
  };
  const [modifiedRecord, setModifiedRecord] = useState(initialModifiedState);

  const userRecordInitialState = {
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
  const [userRecord, setUserRecord] = useState(userRecordInitialState);

  useEffect(() => {
    setPageIsLoading(true);
  }, [setPageIsLoading]);

  useEffect(() => {
    getUsersRecords()
      .then((response) => {
        setUsersRecords(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [updateList, setPageIsLoading]);

  if (!usersRecords) return <Spinner />;

  const handleEditModeChange = (e) => {
    setEditMode(e.target.checked);
    !editMode && setModifiedRecord(initialModifiedState);
    editMode && setEditModeFields(null);
  };

  const handleEditModeField = (id) => {
    setEditModeFields(id);
    setIsLoading(true);
    // console.log(id);
    getUserRecord(id)
      .then((response) => {
        setUserRecord(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedUserRecord = { ...userRecord, [name]: value };
    if (updatedUserRecord.password === updatedUserRecord.passwordrepeat) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
    setUserRecord(updatedUserRecord);
    setModifiedRecord({ ...modifiedRecord, [name]: true });
    if (!modifiedFlag) setModifiedFlag(true);
  };

  const handleSubmit = (idUserRecord) => {
    if (passwordMatch) {
      setIsLoading(true);
      updateUserRecord(userRecord, idUserRecord)
        .then((response) => {
          // console.log(response);
          setEditModeFields(null);
          setIsLoading(false);
          setUpdateList(!updateList);
          setModifiedRecord(initialModifiedState);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    } else {
      WarningAlert("verificar password");
    }
  };

  const usersListProps = {
    handleGoBack,
    setPageIsLoading,
    cancelTableAction,
    editModeFields,
    isLoading,
    handleEditModeChange,
    handleEditModeField,
    handleChange,
    handleSubmit,
    editMode,
    usersRecords,
    updateList,
    setUpdateList,
    setEditModeFields,
    modifiedRecord,
    setModifiedRecord,
    initialModifiedState,
    userRecord,
    passwordMatch,
  };

  return <UsersList {...usersListProps} />;
};
