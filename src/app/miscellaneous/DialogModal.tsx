"use client"
import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { AddDialog } from '../Widgets/masters/addDialog';

type AsyncFunction = () => Promise<void>;

export let setDialogOpenClose: any;
export let setModalTitle: any;
export let setModalfnController: any;

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
                    <Box sx={{ display: "flex", flexDirection: "column",justifyContent:"center" ,height: "7rem", width: "25rem" }}>
                        <Typography variant='h6' sx={{margin:"auto"}}>{title}</Typography>
                        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
                            <Button variant="contained" color='error' onClick={() => {
                                fnController?.()
                                setDialogOpen(false)
                            }}>
                                Yes
                            </Button>
                            <Button variant="contained" onClick={() => setDialogOpen(false)}>
                                No
                            </Button>
                        </Box>
                    </Box>
                </AddDialog>
            )}
        </>
    )
}