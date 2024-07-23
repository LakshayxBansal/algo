
import React, { Dispatch, SetStateAction} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DeptModifyForm from './ModifyDeptForm';
import Divider from '@mui/material/Divider';


export default function ModifyDeptDialog(props: {open:boolean, id:number, setDlgValue:Dispatch<SetStateAction<boolean>>}) {
  if (props.open) {
    return (
      <>
        <Dialog open={props.open}>
          <DialogTitle>Modify Department</DialogTitle>
          <Divider variant="fullWidth" sx={{borderWidth: 0.1, borderColor: '#E2E8EB'}}/>
          <DialogContent>
          <DeptModifyForm
              {...props}></DeptModifyForm>
          </DialogContent>
        </Dialog>
      </>
    );
  } else {
    return <></>
  }

}