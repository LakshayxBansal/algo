'use client'
import React, { Dispatch, SetStateAction} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import DialogActions from '@mui/material/DialogActions';


export default function DeleteDeptDialog(props: {open:boolean, id:number, name:String, setDlgValue:Dispatch<SetStateAction<boolean>>}) {
  if (props.open) {
    return (
      <>
        <Dialog open={props.open}>
          <DialogTitle>Delete Department: {props.name}</DialogTitle>
          <Divider variant="fullWidth" sx={{borderWidth: 0.1, borderColor: '#E2E8EB'}}/>
          <DialogActions>
          <Button onClick={()=> {props.setDlgValue(false)}} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{}} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
        </Dialog>
      </>
    );
  } else {
    return <></>
  }

}