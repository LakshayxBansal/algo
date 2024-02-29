'use client'

import React, { useEffect, useState } from 'react';
import { Grid, TextField, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import DatePick from '../Widgets/DatePick';
import Paper from '@mui/material/Paper';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ResponsiveAppBar from '../Widgets/ResponsiveAppBar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ColorTabs from '../Widgets/ColorTabs';
import AutocompleteAdd from '../Widgets/Autocomplete';
import { getSalesPerson, getTicketCategory, getTicketStage} from '../lib/actions';
import ReactPhoneInput from 'react-phone-input-material-ui';

//import ChevronButton from '../Widgets/ChevronButton';
//import { MuiTelInput } from 'mui-tel-input';
//import PhoneInput from 'react-phone-input-2';
//import TopMenuBar from '../Widgets/TopMenuBar';

interface baseDataType {
  salesPerson: [{id: number; name: string;}];
  catList: [{id: number; name: string;}];
  ticketStages:  [{id: number; name: string;}];
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
  // Set the default props for all the text fields
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "standard", // Use the standard variant by default
      },
    },
  },
});


export default function MyForm() {
  const [state, setState] = useState('');
  const [baseData, setBaseData] = useState<baseDataType | null>({});

  const handleChange = (event: SelectChangeEvent) => {
    setState(event.target.value as string);
  };

  const validateDate = (dte: Date) => {
    const date = new Date(dte);
    console.log('date:', date.getDate());
  };

  useEffect(() => {
    // Fetch options from your database (e.g., using an API call)
    // and update the 'options' state.
    // Replace this with your actual data fetching logic.
    const fetchData = async () => {
      try {
        const salesPerson = JSON.parse(await getSalesPerson()); // Your API endpoint
        const catList = JSON.parse(await getTicketCategory(1));
        const ticketStage = JSON.parse(await getTicketStage(1));
        const data = {
          salesPerson: salesPerson,
          catList: catList,
          ticketStages:  ticketStage
        }
        //const data = await response.json();
        setBaseData(data); // Assuming your data is an array of objects
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchData();
  }, []);

/*
  async function getCatList(){
    const response = await getTicketCategory(1); // Your API endpoint
  }
*/
  const getCatList = getTicketCategory;

  return (
    <ThemeProvider theme={defaultTheme}>
      <ResponsiveAppBar />
      <Paper>
        {/*<ProminentAppBar />*/}
        <Grid container spacing={1}
        style={{ marginLeft: '10px' }}
          >
              {/* Name */}
              <Grid item xs={9} >
                <TextField label="Ticket Description" 
                inputProps={{ style: { fontSize: 30 } }} fullWidth/>
              </Grid>
            <Grid item xs={12} md={6}>

              <Grid item xs={6}>
                <TextField label="Organization" fullWidth />
              </Grid>

              <Grid item xs={6}>
                <TextField label="Contact Person" fullWidth />
              </Grid>

              <Grid item xs={6}>
                <TextField label="Email" fullWidth />
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
                    data={baseData.salesPerson}
                    allowFreeSolo={false}
                    addNew={false}
                  />
              </Grid>

              <Grid item xs={6}>
                <AutocompleteAdd
                      label="Category"
                      data={baseData.catList}
                      allowFreeSolo={false}
                      addNew={false}
                    />
              </Grid>
              <Grid item xs={6}>
                <DatePick 
                  label="Expected closure date"
                  format="DD-MM-YYYY"
                  onChange={validateDate}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <AutocompleteAdd
                    label="Next Stage"
                    data={baseData.ticketStages}
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
};

