'use client'
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import {InputControl, InputType} from '@/app/Widgets/input/InputControl';
import Box from '@mui/material/Box';
import { createEnquiryCategory } from '../../../controllers/enquiryCategory.controller';
import {nameMasterData} from '../../../zodschema/zodschema';
import Snackbar from '@mui/material/Snackbar';
import Paper from '@mui/material/Paper';
import Seperator from '../../seperator';


export default function CategoryForm(props: {
  setDialogOpen?: (props: any) => void,
  setDialogValue?: (props: any) => void,
    }) {

  const [formError, setFormError] = useState<Record<string, {msg: string, error: boolean}>>({});
  const [snackOpen, setSnackOpen] = React.useState(false);

  // submit function. Save to DB and set value to the dropdown control
  const handleSubmit = async (formData: FormData)=> {
    const data = {
                  name: formData.get("name") as string,
                  };
    const parsed = nameMasterData.safeParse(data);
    let result;
    let issues;

    if (parsed.success) {
      result = await createEnquiryCategory(formData);
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
      <Seperator>Add Category</Seperator>
      <Box sx={{ m: 2, p: 3 }}>
        {formError?.form?.error && <p style={{ color: "red" }}>{formError?.form.msg}</p>}
        <form action={handleSubmit}> 
          <Box
            sx={{
              display: 'grid',
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: 'repeat(1, 1fr)',
            }}>
            <InputControl
              autoFocus
              id="category_master"
              label="Category Name"
              type={InputType.TEXT}
              name="name"
              fullWidth
              error={formError?.name?.error}
              helperText={formError?.name?.msg} 
            />
          </Box>
          <Box sx={{
            mt:3,
            display: 'grid',
            columnGap: 3,
            rowGap: 1,
            gridTemplateColumns: 'repeat(3, 1fr)',
            }}>
              <Button>Upload File</Button>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="submit" variant="contained">Submit</Button>
          </Box>
        </form>
        <Snackbar
          open={snackOpen}
          autoHideDuration={3000}
          onClose={()=>setSnackOpen(false)}
          message="Record Saved!!"
          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        />
      </Box>
    </Paper>
  );
}

