'use client'
import React from 'react';
import {InputControl, InputType}  from '@/app/Widgets/input/InputControl';
import Box from '@mui/material/Box';
import Seperator from '../../seperator';

export default function ModTempForm(props: {
      setDialogOpen?: (props: any) => void,
      setDialogValue?: (props: any) => void,
      id?: string,
    }) {

      const handleSubmit = ()=> {
        props.setDialogOpen? props.setDialogOpen(false) : null;
      }

  return(
    <>
      <Seperator>Modify Contact</Seperator>
      <Box id="sourceForm" sx={{ m: 2, p: 3 }}>
        <form action={handleSubmit}> 
          <Box 
            sx={{ display: 'grid', 
                  columnGap: 3,
                  rowGap: 1,
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                }}>
            <InputControl
              inputType={InputType.TEXT}
              autoFocus                
              id="name"
              label="Name"
              name="name"
              required
            />
            <InputControl
              inputType={InputType.TEXT}     
              id="alias"
              label="Alias"
              name="alias"
            />
            <InputControl
              inputType={InputType.TEXT}     
              id="print_name"
              label="Print Name"
              name="print_name"
            />
          </Box>
        </form>
      </Box>
    </>
  );
}

