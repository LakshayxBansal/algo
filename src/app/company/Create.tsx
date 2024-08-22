"use client"
import { Button } from "@mui/material"
import { AddDialog } from "../Widgets/masters/addDialog"
import { useState } from "react";
import { optionsDataT } from "../models/models";
// import CreateCompanyDialog from "./CreateCompanyDialog";
import CreateCompany from "./CreateCompany";

export function Create(props: any){
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogValue, setDialogValue] = useState<optionsDataT>({} as optionsDataT);
    return <>
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
            <CreateCompany setDialogOpen={setDialogOpen} setDialogValue={setDialogValue} data={props.email}/>
          {/* (setDialogOpen, setDialogValue) */}
          </AddDialog>
        )}
      </>
}