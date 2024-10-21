"use client";
import * as zs from "@/app/zodschema/zodschema";
import React, { useState } from "react";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { SelectMasterWrapper } from "@/app/Widgets/masters/selectMasterWrapper";
import Seperator from "@/app/Widgets/seperator";
import Snackbar from "@mui/material/Snackbar";
import { masterFormPropsT, selectKeyValueT } from "@/app/models/models";
import { getItem, getItemById } from "@/app/controllers/item.controller";
import { getUnit, getUnitById } from "@/app/controllers/unit.controller";
import UnitForm from "@/app/Widgets/masters/masterForms/unitForm";
import { Collapse, IconButton, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import ItemForm from "@/app/Widgets/masters/masterForms/itemForm";
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

export default function AddDocsForm(props: masterFormPropsT) {
    const [formError, setFormError] = useState<
        Record<string, { msg: string; error: boolean }>
    >({});
    const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
    const [snackOpen, setSnackOpen] = React.useState(false);

    const handleCancel = () => {
        props.setDialogOpen ? props.setDialogOpen(false) : null;
    };

    const handleSubmit = async (formData: FormData) => {
        let data: { [key: string]: any } = {}; // Initialize an empty object

        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }

        formData = updateFormData(data);
        const parsed = zs.itemToListFormSchema.safeParse(data);
        if (parsed.success) {
            props.setData
                ? props.setData((prevData: any) => [
                    ...prevData,
                    { id: prevData.length + 1, ...data },
                ])
                : null;
            setTimeout(() => {
                props.setDialogOpen ? props.setDialogOpen(false) : null;
            }, 1000);
            setFormError({});
            setSnackOpen(true);
        } else {
            const issues = parsed.error.issues;
            const errorState: Record<string, { msg: string; error: boolean }> = {};
            for (const issue of issues) {
                for (const path of issue.path) {
                    errorState[path] = { msg: issue.message, error: true };
                }
            }
            setFormError(errorState);
        }
    };

    const updateFormData = (data: any) => {
        data.item_id = selectValues.item_id ? selectValues.item_id : 0;
        data.unit_id = selectValues.unit_id ? selectValues.unit_id : 0;
        return data;
    };

    function onSelectChange(
        event: React.SyntheticEvent,
        val: any,
        setDialogValue: any,
        name: string
    ) {
        let values = { ...selectValues };
        values[`${name}_id`] = val.id;
        setSelectValues(values);
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
                            sx={{maxWidth: '150px', maxHeight: '35px', minWidth: '150px', minHeight: '35px'}}
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
