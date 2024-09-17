"use server"
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Paper, Typography } from '@mui/material';
import { getExecutiveEnquiriesOverview } from '@/app/controllers/dashboard.controller';
import weekOfYear from 'dayjs/plugin/weekOfYear'
import dayjs from 'dayjs';

const pgSize = 5;
const groupByName = (enquiries: any, data: any) => {
  const currWeek = dayjs().week() - 1;
  let result: any = {};
  data.forEach((ele: any) => {
    result[ele["name"]] = new Array(5); 
    result[ele["name"]][0] = ele["name"];
    result[ele["name"]][1] = Number(ele["total"]);
    result[ele["name"]][2] = 0;
    result[ele["name"]][3] = 0;
    result[ele["name"]][4] = 0;
  });  

  enquiries.forEach((ele: any) => {
    const ind = currWeek - ele["week"] + 2;
    result[ele["name"]][ind] = Number(ele["count"]);
  });
  
  console.log(result);
  return result;
}

const createTableData = (data: any) => {
  let result = [];
  for (const key in data) {
    let obj: any = {};
    obj["id"] = result.length + 1;
    obj["name"] = key;
    obj["total"] = data[key][1];
    obj["since1w"] = data[key][2];
    obj["since2w"] = data[key][3] + obj["since1w"];
    obj["since3w"] = data[key][4] + obj["since2w"];

    result.push(obj);
  }
  console.log(result);
  
  return result
}
export default async function ExecutiveEnquiryList() {
  dayjs.extend(weekOfYear);
  let result, data;
  try {
    result = await getExecutiveEnquiriesOverview();
    console.log(result);
    
    const groupedData = groupByName(result[1], result[0]);
    data = createTableData(groupedData);
    
  } catch (e) {
    console.log();
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Executive', width: 200 },
    { field: 'total', headerName: 'Open', width: 150 },
    { field: 'since1w', headerName: 'Since 1 week', width: 150, description: 'Number of open enquiries since 1 week' },
    { field: 'since2w', headerName: 'Since 2 week', width: 150, description: 'Number of open enquiries since 2 week' },
    { field: 'since3w', headerName: 'Since 3 week', width: 150, description: 'Number of open enquiries since 3 week' }
  ];


  return (
    <>
      <Paper elevation={2} sx={{ p: 2, borderRadius: "16px", }}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>Enquiries</Typography>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[pgSize, 10, 20]}
          disableRowSelectionOnClick
        />
      </Paper>
    </>
  );
}
