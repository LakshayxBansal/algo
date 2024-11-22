import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  optionsDataT,
  organisationSchemaT,
  selectKeyValueT,
} from "@/app/models/models";
import Seperator from "../../seperator";
import {
  Badge,
  Collapse,
  Grid,
  IconButton,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import StateForm from "./stateForm";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { AddDialog } from "../addDialog";
import DocModal from "@/app/utils/docs/DocModal";

export default function OrganisationForm(props: masterFormPropsT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [docData, setDocData] = React.useState<docDescriptionSchemaT[]>(
    props?.data ? props?.data?.docData : []
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const entityData: organisationSchemaT = props.data ? props.data : {};
  const [defaultState, setDefaultState] = useState<optionsDataT | undefined>({
    id: entityData.state_id,
    name: entityData.state,
  } as optionsDataT);
  const [stateKey, setStateKey] = useState(0);
  const [printNameFn, setPrintNameFn] = useState(entityData.printName);
  const [stateDisable, setStateDisable] = useState(!entityData.country);

  const handlePrintNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPrintNameFn(event.target.value);
  };

  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    formData = updateFormData(data);

    const result = await persistEntity(data as organisationSchemaT);
    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name };
      props.setDialogValue ? props.setDialogValue(newVal) : null;
      setFormError({});
      setSnackOpen(true);
      setTimeout(() => {
        props.setDialogOpen ? props.setDialogOpen(false) : null;
      }, 1000);
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
      console.log("ERIRB I: ", errorState);

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
      if (values.country.id === 0) {
        setStateDisable(true);
      }
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

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          zIndex: 2,
          paddingY: "10px",
          bgcolor: "white",
        }}
      >
        <Seperator>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {props.data ? "Update Organisation" : "Add Organisation"}
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

      <Box id="sourceForm" sx={{ m: 1 }}>
        <form action={handleSubmit} noValidate>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <InputControl
                inputType={InputType.TEXT}
                autoFocus
                id="name"
                label="Name"
                name="name"
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
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <InputControl
                inputType={InputType.TEXT}
                id="alias"
                label="Alias"
                name="alias"
                error={formError?.alias?.error}
                helperText={formError?.alias?.msg}
                defaultValue={entityData.alias}
                onKeyDown={() => {
                  setFormError((curr) => {
                    const { alias, ...rest } = curr;
                    return rest;
                  });
                }}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <InputControl
                inputType={InputType.TEXT}
                id="printName"
                label="Print Name"
                name="printName"
                error={formError?.printName?.error}
                helperText={formError?.printName?.msg}
                defaultValue={printNameFn}
                onKeyDown={() => {
                  setFormError((curr) => {
                    const { printName, ...rest } = curr;
                    return rest;
                  });
                }}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <InputControl
                inputType={InputType.TEXT}
                id="pan"
                label="PAN"
                name="pan"
                error={formError?.pan?.error}
                helperText={formError?.pan?.msg}
                defaultValue={entityData.pan}
                onKeyDown={() => {
                  setFormError((curr) => {
                    const { pan, ...rest } = curr;
                    return rest;
                  });
                }}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <InputControl
                inputType={InputType.TEXT}
                id="gstin"
                label="GSTIN"
                name="gstin"
                error={formError?.gstin?.error}
                helperText={formError?.gstin?.msg}
                defaultValue={entityData.gstin}
                onKeyDown={() => {
                  setFormError((curr) => {
                    const { gstin, ...rest } = curr;
                    return rest;
                  });
                }}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <InputControl
                inputType={InputType.TEXT}
                label="Address Line 1"
                name="address1"
                id="address1"
                error={formError?.address1?.error}
                helperText={formError?.address1?.msg}
                defaultValue={entityData.address1}
                onKeyDown={() => {
                  setFormError((curr) => {
                    const { address1, ...rest } = curr;
                    return rest;
                  });
                }}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <InputControl
                inputType={InputType.TEXT}
                label="Address Line 2"
                name="address2"
                id="address2"
                error={formError?.address2?.error}
                helperText={formError?.address2?.msg}
                defaultValue={entityData.address2}
                onKeyDown={() => {
                  setFormError((curr) => {
                    const { address2, ...rest } = curr;
                    return rest;
                  });
                }}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <InputControl
                inputType={InputType.TEXT}
                name="city"
                id="city"
                label="City"
                error={formError?.city?.error}
                helperText={formError?.city?.msg}
                defaultValue={entityData.city}
                onKeyDown={() => {
                  setFormError((curr) => {
                    const { city, ...rest } = curr;
                    return rest;
                  });
                }}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <InputControl
                inputType={InputType.TEXT}
                name="pincode"
                id="pincode"
                label="Pin Code"
                error={formError?.pincode?.error}
                helperText={formError?.pincode?.msg}
                defaultValue={entityData.pincode}
                onKeyDown={() => {
                  setFormError((curr) => {
                    const { pincode, ...rest } = curr;
                    return rest;
                  });
                }}
                style={{ width: "100%" }}
              />
            </Grid>

            <Grid item xs={12} sm={3} md={3} lg={3}>
              <SelectMasterWrapper
                name={"country"}
                id={"country"}
                label={"Country"}
                dialogTitle={"Add country"}
                onChange={(e, v, s) => onSelectChange(e, v, s, "country")}
                fetchDataFn={getCountries}
                width={352}
                fnFetchDataByID={getCountryById}
                formError={formError.country}
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
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <SelectMasterWrapper
                key={stateKey}
                name={"state"}
                id={"state"}
                label={"State"}
                onChange={(e, v, s) => onSelectChange(e, v, s, "state")}
                disable={stateDisable}
                dialogTitle={"Add State"}
                fetchDataFn={getStatesforCountry}
                fnFetchDataByID={getStateById}
                defaultValue={defaultState}
                formError={formError.state}
                width={352}
                renderForm={(fnDialogOpen, fnDialogValue, data) => (
                  <StateForm
                    setDialogOpen={fnDialogOpen}
                    setDialogValue={fnDialogValue}
                    data={data}
                    parentData={
                      selectValues.country?.id || entityData.country_id
                    }
                  />
                )}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
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
              </Box>

              <Box>
                <Button onClick={handleCancel} tabIndex={-1}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ width: "15%", marginLeft: "5%" }}
                >
                  Submit
                </Button>
              </Box>
            </Grid>
            {dialogOpen && (
              <AddDialog
                title=""
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