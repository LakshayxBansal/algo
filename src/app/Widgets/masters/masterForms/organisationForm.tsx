import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {
  createOrganisation,
  updateOrganisation,
} from "../../../controllers/organisation.controller";
import {
  getCountries,
  getCountryById,
  getStateById,
} from "../../../controllers/masters.controller";
import { getStates } from "@/app/controllers/masters.controller";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import { SelectMasterWrapper } from "@/app/Widgets/masters/selectMasterWrapper";
import CountryForm from "./countryForm";
import {
  docDescriptionSchemaT,
  masterFormPropsT,
  masterFormPropsWithDataT,
  optionsDataT,
  organisationSchemaT,
  selectKeyValueT,
} from "@/app/models/models";
import Seperator from "../../seperator";
import { Badge, Collapse, Grid, IconButton, Portal, Snackbar, Tooltip, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import StateForm from "./stateForm";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { AddDialog } from "../addDialog";
import DocModal from "@/app/utils/docs/DocModal";
import CustomField from "@/app/cap/enquiry/CustomFields";
import { usePathname } from "next/navigation";

export default function OrganisationForm(props: masterFormPropsWithDataT<organisationSchemaT>) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [docData, setDocData] = React.useState<docDescriptionSchemaT[]>(
    props.data?.docData ? props?.data?.docData : []
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const entityData: organisationSchemaT = props.data ? props.data : {} as organisationSchemaT;
  const pathName = usePathname();
  const [formKey, setFormKey] = useState(0);

  const [defaultState, setDefaultState] = useState<optionsDataT | undefined>({
    id: entityData.state_id,
    name: entityData.state,
  } as optionsDataT);
  const [stateKey, setStateKey] = useState(0);
  const [printNameFn, setPrintNameFn] = useState(entityData.printName);
  const [stateDisable, setStateDisable] = useState(!entityData.country);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);


  const handlePrintNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    // Clear the existing timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new timeout
    debounceTimeout.current = setTimeout(() => {
      setPrintNameFn(value); // Update the state after 300ms of inactivity
    }, 300);
  };

  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (let i = 1; i <= 10; ++i) {
      data[`c_col${i}`] = "";
    }

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    formData = updateFormData(data);

    const result = await persistEntity(data as organisationSchemaT);
    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name };
      setFormError({});
      setSnackOpen(true);
      if (pathName !== "/cap/admin/lists/organisationList" || entityData.id) {
        setTimeout(() => {
          props.setDialogOpen ? props.setDialogOpen(false) : null;
          props.setDialogValue ? props.setDialogValue(newVal) : null;
        }, 1000);
      } else {
        setFormKey(formKey + 1); 
        setPrintNameFn("");
        setDocData([]); 
      }
    } else {
      const issues = result.data;
      // show error on screen
      const errorState: Record<string, { msg: string; error: boolean }> = {};
      errorState["form"] = { msg: "Error encountered", error: true };
      for (const issue of issues) {
        for (const path of issue.path) {
          errorState[path] = { msg: issue.message, error: true };
          if (path === "refresh") {
            errorState["form"] = { msg: issue.message, error: true };
          }
        }
      }

      setFormError(errorState);
    }
  };

  const updateFormData = (data: any) => {
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

    return data;
  };

  async function persistEntity(data: organisationSchemaT) {
    let result;
    const newDocsData = docData.filter((row: any) => row.type !== "db");
    if (props.data) {
      Object.assign(data, { id: props.data.id, stamp: props.data.stamp });
      result = await updateOrganisation(data, newDocsData);
    } else {
      result = await createOrganisation(data, newDocsData);
    }
    return result;
  }

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
    values[name] = val ? val : { id: 0, name: "" };

    if (name === "country") {
      setStateDisable(false);
      values["state"] = {};
      setDefaultState(undefined);
      if (values.country.id === 0) setStateDisable(true);
      else setStateDisable(false);
      setStateKey((prev) => 1 - prev);
    }
    setSelectValues(values);
  };

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
        key="name"
        inputType={InputType.TEXT}
        autoFocus
        id="name"
        label="Name"
        name="name"
        required
        fullWidth
        error={formError?.name?.error}
        helperText={formError?.name?.msg}
 setFormError={setFormError}
        defaultValue={entityData.name}
        onChange={handlePrintNameChange}
      // onKeyDown={() => {
      //   setFormError((curr) => {
      //     const { name, ...rest } = curr;
      //     return rest;
      //   });
      // }}
      />
    ],
    [
      "alias",
      <InputControl
        key="alias"
        inputType={InputType.TEXT}
        id="alias"
        label="Alias"
        name="alias"
        fullWidth
        error={formError?.alias?.error}
        helperText={formError?.alias?.msg}
 setFormError={setFormError}
        defaultValue={entityData.alias}
      // onKeyDown={() => {
      //   setFormError((curr) => {
      //     const { alias, ...rest } = curr;
      //     return rest;
      //   });
      // }}
      />
    ],
    [
      "print_name",
      <InputControl
        key="printName"
        inputType={InputType.TEXT}
        id="printName"
        label="Print Name"
        name="printName"
        fullWidth
        error={formError?.printName?.error}
        helperText={formError?.printName?.msg}
 setFormError={setFormError}
        defaultValue={printNameFn}
      // onKeyDown={() => {
      //   setFormError((curr) => {
      //     const { printName, ...rest } = curr;
      //     return rest;
      //   });
      // }}
      />
    ],
    [
      "pan",
      <InputControl
        key="pan"
        inputType={InputType.TEXT}
        id="pan"
        label="PAN"
        name="pan"
        fullWidth
        error={formError?.pan?.error}
        helperText={formError?.pan?.msg}
 setFormError={setFormError}
        defaultValue={entityData.pan}
      // onKeyDown={() => {
      //   setFormError((curr) => {
      //     const { pan, ...rest } = curr;
      //     return rest;
      //   });
      // }}
      />
    ],
    [
      "gstin",
      <InputControl
        key="gstin"
        inputType={InputType.TEXT}
        id="gstin"
        label="GSTIN"
        name="gstin"
        fullWidth
        error={formError?.gstin?.error}
        helperText={formError?.gstin?.msg}
 setFormError={setFormError}
        defaultValue={entityData.gstin}
      // onKeyDown={() => {
      //   setFormError((curr) => {
      //     const { gstin, ...rest } = curr;
      //     return rest;
      //   });
      // }}
      />
    ],
    [
      "address1",
      <InputControl
        key="address1"
        inputType={InputType.TEXT}
        label="Address Line 1"
        name="address1"
        id="address1"
        fullWidth
        error={formError?.address1?.error}
        helperText={formError?.address1?.msg}
        setFormError={setFormError}
        defaultValue={entityData.address1}
      // onKeyDown={() => {
      //   setFormError((curr) => {
      //     const { address1, ...rest } = curr;
      //     return rest;
      //   });
      // }}
      />
    ],
    [
      "address2",
      <InputControl
        key="address2"
        inputType={InputType.TEXT}
        label="Address Line 2"
        name="address2"
        id="address2"
        fullWidth
        error={formError?.address2?.error}
        helperText={formError?.address2?.msg}
        setFormError={setFormError}
        defaultValue={entityData.address2}
      // onKeyDown={() => {
      //   setFormError((curr) => {
      //     const { address2, ...rest } = curr;
      //     return rest;
      //   });
      // }}
      />
    ],
    [
      "country",
      <SelectMasterWrapper
        key='country'
        name={"country"}
        id={"country"}
        label={"Country"}
        dialogTitle={"Country"}
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
      />
    ],
    [
      "state",
      <SelectMasterWrapper
        key={stateKey}
        name={"state"}
        id={"state"}
        label={"State"}
        onChange={(e, v, s) => onSelectChange(e, v, s, "state")}
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
      />
    ],
    [
      "city",
      <InputControl
        key="city"
        inputType={InputType.TEXT}
        name="city"
        id="city"
        label="City"
        fullWidth
        error={formError?.city?.error}
        helperText={formError?.city?.msg}
 setFormError={setFormError}
        defaultValue={entityData.city}
      // onKeyDown={() => {
      //   setFormError((curr) => {
      //     const { city, ...rest } = curr;
      //     return rest;
      //   });
      // }}
      />
    ],
    [
      "pincode",
      <InputControl
        key="pincode"
        inputType={InputType.TEXT}
        name="pincode"
        id="pincode"
        label="Pin Code"
        fullWidth
        error={formError?.pincode?.error}
        helperText={formError?.pincode?.msg}
 setFormError={setFormError}
        defaultValue={entityData.pincode}
      // onKeyDown={() => {
      //   setFormError((curr) => {
      //     const { pincode, ...rest } = curr;
      //     return rest;
      //   });
      // }}
      />
    ]
  ])

  let fieldArr: React.ReactElement[] = [];

  props.metaData?.fields.map((field: any) => {
    if (field.column_name_id === 'name' || field.column_name_id === 'alias' || field.column_name_id === 'print_name') {
      const baseElement = defaultComponentMap.get(
        field.column_name_id
      ) as React.ReactElement;

      const fld = React.cloneElement(baseElement, {
        ...baseElement.props,
        label: field.column_label,
        required: field.is_mandatory === 1,
        key: `field-name-${field.column_name_id}`,
        disabled: field.is_disabled === 1 ? true : false
      });

      fieldArr.push(fld);
    } else if (field.column_name_id === 'pan' || field.column_name_id === 'gstin') {
      const baseElement = defaultComponentMap.get(
        field.column_name_id
      ) as React.ReactElement;

      const fld = React.cloneElement(baseElement, {
        ...baseElement.props,
        label: field.column_label,
        required: field.is_mandatory === 1,
        key: `field-number-${field.column_name_id}`,
        disabled: field.is_disabled === 1 ? true : false
      });

      fieldArr.push(fld);
    } else if (field.column_name_id === 'address1' || field.column_name_id === 'address2') {
      const baseElement = defaultComponentMap.get(
        field.column_name_id
      ) as React.ReactElement;

      const fld = React.cloneElement(baseElement, {
        ...baseElement.props,
        label: field.column_label,
        required: field.is_mandatory === 1,
        key: `field-address-${field.column_name_id}`,
        disabled: field.is_disabled === 1 ? true : false
      });

      fieldArr.push(fld);
    } else if (field.column_name_id === 'city' || field.column_name_id === 'pincode' || field.column_name_id === 'country' || field.column_name_id === 'state') {
      const baseElement = defaultComponentMap.get(
        field.column_name_id
      ) as React.ReactElement;

      const fld = React.cloneElement(baseElement, {
        ...baseElement.props,
        label: field.column_label,
        required: field.is_mandatory === 1,
        key: `field-subAddress-${field.column_name_id}`,
        disabled: field.is_disabled === 1 ? true : false
      });

      fieldArr.push(fld);
    }
    else {
      const fld = (
        <CustomField
          key={`field-custom-${field.column_name_id}`}
          desc={field}
          defaultValue={entityData[field.column_name_id as keyof organisationSchemaT]}
        />
      );
      fieldArr.push(fld);
    }
    return null;
  })

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
      <Box id="sourceForm" sx={{ m: 1, p:3 }}>
        <form key={formKey} action={handleSubmit} noValidate>
          <Grid container spacing={1}>
            {fieldArr.map((field, index) => {
              const fieldKey = field.key as string;
              if (fieldKey.includes("field-number") || fieldKey.includes("field-address")) {
                return (
                  <Grid key={fieldKey}
                    item
                    xs={12}
                    sm={6}
                    md={6}
                  >
                    <div key={index}>
                      {field}
                    </div>
                  </Grid>
                )
              } else if (fieldKey.includes("field-subAddress")) {
                return (
                  <Grid key={fieldKey}
                    item
                    xs={12}
                    sm={6}
                    md={3}
                  >
                    <div key={index}>
                      {field}
                    </div>
                  </Grid>
                )
              } else {
                return (
                  <Grid key={fieldKey}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                  >
                    <div key={index}>
                      {field}
                    </div>
                  </Grid>
                )
              }
            })}
            <Grid xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 2,
                paddingLeft: "2rem",
              }}
            >
              <Tooltip
                title={docData.length > 0 ? (
                  docData.map((file: any, index: any) => (
                    <Typography variant="body2" key={index}>
                      {file.description}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2" color="white">
                    No files available
                  </Typography>
                )}
              >
                <IconButton
                  sx={{ marginRight:"3rem" }}
                  onClick={() => setDialogOpen(true)}
                  aria-label="file"
                  tabIndex={-1}
                >
                  <Badge badgeContent={docData.length} color="primary">
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
          </Grid>
          {dialogOpen && (
            <AddDialog
              title="Document List"
              open={dialogOpen}
              setDialogOpen={setDialogOpen}
            >
              <DocModal docData={docData} setDocData={setDocData} setDialogOpen={setDialogOpen} />
            </AddDialog>
          )}

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