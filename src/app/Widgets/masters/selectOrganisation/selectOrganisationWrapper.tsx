import React, { useState } from 'react';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import AutocompleteDB from '@/app/Widgets/AutocompleteDB';
import OrganisationForm  from './organisationForm';
import { optionsDataT } from '../../../models/models';
import { getOrganization } from '../../../controllers/masters.controller';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { IconButton } from "@mui/material";
import {AddDialog} from '../addDialog';




export function SelectOrganisationWrapper() {
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
              id={"organisation"}
              sx={{ width: 300 }}
              renderInput={(params)=> <TextField {...params} name="organisation" label="Organisation" />} 
              options={[]}
              dataValues={getOrganization}
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
          title="Add a new Organisation" 
          open={dialogOpen} 
          setDialogOpen={setDialogOpen} 
          >
            <OrganisationForm 
              data={dialogValue} 
              setDialogValue={setDialogValue}
              setDialogOpen={setDialogOpen} >
            </OrganisationForm>
        </AddDialog>
      }  
    </>
  );
}