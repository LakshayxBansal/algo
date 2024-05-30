'use client'
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import {InputControl, InputType} from '@/app/Widgets/input/InputControl';
import Box from '@mui/material/Box';
import { createContactGroup } from '../../../controllers/contactGroup.controller';
import Grid from '@mui/material/Grid';
import {nameMasterData} from '../../../zodschema/zodschema';
import { SelectMasterWrapper } from '@/app/Widgets/masters/selectMasterWrapper';
import { getContactGroup } from '@/app/controllers/contactGroup.controller';



export default function ContactGroupForm(props: {
      setDialogOpen: (props: any) => void,
      setDialogValue: (props: any) => void,
    }) {

  const [formError, setFormError] = useState<Record<string, {msg: string, error: boolean}>>({});

  // submit function. Save to DB and set value to the dropdown control
  const handleSubmit = async (formData: FormData)=> {
    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    const parsed = nameMasterData.safeParse(data);
    let result;
    let issues;

    if (parsed.success) {
      result = await createContactGroup(formData);
      if (result.status){
        const newVal = {id: result.data[0].id, name: result.data[0].name};
        props.setDialogValue(newVal.name);
      } else {
        issues = result?.data;
      }
    } else {
      issues = parsed.error.issues;
    } 
    
    if (parsed.success && result?.status) {
      props.setDialogOpen(false);
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
    props.setDialogOpen(false);
  }

  return(
    <>
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
          label="Group Name"
          inputType={InputType.TEXT}
          name="name"
          error={formError?.name?.error}
          helperText={formError?.name?.msg} 
        />
        <InputControl
          autoFocus
          id="alias"
          label="Alias"
          inputType={InputType.TEXT}
          name="alias"
          error={formError?.alias?.error}
          helperText={formError?.alias?.msg} 
        />        
        <SelectMasterWrapper
          name = {"parentgroup"}
          id = {"parentgroup"}
          label = {"Parent Group"}
          width = {210}
          dialogTitle={"Add Group"}
          fetchDataFn = {getContactGroup}
          allowNewAdd = {false}
          renderForm={(fnDialogOpen, fnDialogValue) => 
            <ContactGroupForm
              setDialogOpen={fnDialogOpen}
              setDialogValue={fnDialogValue}
            />
          }
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
  </>
  );
}

