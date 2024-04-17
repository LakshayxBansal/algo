'use client'

import * as React from 'react';
import { Grid, TextField} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from "@mui/material/styles";
import { theme } from '../../utils/theme.util';
import FullFeaturedCrudGrid from './tasks';
import AutocompleteAdd, { propsDataT }  from '../../Widgets/Autocomplete';

interface TabPanelProps {
  children?: React.ReactNode;
  index?: number;
  value: string;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === "Notes" && (
        <Box sx={{ p: 1, minHeight: "200px" }}>
          {/* Comments */}
          <Grid item xs={12}>
            {createNotes()}
          </Grid>
        </Box>
      )}
      {value === "Details" && (
        <Box sx={{ p: 1, minHeight: "200px" }}>
          {createDetails()}
        </Box>
      )}
      {value === "Tasks" && (
        <Box sx={{ p: 1, minHeight: "200px" }}>
          <Grid item xs={12}>
            {createTasks()}
          </Grid>
        </Box>
      )}
      {value === "Items" && (
        <Box sx={{ p: 1, minHeight: "200px" }}>
          <Typography>Item three</Typography>
        </Box>
      )}
      {value === "History" && (
        <Box sx={{ p: 1, minHeight: "200px"}}>
          <Typography>Item three</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ColorTabs() {
  const [tab, setTab] = React.useState('Details');
  const [detailState, setDetailState] = React.useState();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    const ctar = event.currentTarget;
    const tar = event.target;
    console.log(ctar);
    console.log(tar);
    console.log(tab);
    switch(tab) {
      case "Details" : 
        console.log('set details state here');
        break;
      case "Notes" : 
        console.log('set Notes state here');
        break;
      case "Items" : 
        console.log('set Items state here');
        break;
      case "History" : 
        console.log('set History state here');
        break;
    }
    setTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>

    <Box sx={{ width: '98%' }}>
      <Box sx={{ border: 1, borderColor: 'divider' }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="Details" label="Inquiry Details"/>
          <Tab value="Notes" label="Notes"/>
          <Tab value="Items" label="Item Information"/>
          <Tab value="History" label="History"/>
        </Tabs>
      </Box>
      <CustomTabPanel value={tab}/>
    </Box>
    </ThemeProvider>
  );
}


function createNotes(){
  return(
    <TextField placeholder="Please enter your comments" multiline name="notes" rows={8} fullWidth />
  );
}


function createTasks() {
  return (
    <FullFeaturedCrudGrid></FullFeaturedCrudGrid>
  )
}


function createDetails(){

  return(
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs={12} md={4}>
            <Grid container direction="column" p={2}>
              {/* Address */}
              <Grid item xs={6}>
                <TextField label="Address Line 1" name="add1" fullWidth />
              </Grid>

              <Grid item xs={6}>
                <TextField label="Address Line 2" name="add2" fullWidth />
              </Grid>

              <Grid item xs={6}>
                <TextField label="Pin Code" name="pin" fullWidth />
              </Grid>

              {/* City */}
              <Grid item xs={6}>
                <TextField label="City" name="city" fullWidth />
              </Grid>

              {/* State */}
              <Grid item xs={6}>
                <TextField label="State" name="state" fullWidth />
              </Grid>
            </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
            <Grid container direction="column" p={2}>
              {/* Address */}
              <Grid item xs={9}>
                <TextField label="Expected Rev"   
                  name="rev"        
                  type="number"
                  fullWidth />
              </Grid>

              <Grid item xs={3}>
                <TextField label="Probablity (%)" 
                name="prob"
                type="number" 
                fullWidth />
              </Grid>
            </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}