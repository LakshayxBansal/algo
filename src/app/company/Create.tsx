"use client"
import { Button, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { AddDialog } from "../Widgets/masters/addDialog"
import { Fragment, useEffect, useState } from "react";
import { dbInfoT } from "../models/models";
import CreateCompany from "./CreateCompany";
import { getCompanyList } from "../services/masters.service";
import CellDbName from "./cellDBName";

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


export function Create(props: any){
    const [dialogOpen, setDialogOpen] = useState(false);
    // const [dialogValue, setDialogValue] = useState<optionsDataT>({} as optionsDataT);
    const [companyList, setCompanyList] = useState<dbInfoT[]>([]);

    const fetchCompanyList = async () => {
      const data = await getCompanyList(props.email)
      setCompanyList(data)
    }

    useEffect(() => {
      fetchCompanyList()
    }, [dialogOpen])
    
    return <>
        <Paper sx={{ p: 2, height: '100vh'}}>
        <Fragment>
          <Grid sx={{ display: 'flex' }}>
            <Title>Choose Company</Title>
        <Button                 
          variant="contained"
          onClick={() => setDialogOpen(true)}
          sx={{
          ml: 5, 
          display: 'flex',  
          backgroundColor: '#4285F4',
          alignItems: 'center',
          border: 'none',
          textTransform: 'none',
          justifyContent: 'center',
          }}>
          Create
        </Button>
        {dialogOpen && (
          <AddDialog
            title={"Create Company"}
            open={dialogOpen}
            setDialogOpen={setDialogOpen}
          >
            <CreateCompany setDialogOpen={setDialogOpen} data={props.email}/>
          </AddDialog>
        )}    
          </Grid>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ '& th': { color: 'black', fontWeight: 'bold' } }}>
                <TableCell>Name</TableCell>
                <TableCell>DB Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companyList?.map((row) => (
                <TableRow key={row.company_id}>
                  <CellDbName row={row} userEmail={props.email as string}></CellDbName>
                  <TableCell>{row.dbName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Fragment>
        </Paper>
      </>
}