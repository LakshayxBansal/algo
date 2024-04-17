
import React, { Dispatch, SetStateAction, useState } from 'react';
import TextField  from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ReactPhoneInput from 'react-phone-input-material-ui';
import Box from '@mui/material/Box';
import { createCustomer } from '../../../controllers/customer.controller';
import { addEntityDlgT } from '../../../models/models';
import Grid from '@mui/material/Grid';

export default function CustomerForm(props: {open:boolean, data:string, setDlgValue:Dispatch<SetStateAction<addEntityDlgT>>}) {
  const companyName = props.data;

  const handleSubmit = async (formData: FormData)=> {
    /*const result = await createCustomer(formData);
    if (result.length > 0){
      const revisedOptions = [{id: result[0].customerId, name: result[0].nameVal}, ...props.options];
      setOptions(revisedOptions);
    }*/
    props.setDlgValue({open:false, data:""})
    //setDialogOpen(false);
  }

  const handleCancel = ()=> {
    props.setDlgValue({open:false, data:""})
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
          id="company"
          defaultValue={companyName}
          label="Company Name"
          type="text"
          name="company"
        />
        <TextField                
          id="contact"
          label="Contact Person"
          type="text"
        />
        <TextField  label="Email"  />
        <ReactPhoneInput
            component={TextField}
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
        fullWidth />
      <Box sx={{ display: 'grid', 
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: 'repeat(3, 1fr)', 
            }}>
        <TextField name="city" id="city" label="City"  />
        <TextField name="state" id="state" label="State"  />
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

/*
        <Box display="flex" justifyContent="flex-start" alignItems="flex-start" m={1}>
          <Button variant="contained">Cancel</Button>
        </Box>
        <Box display="flex" justifyContent="flex-end" alignItems="flex-end" m={1}>
          <Button type="submit" variant="contained" color="primary">Submit</Button>
        </Box>
*/