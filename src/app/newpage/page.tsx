"use client"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Checkbox, MenuItem, Select } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';

const Item1 = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '30vh' ,
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));



const columns: GridColDef[] = [
  { field: 'calllNo', headerName: 'Call No.', width: 70 },
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

const rows = [
  { id: 1, callNo: "1/2024-2025", contactParty: 'Ramlal', date: dayjs(), time:"10:31AM" , age: 35 , callCategory: "---Other" , area:"---Other" , executive:"Dinesh" , callStatus:"Open", subStatus:"Demo Done", nextAction:"Specify Latest" , actionDate:"" ,    },
  { id: 2, callNo: "2/2024-2025", contactParty: 'Rajesh Yadav', date: dayjs(), age: 35 , callCatagory: "---Other" , area:"---Other" , executive:"Coordinator" , callStatus:"Open", subStatus:"Unallocated", nextAction:"Call" , actionDate:"15-5-2024" ,   },

];


export default function AutoGrid() {
  return (<>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Item1>xs2</Item1>
        </Grid>

        <Grid item xs={4}>
          <Item1>xs=4</Item1>
        </Grid>
        <Grid  item xs={3}>
        <Checkbox/>
        <Select
                labelId="decmal-place-label"
                id="decimal-place"
                datatype="number"
                name="decimal_places"
                // value={decimalPlaces}
                label="Decimal Places"
              >
                <MenuItem value={2}>Two Digits</MenuItem>
              </Select>
        </Grid>
        <Grid  item xs={3}>
          <Item1>xs3</Item1>
        </Grid>
      </Grid>
    </Box>
    <Box sx={{ flexGrow:1 }}>
    <Grid >
    <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ overflow: 'clip' }}
      />
    </Grid>
    </Box>
    </>
  );
}
