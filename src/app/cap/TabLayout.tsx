'use client';
import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ErrorOutline as ErrorOutlineIcon } from "@mui/icons-material";
import { Typography } from '@mui/material';


export default function TabLayout({
  dashboardContent,
  supportDashboardContent,
  enquiryEnabled,
  supportEnabled
}: {
  dashboardContent: React.ReactNode;
  supportDashboardContent: React.ReactNode;
  enquiryEnabled: boolean;
  supportEnabled: boolean;
}) {
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const contentEnabled = enquiryEnabled || supportEnabled;

  return (
    <Box sx={{ width: '100%' }}>
      {contentEnabled ? (
        <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', backgroundColor: 'white', paddingLeft: 1}}>
            <TabList onChange={handleChange}>
              {enquiryEnabled && (
                <Tab label="Enquiry Tickets" value="1" sx={{ backgroundColor: 'white' }} />
              )}
              {supportEnabled && (
                <Tab label="Support Tickets" value="2" sx={{ backgroundColor: 'white' }} />
              )}
            </TabList>
        </Box>
        <TabPanel value="1">
            {dashboardContent}
        </TabPanel>
        <TabPanel value="2">
           {supportDashboardContent}
        </TabPanel>
      </TabContext>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '75vh',
            textAlign: 'center',
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: 40, color: "gray", mb: 1 }} />
            <Typography variant="h6" color="textSecondary">
              No Content Found
            </Typography>
        </Box>
      )}
      
    </Box>
  );
}