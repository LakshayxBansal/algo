
import React, { Dispatch, SetStateAction, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createOrganisation } from '../../../controllers/organisation.controller';
import Grid from '@mui/material/Grid';
import { getCountries } from '../../../controllers/masters.controller';
import { getStates } from '@/app/controllers/masters.controller';
import { organisationSchema } from '@/app/zodschema/zodschema';
import {InputControl, InputType}  from '@/app/Widgets/input/InputControl';
import { SelectMasterWrapper } from '@/app/Widgets/masters/selectMasterWrapper';
import CountryForm from './countryForm';
import StateForm from './countryForm';
import { revalidatePath } from 'next/cache';
import CountryStateComposite from '../../composites/countryStateComposite';

export default function OrganisationForm(props: {
      setDialogOpen: (props: any) => void,
      setDialogValue: (props: any) => void,
    }) {
      const [formError, setFormError] = useState<Record<string, {msg: string, error: boolean}>>({});

      const handleSubmit = async (formData: FormData)=> {
        let data: { [key: string]: any } = {}; // Initialize an empty object
    
        for (const [key, value] of formData.entries()) {
          data[key] = value;
        }
    
        const parsed = organisationSchema.safeParse(data);
        let result;
        let issues;
    
        if (parsed.success) {
          result = await createOrganisation(formData);
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
          sx={{ display: 'grid', 
                columnGap: 3,
                rowGap: 1,
                gridTemplateColumns: '2fr 1fr', 
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
        </Box>
        <Box 
          sx={{ display: 'grid', 
                columnGap: 3,
                rowGap: 1,
                gridTemplateColumns: 'repeat(3, 1fr)', 
              }}>
          <InputControl
            type={InputType.TEXT}     
            id="print_name"
            label="Print Name"
            name="print_name"
            error={formError?.print_name?.error}
            helperText={formError?.print_name?.msg} 
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
            label="Aadhaar"
            name="aadhaar"
            error={formError?.aadhaar?.error}
            helperText={formError?.aadhaar?.msg} 
          />
        </Box>
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
        <Box sx={{ display: 'grid', 
                columnGap: 3,
                rowGap: 1,
                gridTemplateColumns: 'repeat(2, 1fr)', 
              }}>
          <CountryStateComposite/>
          <InputControl 
            type={InputType.TEXT} 
            name="city" 
            id="city" 
            label="City" 
            error={formError?.city?.error}
            helperText={formError?.city?.msg}  
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
    </>
  );
}

