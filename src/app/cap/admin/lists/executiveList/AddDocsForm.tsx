"use client";
import * as zs from "@/app/zodschema/zodschema";
import React, { useState } from "react";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { SelectMasterWrapper } from "@/app/Widgets/masters/selectMasterWrapper";
import Seperator from "@/app/Widgets/seperator";
import Snackbar from "@mui/material/Snackbar";
import { docDescriptionSchemaT, masterFormPropsT, masterFormPropsWithDataT, selectKeyValueT } from "@/app/models/models";
import { getUnit, getUnitById } from "@/app/controllers/unit.controller";
import UnitForm from "@/app/Widgets/masters/masterForms/unitForm";
import { Collapse, IconButton, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function AddDocsForm(props: any) {
    const [formError, setFormError] = useState<
        Record<string, { msg: string; error: boolean }>
    >({});
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [file,setFile] = React.useState<string | ArrayBuffer | null | undefined>();
    const [selectedFileName,setSelectedFileName] = React.useState("");
    const [fileType,setFileType] = React.useState("");
    const handleCancel = () => {
        props.setDialogOpen ? props.setDialogOpen(false) : null;
    };

    const handleSubmit = async (formData: FormData) => {
        let data: { [key: string]: any } = {}; // Initialize an empty object

        data["description"] = formData.get("description");
        data["document"] = selectedFileName;
        data["file"] = file;
        data["fileType"] = fileType;
        data["type"] = "state";
        console.log("data : ",data);
        props.setData
            ? props.setData((prevData: any) => [
                ...prevData,
                { id: (0-prevData.length-1), ...data },
            ])
            : null;
        props.setDialogOpen ? props.setDialogOpen(false) : null;
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            const file = files[0];
            console.log("upload file : ",file);
            setSelectedFileName(file.name);
            setFileType(file.type);

            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result;
                // console.log(base64String);
                setFile(base64String);
            };
            reader.readAsDataURL(file);
        }
    }

    const clearFormError = () => {
        setFormError((curr) => {
            const { form, ...rest } = curr;
            return rest;
        });
    };

    return (
        <>
            <Box
                sx={{
                    position: "sticky",
                    top: "0px",
                    zIndex: 2,
                    paddingY: "10px",
                    bgcolor: "white",
                }}
            >
                <Seperator>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        Add Document
                        <IconButton onClick={handleCancel}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Seperator>
            </Box>
            <Collapse in={formError?.form ? true : false}>
                <Alert
                    severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={clearFormError}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {formError?.form?.msg}
                </Alert>
            </Collapse>
            <Box id="sourceForm" sx={{ m: 2, p: 3 }}>
                <form action={handleSubmit} noValidate>
                    <Box
                        sx={{
                            display: "grid",
                            columnGap: 2,
                            rowGap: 1,
                            gridTemplateColumns: "1fr auto",
                            alignItems: "center"
                        }}
                    >
                        <InputControl
                            required
                            inputType={InputType.TEXT}
                            name="description"
                            id="description"
                            label="Description"
                            error={formError?.description?.error}
                            helperText={formError?.description?.msg}
                        />
                        {file ? selectedFileName : <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                            sx={{ width: '200px', height: '35px' }}
                        >
                            Upload files
                            <VisuallyHiddenInput
                                type="file"
                                onChange={handleFileChange}
                                multiple
                            />
                        </Button>}
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            m: 1
                        }}
                    >
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ width: "15%", marginLeft: "5%" }}
                        >
                            Submit
                        </Button>
                    </Box>
                </form>
                <Snackbar
                    open={snackOpen}
                    autoHideDuration={1000}
                    onClose={() => setSnackOpen(false)}
                    message="Item Added (See the end of the list)!"
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                />
            </Box>
        </>
    );
}
