
import React, { Dispatch, SetStateAction, useState } from 'react';
import TextField  from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ReactPhoneInput from 'react-phone-input-material-ui';
import Box from '@mui/material/Box';
import { createOrganisation } from '../../../controllers/organisation.controller';
import Grid from '@mui/material/Grid';
import { optionsDataT } from '../../../models/models';
import AutocompleteDB from '../../AutocompleteDB'; 
import { getCountries } from '../../../controllers/masters.controller';



export default function OrganisationForm(props: {
      data:optionsDataT,
      setDialogOpen: (props: any) => void,
      setDialogValue: (props: any) => void,
    }) {
  const companyName = props.data.name;

  const handleSubmit = async (formData: FormData)=> {
    const result = await createOrganisation(formData);
    if (result.length > 0){
      const newVal = {id: result[0].customerId, name: result[0].name};
      //const revisedOptions = [newVal, ...props.options];
      props.setDialogValue(newVal);
      //setOptions(revisedOptions);
    }
    
    props.setDialogOpen(false);  
    
  }

  function handleCountryChange() {

  }

  async function getStates(searchString: string){

  }
  const handleCancel = ()=> {
    props.setDialogOpen(false);  
  }

  return(
    <form action={handleSubmit}> 
      <Box 
        sx={{ display: 'grid', 
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: 'repeat(2, 1fr)', 
            }}>
        <TextField
          autoFocus                
          id="organisation"
          defaultValue={companyName}
          label="Organisation Name"
          type="text"
          name="organisation"
        />
        <TextField                
          id="alias"
          label="Alias"
          type="text"
          name="alias"
        />
        <TextField
          id="pan" 
          label="PAN"
          type="text"
          name="pan"
        />
        <TextField
          id="gst" 
          label="GST No"
          type="text"
          name="gst"
        />
      </Box>
      <TextField 
        label="Address Line 1" 
        name="add1"
        id="add2"
        fullWidth />
      <TextField 
        label="Address Line 2" 
        name="add2"
        id="add2"
        fullWidth 
        />
      <TextField 
        label="Address Line 3" 
        name="add3"
        id="add3"
        fullWidth 
        />
      <Box sx={{ display: 'grid', 
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: 'repeat(2, 1fr)', 
            }}>
        <AutocompleteDB
          id={"country"}
          renderInput={(params)=> <TextField {...params} name="country" label="Country" />} 
          options={[]}
          dataValues={getCountries}
          onChange={handleCountryChange}
        />
        <AutocompleteDB
          id={"state"}
          renderInput={(params)=> <TextField {...params} name="state" label="State" />} 
          options={[]}
          dataValues={getStates}
          onChange={handleCountryChange}
        />
        <TextField name="city" id="city" label="City"  />
        <TextField name="pin" id="pin" label="Pin Code"  />
      </Box>
      <Grid container xs={12} md={12}>
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

