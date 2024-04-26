'use client'
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import AutocompleteAdd, { propsDataT }  from '../../Widgets/Autocomplete';
import type { DialogProps } from "@mui/material";
import Divider from '@mui/material/Divider';
import PersonDialogContent from './persondialogcontent';
import { createPerson } from '../../controllers/person.controller';
import Autocomplete, { createFilterOptions, AutocompleteProps } from "@mui/material/Autocomplete";


export interface addPersonDataT{
  open: boolean;
  data: string;
}


const AddPersonDialog: React.FC<addPersonDataT> = (props) => {
  const [addDialogOpen, setDialogOpen] = useState(props.open);
  const [dialogValue, setDialogValue] = React.useState(props.data);
  //const [inputValue, setInputValue] = React.useState<optionsDataT>();

  const addPerson = (props: any)=> {
    setDialogValue(props.name);
    setDialogOpen(true);
  }

  

  const handleSubmit = async (formData: FormData)=> {

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
      <Dialog open={addDialogOpen} onClose={handleClose} >
        <form action={handleSubmit}>
          <DialogTitle>Add Person</DialogTitle>
          <Divider variant="fullWidth" sx={{borderWidth: 0.1, borderColor: '#E2E8EB'}}/>
            <PersonDialogContent data={dialogValue}></PersonDialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default AddPersonDialog;