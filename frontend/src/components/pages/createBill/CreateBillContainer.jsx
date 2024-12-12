import { useContext, useEffect, useState } from "react";
import { CreateBill } from "./CreateBill";
import { GeneralContext } from "../../../context/GeneralContext";
import { getProfessionals } from "../../../api/professionals";
import { Spinner } from "../../common/spinner/Spinner";
import { getPatient, getPatients } from "../../../api/patients";
import {
  createBillRecordCud,
  updateBillRecordCud,
} from "../../../api/cudBilling";

export const CreateBillContainer = () => {
  const { goBackAction, createList, cancelAction } = useContext(GeneralContext);
  const [professionals, setProfessionals] = useState(null);
  const [patients, setPatients] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const initialModifiedState = {
    idprofesional: false,
    nombreyapellidoprofesional: false,
    prestacion: false,
    idpaciente: false,
    nombreyapellidopaciente: false,
    obrasocialpaciente: false,
    periodofacturado: false,
    nrofactura: false,
    montofacturado: false,
    fechapresentacionos: false,
    fecharecepcionos: false,
    fechareclamo: false,
    medioreclamo: false,
    respuestareclamo: false,
    cobradaenfecha: false,
    montopercibido: false,
    percepcion: false,
    montofinalprofesional: false,
  };
  const [modified, setModified] = useState(initialModifiedState);
  const [modifiedFlag, setModifiedFlag] = useState(false);

  const billRecordInitialState = {
    idprofesional: "",
    nombreyapellidoprofesional: "",
    prestacion: "",
    idpaciente: "",
    nombreyapellidopaciente: "",
    obrasocialpaciente: "",
    periodofacturado: null,
    nrofactura: "",
    montofacturado: 0,
    fechapresentacionos: null,
    fecharecepcionos: null,
    fechareclamo: null,
    medioreclamo: "",
    respuestareclamo: "",
    cobradaenfecha: true,
    montopercibido: 0,
    percepcion: 0,
    montofinalprofesional: 0,
  };
  const [billRecordCud, setBillRecordCud] = useState(billRecordInitialState);

  useEffect(() => {
    getProfessionals()
      .then((response) => {
        setProfessionals(response);
      })
      .catch((error) => console.log(error));
    getPatients()
      .then((response) => {
        setPatients(response);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!professionals || !patients) return <Spinner />;

  const handleChange = async (e) => {
    const { name, value, value2 } = e.target;
    const updatedBillRecordCud = { ...billRecordCud, [name]: value };
    if (name === "montopercibido") {
      updatedBillRecordCud.percepcion =
        updatedBillRecordCud.montopercibido * 0.35;
      updatedBillRecordCud.montofinalprofesional =
        updatedBillRecordCud.montopercibido * 0.65;
      console.log(updatedBillRecordCud.percepcion);
    }
    if (value2 && name === "idprofesional") {
      updatedBillRecordCud.nombreyapellidoprofesional = value2;
    }
    if (value2 && name === "idpaciente") {
      updatedBillRecordCud.nombreyapellidopaciente = value2;
      try {
        const response = await getPatient(value);
        updatedBillRecordCud.obrasocialpaciente = response.obrasocialpaciente;
      } catch (error) {
        console.log(error);
      }
    }
    setBillRecordCud(updatedBillRecordCud);
    setModified({ ...modified, [name]: true });
    if (!modifiedFlag) setModifiedFlag(true);
    console.log(updatedBillRecordCud);
    // console.log(modified);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    createBillRecordCud(billRecordCud)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const professionalList = createList(
    professionals,
    "nombreyapellidoprofesional",
    "id",
    false,
    "nombreyapellidoprofesional"
  );

  const patientsList = createList(
    patients,
    "nombreyapellidopaciente",
    "id",
    false,
    "nombreyapellidopaciente"
  );

  const professionalsProps = {
    handleChange: handleChange,
    name: "idprofesional",
    array: professionalList,
    initialValue: "Selecc. Profesional",
  };

  const patientsProps = {
    handleChange: handleChange,
    name: "idpaciente",
    array: patientsList,
    initialValue: "Selecc. Paciente",
  };

  const props = {
    professionalsProps,
    patientsProps,
    goBackAction,
    handleSubmit,
    isLoading,
    cancelAction,
    handleChange,
    modified,
    modifiedFlag,
    cobradaenfecha: billRecordCud.cobradaenfecha,
    billRecordCud,
  };

  return <CreateBill {...props} />;
};
