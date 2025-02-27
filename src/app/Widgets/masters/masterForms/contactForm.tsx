"use client";
import React, { useRef, useState } from "react";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {
  getOrganisation,
  getOrganisationById,
} from "@/app/controllers/organisation.controller";
import {
  getDepartment,
  getDepartmentById,
} from "@/app/controllers/department.controller";
import { SelectMasterWrapper } from "@/app/Widgets/selectMasterWrapper/selectMasterWrapper";
import OrganisationForm from "./organisationForm";
import DepartmentForm from "./departmentForm";
import { Portal } from "@mui/material";
import {
  createContact,
  updateContact,
} from "@/app/controllers/contact.controller";
import {
  getContactGroup,
  getContactGroupById,
} from "@/app/controllers/contactGroup.controller";
import ContactGroupForm from "@/app/Widgets/masters/masterForms/contactGroupForm";
import AreaForm from "./areaForm";
import { getArea, getAreaById } from "@/app/controllers/area.controller";
import Seperator from "../../seperator";
import Snackbar from "@mui/material/Snackbar";
import {
  contactSchemaT,
  docDescriptionSchemaT,
  optionsDataT,
  selectKeyValueT,
} from "@/app/models/models";
import CountryForm from "@/app/Widgets/masters/masterForms/countryForm";
import StateForm from "@/app/Widgets/masters/masterForms/stateForm";
import {
  getCountries,
  getCountryById,
  getStateById,
  getStates,
} from "@/app/controllers/masters.controller";
import {
  masterFormPropsT,
  masterFormPropsWithDataT,
} from "@/app/models/models";
import { Badge, Grid, Paper, Tooltip, Typography } from "@mui/material";
import { Collapse, IconButton } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { AddDialog } from "../addDialog";
import DocModal from "@/app/utils/docs/DocModal";
import CustomField from "@/app/cap/enquiry/CustomFields";
import { usePathname } from "next/navigation";

