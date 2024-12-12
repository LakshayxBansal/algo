"use client";
import React, { useState } from "react";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridSlots, GridToolbarContainer } from "@mui/x-data-grid";
import { AddDialog } from "@/app/Widgets/masters/addDialog";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import { Box, Button, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import Seperator from "@/app/Widgets/seperator";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddIcon from "@mui/icons-material/Add";
import AddDocsForm from "./AddDocsForm";
import { deleteExecutiveDoc, updateExecutiveDoc, viewExecutiveDoc } from "@/app/controllers/document.controller";
import { docDescriptionSchemaT } from "@/app/models/models";

// type ModifiedRowT = {
//     id?: number;
//     description?: string;
//     objectId?: number;
//     objectTypeId?: number;
//     document?: string;
//     file?: string | ArrayBuffer | null;
//     fileType?: string;
// };



const StyledGridOverlay = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    "& .no-rows-primary": {
        fill: "#3D4751",
        ...theme.applyStyles("light", {
            fill: "#AEB8C2",
        }),
    },
    "& .no-rows-secondary": {
        fill: "#1D2126",
        ...theme.applyStyles("light", {
            fill: "#E8EAED",
        }),
    },
}));

function CustomNoRowsOverlay() {
    return (
        <StyledGridOverlay>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width={96}
                viewBox="0 0 452 257"
                aria-hidden
                focusable="false"
            >
                <path
                    className="no-rows-primary"
                    d="M348 69c-46.392 0-84 37.608-84 84s37.608 84 84 84 84-37.608 84-84-37.608-84-84-84Zm-104 84c0-57.438 46.562-104 104-104s104 46.562 104 104-46.562 104-104 104-104-46.562-104-104Z"
                />
                <path
                    className="no-rows-primary"
                    d="M308.929 113.929c3.905-3.905 10.237-3.905 14.142 0l63.64 63.64c3.905 3.905 3.905 10.236 0 14.142-3.906 3.905-10.237 3.905-14.142 0l-63.64-63.64c-3.905-3.905-3.905-10.237 0-14.142Z"
                />
                <path
                    className="no-rows-primary"
                    d="M308.929 191.711c-3.905-3.906-3.905-10.237 0-14.142l63.64-63.64c3.905-3.905 10.236-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-63.64 63.64c-3.905 3.905-10.237 3.905-14.142 0Z"
                />
                <path
                    className="no-rows-secondary"
                    d="M0 10C0 4.477 4.477 0 10 0h380c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 20 0 15.523 0 10ZM0 59c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 69 0 64.523 0 59ZM0 106c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 153c0-5.523 4.477-10 10-10h195.5c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 200c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 247c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10Z"
                />
            </svg>
            <Box sx={{ mt: 2 }}>No Items Added</Box>
        </StyledGridOverlay>
    );
}


