'use client'
import React, { Children, Dispatch, SetStateAction, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { type DialogProps } from "@mui/material";
import Divider from '@mui/material/Divider';

type dialogPropsT = {
  title: string,
  open: boolean,
  setDialogOpen: (props: any) => void,
  children: React.ReactNode
}

// open, data, setDialogOpen, setDialogValue
export const AddDialog: React.FC<dialogPropsT> = ({title, open, setDialogOpen, children}) => {

  const handleCancel = ()=> {
    setDialogOpen(false);
  }

  const handleClose: DialogProps["onClose"] = (event, reason) => {
    if (reason && reason === "backdropClick")
        return;
    setDialogOpen(false);
  };

  if (open) {
    return (
      <>
        <Dialog maxWidth="lg" open={open} onClose={handleClose} >
          <Divider variant="fullWidth" sx={{borderWidth: 0.1, borderColor: '#E2E8EB'}}/>
          <DialogContent sx={{paddingTop: 0}}>
            {children}
          </DialogContent>
        </Dialog>
      </>
    );
  } else {
    return <></>
  }

}
