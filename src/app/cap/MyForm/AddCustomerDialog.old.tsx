'use client'
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField  from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AutocompleteAdd, { propsDataT, optionsDataT}  from '../../Widgets/Autocomplete';
import ReactPhoneInput from 'react-phone-input-material-ui';
import type { DialogProps } from "@mui/material";
import Box from '@mui/material/Box';
import { createCustomer } from '../../controllers/customer.controller';





export default function AddCustomerDialog(props: propsDataT) {
  const [addDialogOpen, setDialogOpen] = useState(false);
  const [dialogValue, setDialogValue] = React.useState();
  const [options, setOptions] = React.useState(props.options);
  //const [inputValue, setInputValue] = React.useState<optionsDataT>();

  const addCustomer = (props: any)=> {
    setDialogValue(props.name);
    setDialogOpen(true);
  }

  

  const handleSubmit = async (formData: FormData)=> {
    const result = await createCustomer(formData);
    if (result.length > 0){
      const revisedOptions = [{id: result[0].customerId, name: result[0].nameVal}, ...props.options];
      setOptions(revisedOptions);
    }
    setDialogOpen(false);
  }

  const handleCancel = ()=> {
    setDialogOpen(false);
  }


  const handleClose: DialogProps["onClose"] = (event, reason) => {
    if (reason && reason === "backdropClick")
        return;
    setDialogOpen(false);
  };


  return (
    <>
      <AutocompleteAdd
        options={options}
        freeSolo={false}
        addNew={true}
        setDlgValue={addCustomer}
        renderInput={props.renderInput}
      />
      <Dialog open={addDialogOpen} onClose={handleClose} >
        <form action={handleSubmit}>
          <DialogTitle>Add a new customer</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'grid', 
                        columnGap: 3,
                        rowGap: 1,
                        gridTemplateColumns: 'repeat(2, 1fr)', 
                      }}
              >
                <TextField
                  autoFocus                
                  id="company"
                  defaultValue={dialogValue}
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}