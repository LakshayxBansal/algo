'use client'
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import {InputControl, InputType} from '@/app/Widgets/input/InputControl';
import Box from '@mui/material/Box';
import { createEnquirySubStatus } from '@/app/controllers/enquirySubStatus.controller';
import Grid from '@mui/material/Grid';
import {enquirySubStatusMaster} from '../../../zodschema/zodschema';
import Seperator from '../../seperator';
import Snackbar from '@mui/material/Snackbar';
import Paper from '@mui/material/Paper';

export default function SubStatusForm(props: {
  setDialogOpen?: (props: any) => void,
  setDialogValue?: (props: any) => void,
  statusName?: string
    }) {

  const [formError, setFormError] = useState<Record<string, {msg: string, error: boolean}>>({});
  const [snackOpen, setSnackOpen] = React.useState(false);

  // submit function. Save to DB and set value to the dropdown control
  const handleSubmit = async (formData: FormData)=> {
    formData.append('status', props.statusName as string);
    let result;
    let issues;
    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    const parsed = enquirySubStatusMaster.safeParse(data);
    if (parsed.success) {
      result = await createEnquirySubStatus(formData);
      if (result.status){
        const newVal = {id: result.data[0].id, name: result.data[0].name};
        props.setDialogValue? props.setDialogValue(newVal.name) : null;
        setSnackOpen(true);
      } else {
        issues = result?.data;
      }
    } else {
      issues = parsed.error.issues;
    } 
    
    if (parsed.success && result?.status) {
      props.setDialogOpen? props.setDialogOpen(false) : null;
    } else {
      // show error on screen
      const errorState: Record<string, {msg: string, error: boolean}> = {};
      for (const issue of issues) {
        errorState[issue.path[0]] = {msg: issue.message, error: true};
      }
      setFormError(errorState);
    }    
  }


  const handleCancel = ()=> {
    props.setDialogOpen? props.setDialogOpen(false) : null;
  }

  return(
    <Paper>
      <Seperator>{"Add Sub-Status for " + props.statusName} </Seperator>
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
              label="Sub-Status Name"
              type={InputType.TEXT}
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
    </Paper>
  );
}

