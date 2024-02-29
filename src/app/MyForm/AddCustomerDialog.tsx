import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import AutocompleteAdd, {propsData, optionsData}  from '../Widgets/Autocomplete';
import ReactPhoneInput from 'react-phone-input-material-ui';
import type { DialogProps } from "@mui/material";





export default function AddCustomerDialog(props: propsData) {
  const [addCustomerDialogOpen, setCustomerDialogOpen] = useState(false);
  const [dialogValue, setDialogValue] = React.useState();

  const addCustomer = (props)=> {
    setDialogValue(props.name);
    setCustomerDialogOpen(true);
  }


  const handleSubmit = ()=> {
    setCustomerDialogOpen(false);
  }

  const handleClose: DialogProps["onClose"] = (event, reason) => {
    if (reason && reason === "backdropClick")
        return;
    setCustomerDialogOpen(false);
  };


  return (
    <>
      <AutocompleteAdd
      label="Customer"
      data={props? props.data: []}
      allowFreeSolo={false}
      addNew={true}
      addFunction={addCustomer}
    />
    <Dialog open={addCustomerDialogOpen} onClose={handleClose} >
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add a new customer</DialogTitle>
        <DialogContent>
              <TextField
                autoFocus                
                id="company"
                value={dialogValue}
                label="Company Name"
                type="text"
              />
              <TextField                
                id="contact"
                label="Contact Person"
                type="text"
              />
              <TextField  label="Email" fullWidth />
              <ReactPhoneInput
                  component={TextField}
              />
              <TextField  label="Address Line 1" fullWidth />
              <TextField  label="Address Line 2" fullWidth />
              <TextField  label="City"  />
              <TextField  label="State"  />
              <TextField  label="Pin Code"  />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
    </>
  )
}