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
import AreaForm from './areaForm';
import { getArea } from '@/app/controllers/area.controller';
import { getExecutiveRole } from '@/app/controllers/executiveRole.controller';
import { getExecutiveGroup,getExecutiveGroupById } from '@/app/controllers/executiveGroup.controller';
import { getBizAppUser } from '@/app/controllers/user.controller'
import Seperator from '../../seperator';
import Snackbar from '@mui/material/Snackbar';
import ExecutiveRoleForm from './executiveRoleForm';
import ExecutiveGroupForm from './executiveGroupForm';
import ExecutiveDeptForm from './executiveDeptForm';
import {selectKeyValueT} from '@/app/models/models';
import CountryForm from '@/app/Widgets/masters/masterForms/countryForm';
import StateForm from '@/app/Widgets/masters/masterForms/stateForm';
import { getCountries, getStates } from '@/app/controllers/masters.controller';


export default function ExecutiveForm(props: {
  setDialogOpen?: (props: any) => void,
  setDialogValue?: (props: any) => void,
    }) {
  const [formError, setFormError] = useState<Record<string, {msg: string, error: boolean}>>({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});


  async function getApplicationUser(searchStr: string) {
    let dbResult = await getBizAppUser(searchStr, true, true, false, false);
    dbResult = [{id:0, name: "Send invite..."}, ...dbResult];
    if (dbResult.length > 0){
      return dbResult;
    } 
  }


  const handleSubmit = async (formData: FormData)=> {
    let data: { [key: string]: any } = {}; // Initialize an empty object

    formData.append("area_id", selectValues.area?.id);
    formData.append("department_id", selectValues.department?.id);
    formData.append("role_id", selectValues.role?.id);
    formData.append("group_id", selectValues.group?.id);
    formData.append("crm_user_id", selectValues.crm_user?.id);
    formData.append("country_id", selectValues.country?.id);
    formData.append("state_id", selectValues.state?.id);
    formData.append("call_type", "Enquiry");


    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

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

  async function getStatesforCountry(stateStr: string) {
    const country = selectValues.country?.name;

    const states = await getStates(stateStr, country);
    if (states.length > 0){
      return states;
    } 
  }

  const handleCancel = ()=> {
    props.setDialogOpen? props.setDialogOpen(false) : null;
  }

  function onSelectChange(event: React.SyntheticEvent, val: any, setDialogValue: any, name: string){
    let values =  {...selectValues};
    values[name] = val;
    setSelectValues(values);
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
              inputType={InputType.TEXT}
              autoFocus                
              id="name"
              label="Name"
              name="name"
              required 
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
            <SelectMasterWrapper
              name = {"area"}
              id = {"area"}
              label = {"Area"}
              width = {210}
              dialogTitle={"Add Area"}
              onChange={(e, v, s) => onSelectChange(e, v, s, "area")}
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
              onChange={(e, v, s) => onSelectChange(e, v, s, "department")}
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
              onChange={(e, v, s) => onSelectChange(e, v, s, "role")}
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
              onChange={(e, v, s) => onSelectChange(e, v, s, "group")}
              fetchDataFn = {getExecutiveGroup}
              fnFetchDataByID={getExecutiveGroupById}
              renderForm={(fnDialogOpen, fnDialogValue, data?) => 
                <ExecutiveGroupForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                  data={data}
                />
              }
            /> 
            <InputControl
              inputType={InputType.TEXT}
              id="pan" 
              label="PAN"
              name="pan"
              error={formError?.pan?.error}
              helperText={formError?.pan?.msg} 
            />
            <InputControl
              inputType={InputType.TEXT}
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
              onChange={(e, v, s) => onSelectChange(e, v, s, "crm_user")}
              fetchDataFn = {getApplicationUser}
              renderForm={(fnDialogOpen, fnDialogValue) => 
                <ExecutiveGroupForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                />
              }
            /> 
            <InputControl
              inputType={InputType.EMAIL}     
              id="email"
              label="Email"
              name="email"
              placeholder="Email address"
              error={formError?.email?.error}
              helperText={formError?.email?.msg} 
            />
            <InputControl
              inputType={InputType.PHONE}     
              id="mobile"
              label="Phone No"
              name="mobile"
              error={formError?.mobile?.error}
              helperText={formError?.mobile?.msg} 
            />
            <InputControl
              inputType={InputType.PHONE}     
              id="whatsapp"
              label="Whatsapp No"
              name="whatsapp"
              error={formError?.whatsapp?.error}
              helperText={formError?.whatsapp?.msg} 
            />

            <InputControl
              inputType={InputType.DATEINPUT}     
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
              inputType={InputType.DATEINPUT}     
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
              inputType={InputType.DATEINPUT}     
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
          <Box 
            sx={{ display: 'grid', 
                  columnGap: 3,
                  rowGap: 1,
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                }}>
            <InputControl
              inputType={InputType.TEXT} 
              label="Address Line 1" 
              name="address1"
              id="address1"
              error={formError?.address1?.error}
              helperText={formError?.address1?.msg} 
              fullWidth />
            <InputControl
              inputType={InputType.TEXT} 
              label="Address Line 2" 
              name="address2"
              id="address2"
              error={formError?.address2?.error}
              helperText={formError?.address2?.msg} 
              fullWidth/>
            <InputControl
              inputType={InputType.TEXT} 
              label="Address Line 3" 
              name="address3"
              id="address3"
              error={formError?.address3?.error}
              helperText={formError?.address3?.msg} 
              fullWidth/>
            <InputControl 
              inputType={InputType.TEXT} 
              name="city" 
              id="city" 
              label="City" 
              error={formError?.city?.error}
              helperText={formError?.city?.msg}  
            />
          </Box>
          <Box sx={{ display: 'grid', 
                  columnGap: 3,
                  rowGap: 1,
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                }}>
            <SelectMasterWrapper
              name = {"country"}
              id = {"country"}
              label = {"Country"}
              width = {210}
              dialogTitle={"Add country"}
              onChange={(e, v, s) => onSelectChange(e, v, s, "country")}
              fetchDataFn = {getCountries}
              renderForm={(fnDialogOpen, fnDialogValue) => 
                <CountryForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                />
              }
            />
            <SelectMasterWrapper
              name = {"state"}
              id = {"state"}
              label = {"State"}
              width = {210}
              dialogTitle={"Add State"}
              onChange={(e, v, s) => onSelectChange(e, v, s, "state")}
              fetchDataFn = {getStatesforCountry}
              renderForm={(fnDialogOpen, fnDialogValue) => 
                <StateForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                />
              }
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