export default function DocModal({ docData, setDocData, setDialogOpen }: { docData: docDescriptionSchemaT[], setDocData: React.Dispatch<React.SetStateAction<docDescriptionSchemaT[]>>, setDialogOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [formError, setFormError] = useState<
        Record<string, { msg: string; error: boolean }>
    >({});
    const [editMode, setEditMode] = useState<GridRowId | null>();
    const [openAddDocDialog, setOpenAddDocDialog] = useState(false);
    const [modifiedRowData, setModifiedRowData] = useState<docDescriptionSchemaT>();

    function EditToolbar() {

        const handleClick = () => {
            setOpenAddDocDialog(true);
        };

        return (
            <GridToolbarContainer
                sx={{ display: "flex", justifyContent: "flex-end" }}
            >
                <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                    Add Document
                </Button>
            </GridToolbarContainer>
        );
    }

    const columns: GridColDef[] = [
        {
            field: "description",
            headerName: "Description",
            type: "string",
            width: 150,
            align: "left",
            headerAlign: "left",
            renderCell: (params) => {
                if (editMode === params.row.id) {
                    return (
                        <InputControl
                            required
                            inputType={InputType.TEXT}
                            name="description"
                            id="description"
                            defaultValue={params.row.description}
                            error={formError?.description?.error}
                            helperText={formError?.description?.msg}
 setFormError={setFormError}
                            onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
                                setModifiedRowData((prevState) => ({
                                    ...prevState,
                                    description: event.target.value,
                                }));
                            }}
                        />
                    );
                }
            },
        },
        {
            field: "fileName",
            headerName: "Document",
            width: 150,
            renderCell: (params) => {
                if (editMode === params.row.id) {
                    if (params.row.type === "db") {
                        return (
                            <>
                                <IconButton onClick={() => { handleViewClickDB(params.row) }} aria-label="file">
                                    <AttachFileIcon />
                                </IconButton>
                            </>
                        );
                    }else{
                        return (
                            <>
                                {modifiedRowData?.fileName}
                            </>
                        );
                    }
                }
                if (params.row.type === "db") {
                    return (
                        <>
                            <IconButton onClick={() => { handleViewClickDB(params.row) }} aria-label="file">
                                <AttachFileIcon />
                            </IconButton>
                        </>
                    );
                }
            },
        },
        {
            field: "actions",
            type: "actions",
            width: 100,
            getActions: (params) => {
                if (editMode === params.row.id) {
                    return [
                        <GridActionsCellItem
                            key={params.row.id}
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: "primary.main",
                            }}
                            onClick={params.row.type === "db" ? handleSaveClickDB : handleSaveClick}
                        />,
                        <GridActionsCellItem
                            key={params.row.id}
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        key={params.row.id}
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(params.row.id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        key={params.row.id}
                        icon={<DeleteIcon />}
                        label="Delete"
                        // onClick={handleDeleteClick(params.row.id)}
                        onClick={params.row.type === "db" ? () => handleDeleteClickDB(params.row) : handleDeleteClick(params.row.id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const handleSaveClick = () => {
        //save the data from modifiedRowData state into rows of data grid
        if (docData.length > 0) {
            const updatedRows = docData.map((row) =>
                row.id === modifiedRowData?.id ? { ...row, ...modifiedRowData } : row
            );
            setDocData(updatedRows);
            setEditMode(null);
        }
    };

    const handleSaveClickDB = async () => {
        try {
            await updateExecutiveDoc(modifiedRowData?.description as string, modifiedRowData?.id as number);
            const updatedRows = docData.map((row) =>
                row.id === modifiedRowData?.id ? { ...row, ...modifiedRowData } : row
            );
            setDocData(updatedRows);
            setEditMode(null);
        } catch (error) {
            throw error;
        }
    }

    const handleDeleteClickDB = async (data: docDescriptionSchemaT) => {
        try {
            if (docData.length > 0) {
                const updatedRows = docData.filter((row) => row.id !== data.id);
                await deleteExecutiveDoc(data.id as number,data.docId as string);
                setDocData(updatedRows);
            }
        } catch (error) {
            throw error;
        }
    }


    const handleViewClickDB = async (data : docDescriptionSchemaT) => {
        try {
            const result = await viewExecutiveDoc(data.docId as string);

            if (result?.buffer && result?.contentType && result?.fileName) {
                const { buffer, contentType, fileName } = result;

                    const binary = atob(buffer);
                    const len = binary.length;
                    const bufferArray = new Uint8Array(len);

                    for (let i = 0; i < len; i++) {
                        bufferArray[i] = binary.charCodeAt(i);
                    }

                    // Create a Blob from the binary data
                    const blob = new Blob([bufferArray], { type: contentType });

                    // Create object URL from Blob
                    const url = window.URL.createObjectURL(blob);

                    // Download logic
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = fileName || data.description;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    // Revoke the object URL to free memory
                    window.URL.revokeObjectURL(url);
            }


        } catch (error) {
            throw error;
        }
    }

    const handleDeleteClick = (id: GridRowId) => () => {
        // Filter out the row with the matching id
        if (docData.length > 0) {
            const updatedRows = docData.filter((row) => row.id !== id);

            // Update the data state with the filtered rows
            setDocData(updatedRows);
        }
    };

    const handleCancelClick = () => {
        setEditMode(null);
    };

    const handleEditClick = (id: GridRowId) => () => {
        setEditMode(id);
        const selectedRowData = docData.find((row) => row.id === id); // Find the corresponding row data
        setModifiedRowData(selectedRowData); //Setting selected row data in modifiedRowData state
    };

    return (
        <>
            <Box sx={{ height: "450px", width: "800px", p: 2, m: 2 }}>
                <DataGrid
                    columns={columns}
                    rows={docData ? docData : []}
                    disableRowSelectionOnClick
                    slots={{
                        noRowsOverlay: ()=><></>,
                        toolbar: EditToolbar as GridSlots["toolbar"],
                    }}
                    hideFooter = {true}
                    sx={{
                        "& .MuiDataGrid-columnHeaders": {
                            "& .MuiDataGrid-columnHeaderTitle": {
                                fontWeight: "bold",
                            },
                        },
                        boxShadow : 1
                    }}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
                <Button onClick={() => {
                    setDocData((prevData) => prevData.filter((doc) => doc.id as number >= 0));
                    setDialogOpen(false)

                }} tabIndex={-1}>Cancel</Button>
                <Button
                    variant="contained"
                    sx={{ width: "15%", marginLeft: "5%" }}
                    onClick={() => {
                        setDialogOpen(false)
                    }}
                >
                    Done
                </Button>
            </Box>
            {openAddDocDialog && (
                <AddDialog
                    title="Upload Document"
                    open={openAddDocDialog}
                    setDialogOpen={setOpenAddDocDialog}
                >
                    <AddDocsForm
                        setDialogOpen={setOpenAddDocDialog}
                        setData={setDocData}
                    />
                </AddDialog>
            )}
        </>
    )
}