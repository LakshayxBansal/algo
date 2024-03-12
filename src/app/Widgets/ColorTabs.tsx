'use client'

import * as React from 'react';
import { Grid, TextField} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import BasicSelect from '../Widgets/BasicSelect';

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
  const [value, setValue] = React.useState('Notes');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ border: 1, borderColor: 'divider', width: '100%' }}>
      <Box sx={{ border: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="Notes" label="Notes"/>
          <Tab value="Details" label="Inquiry Details"/>
          <Tab value="Items" label="Item Information"/>
          <Tab value="History" label="History"/>
        </Tabs>
      </Box>
      <CustomTabPanel value={value}/>
    </Box>
  );
}


function createNotes(){
  return(
    <TextField placeholder="Please enter your comments" multiline rows={6} fullWidth />
  );
}

function createDetails(){
  const statesItems = [
    { value: 'CA', label: 'California' },
    { value: 'BAL', label: 'Baltimore' },
    { value: 'GA', label: 'Georgia' },
    { value: 'ND', label: 'New Delhi'}
  ];


  const cityItems = [
    { value: 'LA', label: 'Los Angeles' },
    { value: 'NY', label: 'New York' },
    { value: 'ATL', label: 'Atlanta' },
  ];
  return(
    <Grid container>
      <Grid item xs={12} md={6}>
          <Grid container direction="column" spacing={1} p={2}>
            {/* Address */}
            <Grid item xs={9}>
              <TextField label="Address" fullWidth />
            </Grid>

            <Grid item xs={6}>
              <TextField label="Pin Code" fullWidth />
            </Grid>

            {/* City */}
            <Grid item xs={6}>
              <BasicSelect id="cityLable" label="City" menuItems={cityItems} />
            </Grid>

            {/* State */}
            <Grid item xs={6}>
              <BasicSelect id="stateLable" label="State" menuItems={statesItems} />
            </Grid>
          </Grid>
      </Grid>

      <Grid item xs={12} md={6}>
          <Grid container direction="column" spacing={1} p={2}>
            {/* Address */}
            <Grid item xs={9}>
              <TextField label="Contact Name" fullWidth />
            </Grid>

            <Grid item xs={3}>
              <TextField label="Mobile" fullWidth />
            </Grid>

            <Grid item xs={3}>
              <TextField label="Designation" fullWidth />
            </Grid>
          </Grid>
      </Grid>
    </Grid>
  );
}