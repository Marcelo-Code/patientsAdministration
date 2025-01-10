import { useContext, useState } from "react";
import { GeneralContext } from "../../../context/GeneralContext";
import { PasswordResetRequest } from "./PasswordResetRequest";
import { recoverPassword } from "../../../api/usuarios/users";

export const PasswordResetRequestContainer = () => {
  const [email, setEmail] = useState("");
  const { handleGoBack } = useContext(GeneralContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedEmailRecord = { [name]: value };
    setEmail(updatedEmailRecord);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    recoverPassword(email)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  const passwordResetRequestProps = {
    email,
    setEmail,
    handleSubmit,
    handleGoBack,
    handleChange,
  };

  return <PasswordResetRequest {...passwordResetRequestProps} />;
};
