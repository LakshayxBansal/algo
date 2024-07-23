'use client';
import React, { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import { Grid, TextField } from '@mui/material';
import { createDept } from '../../../../../../controllers/department.controller';
import Button from '@mui/material/Button';
import Seperator from '@/app/Widgets/seperator';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../../../../utils/theme.util';
import Paper from '@mui/material/Paper';

export default function AddDeptForm() {
  const [FormError, setFormError] = useState('');

  const formSubmit = async (formData: FormData) => {
    const result = await createDept(formData);

    if (result.status) {
      window.alert('Department Created Successfully');
      window.location.reload();
    } 
    else {
      setFormError(result.error as string);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Toolbar />

        <form action={formSubmit}>
          <Paper style={{ minWidth: '100vw', minHeight: '100vh' }}>
            <Grid
              container
              spacing={1}
              alignItems="flex-end"
              gridTemplateRows="auto"
              style={{ margin: '6px' }}
            >
              <Grid item xs={12}>
                <Seperator>Add Department</Seperator>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Department Name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  error={FormError.length > 0}
                  helperText={FormError}
                  onKeyDown={()=>{setFormError('')}}
                  style={{ width: 'fit-content' }}
                  autoFocus
                />
              </Grid>
              <Grid item xs={2} style={{ textAlign: 'right' }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, left: '29px' }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </ThemeProvider>
    </>
  );
}
