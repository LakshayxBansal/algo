//'use client'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Paper } from '@mui/material';
import { getCompanyList } from '../services/masters.service';
import { getSession }  from '../services/session.service';
import CellDbName from './cellDBName';
import CreateCompanyDialog from './CreateCompanyDialog';
import { redirect } from 'next/navigation';
import {dbInfoT} from '../models/models';


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

export default async function Companies() {
  const session = await getSession();
  
  async function callBackAfterAddCo() {
    'use server'
    redirect('/company')
  }

  if (session) {
    console.log(session)
    const rows:dbInfoT[] = await getCompanyList(session.user?.userId);
    return (
      <Paper sx={{ p: 2, height: '100vh'}}>
        <React.Fragment>
          <Grid sx={{ display: 'flex' }}>
            <Title>Choose Company</Title>
            <CreateCompanyDialog
              email={session.user?.email!}
              callBackParent={callBackAfterAddCo}
            ></CreateCompanyDialog>
          </Grid>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ '& th': { color: 'black', fontWeight: 'bold' } }}>
                <TableCell>Name</TableCell>
                <TableCell>DB Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row) => (
                <TableRow key={row.company_id}>
                  <CellDbName row={row} userId={session.user.userId as number}></CellDbName>
                  <TableCell>{row.dbName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
      </Paper>
    );
  } else {
    redirect('/signin');
  }
}
