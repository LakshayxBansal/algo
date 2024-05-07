'use client'
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField  from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AutocompleteAdd, { propsDataT}  from '../../Widgets/Autocomplete';
import ReactPhoneInput from 'react-phone-input-material-ui';
import type { DialogProps } from "@mui/material";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { createContact } from '../../controllers/contact.controller';



export default function AddEmployeeDialog(props: propsDataT) {
  const [addDialogOpen, setDialogOpen] = useState(false);
  const [dialogValue, setDialogValue] = React.useState();
  const [options, setOptions] = React.useState(props.options);
  //const [inputValue, setInputValue] = React.useState<optionsDataT>();

  const addEmployee = (props: any)=> {
    setDialogValue(props.name);
    setDialogOpen(true);
  }

  

  const handleSubmit = async (formData: FormData)=> {
    const result = await createContact(formData);
    if (result.status) {
      const revisedOptions = [{id: result.data.personId as number, name: result.data.firstName + ' ' + result.data.lastName}, ...props.options];
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
        setDlgValue={addEmployee}
        renderInput={props.renderInput}
      />
      <Dialog open={addDialogOpen} onClose={handleClose} >
        <form action={handleSubmit}>
          <DialogTitle>Add Person</DialogTitle>
          <Divider variant="fullWidth" sx={{borderWidth: 0.1, borderColor: '#E2E8EB'}}/>
          <DialogContent>
            <Box sx={{ display: 'grid', 
                        columnGap: 3,
                        rowGap: 1,
                        gridTemplateColumns: 'repeat(2, 1fr)', 
                      }}
                >
              <TextField
                autoFocus                
                id="firstname"
                defaultValue={dialogValue}
                label="First Name"
                type="text"
                name="firstname"
              />
              <TextField                
                id="lastname"
                label="Last Name"
                type="text"
                name="lastname"
              />
              <TextField  label="Email" name="email" />
              <ReactPhoneInput
                  component={TextField}
                  label="Phone"
                  inputProps={{name:"phone"}}
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