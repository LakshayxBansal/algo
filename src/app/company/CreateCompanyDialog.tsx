'use client'
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { Alert, Collapse, IconButton, Paper, Snackbar } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createCompany } from '../controllers/company.controller';
import { companySchemaT, selectKeyValueT } from '../models/models';
import { InputControl, InputType } from '../Widgets/input/InputControl';
import { SelectMasterWrapper } from '../Widgets/masters/selectMasterWrapper';
import Seperator from '../Widgets/seperator';
import CloseIcon from '@mui/icons-material/Close';
import { getCountries, getStates } from '../controllers/masters.controller';
import CountryForm from '../Widgets/masters/masterForms/countryForm';
import StateForm from '../Widgets/masters/masterForms/stateForm';

export interface compDialogPropT {
  email: string,
  callBackParent: ()=>Promise<void>
}

export default function CreateCompanyDialog(props: compDialogPropT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [snackOpen, setSnackOpen] = React.useState(false);


  const email = props.email;
  const callback = props.callBackParent;
  const openDialog = ()=> {
    setDialogOpen(true);
  }

  const updateFormData = (data: any) => { 
    data.country_id = selectValues.country ? selectValues.country.id : 0;
    data.state_id = selectValues.state ? selectValues.state.id : 0;
    return data;
  };


  const handleSubmit = async (formData: FormData)=> {
    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    formData = updateFormData(data);    

    const result = await createCompany(data as companySchemaT, email);
    if (result.status) {
      setFormError({});
      setSnackOpen(true);
      setTimeout(() => {
        setDialogOpen(false);
      }, 1000);
      callback();
    } else {
      const issues = result.data;
      // show error on screen
      const errorState: Record<string, { msg: string; error: boolean }> = {};
      for (const issue of issues) {
        for (const path of issue.path) {
          errorState[path] = { msg: issue.message, error: true };
        }
      }
      setFormError(errorState);
    }
  }

  const handleCancel = ()=> {
    setDialogOpen(false);
  }

  const clearFormError = () => {
    setFormError(curr => {
      // remove form key from object
      const {form, ...rest} = curr;
      return rest;
    }); 
  }

  return (
    <>
      <Button                   
        variant="contained"
        onClick={openDialog}
        sx={{
        ml: 5, 
        display: 'flex',  
        backgroundColor: '#4285F4',
        alignItems: 'center',
        border: 'none',
        textTransform: 'none',
        justifyContent: 'center',
        }}>
          Create
      </Button>
      <Dialog open={dialogOpen}>
        <Paper>
        <Seperator>Add Company</Seperator>
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
        <Box sx={{ m: 2, p: 3 }}>
          <form action={handleSubmit}>
            <Box
              sx={{
                display: "grid",
                columnGap: 3,
                gridTemplateColumns: "repeat(2, 1fr)",
                paddingBottom: "10px"
              }}
            >
              <InputControl
                inputType={InputType.TEXT}
                autoFocus
                id="name"
                label="Name"
                name="name"
                error={formError?.name?.error}
                helperText={formError?.name?.msg}
              />
              <InputControl
                inputType={InputType.TEXT}
                id="alias"
                label="Alias"
                name="alias"
                error={formError?.alias?.error}
                helperText={formError?.alias?.msg}
              />
            </Box>
            <Box
              sx={{
                display: "grid",
                columnGap: 3,
                rowGap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
              }}
            >
              <InputControl
                inputType={InputType.TEXT}
                label="Address Line 1"
                name="add1"
                id="add1"
                error={formError?.add1?.error}
                helperText={formError?.add1?.msg}
                fullWidth
              />
              <InputControl
                inputType={InputType.TEXT}
                label="Address Line 2"
                name="add2"
                id="add2"
                error={formError?.add2?.error}
                helperText={formError?.add2?.msg}
                fullWidth
              />

              <InputControl
                inputType={InputType.TEXT}
                name="city"
                id="city"
                label="City"
                error={formError?.city?.error}
                helperText={formError?.city?.msg}
              />
              <SelectMasterWrapper
                name={"country"}
                id={"country"}
                label={"Country"}
                width={210}
                dialogTitle={"country"}
                onChange={(e, val, s) =>
                  setSelectValues({ ...selectValues, country: val })
                }
                fetchDataFn={getCountries}
                renderForm={(fnDialogOpen, fnDialogValue, data) => (
                  <CountryForm
                    setDialogOpen={fnDialogOpen}
                    setDialogValue={fnDialogValue}
                    data={data}
                  />
                )}
              />
              <SelectMasterWrapper
                name={"state"}
                id={"state"}
                label={"State"}
                width={210}
                onChange={(e, val, s) =>
                  setSelectValues({ ...selectValues, state: val })
                }
                dialogTitle={"State"}
                fetchDataFn={(stateStr: string) =>
                  getStates(stateStr, selectValues.country?.name)
                }
                disable={selectValues.country ? false : true}
                renderForm={(fnDialogOpen, fnDialogValue, data) => (
                  <StateForm
                    setDialogOpen={fnDialogOpen}
                    setDialogValue={fnDialogValue}
                    data={data}
                    parentData={selectValues.country?.id}
                  />
                )}
              />
              <InputControl
                inputType={InputType.TEXT}
                name="pincode"
                id="pincode"
                label="Pin Code"
                error={formError?.pincode?.error}
                helperText={formError?.pincode?.msg}
              />
            </Box>
            <Box
              sx={{
                mt: 3,
                display: "grid",
                columnGap: 3,
                rowGap: 1,
                gridTemplateColumns: "repeat(3, 1fr)",
              }}
            >
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="submit" variant="contained">
                Create
              </Button>
            </Box>
          </form>
          <Snackbar
            open={snackOpen}
            autoHideDuration={1000}
            onClose={() => setSnackOpen(false)}
            message="Record Saved!!"
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          />
        </Box>
        </Paper>
      </Dialog>
    </>
  )
}