//'use client'
import * as React from 'react';
//import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


interface TitleProps {
  children?: React.ReactNode;
}
function Title(props: TitleProps) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}
// Generate Order Data
function createData(
  id: number,
  name: string,
  admin: string,
  db: string,
) {
  return { id, name, admin, db };
}

const rows = [
  createData(
    1,
    "MyCo",
    "admin",
    "crmdb"
    ),
];

export default function Companies() {
  return (
    <React.Fragment>
      <Grid>
        <Title>Choose Company</Title>
        <Button>Create</Button>
      </Grid>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ '& th': { color: 'black', fontWeight: 'bold' } }}>
            <TableCell>Name</TableCell>
            <TableCell>DB Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <a href="https://google.com">{row.name}</a>
              </TableCell>
              <TableCell>{row.db}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
