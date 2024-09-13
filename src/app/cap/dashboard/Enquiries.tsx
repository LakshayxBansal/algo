'use client'
import * as React from 'react';
import { StripedDataGrid } from '@/app/utils/styledComponents';
import { GridColDef } from '@mui/x-data-grid';
import Title from './Title';
import { Paper } from '@mui/material';

const pgSize = 5;
interface HashMap {
  [key: string]: object[];
}
const splitDataByExecutive = (openEnquiries: any) => {
  let data: HashMap = {};
  for (const ele of openEnquiries) {
    if(ele.executiveName){
      if (!data[ele.executiveName]) {
        data[ele.executiveName] = [];
      }
      data[ele.executiveName].push(ele);
    }
  }
  return data;  
}

const createData = (enquiries: any) => {
  let data: any = []; 
  for (let key in enquiries) {
    let obj: any = {};
    obj["id"] = data.length + 1;
    obj["executive"] = key;
    obj["total"] = enquiries[key].length;
    obj["since1w"] = 0;
    obj["since2w"] = 0;
    obj["since3w"] = 0;

    let currDate = new Date();
    for (const ele of enquiries[key]) {
      const eleDate = ele.date;
      const millisecondsPerDay = 86400000;
      const diffInMilliseconds = currDate.getTime() - eleDate.getTime();
      
      const diffInDays = diffInMilliseconds / millisecondsPerDay;
    
      if(diffInDays < 7){
        obj["since1w"]++;
      }
      if(diffInDays < 14){
        obj["since2w"]++;
      }
      if(diffInDays < 21){
        obj["since3w"]++;
      }
    }
    data.push(obj);
  }
  return data;
}
export default function Enquiries(props: {
  openEnquiries: any
}) {
  const executiveEnquiries = splitDataByExecutive(props.openEnquiries);
  const [PageModel, setPageModel] = React.useState({ pageSize: pgSize, page: 0 });
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'executive',
      headerName: 'Executive',
      width: 200,
    },
    {
      field: 'total',
      headerName: 'Total Open',
      width: 150,
    },
    {
      field: 'since1w',
      headerName: 'Since 1 week',
      width: 150,
    },
    {
      field: 'since2w',
      headerName: 'Since 2 week',
      width: 150,
    },
    {
      field: 'since3w',
      headerName: 'Since 3 week',
      width: 150,
    }
  ];

  const data = createData(executiveEnquiries);
  // const data = [
  //   {id: '1', executive: 'Ankit', totalOpen: '10', since1w: '3', since2w: '3', since3w: '4'},
  // ];
  
  return (
    <Paper elevation={2} sx={{p: 2, borderRadius: "16px",}}>
      <Title>Enquiries</Title>
      <StripedDataGrid
        rows={data ? data : []}
        columns={columns}
        rowCount={data.length}
        getRowId={(row) => row.id}
        pagination={true}
        pageSizeOptions={[pgSize, 10, 20]}
        paginationMode="server"
        paginationModel={PageModel}
        onPaginationModelChange={setPageModel}
        filterMode="server"
        loading={data ? false : true}
      />
    </Paper>
  );
}
