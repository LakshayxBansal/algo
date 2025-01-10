'use client';
import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Dashboard from './dashboard/page';
import SupportDashboard from './supportDashboard/page';


export default function TabLayout({
  dashboardContent,
  supportDashboardContent
}: {
  dashboardContent: React.ReactNode;
  supportDashboardContent: React.ReactNode;
}) {
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="Enquiry Tickets" value="1" />
            <Tab label="Support Tickets" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
            {dashboardContent}
        </TabPanel>
        <TabPanel value="2">
           {supportDashboardContent}
        </TabPanel>
      </TabContext>
    </Box>
  );
}