"use client";
import * as zs from "@/app/zodschema/zodschema";
import React, { useState } from "react";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { SelectMasterWrapper } from "@/app/Widgets/masters/selectMasterWrapper";
import Seperator from "@/app/Widgets/seperator";
import Snackbar from "@mui/material/Snackbar";
import { Collapse, IconButton } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { docDescriptionSchemaT, masterFormPropsT } from "@/app/models/models";

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

export default function AddDocsForm({setDialogOpen,setData}:{setDialogOpen : React.Dispatch<React.SetStateAction<boolean>>,setData : React.Dispatch<React.SetStateAction<docDescriptionSchemaT[]>>}) {
    const [formError, setFormError] = useState<
        Record<string, { msg: string; error: boolean }>
    >({});
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [file, setFile] = React.useState<string | ArrayBuffer | null | undefined>();
    const [selectedFileName, setSelectedFileName] = React.useState("");
    const [fileType, setFileType] = React.useState("");
    const handleCancel = () => {
        setDialogOpen(false);
    };

    const handleSubmit = async (formData: FormData) => {
        let data: { [key: string]: any } = {}; // Initialize an empty object
        if(!file){
            const errorState: Record<string, { msg: string; error: boolean }> = {};
            errorState["form"] = { msg: "Please upload file", error: true };
            setFormError(errorState);
        }
        data["description"] = formData.get("description");
        data["fileName"] = selectedFileName;
        data["file"] = file as string;
        data["fileType"] = fileType;
        data["type"] = "state";

        const parsed = zs.docDescriptionSchema.safeParse(data);
        if (parsed.success) {
            if(file){
            setData((prevData: docDescriptionSchemaT[]) => [
                    ...prevData,
                    { id: (0 - prevData.length - 1), ...data as docDescriptionSchemaT},
                ]);
            setDialogOpen(false);
            }
        } else {
            const issues = parsed.error.issues;
            const errorState: Record<string, { msg: string; error: boolean }> = {};
            errorState["form"] = { msg: "Error encountered", error: true };
            if(!file){
                errorState["form"] = { msg: "Please upload file", error: true };
            }
            for (const issue of issues) {
                for (const path of issue.path) {
                    errorState[path] = { msg: issue.message, error: true };
                    if (path === "refresh") {
                        errorState["form"] = { msg: issue.message, error: true };
                    }
                }
            }
            setFormError(errorState);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            const file = files[0];
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
                        Upload Document
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
            <Box id="sourceForm" sx={{ m: 2, p: 1,width: "500px" }}>
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
                            inputType={InputType.TEXTFIELD}
                            name="description"
                            id="description"
                            label="Description"
                            rows={6}
                            fullWidth
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
                            Upload file
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
                            sx={{ width: "20%", marginLeft: "5%" }}
                        >
                            Upload
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
