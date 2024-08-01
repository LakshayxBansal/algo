'use client'
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import {InputControl, InputType} from '@/app/Widgets/input/InputControl';
import Box from '@mui/material/Box';
import { createContactGroup } from '../../../controllers/contactGroup.controller';
import { SelectMasterWrapper } from '@/app/Widgets/masters/selectMasterWrapper';
import { getContactGroup } from '@/app/controllers/contactGroup.controller';
import {contactGroupSchemaT, selectKeyValueT} from '@/app/models/models';
import Seperator from '../../seperator';
import Snackbar from '@mui/material/Snackbar';
import {masterFormPropsT} from '@/app/models/models';



export default function ContactGroupForm(props: masterFormPropsT) {
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

    const result = await createEntity(data as contactGroupSchemaT);
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
    formData.append("contactGroup_id", selectValues.parent? selectValues.parent.id : 0);

    return formData;
  }

  async function createEntity(data: contactGroupSchemaT) {
    const result = await createContactGroup(data);
    return result;
  }
    

  return(
    <>
    <Seperator>Add Contact Group</Seperator>
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
            name = {"parent"}
            id = {"parent"}
            label = {"Parent Group"}
            width = {210}
            dialogTitle={"Add Parent Group"}
            onChange={(e, val, s) => setSelectValues({...selectValues, "parent": val})}
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
          message="Record Saved!"
          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      />
    </Box>
  </>
  );
}

