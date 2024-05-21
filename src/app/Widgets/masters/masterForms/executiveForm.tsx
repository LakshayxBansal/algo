'use client'
import React, { useState } from 'react';
import {InputControl, InputType}  from '@/app/Widgets/input/InputControl';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { getDepartment } from '@/app/controllers/department.controller';
import { executiveSchema } from '@/app/zodschema/zodschema';
import { SelectMasterWrapper } from '@/app/Widgets/masters/selectMasterWrapper';
import DepartmentForm from './departmentForm';
import {createExecutive} from '@/app/controllers/executive.controller';
//import { getExecutiveGroup } from '@/app/controllers/executiveGroup.controller';
//import ExecutiveGroupForm from '@/app/Widgets/masters/masterForms/executiveGroupForm';
import AreaForm from './areaForm';
import { getArea } from '@/app/controllers/area.controller';
import { getExecutiveRole } from '@/app/controllers/executiveRole.controller';
import { getExecutiveGroup } from '@/app/controllers/executiveGroup.controller';
import { getBizAppUser } from '@/app/controllers/user.controller'
import AddressComposite from '@/app/Widgets/composites/addressComposite';
import Seperator from '../../seperator';
import Snackbar from '@mui/material/Snackbar';
import ExecutiveRoleForm from './executiveRoleForm';
import ExecutiveGroupForm from './executiveGroupForm';
import ExecutiveDeptForm from './executiveDeptForm';
import TextField from '@mui/material/TextField';



export default function ExecutiveForm(props: {
  setDialogOpen?: (props: any) => void,
  setDialogValue?: (props: any) => void,
    }) {
  const [formError, setFormError] = useState<Record<string, {msg: string, error: boolean}>>({});
  const [snackOpen, setSnackOpen] = React.useState(false);


  async function getApplicationUser(searchStr: string) {
    let dbResult = await getBizAppUser(searchStr, true, true, false, false);
    dbResult = [{id:0, name: "Send invite..."}, ...dbResult];
    if (dbResult.length > 0){
      return dbResult;
    } 
  }


  const handleSubmit = async (formData: FormData)=> {
    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    data["call_type"] = "Enquiry";
    const parsed = executiveSchema.safeParse(data);
    let result;
    let issues;

    if (parsed.success) {
      result = await createExecutive(formData);
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
        for (const path of issue.path) {
          errorState[path] = {msg: issue.message, error: true};
        }
      }
      setFormError(errorState);
    }    
  }


  const handleCancel = ()=> {
    props.setDialogOpen? props.setDialogOpen(false) : null;
  }



  return(
    <>
      <Seperator>Add Executive</Seperator>
      <Box id="sourceForm" sx={{ m: 2, p: 3 }}>
        {formError?.form?.error && <p style={{ color: "red" }}>{formError?.form.msg}</p>}
        <form action={handleSubmit}> 
          <Box 
            sx={{ display: 'grid', 
                  columnGap: 3,
                  rowGap: 1,
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                }}>
            <InputControl
              type={InputType.TEXT}
              autoFocus                
              id="name"
              label="Name"
              name="name"
              required 
              error={formError?.name?.error}
              helperText={formError?.name?.msg} 
            />
            <InputControl
              type={InputType.TEXT}     
              id="alias"
              label="Alias"
              name="alias"
              error={formError?.alias?.error}
              helperText={formError?.alias?.msg} 
            />
            <SelectMasterWrapper
              name = {"area"}
              id = {"area"}
              label = {"Area"}
              width = {210}
              dialogTitle={"Add Area"}
              fetchDataFn = {getArea}
              renderForm={(fnDialogOpen, fnDialogValue) => 
                <AreaForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                />
              }
            />
            <SelectMasterWrapper
              name = {"department"}
              id = {"department"}
              label = {"Department"}
              width = {210}
              dialogTitle={"Add Department"}
              fetchDataFn = {getDepartment}
              renderForm={(fnDialogOpen, fnDialogValue) => 
                <ExecutiveDeptForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                />
              }
            />
            <SelectMasterWrapper
              name = {"role"}
              id = {"role"}
              label = {"Role"}
              width = {210}
              dialogTitle={"Add Role"}
              fetchDataFn = {getExecutiveRole}
              renderForm={(fnDialogOpen, fnDialogValue) => 
                <ExecutiveRoleForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                />
              }
            /> 
            <SelectMasterWrapper
              name = {"group"}
              id = {"group"}
              label = {"Executive Group"}
              width = {210}
              dialogTitle={"Add Executive Group"}
              fetchDataFn = {getExecutiveGroup}
              renderForm={(fnDialogOpen, fnDialogValue) => 
                <ExecutiveGroupForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                />
              }
            /> 
            <InputControl
              type={InputType.TEXT}
              id="pan" 
              label="PAN"
              name="pan"
              error={formError?.pan?.error}
              helperText={formError?.pan?.msg} 
            />
            <InputControl
              type={InputType.TEXT}
              id="aadhaar" 
              label="AADHAAR"
              name="aadhaar"
              error={formError?.aadhaar?.error}
              helperText={formError?.aadhaar?.msg} 
            />
            <SelectMasterWrapper
              name = {"crm_user"}
              id = {"crm_user"}
              label = {"Map to App User"}
              width = {210}
              dialogTitle={"Add App User"}
              fetchDataFn = {getApplicationUser}
              renderForm={(fnDialogOpen, fnDialogValue) => 
                <ExecutiveGroupForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                />
              }
            /> 
            <InputControl
              type={InputType.EMAIL}     
              id="email"
              label="Email"
              name="email"
              placeholder="Email address"
              error={formError?.email?.error}
              helperText={formError?.email?.msg} 
            />
            <InputControl
              type={InputType.PHONE}     
              id="mobile"
              label="Phone No"
              name="mobile"
              error={formError?.mobile?.error}
              helperText={formError?.mobile?.msg} 
            />
            <InputControl
              type={InputType.PHONE}     
              id="whatsapp"
              label="Whatsapp No"
              name="whatsapp"
              error={formError?.whatsapp?.error}
              helperText={formError?.whatsapp?.msg} 
            />

            <InputControl
              type={InputType.DATEINPUT}     
              id="dob"
              label="Date of Birth"
              name="dob"
              slotProps={{
                textField: {
                  error: formError?.dob?.error,
                  helperText: formError?.dob?.msg,
                },
              }}
            />
            <InputControl
              type={InputType.DATEINPUT}     
              id="doa"
              label="Anniversary Date"
              name="doa"
              slotProps={{
                textField: {
                  error: formError?.doa?.error,
                  helperText: formError?.doa?.msg,
                },
              }}          
            />
            <InputControl
              type={InputType.DATEINPUT}     
              id="doj"
              label="Joining Date"
              name="doj"
              slotProps={{
                textField: {
                  error: formError?.doj?.error,
                  helperText: formError?.doj?.msg,
                },
              }}
            />            
          </Box>
          <AddressComposite
            formError={formError}/>

          <Grid container>
            <Grid item xs={6} md={6}>
              <Box  margin={1} sx={{display: "flex"}}>
                <Box display="flex" justifyContent="flex-start" alignItems="flex-start" m={1}>
                  <Button onClick={handleCancel}>Cancel</Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} md={6}>
              <Box display="flex" justifyContent="flex-end" alignItems="flex-end" m={1}>
                <Button type="submit"  variant="contained">Submit</Button>
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

