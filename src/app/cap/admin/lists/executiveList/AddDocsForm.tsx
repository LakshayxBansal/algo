"use client";
import * as zs from "@/app/zodschema/zodschema";
import React, { useState } from "react";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { SelectMasterWrapper } from "@/app/Widgets/masters/selectMasterWrapper";
import Seperator from "@/app/Widgets/seperator";
import Snackbar from "@mui/material/Snackbar";
import { docDescriptionSchemaT, masterFormPropsT, selectKeyValueT } from "@/app/models/models";
import { getItem, getItemById } from "@/app/controllers/item.controller";
import { getUnit, getUnitById } from "@/app/controllers/unit.controller";
import UnitForm from "@/app/Widgets/masters/masterForms/unitForm";
import { Collapse, IconButton, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import ItemForm from "@/app/Widgets/masters/masterForms/itemForm";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { addDocument, updateDocument } from "@/app/controllers/executive.controller";

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

export default function AddDocsForm(props: masterFormPropsT) {
    const [formError, setFormError] = useState<
        Record<string, { msg: string; error: boolean }>
    >({});
    const [snackOpen, setSnackOpen] = React.useState(false);

    const handleCancel = () => {
        props.setDialogOpen ? props.setDialogOpen(false) : null;
    };

    const handleSubmit = async (formData: FormData) => {
        let data: { [key: string]: any } = {}; // Initialize an empty object

        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }

        console.log("data : ",data);
        const result = await persistEntity(data as docDescriptionSchemaT);
        if (result.status) {
            const newVal = {
              id: result.data[0].id,
              name: result.data[0].name,
            };
            props.setDialogValue ? props.setDialogValue(newVal) : null;
            setFormError({});
            setSnackOpen(true);
            setTimeout(() => {
              props.setDialogOpen ? props.setDialogOpen(false) : null;
            }, 1000);
          } else {
            const issues = result.data;
            // show error on screen
            const errorState: Record<string, { msg: string; error: boolean }> = {};
            for (const issue of issues) {
              for (const path of issue.path) {
                errorState[path] = { msg: issue.message, error: true };
              }
            }
            errorState["form"] = { msg: "Error encountered", error: true };
            setFormError(errorState);
          }
        
    };

    async function persistEntity(data : docDescriptionSchemaT) {
        let result;
        if (props.data) {
          data["id"] = props.data.id;
          result = await updateDocument(data);
        } else {
          result = await addDocument(data);
        }
        return result;
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
                            gridTemplateColumns: "repeat(2, 1fr)",
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
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                            sx={{width: '200px', height: '35px'}}
                        >
                            Upload files
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(event) => console.log(event.target.files)}
                                multiple
                            />
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
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
