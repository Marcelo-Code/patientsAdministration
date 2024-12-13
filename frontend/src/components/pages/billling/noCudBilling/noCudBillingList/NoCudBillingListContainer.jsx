import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../../../context/GeneralContext";
import { Spinner } from "../../../../common/spinner/Spinner";
import { getProfessionals } from "../../../../../api/professionals";
import { getPatients } from "../../../../../api/patients";
import {
  getBillRecordNoCud,
  getNoCudBills,
  updateNoCudBillingRecord,
} from "../../../../../api/noCudBilling";
import { NoCudBillingList } from "./NoCudBillingList";

export const NoCudBillingListContainer = () => {
  const {
    handleGoBack,
    createList,
    cancelAction,
    cancelTableAction,
    removeAccentsAndSpecialChars,
  } = useContext(GeneralContext);
  const [noCudBillingRecords, setNoCudBillingRecords] = useState(null);
  const [filteredNoCudBillingRecords, setFilteredNoCudBillingRecords] =
    useState(null);
  const [updateList, setUpdateList] = useState(false);

  const [editModeFields, setEditModeFields] = useState(null);

  const initialModifiedState = {
    idprofesional: false,
    nombreyapellidoprofesional: false,
    prestacion: false,
    idpaciente: false,
    nombreyapellidopaciente: false,
    modopago: false,
    mediopago: false,
    destinatariopago: false,
    montosesion: false,
    precepcion: false,
    montoapercibir: false,
    fechadepago: false,
    destinatario: false,
    pacienteadeuda: false,
    fechadeuda: false,
    pagomontoadeudado: false,
    fechapagomontoadeudado: false,
    documentofactura: false,
  };
  const [modified, setModified] = useState(initialModifiedState);
  const [modifiedFlag, setModifiedFlag] = useState(false);
  const [professionals, setProfessionals] = useState(null);
  const [patients, setPatients] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const billRecordInitialState = {
    idprofesional: "",
    nombreyapellidoprofesional: "",
    prestacion: "",
    idpaciente: "",
    nombreyapellidopaciente: "",
    modopago: "",
    mediopago: "",
    destinatariopago: "",
    montosesion: 0,
    precepcion: 0,
    montoapercibir: 0,
    fechadepago: null,
    destinatario: "",
    pacienteadeuda: false,
    fechadeuda: null,
    pagomontoadeudado: "",
    fechapagomontoadeudado: null,
    documentofactura: "",
  };
  const [billRecordNoCud, setBillRecordNoCud] = useState(
    billRecordInitialState
  );

  const [editMode, setEditMode] = useState(false);
  const handleEditModeChange = (e) => {
    setEditMode(e.target.checked);
    !editMode && setModified(initialModifiedState);
    editMode && setEditModeFields(null);
  };

  const handleEditModeField = (id) => {
    setEditModeFields(id);
    setIsLoading(true);
    // console.log(id);
    getBillRecordNoCud(id)
      .then((response) => {
        console.log(response);
        setBillRecordNoCud(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
    console.log(billRecordNoCud);
  };

  useEffect(() => {
    getNoCudBills()
      .then((response) => {
        // console.log(response);
        const sortedResponse = response.sort((a, b) => {
          return a.nombreyapellidoprofesional.localeCompare(
            b.nombreyapellidoprofesional
          );
        });
        setNoCudBillingRecords(sortedResponse);
        setFilteredNoCudBillingRecords(sortedResponse);
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
  }, [updateList]);

  if (!noCudBillingRecords || !patients || !professionals) return <Spinner />;

  // console.log(billingRecords);

  const handleChange = (e) => {
    const { name, value, value2 } = e.target;
    const updatedBillRecordCud = { ...billRecordNoCud, [name]: value };
    if (value2 && name === "idprofesional")
      updatedBillRecordCud.nombreyapellidoprofesional = value2;
    if (value2 && name === "idpaciente")
      updatedBillRecordCud.nombreyapellidopaciente = value2;
    setBillRecordNoCud(updatedBillRecordCud);
    setModified({ ...modified, [name]: true });
    if (!modifiedFlag) setModifiedFlag(true);
    // console.log(updatedBillRecordCud);
  };

  const handleSubmit = (idRecordCud) => {
    setIsLoading(true);
    updateNoCudBillingRecord(billRecordNoCud, idRecordCud)
      .then((response) => {
        console.log(response);
        setEditModeFields(null);
        setUpdateList(!updateList);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    if (value === "Todos") {
      setNoCudBillingRecords(filteredNoCudBillingRecords);
    } else {
      const filteredRecords = filteredNoCudBillingRecords.filter(
        (record) => record.periodofacturado === value
      );
      setNoCudBillingRecords(filteredRecords);
    }
  };

  const billingPeriodFilterList = createList(
    noCudBillingRecords,
    "periodofacturado",
    "periodofacturado",
    true,
    "periodofacturado"
  );

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

  const professionalsProps = {
    handleChange: handleChange,
    name: "idprofesional",
    array: professionalsList,
    // initialValue: "Selecc. Profesional",
    modified: modified.idprofesional,
  };

  const patientsProps = {
    handleChange: handleChange,
    name: "idpaciente",
    array: patientsList,
    // initialValue: "Selecc. Paciente",
    modified: modified.idpaciente,
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
    noCudBillingRecords,
    editMode,
    handleEditModeChange,
    handleEditModeField,
    handleSubmit,
    handleChange,
    setEditModeFields,
    editModeFields,
    setUpdateList,
    updateList,
    cancelTableAction,
    professionalsProps,
    patientsProps,
    billRecordNoCud,
    modified,
    setModified,
    initialModifiedState,
    setIsLoading,
    isLoading,
    menuFilterProps,
    handleGoBack,
    prestacion: billRecordNoCud.prestacion,
    cancelAction,
    modifiedFlag,
    removeAccentsAndSpecialChars,
  };
  return <NoCudBillingList {...props} />;
  // return <div>no cud</div>;
};
