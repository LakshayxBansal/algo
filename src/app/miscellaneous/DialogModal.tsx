"use client"
import * as React from 'react';
import { Box, Button } from '@mui/material';
import { AddDialog } from '../Widgets/masters/addDialog';

type AsyncFunction = () => Promise<void>;

export let setDialogOpenClose : any;
export let setModalTitle : any;
export let setModalfnController : any;

export default function DialogModal() {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [fnController, setFnController] = React.useState<AsyncFunction | null>(null);
    setDialogOpenClose = setDialogOpen;
    setModalTitle = setTitle
    setModalfnController = setFnController;
    return (
        <>
            {dialogOpen && (
                <AddDialog
                    title={"Modal"}
                    open={dialogOpen}
                    setDialogOpen={setDialogOpen}
                >
                    {/* <Confirmation setDialogOpen={setDialogOpen} userId={inActiveUserId}/> */}
                    <Box>
                        <h2>{title}</h2>
                        <Button onClick={()=>{
                            fnController?.()
                            setDialogOpen(false)}}>
                            Yes
                        </Button>
                        <Button onClick={()=> setDialogOpen(false)}>
                            No
                        </Button>
                    </Box>
                </AddDialog>
            )}
        </>
    )
}