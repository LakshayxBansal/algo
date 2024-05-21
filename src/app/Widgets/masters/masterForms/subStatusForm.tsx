'use client'
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import {InputControl, InputType} from '@/app/Widgets/input/InputControl';
import Box from '@mui/material/Box';
import { createEnquiryStatus } from '@/app/controllers/enquiryStatus.controller';
import Grid from '@mui/material/Grid';
import {nameMasterData} from '../../../zodschema/zodschema';
import Seperator from '../../seperator';
import Snackbar from '@mui/material/Snackbar';
import Paper from '@mui/material/Paper';
import { optionsDataT } from '@/app/models/models';
import AutocompleteDB from '@/app/Widgets/AutocompleteDB';
import { getEnquiryStatus } from '@/app/controllers/enquiryStatus.controller';

export default function SubStatusForm(props: {
  setDialogOpen?: (props: any) => void,
  setDialogValue?: (props: any) => void,
    }) {

  const [formError, setFormError] = useState<Record<string, {msg: string, error: boolean}>>({});
  const [snackOpen, setSnackOpen] = React.useState(false);

  // submit function. Save to DB and set value to the dropdown control
  const handleSubmit = async (formData: FormData)=> {
    const data = { name: formData.get("name") as string, };
    const parsed = nameMasterData.safeParse(data);
    let result;
    let issues;

    if (parsed.success) {
      result = await createEnquiryStatus(formData);
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
      <Seperator>Add Sub-Status</Seperator>
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
            <AutocompleteDB<optionsDataT>
              name = {"status"}
              id = {"status"}
              label = {"Call Status"}
              fetchDataFn = {getEnquiryStatus}
            /> 
            <InputControl
              autoFocus
              id="substatus_name"
              label="Sub-Status Name"
              type={InputType.TEXT}
              name="substatus_name"
              error={formError?.substatus_name?.error}
              helperText={formError?.substatus_name?.msg} 
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

