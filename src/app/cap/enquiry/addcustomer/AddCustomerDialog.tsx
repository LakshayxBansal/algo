'use client'
import React, { Dispatch, SetStateAction, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { TextField, type DialogProps } from "@mui/material";
import { addEntityDlgT } from '../../../models/models';
import CustomerForm from './customerform';
import Divider from '@mui/material/Divider';




export default function AddCustomerDialog(props: {open:boolean, data:string, setDlgValue:Dispatch<SetStateAction<addEntityDlgT>>}) {
  const [addDialogOpen, setDialogOpen] = useState(props.open);
  const [dialogValue, setDialogValue] = React.useState();
  //const [inputValue, setInputValue] = React.useState<optionsDataT>();

  const handleCancel = ()=> {
    props.setDlgValue({open:false, data:""});
  }


  const handleClose: DialogProps["onClose"] = (event, reason) => {
    if (reason && reason === "backdropClick")
        return;
    props.setDlgValue({open:false, data:""});
  };

  if (props.open) {
    return (
      <>
        <Dialog open={props.open} onClose={handleClose} >
          <DialogTitle>Add a new customer</DialogTitle>
          <Divider variant="fullWidth" sx={{borderWidth: 0.1, borderColor: '#E2E8EB'}}/>
          <DialogContent>
          <CustomerForm
              {...props}></CustomerForm>
          </DialogContent>
        </Dialog>
      </>
    );
  } else {
    return <></>
  }

}



/*
            */