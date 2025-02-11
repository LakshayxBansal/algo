
"use client";

import React, { useState } from "react";
import { InputControl, InputType } from "../Widgets/input/InputControl";
import { optionsDataT, selectKeyValueT } from "../models/models";
import { useParams, usePathname } from "next/navigation";
import CountryForm from "../Widgets/masters/masterForms/countryForm";
import { SelectMasterWrapper } from "../Widgets/selectMasterWrapper/selectMasterWrapper";
import StateForm from "../Widgets/masters/masterForms/stateForm";
import {
  getCountries,
  getCountryById,
  getStateById,
  getStates,
} from "../controllers/masters.controller";
import { Alert, Box, Button, Collapse, IconButton, Portal, Snackbar } from "@mui/material";
import {
  createProfile,
  updateProfile,
} from "../controllers/profile.controller";
import { CreateProfileInputT } from "../models/profile.model";
import CloseIcon from "@mui/icons-material/Close";

export default function Home(props: any) {
  
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});

  const params = useParams();
  const profileId = params.id ? Number(params.id) : null;

  const entityData: any = props.data
    ? props.data
    : ({
        name: "",
        age: 0,
        email: "",
        phone: "",
        country_name: "",
        country_id: 0,
        state_name: "",
        state_id: 0,
        user_id: 0,
      });



  const [defaultState, setDefaultState] = useState<optionsDataT | undefined>(
    entityData.state_name
      ? { id: entityData.state_id, name: entityData.state_name }
      : undefined
  );

  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [stateDisable, setStateDisable] = useState(!entityData.country_id);
  const [stateKey, setStateKey] = useState(0);
  const [snackOpen, setSnackOpen] = React.useState(false);


  const onSelectChange = async (
    event: React.SyntheticEvent,
    val: any,
    setDialogValue: any,
    name: string
  ) => {
    let values = { ...selectValues };
    values[name] = val ? val : { id: 0, name: " " };
  
    if (name === "country") {
      setStateDisable(false); // Enable the state selector
  
      // Clear state data when a new country is selected
      values["state"] = undefined;  
      setDefaultState(undefined);    // Clear the default state value
      setSelectValues(values);
  
      if (!val || val.id === 0) {
        setStateDisable(true);       // Disable if no country is selected
      }
      if(values.country.id){
        setStateDisable(true);
      }
  
      const newKey = 1 - stateKey;   // Force re-render of SelectMasterWrapper
      setStateKey(newKey);
    }
    setSelectValues(values);
  };
  

  async function getStatesforCountry(stateStr: string) {
    const country = selectValues.country?.name || "Unknown Country";
    const states = await getStates(stateStr, country);
    return states.length > 0 ? states : [];
  }

  async function persistEntity(data: CreateProfileInputT) {
    let result;
    if (!profileId) {
      result = await createProfile(data);
    } else {
      result = await updateProfile(data,profileId);
    }
    return result;
  }

  const clearFormError = () => {
    setFormError((curr) => {
      const { form, ...rest } = curr;
      return rest;
    });
  };

  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {};
 
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    console.log("data", data);
    data.age = Number(data.age);
    data.country_id = selectValues.country?.id || entityData.country_id || 0;
    data.state_id = selectValues.state?.id || entityData.state_id || 0;
    data.phone = data.phone.replace(/\s+/g, "");
    try {
      const result = await persistEntity(data as any);
      console.log("result", result);
      if (result.status) {
        setFormError({});
        setSnackOpen(true);
      } else {
        const issues = result.data;
        console.log(typeof(issues));
        console.log("issues", issues);
        const errorState: Record<string, { msg: string; error: boolean }> = {};

        issues.forEach(
          (issue: {
            error_path: string;
            error_text: string;
          }) => {
            errorState[issue.error_path] = {
              msg: issue.error_text,
              error: true,
            };
          }
        );
        
        setFormError(errorState);
        
      }
    } catch (error) {
      setFormError({
        form: {
          msg: "An unexpected error occurred. Please try again.",
          error: true,
        },
      });
    }
  };
  
  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  return (
    <>
      <Collapse in={!!formError?.form?.msg}>
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

      <Box id="home" sx={{ m: 1, p: 3 }}>
        <form action={handleSubmit} noValidate autoComplete="off">
          <InputControl
            autoFocus
            inputType={InputType.TEXT}
            name="name"
            id="name"
            label="Name"
            required
            titleCase={true}
            defaultValue={entityData.name}
            error={formError?.name?.error}
            helperText={formError?.name?.msg}
            setFormError={setFormError}
          />

          <InputControl
            autoFocus
            inputType={InputType.TEXT}
            type="number"
            name="age"
            id="age"
            label="Age"
            required
            titleCase={true}
            defaultValue={entityData.age}
            error={formError?.age?.error}
            helperText={formError?.age?.msg}
            setFormError={setFormError}
          />

          <InputControl
            inputType={InputType.PHONE}
            name="phone"
            id="phone"
            label="Phone"
            required
            defaultValue={entityData.phone}
            error={formError?.phone?.error}
            helperText={formError?.phone?.msg}
            setFormError={setFormError}
          />

          <InputControl
            inputType={InputType.EMAIL}
            name="email"
            id="email"
            label="Email"
            required
            titleCase={true}
            defaultValue={entityData.email}
            autoComplete="off"
            error={formError?.email?.error}
            helperText={formError?.email?.msg}
            setFormError={setFormError}
          />

          <SelectMasterWrapper
            key={"country"}
            required={true}
            name={"country"}
            id={"country"}
            label={"Country"}
            dialogTitle={"Country"}
            width={375}
            onChange={(e, v, s) => onSelectChange(e, v, s, "country")}
            fetchDataFn={getCountries}
            fnFetchDataByID={getCountryById}
            defaultValue={
              entityData.country_name
                ? {
                    id: entityData.country_id,
                    name: entityData.country_name, 
                  }
                : undefined
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
            required={true}
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
          />

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
        </form>
      </Box>
      <Portal>
          <Snackbar
            open={snackOpen}
            autoHideDuration={3000}
            onClose={() => setSnackOpen(false)}
            message="Record Saved!"
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          />
      </Portal>
    </>
  );
}