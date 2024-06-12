'use client'
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import {InputControl, InputType} from '@/app/Widgets/input/InputControl';
import Box from '@mui/material/Box';
import { createDepartment } from '../../../controllers/department.controller';
import Grid from '@mui/material/Grid';
import {nameMasterDataT, selectKeyValueT} from '@/app/models/models';
import Seperator from '../../seperator';
import Snackbar from '@mui/material/Snackbar';

export default function DepartmentForm(props: {
      setDialogOpen: (props: any) => void,
      setDialogValue: (props: any) => void,
    }) {
      const [formError, setFormError] = useState<Record<string, {msg: string, error: boolean}>>({});
      const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
      const [snackOpen, setSnackOpen] = React.useState(false);
    
      const handleCancel = ()=> {
        props.setDialogOpen? props.setDialogOpen(false) : null;
      }
    
      const handleSubmit = async (formData: FormData)=> {
        let data: { [key: string]: any } = {}; // Initialize an empty object
    
        formData = updateFormData(formData);
    
        for (const [key, value] of formData.entries()) {
          data[key] = value;
        }
    
        const result = await createEntity(data as nameMasterDataT);
        if (result.status){
          const newVal = {id: result.data[0].id, name: result.data[0].name};
          props.setDialogValue? props.setDialogValue(newVal.name) : null;
          props.setDialogOpen? props.setDialogOpen(false) : null;
          setFormError({});
          setSnackOpen(true);
        } else {
          const issues = result.data;
          // show error on screen
          const errorState: Record<string, {msg: string, error: boolean}> = {};
          for (const issue of issues) {
            errorState[issue.path[0]] = {msg: issue.message, error: true};
          }
          errorState["form"] = {msg: "Error encountered", error: true};
          setFormError(errorState);
        }
      }
    
      const updateFormData =  (formData: FormData) => {
        return formData;
      }
    
      async function createEntity(data: nameMasterDataT) {
        const result = await createDepartment(data);
        return result;
      }
    

  return(
    <>
      <Seperator>Add Department</Seperator>
      <Box id="sourceForm" sx={{ m: 2, p: 3 }}>
        {formError?.form?.error && <p style={{ color: "red" }}>{formError?.form.msg}</p>}
        <form action={handleSubmit}> 
          <Box
            sx={{
              display: 'grid',
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: 'repeat(2, 1fr)',
            }}>
            <InputControl
              autoFocus
              id="name"
              label="Department Name"
              inputType={InputType.TEXT}
              name="name"
              error={formError?.name?.error}
              helperText={formError?.name?.msg} 
            />
          </Box>
          <Grid container xs={12} md={12}>
            <Grid item xs={6} md={6}>
              <Box margin={1} sx={{ display: "flex" }}>
                <Box display="flex" justifyContent="flex-start" alignItems="flex-start" m={1}>
                  <Button onClick={handleCancel}>Cancel</Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} md={6}>
              <Box display="flex" justifyContent="flex-end" alignItems="flex-end" m={1}>
                <Button type="submit" variant="contained">Submit</Button>
              </Box>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={snackOpen}
          autoHideDuration={3000}
          onClose={()=>setSnackOpen(false)}
          message="Record Saved!"
          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        />
    </Box>
  </>
  );
}

