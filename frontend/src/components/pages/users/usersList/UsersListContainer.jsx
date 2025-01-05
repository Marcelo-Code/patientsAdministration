import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../../context/GeneralContext";
import {
  getUserRecord,
  getUsersRecords,
  updateUserRecord,
} from "../../../../api/users";
import { Spinner } from "../../../common/spinner/Spinner";
import { UsersList } from "./UsersList";

export const UsersListContainer = () => {
  const { handleGoBack, setPageIsLoading, cancelTableAction } =
    useContext(GeneralContext);
  const [usersRecords, setUsersRecords] = useState(null);
  const [editModeFields, setEditModeFields] = useState(null);
  const [modifiedFlag, setModifiedFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [updateList, setUpdateList] = useState(false);

  const initialModifiedState = {
    usuario: false,
    nombreyapellidousuario: false,
    dni: false,
    password: false,
    email: false,
    rol: false,
    fechacreacion: false,
  };
  const [modifiedRecord, setModifiedRecord] = useState(initialModifiedState);

  const userRecordInitialState = {
    usuario: "",
    nombreyapellidousuario: "",
    dni: "",
    password: "",
    email: "",
    rol: "",
    fechacreacion: "",
  };
  const [userRecord, setUserRecord] = useState(userRecordInitialState);

  useEffect(() => {
    setPageIsLoading(true);
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
    setUserRecord(updatedUserRecord);
    setModifiedRecord({ ...modifiedRecord, [name]: true });
    if (!modifiedFlag) setModifiedFlag(true);
  };

  const handleSubmit = (idUserRecord) => {
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
  };

  return <UsersList {...usersListProps} />;
};
