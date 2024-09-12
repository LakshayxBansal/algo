"use client"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Checkbox, FormControl, FormControlLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import {GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import DataGridComp from '../miscellaneous/datagrid';

const Item1 = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  border:"1",
  borderColor:"blueviolet",
  textAlign: 'center',
  height: '30vh' ,
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));



const column1: GridColDef[] = [
  { field: 'callNo', headerName: 'Call No.', width: 70 },
  { field: 'contactParty', headerName: 'Contact/Party', width: 130 },
  { field: 'date', headerName: 'Date', width: 130 },
  {
    field: 'time',
    headerName: 'Time',
    type: 'number',
    width: 90,
  },
  {
    field: 'callCategory',
    headerName: 'Call Category',
    width: 160,
  },
  { field: 'area', headerName: 'Area', width: 130 },
  { field: 'executive', headerName: 'Executive', width: 130 },
  { field: 'callStatus', headerName: 'Call Status', width: 130 },
  { field: 'subStatus', headerName: 'Sub Status', width: 130 },
  { field: 'nextAction', headerName: 'Next Action', width: 130 },
  { field: 'actionDate', headerName: 'Action Date', width: 130 },
];

const row1 = [
  { id: 1, callNo: "1/2024-2025", contactParty: 'Ramlal', date: dayjs(), time:"10:31AM" , age: 35 , callCategory: "---Other" , area:"---Other" , executive:"Dinesh" , callStatus:"Open", subStatus:"Demo Done", nextAction:"Specify Latest" , actionDate:"" ,    },
  { id: 2, callNo: "2/2024-2025", contactParty: 'Rajesh Yadav', date: dayjs(), age: 35 , callCatagory: "---Other" , area:"---Other" , executive:"Coordinator" , callStatus:"Open", subStatus:"Unallocated", nextAction:"Call" , actionDate:"15-5-2024" ,   },

];

const column2: GridColDef[] = [
  { field: 'type', headerName: 'Type', width: 70 },
  { field: 'date', headerName: 'Date', width: 130 },
  { field: 'time', headerName: 'Time', width: 130 },
  {
    field: 'executive',
    headerName: 'Executive',
    width: 400,
  },
  { field: 'subStatus', headerName: 'Sub Status', width: 130 },
  { field: 'actionTaken', headerName: 'Next Action', width: 130 },
  { field: 'nextAction', headerName: 'Next Action', width: 130 },
  { field: 'actionDate', headerName: 'Action Date', width: 130 },
];

const row2 = [
  { id: 1, type: "ClRc", date: '11-05-2024', time:"3:04PM" , executive: "coordinator" , subStatus:"Unallocated", actionTaken:"None",nextAction:"To Be Alllocated" , actionDate:"11-05-2024" ,    },
];


export default function AutoGrid() {
  const [Filter, setFilter] = React.useState("--None--");
  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };
  return (<>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Item1>xs2</Item1>
        </Grid>

        <Grid item xs={4}>
          <Box sx={{gridTemplateColumns: "repeat(2, 1fr)",
            border:"1px dashed black",
            width:"32.5vw"
          }}>
            <FormControlLabel control={<Checkbox size='small'/>} label="Open Calls" />
            <Box >
            <FormControlLabel control={<Checkbox size='small'/>} label="Allocated Calls" />
            <FormControlLabel control={<Checkbox size='small'/>} label="Unallocated Calls" />
            <FormControlLabel control={<Checkbox size='small'/>} label="Both Calls" />
            <FormControlLabel control={<Checkbox size='small'/>} label="Sub Status" />            
            </Box>
            <FormControlLabel control={<Checkbox size='small'/>} label="Closed Calls" />
          </Box>
        </Grid>
        <Grid  item xs={3}>
          <Box sx={{
            display: 'flex',
            flexDirection:"column",
            border:"1px dashed black",
            }}>
        <FormControlLabel control={<Checkbox/>} label="Area" />
        <FormControlLabel control={<Checkbox/>} label="Executive" />
        </Box>
        
        <Box  sx={{
          display: 'flex',
          alignContent: 'space-between' ,
          flexDirection:"row",
          border:"1px dashed black",
          width: '21.25rem',
          height: '18vh',
          marginTop:"1vh",
          paddingTop:"2vh",
          gridTemplateColumns: "repeat(2, 1fr)"
        }}
        justifyContent={'space-between'}
          >
          <Typography sx={{paddingLeft:"15px"}}>Filter On:</Typography>          
        <FormControl variant="outlined" sx={{ m: 1, Width: 50 }} size='small'>
        <Select
                labelId="filter-on-label"
                id="filter-on"
                datatype="string"
                name="filter-on"
                value={Filter}
                onChange={handleFilterChange}
              >
                <MenuItem value={"--None--"}>--None--</MenuItem>
                <MenuItem value={1}>Current Date</MenuItem>
                <MenuItem value={2}>Next Date</MenuItem>
                <MenuItem value={3}>Date Range</MenuItem> 
              </Select>
              </FormControl>
              <Typography sx={{paddingLeft:"15px"}}>From:</Typography>
              <Typography>To:</Typography>
              </Box>

        </Grid>
        <Grid  item xs={3}
        sx={{ border:"1px dashed black",
        }}>
        <FormControlLabel control={<Checkbox/>} label="Call Type" sx={{marginLeft:"5vw"}} />
        <FormControlLabel control={<Checkbox/>} label="Catagory" sx={{marginLeft:"5vw"}} />
        <FormControlLabel control={<Checkbox/>} label="Source" sx={{marginLeft:"5vw"}} />
        <FormControlLabel control={<Checkbox/>} label="Next Action" sx={{marginLeft:"5vw"}} />
        <FormControlLabel control={<Checkbox/>} label="Action Taken" sx={{marginLeft:"5vw"}} />
        </Grid>
      </Grid>
    </Box>
    <Box sx={{ flexGrow:1 }}>
    <Grid sx={{ border:"2px solid black"}}>
    <DataGridComp 
    rows={row1}
    columns={column1}
    />
    </Grid>
    <Box sx={{display:'flex'}}> 
    <Typography sx={{marginLeft:"20vw"}}>Call Details : 1/2024-2025 (Ramlal)(Org:)(Ledger)</Typography>
    <Box sx={{marginLeft:"auto"
    }}>
    <Button variant="outlined" size="small">
          Allocate Call
        </Button>
        <Button variant="outlined" size="small">
          Feed Report
        </Button>
        </Box>
    </Box>
    <Grid sx={{marginTop:"2vh",
       border:"2px solid black"
    }}>
    <DataGridComp 
    rows={row2}
    columns={column2}
    />
    </Grid>
    </Box>
    <Box>
    <Button variant="outlined" size="small">
          Hide Details
        </Button>
        <FormControlLabel control={<Checkbox/>} label="Show Remarks" sx={{marginLeft:"5vw"}} />
        </Box>
        <Box>
        <Button variant="outlined" size="small">
          New Call Receipt
        </Button>
        <Button variant="outlined" size="small">
          New Call Allocation
        </Button>
        <Button variant="outlined" size="small">
          New Call Report
        </Button>
        </Box>
    </>
  );
}
