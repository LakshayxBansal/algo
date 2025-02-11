"use client";

import React, { useRef, useState } from "react";
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
import { Alert, Box, Button, Collapse, Grid, IconButton, Portal, Snackbar } from "@mui/material";
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
  const formRef = useRef<HTMLFormElement>(null);
  const [phoneKey, setPhoneKey] = useState(0);

  

  const entityData: any = props.data
    ? props.data
    : ({
        name: "",
        age: "",
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

  const [selectValues, setSelectValues] = useState<selectKeyValueT>({
    country: {id:entityData?.country_id,name:entityData.country_name},
    state: {id:entityData?.state_id,name:entityData.state_name}
  });

  const [stateDisable, setStateDisable] = useState(!entityData.country_id);
  const [stateKey, setStateKey] = useState(true);
  const [snackOpen, setSnackOpen] = React.useState(false);


  const onSelectChange = async (
    event: React.SyntheticEvent,
    val: any,
    setDialogValue: any,
    name: string
  ) => {
    let values = { ...selectValues };

    if(name==="country"){
      values['state']={};
      setDefaultState(undefined);
      setStateDisable(true);
      setStateKey((prev)=> !prev)
    }

    values[name] = val ? val : {id:0,name:''};
  
    setSelectValues(values);
  };
  
  async function getStatesforCountry(stateStr: string) {
    const country = selectValues?.country?.name;
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

    if (!result.status || (result.data && result.data.length > 0)) {
      return { status: false, data: result.data };
    }

    return result;
  }

  const clearFormError = () => {
    setFormError((curr) => {
      const { form, ...rest } = curr;
      return rest;
    });
  };

  const clearForm = () => {
    setSelectValues({ country: { id: 0, name: "" }, state: { id: 0, name: "" } }); // Reset selects
    setDefaultState(undefined);
    setStateDisable(true);
    setStateKey((prev) => !prev);
    setFormError({});
    formRef.current?.reset();
    const emptyEntity = {
      name: "",
      age: "",
      email: "",
      phone: "",
      country_name: "",
      country_id: 0,
      state_name: "",
      state_id: 0,
      user_id: 0,
    };
    Object.assign(entityData, emptyEntity);
    setPhoneKey((prev) => prev + 1);
  };

  const handleSubmit = async (formData: FormData) => {
    // e.preventDefault();
    let data: { [key: string]: any } = {};
 
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    console.log("data", data);
    data.age = Number(data.age);
    console.log("selectValues", selectValues);
    
    data.country_id = selectValues.country?.id ;
    console.log("data.country_id", data.country_id);
    data.country = selectValues.country?.name;
    console.log("data.country", data.country);
    data.state= selectValues.state?.name;
    console.log("data.state", data.state);
    data.state_id = selectValues.state?.id ;
    console.log("data.state_id", data.state_id);
   //data.phone = data.phone.replace(/\s+/g, "");
    try {
      const result = await persistEntity(data as any);
      console.log("result", result);
      if (result.status) {
        setFormError({});
        setSnackOpen(true);
        //formRef.current?.reset();
        return;
      } else {
        const issues = result.data;
        
        const errorState: Record<string, { msg: string; error: boolean }> = {};

        issues.forEach((issue: any) => {
          let path = Array.isArray(issue.path) ? issue.path[0] : issue.error_path;
          if (path === "country_id") path = "country";
          if (path === "state_id") path = "state";
          errorState[path] = {
            msg: issue.message || issue.error_text,
            error: true,
          };
        });

        if (Object.keys(errorState).length > 0) {
          errorState["form"] = { msg: "Please fix the errors below", error: true };
        }
        setFormError(errorState);
        setSnackOpen(false);
        return;

      }

    } catch (error) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setFormError({
        form: {
          msg: errorMessage,
          error: true,
        },
      });
      setSnackOpen(false);
    }
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
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <form ref={formRef} action={handleSubmit} noValidate autoComplete="off">
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
              key={phoneKey}
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
              style={{marginLeft:"10px"}}
            />

            <SelectMasterWrapper
              key={entityData.country_id}
              required={true}
              name={"country"}
              id={"country"}
              label={"Country"}
              dialogTitle={"Country"}
              error={true}
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
              //defaultValue={selectValues.country}
            
              renderForm={(fnDialogOpen, fnDialogValue, data) => (
                <CountryForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                  data={data}
                />
              )}
              formError={formError?.country}
              setFormError = {setFormError}
            />

            <SelectMasterWrapper
              key={`state-${selectValues.country?.id}`}
              name={"state"}
              required={true}
              id={"state"}
              label={"State"}
              onChange={(e, v, s) => onSelectChange(e, v, s, "state")}
              width={375}
              dialogTitle={"State"}
              formError={formError?.state}
              setFormError={setFormError}
              fetchDataFn={getStatesforCountry}
              fnFetchDataByID={getStateById}
              defaultValue={defaultState}
              allowModify={stateDisable}
              allowNewAdd={stateDisable}
              renderForm={(fnDialogOpen, fnDialogValue, data) => (
                <StateForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                  data={data}
                  parentData={selectValues.country?.id || entityData.country_id}
                />
                
              )}
            />

            <Button
              onClick = {clearForm}
            >
              Clear Form
            </Button>

            <Button
              type="submit"
              variant="contained"
              sx={{ width: "15%", marginLeft: "5%" }}
            >
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
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