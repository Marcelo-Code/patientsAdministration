import { useContext, useEffect, useState } from "react";
import { CreateCudBilling } from "./CreateCudBilling";
import { GeneralContext } from "../../../../../context/GeneralContext";
import { getProfessionals } from "../../../../../api/professionals";
import { Spinner } from "../../../../common/spinner/Spinner";
import { getPatient, getPatients } from "../../../../../api/patients";
import { createBillRecordCud } from "../../../../../api/cudBilling";

export const CreateCudBillingContainer = () => {
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

  const cudBillingRecordInitialState = {
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
  const [cudBillingRecord, setCudBillingRecord] = useState(
    cudBillingRecordInitialState
  );

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
    const updatedCudBillingRecord = { ...cudBillingRecord, [name]: value };
    if (name === "montopercibido") {
      updatedCudBillingRecord.percepcion =
        updatedCudBillingRecord.montopercibido * 0.35;
      updatedCudBillingRecord.montofinalprofesional =
        updatedCudBillingRecord.montopercibido * 0.65;
      console.log(updatedCudBillingRecord.percepcion);
    }
    if (value2 && name === "idprofesional") {
      updatedCudBillingRecord.nombreyapellidoprofesional = value2;
    }
    if (value2 && name === "idpaciente") {
      updatedCudBillingRecord.nombreyapellidopaciente = value2;
      try {
        const response = await getPatient(value);
        updatedCudBillingRecord.obrasocialpaciente =
          response.obrasocialpaciente;
      } catch (error) {
        console.log(error);
      }
    }
    setCudBillingRecord(updatedCudBillingRecord);
    setModified({ ...modified, [name]: true });
    if (!modifiedFlag) setModifiedFlag(true);
    console.log(updatedCudBillingRecord);
    // console.log(modified);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    createBillRecordCud(cudBillingRecord)
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
    handleChange,
    handleSubmit,
    isLoading,
    cancelAction,
    goBackAction,
    professionalsProps,
    patientsProps,
    modifiedFlag,
    cobradaenfecha: cudBillingRecord.cobradaenfecha,
    cudBillingRecord,

    modified,
  };

  return <CreateCudBilling {...props} />;
};