export default function ContactForm(
  props: masterFormPropsWithDataT<contactSchemaT>
) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [docData, setDocData] = React.useState<docDescriptionSchemaT[]>(props.data?.docData ? props?.data?.docData : []);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackOpen, setSnackOpen] = React.useState(false);

  const entityData: contactSchemaT = props.data
    ? props.data
    : ({} as contactSchemaT);
  const [defaultState, setDefaultState] = useState<optionsDataT | undefined>({
    id: entityData.state_id,
    name: entityData.state,
  } as optionsDataT);
  const [stateKey, setStateKey] = useState(0);
  const [printNameFn, setPrintNameFn] = useState(entityData.print_name);
  const [whatsappFn, setWhatsappFn] = useState(
    entityData.whatsapp?.length === 0 ? "+91" : entityData.whatsapp
  );
  const [stateDisable, setStateDisable] = useState(!entityData.country);
  const [formKey, setFormKey] = useState(0);
  let customMasterListData: { [key: string]: { table_name: string, field: string } } = {}
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const pathName = usePathname();
  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
   
    // Clear the existing timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // // Set a new timeout
    debounceTimeout.current = setTimeout(() => {
      console.log("From COntact Form")
      setPrintNameFn(event.target.value);
    }, 300);

  };

  const handleWhatsappChange = (val: string) => {
    setWhatsappFn(val);
  };

  async function getStatesforCountry(stateStr: string) {
    const country = selectValues.country?.name || entityData.country;

    const states = await getStates(stateStr, country);
    if (states.length > 0) {
      return states;
    }
  }

  const onSelectChange = async (
    event: React.SyntheticEvent,
    val: any,
    setDialogValue: any,
    name: string
  ) => {
    let values = { ...selectValues };
    values[name] = val ? val : { id: 0, name: " " };

    if (name === "country") {
      setStateDisable(false);
      values["state"] = {};
      setDefaultState(undefined);
      if (values.country.id === 0) {
        setStateDisable(true);
      }
      const newKey = 1 - stateKey;
      setStateKey(newKey);
    }
    setSelectValues(values);
  };

  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {};
    for (let i = 1; i <= 10; ++i) {
      data[`c_col${i}`] = "";
    }

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    formData = updateFormData(data);

    const result = await persistEntity(data as contactSchemaT);
    if (result.status) {
      const newVal = {
        id: result.data[0].id,
        name: result.data[0].name,
      };
      setFormError({});
      setSnackOpen(true);
      if (pathName !== "/cap/admin/lists/contactList" || entityData.id) {
        setTimeout(() => {
          props.setDialogOpen ? props.setDialogOpen(false) : null;
          props.setDialogValue ? props.setDialogValue(newVal) : null;
        }, 1000);
      } else {
        setFormKey(formKey + 1);
        setStateDisable(true);
        setPrintNameFn("");
        setWhatsappFn("+91");
        setDocData([]);
        setSelectValues({});
      }
    } else {
      const issues = result.data;
      const errorState: Record<string, { msg: string; error: boolean }> = {};
      errorState["form"] = { msg: "Error encountered", error: true };
      for (const issue of issues) {
        for (const path of issue.path) {
          errorState[path] = { msg: issue.message, error: true };
          console.log("errorState", errorState);
          if (path === "refresh") {
            errorState["form"] = { msg: issue.message, error: true };
          }
        }
      }
      setFormError(errorState);
    }
  };

  const updateFormData = (data: any) => {
    data.contactGroup_id = selectValues.contactGroup
      ? selectValues.contactGroup.id
      : entityData.contactGroup_id
      ? entityData.contactGroup_id
      : 0;
    data.area_id = selectValues.area
      ? selectValues.area.id
      : entityData.area_id
      ? entityData.area_id
      : 0;
    data.organisation_id = selectValues.organisation
      ? selectValues.organisation.id
      : entityData.organisation_id
      ? entityData.organisation_id
      : 0;
    data.department_id = selectValues.department
      ? selectValues.department.id
      : entityData.department_id
      ? entityData.department_id
      : 0;
    data.country_id = selectValues.country
      ? selectValues.country.id
      : entityData.country_id
      ? entityData.country_id
      : 0;
    data.state_id = selectValues.state
      ? selectValues.state.id
      : entityData.state_id
        ? entityData.state_id
        : 0;
    Object.keys(customMasterListData).forEach((key) => {
      data[key] = selectValues[key] ? selectValues[key].id : null;
    });
    return data;
  };

  async function persistEntity(data: contactSchemaT) {
    let result;
    const newDocsData = docData.filter((row: any) => row.type !== "db");
    if (props.data) {
      Object.assign(data, { id: props.data.id, stamp: props.data.stamp });
      result = await updateContact(data, newDocsData);
    } else {
      result = await createContact(data, newDocsData);
    }
    return result;
  }

  const clearFormError = () => {
    setFormError((curr) => {
      const { form, ...rest } = curr;
      return rest;
    });
  };


  const defaultComponentMap = new Map<string, React.ReactNode>([
    [
      "name",

      <InputControl
        inputType={InputType.TEXT}
        key="name"
        autoFocus
        id="name"
        titleCase={true}
        label="Name"
        name="name"
        required
        fullWidth
        error={formError?.name?.error}
        helperText={formError?.name?.msg}
        setFormError={setFormError}
        defaultValue={entityData.name}
        onChange={handlePrintNameChange}
        // onBlur={handlePrintNameChange}
      />,
    ],
    [
      "alias",

      <InputControl
        inputType={InputType.TEXT}
        id="alias"
        key="alias"
        label="Alias"
        name="alias"
        error={formError?.alias?.error}
        helperText={formError?.alias?.msg}
        setFormError={setFormError}
        defaultValue={entityData.alias}
        fullWidth
      />,
    ],
    [
      "print_name",

      <InputControl
        inputType={InputType.TEXT}
        id="print_name"
        key="print_name"
        label="Print Name"
        name="print_name"
        error={formError?.print_name?.error}
        helperText={formError?.print_name?.msg}
        setFormError={setFormError}
        defaultValue={printNameFn}
        fullWidth
      />,
    ],
    [
      "organisation",

      <SelectMasterWrapper
        key={"organisation"}
        name={"organisation"}
        id={"organisation"}
        label={"Organisation"}
        showDetails={true}
        onChange={(e, val, s) =>
          setSelectValues({
            ...selectValues,
            organisation: val ? val : { id: 0, name: "" },
          })
        }
        dialogTitle={"Organisation"}
        width={375}
        fetchDataFn={getOrganisation}
        fnFetchDataByID={getOrganisationById}
        defaultValue={
          {
            id: entityData.organisation_id,
            name: entityData.organisation,
          } as optionsDataT
        }
        renderForm={(fnDialogOpen, fnDialogValue, metaData, data) => (
          <OrganisationForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            metaData={metaData}
            data={data}
          />
        )}
      />,
    ],
    [
      "pan",

      <InputControl
        inputType={InputType.TEXT}
        key="pan"
        id="pan"
        label="PAN"
        name="pan"
        error={formError?.pan?.error}
        helperText={formError?.pan?.msg}
        setFormError={setFormError}
        defaultValue={entityData.pan}
        fullWidth
      />,
    ],
    [
      "aadhaar",

      <InputControl
        inputType={InputType.TEXT}
        key="aadhaar"
        id="aadhaar"
        label="AADHAAR"
        name="aadhaar"
        error={formError?.aadhaar?.error}
        helperText={formError?.aadhaar?.msg}
        setFormError={setFormError}
        defaultValue={entityData.aadhaar}
        fullWidth
      />,
    ],
    [
      "contactGroup",

      <SelectMasterWrapper
        key="contactGroup"
        name={"contactGroup"}
        id={"contactGroup"}
        label={"Group"}
        showDetails={true}
        dialogTitle={"Group"}
        width={375}
        fetchDataFn={getContactGroup}
        fnFetchDataByID={getContactGroupById}
        defaultValue={
          {
            id: entityData.contactGroup_id,
            name: entityData.contactGroup,
          } as optionsDataT
        }
        onChange={(e, val, s) =>
          setSelectValues({
            ...selectValues,
            contactGroup: val ? val : { id: 0, name: "" },
          })
        }
        formError={formError?.contactGroup}
        setFormError={setFormError}
        renderForm={(fnDialogOpen, fnDialogValue, data?) => (
          <ContactGroupForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
      />,
    ],
    [
      "department",

      <SelectMasterWrapper
        key={"department"}
        name={"department"}
        id={"department"}
        label={"Department"}
        dialogTitle={"Department"}
        width={375}
        defaultValue={
          {
            id: entityData.department_id,
            name: entityData.department,
          } as optionsDataT
        }
        onChange={(e, val, s) =>
          setSelectValues({
            ...selectValues,
            department: val ? val : { id: 0, name: "" },
          })
        }
        fetchDataFn={getDepartment}
        fnFetchDataByID={getDepartmentById}
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <DepartmentForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
      />,
    ],
    [
      "area",

      <SelectMasterWrapper
        key={"area"}
        name={"area"}
        id={"area"}
        label={"Area"}
        dialogTitle={"Area"}
        width={375}
        fetchDataFn={getArea}
        fnFetchDataByID={getAreaById}
        defaultValue={
          {
            id: entityData.area_id,
            name: entityData.area,
          } as optionsDataT
        }
        onChange={(e, val, s) =>
          setSelectValues({
            ...selectValues,
            area: val ? val : { id: 0, name: "" },
          })
        }
        // formError={formE}
        renderForm={(fnDialogOpen, fnDialogValue, data?) => (
          <AreaForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
      />,
    ],
    [
      "email",

      <InputControl
        inputType={InputType.EMAIL}
        key={"email"}
        id="email"
        label="Email"
        name="email"
        placeholder="Email address"
        error={formError?.email?.error}
        helperText={formError?.email?.msg}
        setFormError={setFormError}
        defaultValue={entityData.email}
        fullWidth
      />,
    ],
    [
      "mobile",

      <InputControl
        inputType={InputType.PHONE}
        key={"mobile"}
        id="mobile"
        label="Phone No"
        name="mobile"
        size="small"
        error={formError?.mobile?.error}
        helperText={formError?.mobile?.msg}
        setFormError={setFormError}
        defaultValue={entityData.mobile}
        onChange={handleWhatsappChange}
        fullWidth
      />,
    ],
    [
      "whatsapp",

      <InputControl
        inputType={InputType.PHONE}
        key={"whatsapp"}
        id="whatsapp"
        label="Whatsapp No"
        name="whatsapp"
        // defaultCountry={whatsappFn?.length === 0 ? "IN" : "IN"}
        error={formError?.whatsapp?.error}
        helperText={formError?.whatsapp?.msg}
        setFormError={setFormError}
        defaultValue={whatsappFn}
        fullWidth
      />,
    ],
    [
      "address1",

      <InputControl
        inputType={InputType.TEXT}
        key={"address1"}
        label="Address Line 1"
        name="address1"
        id="address1"
        error={formError?.address1?.error}
        helperText={formError?.address1?.msg}
        setFormError={setFormError}
        defaultValue={entityData.address1}
        fullWidth
      />,
    ],
    [
      "address2",

      <InputControl
        inputType={InputType.TEXT}
        key={"address2"}
        label="Address Line 2"
        name="address2"
        id="address2"
        error={formError?.address2?.error}
        helperText={formError?.address2?.msg}
        setFormError={setFormError}
        defaultValue={entityData.address2}
        fullWidth
      />,
    ],
    [
      "city",

      <InputControl
        inputType={InputType.TEXT}
        key={"city"}
        name="city"
        id="city"
        label="City"
        error={formError?.city?.error}
        helperText={formError?.city?.msg}
        setFormError={setFormError}
        defaultValue={entityData.city}
        fullWidth
      />,
    ],
    [
      "pincode",

      <InputControl
        inputType={InputType.TEXT}
        key={"pincode"}
        name="pincode"
        id="pincode"
        label="Pin Code"
        error={formError?.pincode?.error}
        helperText={formError?.pincode?.msg}
        setFormError={setFormError}
        defaultValue={entityData.pincode}
        fullWidth
      />,
    ],
    [
      "country",

      <SelectMasterWrapper
        key={"country"}
        name={"country"}
        id={"country"}
        label={"Country"}
        dialogTitle={"Country"}
        width={375}
        onChange={(e, v, s) => onSelectChange(e, v, s, "country")}
        fetchDataFn={getCountries}
        fnFetchDataByID={getCountryById}
        defaultValue={
          {
            id: entityData.country_id,
            name: entityData.country,
          } as optionsDataT
        }
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <CountryForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
      />,
    ],
    [
      "state",
      <SelectMasterWrapper
        key={stateKey}
        name={"state"}
        id={"state"}
        label={"State"}
        onChange={(e, v, s) => onSelectChange(e, v, s, "state")}
        width={375}
        dialogTitle={"State"}
        fetchDataFn={getStatesforCountry}
        fnFetchDataByID={getStateById}
        defaultValue={defaultState}
        allowModify={!stateDisable}
        allowNewAdd={!stateDisable}
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <StateForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
            parentData={selectValues.country?.id || entityData.country_id}
          />
        )}
      />,
    ],
    [
      "city",

      <InputControl
        inputType={InputType.TEXT}
        key={"city"}
        name="city"
        id="city"
        label="City"
        error={formError?.city?.error}
        helperText={formError?.city?.msg}
        setFormError={setFormError}
        defaultValue={entityData.city}
        fullWidth
      />,
    ],
    [
      "pincode",

      <InputControl
        inputType={InputType.TEXT}
        key={"pincode"}
        name="pincode"
        id="pincode"
        label="Pin Code"
        error={formError?.pincode?.error}
        helperText={formError?.pincode?.msg}
        setFormError={setFormError}
        defaultValue={entityData.pincode}
        fullWidth
      />,
    ],
  ]);

  let fieldArr: React.ReactElement[] = [];

  props.metaData?.fields.map((field: any) => {
    if (field.column_type_id === 7) {
      const parts = field.column_format.split(".");
      let tableName = "";
      let fieldName = "";
      if (parts) {
        customMasterListData[field.column_name] = { table_name: tableName, field: fieldName }
      }
    }
    if (field.column_name_id === "address1" || field.column_name_id === "address2") {
      const baseElement = defaultComponentMap.get(
        field.column_name_id
      ) as React.ReactElement;

      const fld = React.cloneElement(baseElement, {
        ...baseElement.props,
        label: field.column_label,
        required: field.is_mandatory === 1,
        key: `field-address-${field.column_name_id}`,
        disabled: field.is_disabled === 1 ? true : false,
      });
      fieldArr.push(fld);
    } else if (
      field.column_name_id === "country" ||
      field.column_name_id === "state" ||
      field.column_name_id === "city" ||
      field.column_name_id === "pincode"
    ) {
      if (field.column_name_id === "state") {
        const baseElement = defaultComponentMap.get(
          field.column_name_id
        ) as React.ReactElement;

        const fld = React.cloneElement(baseElement, {
          ...baseElement.props,
          label: field.column_label,
          required: field.is_mandatory === 1,
          key: `field-subAddress-${field.column_name_id}-${stateKey}`,
        });

        fieldArr.push(fld);
      } else {
        const baseElement = defaultComponentMap.get(
          field.column_name_id
        ) as React.ReactElement;

        const fld = React.cloneElement(baseElement, {
          ...baseElement.props,
          label: field.column_label,
          required: field.is_mandatory === 1,
          key: `field-subAddress-${field.column_name_id}`,
        });

        fieldArr.push(fld);
      }

    }
    else if (field.is_default_column) {
      if (field.column_name_id === 'whatsapp') {
        const baseElement = defaultComponentMap.get(
          field.column_name_id
        ) as React.ReactElement;

        const fld = React.cloneElement(baseElement, {
          ...baseElement.props,
          label: field.column_label,
          required: field.is_mandatory === 1,
          key: `field-default-${field.column_name_id}-${whatsappFn}`,
          disabled: field.is_disabled === 1 ? true : false,
        });

        fieldArr.push(fld);
      } else {
        const baseElement = defaultComponentMap.get(
          field.column_name_id
        ) as React.ReactElement;

        const fld = React.cloneElement(baseElement, {
          ...baseElement.props,
          label: field.column_label,
          required: field.is_mandatory === 1,
          key: `field-default-${field.column_name_id}`,
          disabled: field.is_disabled === 1 ? true : false,
        });

        fieldArr.push(fld);
      }
    } else {
      const fld = (
        <CustomField
          key={`field-custom-${field.column_name_id}`}
          desc={field}
          defaultValue={field.column_type_id !== 7 ?
            entityData[field.column_name_id as keyof contactSchemaT] : { id: entityData.c_col1_id, name: entityData.c_col1_name }
          }
          setSelectValues={setSelectValues}
          formError={formError}
        />
      );
      fieldArr.push(fld);
    }
  });

  return (
    <>
      <Collapse in={formError?.form ? true : false}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={clearFormError}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {formError?.form?.msg}
        </Alert>
      </Collapse>
      <Box id="contactForm" sx={{ m: 1, p: 3 }}>
        <form key={formKey} action={handleSubmit} noValidate autoComplete="off">
          <Grid container spacing={1}>
            {fieldArr.map((field, index) => {
              const fieldKey = field.key as string;
              if (fieldKey.includes("field-address")) {
                return (
                  <Grid key={fieldKey} item xs={12} sm={6} md={6}>
                    <div key={index}>{field}</div>
                  </Grid>
                );
              } else if (fieldKey.includes("field-subAddress")) {
                return (
                  <Grid key={fieldKey} item xs={12} sm={6} md={3}>
                    <div key={index}>{field}</div>
                  </Grid>
                );
              } else {
                return (
                  <Grid key={fieldKey} item xs={12} sm={6} md={4}>
                    <div key={index}>{field}</div>
                  </Grid>
                );
              }
            })}
            <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 1
              }}
            >
              <Tooltip
                title={
                  docData?.length > 0 ? (
                    docData.map((file: any, index: any) => (
                      <Typography variant="body2" key={index}>
                        {file.description}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body2" color="white">
                      No files available
                    </Typography>
                  )
                }
              >
                <IconButton
                  sx={{ marginRight: "3rem" }}
                  onClick={() => setDialogOpen(true)}
                  aria-label="file"
                  tabIndex={-1}
                >
                  <Badge badgeContent={docData?.length} color="primary">
                    <AttachFileIcon></AttachFileIcon>
                  </Badge>

                </IconButton>
              </Tooltip>
              <Button onClick={handleCancel} tabIndex={-1}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "15%", marginLeft: "5%" }}
              >
                Submit
              </Button>
            </Box>
          </Grid>
          {dialogOpen && (
            <AddDialog
              title="Document List"
              open={dialogOpen}
              setDialogOpen={setDialogOpen}
            >
              <DocModal
                docData={docData}
                setDocData={setDocData}
                setDialogOpen={setDialogOpen}
              />
            </AddDialog>
          )}
          </Grid>
          
        </form>
        <Portal>
          <Snackbar
            open={snackOpen}
            autoHideDuration={3000}
            onClose={() => setSnackOpen(false)}
            message="Record Saved!"
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          />
        </Portal>
      </Box>
    </>
  );
}
