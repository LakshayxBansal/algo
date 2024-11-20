"use client";
import React, { useState } from "react";
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
import { SelectMasterWrapper } from "@/app/Widgets/masters/selectMasterWrapper";
import OrganisationForm from "./organisationForm";
import DepartmentForm from "./departmentForm";
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
import { masterFormPropsT } from "@/app/models/models";
import { Badge, Paper, Tooltip, Typography } from "@mui/material";
import { Collapse, IconButton } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { AddDialog } from "../addDialog";
import DocModal from "@/app/utils/docs/DocModal";
import CustomField from "@/app/cap/enquiry/CustomFields";

export default function ContactForm(props: masterFormPropsT) {
  console.log("Contact Props : ", props);
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [docData, setDocData] = React.useState<docDescriptionSchemaT[]>(
    props?.data ? props?.data?.docData : []
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackOpen, setSnackOpen] = React.useState(false);
  // const [entityData, setentityData] = React.useState<contactSchemaT>(props.data);
  const entityData: contactSchemaT = props.data ? props.data : {};
  const [defaultState, setDefaultState] = useState<optionsDataT | undefined>({
    id: entityData.state_id,
    name: entityData.state,
  } as optionsDataT);
  const [stateKey, setStateKey] = useState(0);
  const [printNameFn, setPrintNameFn] = useState(entityData.print_name);
  const [whatsappFn, setWhatsappFn] = useState(entityData.whatsapp);
  const [stateDisable, setStateDisable] = useState(!entityData.country);

  const handlePrintNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPrintNameFn(event.target.value);
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
        if (values.country.id === 0) {
          setStateDisable(true);
        }
        setStateKey((prev) => 1 - prev);
      }
      setSelectValues(values);
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

      const result = await persistEntity(data as contactSchemaT);
      if (result.status) {
        const newVal = {
          id: result.data[0].id,
          name: result.data[0].name,
          // reloadOpts: true,
        };
        setSnackOpen(true);
        props.setDialogValue ? props.setDialogValue(newVal) : null;
        setTimeout(() => {
          props.setDialogOpen ? props.setDialogOpen(false) : null;
        }, 1000);
        setFormError({});
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

      return data;
    };

    async function persistEntity(data: contactSchemaT) {
      let result;
      const newDocsData = docData?.filter((row: any) => row.type !== "db");
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

    return (
      <>
        <Box
          sx={{
            position: "sticky",
            top: "0px",
            zIndex: 2,
            paddingY: "10px",
            bgcolor: "white",
          }}
        >
          <Seperator>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {props.data ? "Update Contact" : "Add Contact"}
              <IconButton onClick={handleCancel} tabIndex={-1}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Seperator>
        </Box>
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
        <Box id="contactForm" sx={{ p: 1 }}>
          <form action={handleSubmit} noValidate>
            <Box
              sx={{
                display: "grid",
                columnGap: "3px",
                rowGap: 1,
                gridTemplateColumns: "repeat(3, 1fr)",
                pt: 2,
                pb: 1,
                pr: 2,
                pl: 2,
              }}
            >
              <InputControl
                inputType={InputType.TEXT}
                autoFocus
                id="name"
                label="Name"
                name="name"
                sx={{ width: "210" }}
                required
                titleCase={true}
                error={formError?.name?.error}
                helperText={formError?.name?.msg}
                defaultValue={entityData.name}
                onChange={handlePrintNameChange}
                onKeyDown={() => {
                  setFormError((curr) => {
                    const { name, ...rest } = curr;
                    return rest;
                  });
                }}
              />
              <InputControl
                inputType={InputType.TEXT}
                id="alias"
                label="Alias"
                name="alias"
                sx={{ width: "210" }}
                error={formError?.alias?.error}
                helperText={formError?.alias?.msg}
                defaultValue={entityData.alias}
                onKeyDown={() => {
                  setFormError((curr) => {
                    const { alias, ...rest } = curr;
                    return rest;
                  });
                }}
              />
              <InputControl
                inputType={InputType.TEXT}
                id="print_name"
                label="Print Name"
                name="print_name"
                sx={{ width: "210" }}
                error={formError?.print_name?.error}
                helperText={formError?.print_name?.msg}
                defaultValue={printNameFn}
                onKeyDown={() => {
                  setFormError((curr) => {
                    const { print_name, ...rest } = curr;
                    return rest;
                  });
                }}
              />
              <SelectMasterWrapper
                name={"organisation"}
                id={"organisation"}
                label={"Organisation"}
                showDetails={true}
                width={240}
                onChange={(e, val, s) =>
                  setSelectValues({
                    ...selectValues,
                    organisation: val ? val : { id: 0, name: "" },
                  })
                }
                dialogTitle={"Organisation"}
                fetchDataFn={getOrganisation}
                fnFetchDataByID={getOrganisationById}
                formError={formError.organisation}
                defaultValue={
                  {
                    id: entityData.organisation_id,
                    name: entityData.organisation,
                  } as optionsDataT
                }
                renderForm={(fnDialogOpen, fnDialogValue, data) => (
                  <OrganisationForm
                    setDialogOpen={fnDialogOpen}
                    setDialogValue={fnDialogValue}
                    data={data}
                  />
                )}
              />
              <InputControl
                inputType={InputType.TEXT}
                id="pan"
                label="PAN"
                name="pan"
                sx={{ width: "210" }}
                error={formError?.pan?.error}
                helperText={formError?.pan?.msg}
                defaultValue={entityData.pan}
                onKeyDown={() => {
                  setFormError((curr) => {
                    const { pan, ...rest } = curr;
                    return rest;
                  });
                }}
              />
              <InputControl
                inputType={InputType.TEXT}
                id="aadhaar"
                label="AADHAAR"
                name="aadhaar"
                width={210}
                error={formError?.aadhaar?.error}
                helperText={formError?.aadhaar?.msg}
                defaultValue={entityData.aadhaar}
                onKeyDown={() => {
                  setFormError((curr) => {
                    const { aadhaar, ...rest } = curr;
                    return rest;
                  });
                }}
              />
              <SelectMasterWrapper
                name={"contactGroup"}
                id={"contactGroup"}
                label={"Group"}
                width={240}
                required
                showDetails={true}
                dialogTitle={"Group"}
                formError={formError.contactGroup}
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
                renderForm={(fnDialogOpen, fnDialogValue, data?) => (
                  <ContactGroupForm
                    setDialogOpen={fnDialogOpen}
                    setDialogValue={fnDialogValue}
                    data={data}
                  />
                )}
              />

              <SelectMasterWrapper
                name={"department"}
                id={"department"}
                label={"Department"}
                width={240}
                dialogTitle={"Department"}
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
                formError={formError.department}
                renderForm={(fnDialogOpen, fnDialogValue, data) => (
                  <DepartmentForm
                    setDialogOpen={fnDialogOpen}
                    setDialogValue={fnDialogValue}
                    data={data}
                  />
                )}
              />

              <SelectMasterWrapper
                name={"area"}
                id={"area"}
                label={"Area"}
                width={240}
                dialogTitle={"Area"}
                fetchDataFn={getArea}
                fnFetchDataByID={getAreaById}
                formError={formError.area}
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
                renderForm={(fnDialogOpen, fnDialogValue, data?) => (
                  <AreaForm
                    setDialogOpen={fnDialogOpen}
                    setDialogValue={fnDialogValue}
                    data={data}
                  />
                )}
              />
              <InputControl
                inputType={InputType.EMAIL}
                id="email"
                label="Email"
                name="email"
                placeholder="Email address"
                width={210}
                error={formError?.email?.error}
                helperText={formError?.email?.msg}
                defaultValue={entityData.email}
                onKeyDown={() => {
                  setFormError((curr) => {
                    const { email, ...rest } = curr;
                    return rest;
                  });
                }}
              />
              <InputControl
                inputType={InputType.PHONE}
                id="mobile"
                label="Phone No"
                name="mobile"
                width={210}
                error={formError?.mobile?.error}
                helperText={formError?.mobile?.msg}
                defaultValue={entityData.mobile}
                onChange={handleWhatsappChange}
                onKeyDown={() => {
                  setFormError((curr) => {
                    const { mobile, ...rest } = curr;
                    return rest;
                  });
                }}
              />
              <InputControl
                inputType={InputType.PHONE}
                id="whatsapp"
                label="Whatsapp No"
                name="whatsapp"
                // defaultCountry="FR"
                width={210}
                error={formError?.whatsapp?.error}
                helperText={formError?.whatsapp?.msg}
                defaultValue={whatsappFn}
                key={whatsappFn}
                onKeyDown={() => {
                  setFormError((curr) => {
                    const { whatsapp, ...rest } = curr;
                    return rest;
                  });
                }}
              />
            </Box>
            <Box
              sx={{
                display: "grid",
                columnGap: "10px",
                rowGap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
                pl: 2,
                pr: 5,
                pb: 1,
              }}
            >
              <InputControl
                inputType={InputType.TEXT}
                label="Address Line 1"
                name="address1"
                id="address1"
                width={180}
                error={formError?.address1?.error}
                helperText={formError?.address1?.msg}
                defaultValue={entityData.address1}
                onKeyDown={() => {
                  setFormError((curr) => {
                    const { address1, ...rest } = curr;
                    return rest;
                  });
                }}
              />
              <InputControl
                inputType={InputType.TEXT}
                label="Address Line 2"
                name="address2"
                id="address2"
                width={180}
                error={formError?.address2?.error}
                helperText={formError?.address2?.msg}
                defaultValue={entityData.address2}
                onKeyDown={() => {
                  setFormError((curr) => {
                    const { address2, ...rest } = curr;
                    return rest;
                  });
                }}
              />
            </Box>
            <Box
              sx={{
                display: "grid",
                columnGap: "3px",
                rowGap: 1,
                gridTemplateColumns: "repeat(4, 1fr)",
                pl: 2,
                pr: 5,
                pb: 2,
              }}
            >
              <SelectMasterWrapper
                name={"country"}
                id={"country"}
                label={"Country"}
                dialogTitle={"Add country"}
                onChange={(e, v, s) => onSelectChange(e, v, s, "country")}
                fetchDataFn={getCountries}
                formError={formError.country}
                fnFetchDataByID={getCountryById}
                width={170}
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
              <SelectMasterWrapper
                key={stateKey}
                name={"state"}
                id={"state"}
                label={"State"}
                width={170}
                onChange={(e, v, s) => onSelectChange(e, v, s, "state")}
                disable={stateDisable}
                dialogTitle={"Add State"}
                formError={formError.state}
                fetchDataFn={getStatesforCountry}
                fnFetchDataByID={getStateById}
                defaultValue={defaultState}
                allowNewAdd={
                  selectValues.country
                    ? true
                    : entityData.country_id
                      ? true
                      : false
                }
                renderForm={(fnDialogOpen, fnDialogValue, data) => (
                  <StateForm
                    setDialogOpen={fnDialogOpen}
                    setDialogValue={fnDialogValue}
                    data={data}
                    parentData={selectValues.country?.id || entityData.country_id}
                  />
                )}
              />
              <InputControl
                inputType={InputType.TEXT}
                name="city"
                id="city"
                label="City"
                error={formError?.city?.error}
                helperText={formError?.city?.msg}
                defaultValue={entityData.city}
                width={160}
                onKeyDown={() => {
                  setFormError((curr) => {
                    const { city, ...rest } = curr;
                    return rest;
                  });
                }}
              />
              <InputControl
                inputType={InputType.TEXT}
                name="pincode"
                id="pincode"
                label="Pin Code"
                width={160}
                error={formError?.pincode?.error}
                helperText={formError?.pincode?.msg}
                defaultValue={entityData.pincode}
                onKeyDown={() => {
                  setFormError((curr) => {
                    const { pincode, ...rest } = curr;
                    return rest;
                  });
                }}
              />
            </Box>
            <Box>
              <Tooltip
                title={
                  docData.length > 0 ? (
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
                  sx={{ float: "left", position: "relative" }}
                  onClick={() => setDialogOpen(true)}
                  aria-label="file"
                >
                  <Badge badgeContent={docData.length} color="primary">
                    <AttachFileIcon></AttachFileIcon>
                  </Badge>
                </IconButton>
              </Tooltip>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
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
            </Box>
            {dialogOpen && (
              <AddDialog title="" open={dialogOpen} setDialogOpen={setDialogOpen}>
                <DocModal
                  docData={docData}
                  setDocData={setDocData}
                  setDialogOpen={setDialogOpen}
                />
              </AddDialog>
            )}
          </form>
          <Snackbar
            open={snackOpen}
            autoHideDuration={1000}
            onClose={() => setSnackOpen(false)}
            message="Record Saved!"
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          />
        </Box>
      </>
    );
  }
