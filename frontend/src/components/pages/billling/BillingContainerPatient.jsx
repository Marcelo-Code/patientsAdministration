import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../context/GeneralContext";
import { Billing } from "./Billing";
import {
  getBillRecordCud,
  getCudBillPatient,
  updateBillRecordCud,
} from "../../../api/cudBilling";
import { Spinner } from "../../common/spinner/Spinner";
import { useParams } from "react-router-dom";
import { getProfessionals } from "../../../api/professionals";
import { getPatients } from "../../../api/patients";

export const BillingContainerPatient = () => {
  const { handleGoBack, cancelAction, createList, cancelTableAction, trimUrl } =
    useContext(GeneralContext);
  const [billingRecords, setBillingRecord] = useState(null);
  const [updateList, setUpdateList] = useState(false);
  const [editModeFields, setEditModeFields] = useState(null);

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
  const [professionals, setProfessionals] = useState(null);
  const [patients, setPatients] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [filteredBillingRecords, setFilteredBillingRecords] = useState(null);
  const [billingrecords, setBillingRecords] = useState(null);

  const { patientId } = useParams();

  useEffect(() => {
    getCudBillPatient(patientId)
      .then((response) => {
        const sortedResponse = response.sort((a, b) => {
          return a.nombreyapellidoprofesional.localeCompare(
            b.nombreyapellidoprofesional
          );
        });
        setBillingRecord(sortedResponse);
        setFilteredBillingRecords(sortedResponse);
      })
      .catch((error) => console.log(error));
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
  }, [patientId, updateList]);

  if (!billingRecords || !patients || !professionals) return <Spinner />;

  const handleSubmit = (idRecordCud) => {
    setIsLoading(true);
    updateBillRecordCud(billRecordCud, idRecordCud)
      .then((response) => {
        console.log(response);
        setUpdateList(!updateList);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleEditModeField = (id) => {
    setEditModeFields(id);
    console.log(id);
    getBillRecordCud(id)
      .then((response) => {
        setBillRecordCud(response);
      })
      .catch((error) => console.log(error));
    console.log(billRecordCud);
  };

  const handleChange = (e) => {
    const { name, value, value2 } = e.target;
    const updatedBillRecordCud = { ...billRecordCud, [name]: value };
    if (value2 && name === "idprofesional")
      updatedBillRecordCud.nombreyapellidoprofesional = value2;
    if (value2 && name === "idpaciente")
      updatedBillRecordCud.nombreyapellidopaciente = value2;
    setBillRecordCud(updatedBillRecordCud);
    setModified({ ...modified, [name]: true });
    if (!modifiedFlag) setModifiedFlag(true);
    console.log(updatedBillRecordCud);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    let updatedBilligRecords;

    if (value === "Todos") {
      updatedBilligRecords = filteredBillingRecords;
    } else {
      updatedBilligRecords = filteredBillingRecords.filter(
        (record) => record.periodofacturado === value
      );
      setBillingRecords(updatedBilligRecords);
    }
  };

  const professionalsList = createList(
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

  const billingPeriodFilterList = createList(
    billingRecords,
    "periodofacturado",
    "periodofacturado",
    true,
    "periodofacturado"
  );

  const professionalsProps = {
    handleChange: handleChange,
    name: "idprofesional",
    array: professionalsList,
    // initialValue: "Selecc. Profesional",
    modified: modified.nombreyapellidoprofesional,
  };

  const patientsProps = {
    handleChange: handleChange,
    name: "idpaciente",
    array: patientsList,
    // initialValue: "Selecc. Paciente",
    modified: modified.nombreyapellidopaciente,
  };

  const menuFilterProps = {
    handleChange: handleFilterChange,
    name: "idProfesional",
    array: billingPeriodFilterList,
    initialValue: "Todos",
    // modified: modified.nombreyapellidopaciente,
    date: true,
  };

  const props = {
    handleGoBack,
    handleSubmit,
    billingRecords,
    updateList,
    setUpdateList,
    handleEditModeField,
    editModeFields,
    setEditModeFields,
    handleChange,
    professionalsProps,
    patientsProps,
    billRecordCud,
    modified,
    setModified,
    initialModifiedState,
    cancelAction,
    cancelTableAction,
    isLoading,
    menuFilterProps,
    trimUrl,

    // prestacion: billRecordCud.prestacion,
    // modifiedFlag,
  };
  return <Billing {...props} />;
};
