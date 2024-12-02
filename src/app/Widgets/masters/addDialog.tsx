'use client'
import React, { Children, Dispatch, SetStateAction, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { type DialogProps } from "@mui/material";
import Divider from '@mui/material/Divider';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}


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

  function handleCloseClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    console.log(e);
    setDialogOpen(false);
  }

  if (open) {
    return (
      <>
         <Dialog maxWidth="xl" open={open} onClose={handleClose} PaperComponent={PaperComponent} >
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            {"Add Contacts"}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseClick}
            sx={(theme) => ({
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          {/* <Divider variant="fullWidth" sx={{borderWidth: 0.1, borderColor: '#E2E8EB'}}/> */}
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
