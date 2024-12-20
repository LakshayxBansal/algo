
'use client'
import React, { Children, Dispatch, SetStateAction, useState , useRef, useEffect} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { type DialogProps } from "@mui/material";
import Paper, { PaperProps } from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Draggable from 'react-draggable';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function PaperComponent(props: PaperProps & { handleid: string }) {
  let paperRef = useRef<HTMLDivElement | null>(null);
  const [bounds, setBounds] = useState({ left: 0, top: 0, right: 0, bottom: 0 });

  React.useEffect(() => {
    if (paperRef.current) {
      console.log(paperRef.current);
      const { offsetWidth, offsetHeight } = paperRef.current;
      setBounds({
        left: -(window.innerWidth + offsetWidth) / 2 + 64,
        top: -(window.innerHeight - offsetHeight) / 2,
        right: (window.innerWidth + offsetWidth) / 2 - 64,
        bottom: (window.innerHeight + offsetHeight) / 2 - 64,
      });
    }
  }, [props.handleid]);

  return (
    <Draggable
      handle={`#${props.handleid}`}
      cancel={'[class*="MuiDialogContent-root"]'}
      bounds={bounds}
    >
      <Paper ref={paperRef} {...props} />
    </Draggable>
  );
}



type dialogPropsT = {
  title: string,
  open: boolean,
  setDialogOpen: (props: any) => void,
  children: React.ReactNode,
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

  const uniqueHandleId = `draggable-dialog-title-${title.replaceAll(" ", "")}`;


  if (open) {
    return (
      <>
      {/* <Draggable> */}

        <Dialog maxWidth="lg" open={open} onClose={handleClose} 
        PaperComponent={(props) => (
          <PaperComponent {...props} handleid={uniqueHandleId} />
      )}
      
      >
          <DialogTitle style={{ 
            cursor: 'move',
          }} id={uniqueHandleId}>
            {title}
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
          </DialogTitle>
          <Divider variant="fullWidth" sx={{borderWidth: 0.1, borderColor: '#E2E8EB'}}/>
          <DialogContent sx={{paddingTop: 0}}>
            {children}
          </DialogContent>
        </Dialog>
  {/* </Draggable> */}
      </>
    );
  } else {
    return <></>
  }

}