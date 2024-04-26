import React, { useState } from 'react';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import AutocompleteDB from '@/app/Widgets/AutocompleteDB';
import {AddDialog} from '../addDialog';
import { optionsDataT } from '../../../models/models';
import { getContact } from '../../../controllers/masters.controller';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { IconButton } from "@mui/material";
import ContactForm from './contactForm';


export function SelectContactWrapper() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState<optionsDataT>({id:0, name: ""});

  function openDialog(){
    setDialogOpen(true);
  }
  return (
    <>
      <Grid item xs={12} md={12}>
        <Grid container>
          <Grid item>
            <AutocompleteDB
              id={"person"}
              sx={{ width: 300 }}
              renderInput={(params)=> <TextField {...params} name="person" label="Person" />} 
              options={[]}
              dataValues={getContact}
              defaultValue={dialogValue}
            />
          </Grid>
          <Grid item>
            <IconButton onClick={openDialog}>
              <AddBoxIcon color="primary" fontSize="large"/>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      {dialogOpen && 
        <AddDialog
          title="Add a new Contact" 
          open={dialogOpen} 
          setDialogOpen={setDialogOpen} 
          >
            <ContactForm 
              data={dialogValue} 
              setDialogValue={setDialogValue}
              setDialogOpen={setDialogOpen} >
            </ContactForm>
        </AddDialog>
      }
    </>
  );
}

