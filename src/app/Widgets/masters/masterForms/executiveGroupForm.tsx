'use client'
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { InputControl, InputType } from '@/app/Widgets/input/InputControl';
import Box from '@mui/material/Box';
import { getExecutiveGroup, createExecutiveGroup,updateExecutiveGroup } from '@/app/controllers/executiveGroup.controller';
import Grid from '@mui/material/Grid';
import { executiveGroupSchema, nameMasterData } from '../../../zodschema/zodschema';
import { optionsDataT, executiveGroupSchemaT, masterFormPropsT } from '@/app/models/models';
import AutocompleteDB from '../../AutocompleteDB';
import Seperator from '../../seperator';



export default function (props: masterFormPropsT) {
  const [formError, setFormError] = useState<Record<string, { msg: string, error: boolean }>>({});
  const entityData : executiveGroupSchemaT = props.data ? props.data : {};
  console.log(entityData)
  // submit function. Save to DB and set value to the dropdown control
  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {}; // Initialize an empty object
  
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
      const result = await persistEntity(data as executiveGroupSchemaT);
      // console.log(result);
      if (result.status) {
        const newVal = { id: result.data[0].id, name: result.data[0].name };
        props.setDialogValue ? props.setDialogValue(newVal.name) : null;
        props.setDialogOpen ? props.setDialogOpen(false) : null;
        setFormError({});
      }
     else {
      // show error on screen
      const issues = result.data;
      const errorState: Record<string, { msg: string, error: boolean }> = {};
      for (const issue of issues) {
        errorState[issue.path[0]] = { msg: issue.message, error: true };
      }
      errorState["form"] = {msg: "Error encountered", error: true};
      setFormError(errorState);
    }
  }
  
async function persistEntity(data : executiveGroupSchemaT) {
  let result;
  if (props.data) {
    Object.assign(data, { id: props.data.id });
    result = await updateExecutiveGroup(data);
  } else {
    result = await createExecutiveGroup(data);
  }
  return result;
}
const randomFunction = ()=>{

}

const handleCancel = () => {
  props.setDialogOpen ? props.setDialogOpen(false) : null;
}

return (
  <>
    <Seperator>{props.data ? "Modify Executive Group" : "Add Executive Group"}</Seperator>
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
          label="Executive Group Name"
          inputType={InputType.TEXT}
          name="name"
          defaultValue={entityData.name}
          error={formError?.name?.error}
          helperText={formError?.name?.msg}
        />
        <AutocompleteDB<optionsDataT>
          name={"parentgroup"}
          id={"parentgroup"}
          label={"Parent Executive Group"}
          defaultValue={entityData.parent}
          width={210}
          fnSetModifyMode={randomFunction}
          fetchDataFn={getExecutiveGroup}
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

