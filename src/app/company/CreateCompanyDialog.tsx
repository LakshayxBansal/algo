'use client'
import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import type { DialogProps } from "@mui/material";
import Box from '@mui/material/Box';
import { createCompany } from '../controllers/company.controller';

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "standard",
        size: "small",
      }
    },
  },
});

export interface compDialogPropT {
  email: string,
  callBackParent: ()=>Promise<void>
}

export default function CreateCompanyDialog(props: compDialogPropT) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogValue, setDialogValue] = React.useState();
  const email = props.email;
  const callback = props.callBackParent;
  const openDialog = ()=> {
    setDialogOpen(true);
  }


  const handleSubmit = async (formData: FormData)=> {
    const result = await createCompany(formData, email);
    setDialogOpen(false);
    callback();
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
    <ThemeProvider theme={theme}>
      <Button                   
        variant="contained"
        onClick={openDialog}
        sx={{
        ml: 5, 
        display: 'flex',  
        backgroundColor: '#4285F4',
        alignItems: 'center',
        border: 'none',
        textTransform: 'none',
        justifyContent: 'center',
        }}>
          Create
      </Button>
      <Dialog open={dialogOpen} onClose={handleClose} >
        <form action={handleSubmit}>
          <DialogTitle>Create Company</DialogTitle>
          <DialogContent>
            <Box 
              sx={{ 
                display: 'grid', 
                columnGap: 3,
                rowGap: 1,
                gridTemplateColumns: 'repeat(2, 1fr)', 
              }}
            >
              <TextField
                autoFocus                
                id="company"
                value={dialogValue}
                label="Company Name"
                type="text"
                name='company'
              />
              </Box>
                <TextField  
                  label="Address Line 1" 
                  fullWidth
                  name="add1"
                  id="add1"
                  type="text" 
                />
                <TextField  
                  label="Address Line 2" 
                  fullWidth 
                  name="add2"
                  id="add2"
                  type="text" 
                />
                <Box 
                  sx={{ 
                    display: 'grid', 
                    columnGap: 3,
                    rowGap: 1,
                    gridTemplateColumns: 'repeat(3, 1fr)', 
                  }}>
                  <TextField  label="City"
                    name="city"
                    id="city"
                    type="text" 
                    />
                  <TextField  label="State"
                    name="state"
                    id="state"
                    type="text" 
                    />
                  <TextField  label="Pin Code"
                    name="pin"
                    id="pin"
                    type="text" 
                    />
              </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </ThemeProvider>
  )
}