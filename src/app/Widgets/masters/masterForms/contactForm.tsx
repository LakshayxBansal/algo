'use client'
import React, { useState } from 'react';
import {InputControl, InputType}  from '@/app/Widgets/input/InputControl';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { getCountries, getStates } from '../../../controllers/masters.controller';
import { getOrganisation } from '@/app/controllers/organisation.controller';
import { getDepartment } from '@/app/controllers/department.controller';
import { contactSchema } from '@/app/zodschema/zodschema';
import { SelectMasterWrapper } from '@/app/Widgets/masters/selectMasterWrapper';
import CountryForm from './countryForm';
import StateForm from './countryForm';
import OrganisationForm from './organisationForm';
import DepartmentForm from './departmentForm';
import {createContact} from '@/app/controllers/contact.controller';
import { getContactGroup } from '@/app/controllers/contactGroup.controller';
import ContactGroupForm from '@/app/Widgets/masters/masterForms/contactGroupForm';
import AreaForm from './areaForm';
import { getArea } from '@/app/controllers/area.controller';





export default function ContactForm(props: {
      setDialogOpen: (props: any) => void,
      setDialogValue: (props: any) => void,
    }) {
  const [formError, setFormError] = useState<Record<string, {msg: string, error: boolean}>>({});

  const handleSubmit = async (formData: FormData)=> {
    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    const parsed = contactSchema.safeParse(data);
    let result;
    let issues;

    if (parsed.success) {
      result = await createContact(formData);
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

  async function getStatesforCountry(stateStr: string) {
    const country = (document.getElementById("country") as HTMLInputElement).value;

    const states = await getStates(stateStr, country);
    if (states.length > 0){
      return states
    } 
  }

  return(
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
        <InputControl
          type={InputType.TEXT}     
          id="print_name"
          label="Print Name"
          name="print_name"
          error={formError?.print_name?.error}
          helperText={formError?.print_name?.msg} 
        />
        <SelectMasterWrapper
          name = {"contactGroup"}
          id = {"contactGroup"}
          label = {"Group"}
          width = {210}
          dialogTitle={"Add Group"}
          fetchDataFn = {getContactGroup}
          renderForm={(fnDialogOpen, fnDialogValue) => 
            <ContactGroupForm
              setDialogOpen={fnDialogOpen}
              setDialogValue={fnDialogValue}
            />
          }
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
          name = {"organisation"}
          id = {"organisation"}
          label = {"Organisation"}
          width = {210}
          dialogTitle={"Add Organisation"}
          fetchDataFn = {getOrganisation}
          renderForm={(fnDialogOpen, fnDialogValue) => 
            <OrganisationForm
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
            <DepartmentForm
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
      </Box>
      <Box 
        sx={{ display: 'grid', 
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: 'repeat(2, 1fr)', 
            }}>
        <InputControl
          type={InputType.TEXT} 
          label="Address Line 1" 
          name="address1"
          id="address1"
          error={formError?.address1?.error}
          helperText={formError?.address1?.msg} 
          fullWidth />
        <InputControl
          type={InputType.TEXT} 
          label="Address Line 2" 
          name="address2"
          id="address2"
          error={formError?.address2?.error}
          helperText={formError?.address2?.msg} 
          fullWidth/>
        <InputControl
          type={InputType.TEXT} 
          label="Address Line 3" 
          name="address3"
          id="address3"
          error={formError?.address3?.error}
          helperText={formError?.address3?.msg} 
          fullWidth/>
        <InputControl 
          type={InputType.TEXT} 
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
          fetchDataFn = {getStatesforCountry}
          renderForm={(fnDialogOpen, fnDialogValue) => 
            <StateForm
              setDialogOpen={fnDialogOpen}
              setDialogValue={fnDialogValue}
            />
          }
        />

        <InputControl 
          type={InputType.TEXT} 
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
            <Button type="submit" variant="contained">Submit</Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}

