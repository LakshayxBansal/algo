'use client'
import React from 'react';
import DialogContent from '@mui/material/DialogContent';
import TextField  from '@mui/material/TextField';
import { propsDataT }  from '../../Widgets/Autocomplete';
import ReactPhoneInput from 'react-phone-input-material-ui';
import Box from '@mui/material/Box';




export default function PersonDialogContent(props: {data:string}) {
  const [dialogValue, setDialogValue] = React.useState(props.data);

  return (
    <>
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
    </>
  )
}