'use client'
import React, { Dispatch, SetStateAction} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import DialogActions from '@mui/material/DialogActions';


export default function DeleteDeptForm(props: {open:boolean, id:string, name:String, setDlgValue:Dispatch<SetStateAction<boolean>>}) {
    return (
      <>
          <Button onClick={()=> {props.setDlgValue(false)}} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{}} color="primary" autoFocus>
            Delete
          </Button>
      </>
    );

}