'use client'
import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { StripedDataGrid } from '@/app/utils/styledComponents';
import { GridColDef } from '@mui/x-data-grid';

// Generate Order Data
function createData(
  id: number,
  date: string,
  name: string,
  shipTo: string,
  paymentMethod: string,
  amount: number,
) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}
const pgSize = 5;

export default function Orders() {
  const [PageModel, setPageModel] = React.useState({ pageSize: pgSize, page: 0 });
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'executive',
      headerName: 'Executive',
      width: 200,
    },
    {
      field: 'totalOpen',
      headerName: 'Total Open',
      width: 200,
    },
    {
      field: 'since1w',
      headerName: 'Since 1 week',
      width: 200,
    },
    {
      field: 'since2w',
      headerName: 'Since 2 week',
      width: 200,
    },
    {
      field: 'since3w',
      headerName: 'Since 3 week',
      width: 200,
    }
  ];

  const data = [
    {id: '1', executive: 'Ankit', totalOpen: '10', since1w: '3', since2w: '3', since3w: '4'},
    {id: '2', executive: 'Ankit', totalOpen: '10', since1w: '3', since2w: '3', since3w: '4'}
  ];
  
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      {/* <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
      <StripedDataGrid
        rows={data ? data : []}
        columns={columns}
        rowCount={data.length}
        getRowId={(row) => row.id}
        pagination={true}
        pageSizeOptions={[pgSize, 20, 30]}
        paginationMode="server"
        paginationModel={PageModel}
        onPaginationModelChange={setPageModel}
        filterMode="server"
        loading={!data}
      />
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </React.Fragment>
  );
}
