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
import StateForm from "./countryForm";
import {
  masterFormPropsT,
  optionsDataT,
  organisationSchemaT,
  selectKeyValueT,
} from "@/app/models/models";
import Seperator from "../../seperator";
import { Collapse, IconButton, Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

export default function OrganisationForm(props: masterFormPropsT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [snackOpen, setSnackOpen] = React.useState(false);

  const entityData: organisationSchemaT = props.data ? props.data : {};
  const [defaultState, setDefaultState] = useState<optionsDataT | undefined>({
    id: entityData.state_id,
    name: entityData.state,
  } as optionsDataT);
  const [stateKey, setStateKey] = useState(0);

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
      props.setDialogValue ? props.setDialogValue(newVal.name) : null;
      setFormError({});
      setSnackOpen(true);
      setTimeout(() => {
        props.setDialogOpen ? props.setDialogOpen(false) : null;
      }, 1000);
    } else {
      const issues = result.data;
      // show error on screen
      const errorState: Record<string, { msg: string; error: boolean }> = {};
      for (const issue of issues) {
        for (const path of issue.path) {
          errorState[path] = { msg: issue.message, error: true };
        }
      }
      errorState["form"] = { msg: "Error encountered", error: true };
      setFormError(errorState);
    }
  };

  const updateFormData = (data: any) => {
    data.country_id = selectValues.country ? selectValues.country.id : undefined;
    data.state_id = selectValues.state ? selectValues.state.id : undefined;

    return data;
  };

  async function persistEntity(data: organisationSchemaT) {
    let result;
    if (props.data) {
      Object.assign(data, { id: props.data.id });
      result = await updateOrganisation(data);
    } else {
      result = await createOrganisation(data);
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
    values[name] = val;

    if (name === "country") {
      values["states"] = {};
      setDefaultState(undefined);
      setStateKey((prev) => 1 - prev);
      values.state = null;
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
          top: "0px",
          zIndex: 2,
          paddingY: "10px",
          bgcolor: "white",
        }}
      >
        <Seperator>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {props.data ? "Update Organisation" : "Add Organisation"}
            <IconButton onClick={handleCancel}>
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
      <Box id="sourceForm" sx={{ m: 2 }}>
        <form action={handleSubmit} noValidate>
          <Box
            sx={{
              display: "grid",
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: "2fr 1fr",
            }}
          >
            <InputControl
              inputType={InputType.TEXT}
              autoFocus
              id="name"
              label="Name"
              name="name"
              required
              fullWidth
              error={formError?.name?.error}
              helperText={formError?.name?.msg}
              defaultValue={entityData.name}
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
              fullWidth
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
          </Box>
          <Box
            sx={{
              display: "grid",
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            <InputControl
              inputType={InputType.TEXT}
              id="printName"
              label="Print Name"
              name="printName"
              fullWidth
              error={formError?.printName?.error}
              helperText={formError?.printName?.msg}
              defaultValue={entityData.printName}
              onKeyDown={() => {
                setFormError((curr) => {
                  const { printName, ...rest } = curr;
                  return rest;
                });
              }}
            />
            <InputControl
              inputType={InputType.TEXT}
              id="pan"
              label="PAN"
              name="pan"
              fullWidth
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
              id="gstin"
              label="GSTIN"
              name="gstin"
              fullWidth
              error={formError?.gstin?.error}
              helperText={formError?.gstin?.msg}
              defaultValue={entityData.gstin}
              onKeyDown={() => {
                setFormError((curr) => {
                  const { gstin, ...rest } = curr;
                  return rest;
                });
              }}
            />
          </Box>
          <InputControl
            inputType={InputType.TEXT}
            label="Address Line 1"
            name="address1"
            id="address1"
            fullWidth
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
            fullWidth
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
          <InputControl
            inputType={InputType.TEXT}
            label="Address Line 3"
            name="address3"
            id="address3"
            fullWidth
            error={formError?.address3?.error}
            helperText={formError?.address3?.msg}
            defaultValue={entityData.address3}
            onKeyDown={() => {
              setFormError((curr) => {
                const { address3, ...rest } = curr;
                return rest;
              });
            }}
          />
          <Box
            sx={{
              display: "grid",
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            <SelectMasterWrapper
              name={"country"}
              id={"country"}
              label={"Country"}
              dialogTitle={"Add country"}
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
            <SelectMasterWrapper
              key={stateKey}
              name={"state"}
              id={"state"}
              label={"State"}
              onChange={(e, v, s) => onSelectChange(e, v, s, "state")}
              disable={selectValues.country || entityData.country_id ? false : true}
              dialogTitle={"Add State"}
              fetchDataFn={getStatesforCountry}
              defaultValue={defaultState}
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
              fullWidth
              error={formError?.city?.error}
              helperText={formError?.city?.msg}
              defaultValue={entityData.city}
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
              fullWidth
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 2,
            }}
          >
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "15%", marginLeft: "5%" }}
            >
              Submit
            </Button>
          </Box>
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
