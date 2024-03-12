'use client'

import React from 'react';
import { Grid, TextField } from '@mui/material';
import DatePick from '../Widgets/DatePick';
import Paper from '@mui/material/Paper';
//import ResponsiveAppBar from '../Widgets/ResponsiveAppBar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ColorTabs from '../Widgets/ColorTabs';
import AutocompleteAdd from '../Widgets/Autocomplete';
import ReactPhoneInput from 'react-phone-input-material-ui';
import AddCustomerDialog from './AddCustomerDialog';
import { Toolbar } from '@mui/material';

import { createTheme, ThemeProvider } from "@mui/material/styles";

export interface baseDataType {
  salesPerson: [{id: number; name: string;}];
  catList: [{id: number; name: string;}];
  ticketStages:  [{id: number; name: string;}];
  customer:[{id: number; name: string;}];
}


const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "standard",
        size: "small",
      }
    },
  },
});


export default function InputForm(props: {baseData: baseDataType}) {
  const baseData = props.baseData;

  return (
    <ThemeProvider theme={theme}>
    <Toolbar />
    <Paper>
      {/*<ProminentAppBar />*/}
      <Grid container spacing={1}
      style={{ marginLeft: '10px', marginTop: '5px' }}
        >
        {/* Name */}
        <Grid item xs={9} >
          <TextField label="Ticket Description" 
          variant="standard"
          inputProps={{ style: { fontSize: 30 } }} fullWidth/>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid item xs={6}>
          <AddCustomerDialog
                label="Customer"
                data={baseData? baseData.customer: []}
                allowFreeSolo={false}
                addNew={true}
              />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Contact Person" fullWidth/>
          </Grid>

          <Grid item xs={6}>
            <TextField label="Email" fullWidth/>
          </Grid>

          <Grid item xs={6}>
            <ReactPhoneInput
              component={TextField}
            />
            </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid item xs={6}>
            <AutocompleteAdd
                label="Sales Person Assigned"
                data={baseData? baseData.salesPerson : []}
                allowFreeSolo={false}
                addNew={false}
              />
          </Grid>

          <Grid item xs={6}>
            <AutocompleteAdd
                  label="Category"
                  data={baseData? baseData.catList : []}
                  allowFreeSolo={false}
                  addNew={false}
                />
          </Grid>
          <Grid item xs={6}>
            <DatePick 
              label="Expected closure date"
              format="DD-MM-YYYY"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <AutocompleteAdd
                label="Next Stage"
                data={baseData? baseData.ticketStages : []}
                allowFreeSolo={false}
                addNew={false}
              />
          </Grid>
        </Grid>

        {/* tabs for other */}
        <Grid item xs={12} sx= { { mt: 2 }}>
          <ColorTabs />
        </Grid>
        <Grid item xs={12}>
          <Typography
              variant="h6"
              component="div"
              sx={{ position: 'relative', backgroundColor: 'white'}}
            >
              Other Details
          </Typography>
          <Divider variant="fullWidth"         
            sx={{
            borderWidth: 1, // increase the border width
            borderColor: 'primary.main', // change the border color
            }}
          />
        </Grid>
        {/* create date*/} 
        <Grid item xs={6}>
          <DatePick 
            label="Create Date"
            format="DD-MM-YYYY"
            readOnly={true}
            defaultValue={new Date()}
            />
        </Grid>

        {/* creator */}
        <Grid item xs={6}>
          <TextField label="Created By" fullWidth />
        </Grid>

      </Grid>
    </Paper>
    </ThemeProvider>
  );
}