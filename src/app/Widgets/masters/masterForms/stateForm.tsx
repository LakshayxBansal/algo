
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import {InputControl, InputType} from '@/app/Widgets/input/InputControl';
import Box from '@mui/material/Box';
import { createState } from '@/app/controllers/masters.controller';
import Grid from '@mui/material/Grid';
import { optionsDataT } from '@/app/models/models';
import {nameMasterData} from '@/app/zodschema/zodschema';


export default function StateForm(props: {
      data:optionsDataT,
      setDialogOpen: (props: any) => void,
      setDialogValue: (props: any) => void,
    }) {
  const entityName = props.data.name;

  const [formError, setFormError] = useState<Record<string, {msg: string, error: boolean}>>({});

  const handleSubmit = async (formData: FormData)=> {
    const data = {
                  name: formData.get("name") as string,
                  alias: formData.get("alias") as string,
                  };
    const parsed = nameMasterData.safeParse(data);
    let result;
    let issues;

    if (parsed.success) {
      result = await createState(formData);
      if (result.status){
        const newVal = {id: result.data[0].id, name: result.data[0].name};
        props.setDialogValue(newVal);
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
          defaultValue={entityName}
          label="State Name"
          type={InputType.TEXT}
          name="name"
          error={formError?.name?.error}
          helperText={formError?.name?.msg} 
        />
        <InputControl
          id="alias"
          label="Alias"
          type={InputType.TEXT}
          name="alias"
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
  </>
  );
}

