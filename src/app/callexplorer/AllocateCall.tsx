import { Alert, Box, Button, Collapse, IconButton, Paper, Snackbar } from "@mui/material";
import AutocompleteDB from "../Widgets/AutocompleteDB";
import { getExecutive } from "../controllers/executive.controller";
import { masterFormPropsT, optionsDataT, selectKeyValueT } from "../models/models";
import { useState } from "react";
import Seperator from "../Widgets/seperator";
import CloseIcon from "@mui/icons-material/Close";
import { InputControl, InputType } from "../Widgets/input/InputControl";
import { updateCallAllocation } from "../controllers/callExplorer.controller";

export default function AllocateCall(props: masterFormPropsT) {
    const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
    const [formError, setFormError] = useState<
        Record<string, { msg: string; error: boolean }>
    >({});
    const [snackOpen, setSnackOpen] = useState(false);

    console.log(props.data);

    const handleSubmit = async (formData: FormData) => {
        let data: { [key: string]: any } = {}; // Initialize an empty object

        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }

        data.contactGroup_id = selectValues.contactGroup
            ? selectValues.contactGroup.id
            : 0;
        const result = await updateCallAllocation(selectValues.executive.id, data.remark, props.data);
        if (result > 0) {
            // const newVal = { id: result.data[0].id, name: result.data[0].name };
            setSnackOpen(true);
            // props.setDialogValue ? props.setDialogValue(newVal) : null;
            setTimeout(() => {
                props.setDialogOpen ? props.setDialogOpen(false) : null;
            }, 1000);
            setFormError({});
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

    const handleCancel = () => {
        props.setDialogOpen ? props.setDialogOpen(false) : null;
    };

    const clearFormError = () => {
        setFormError((curr) => {
            const { form, ...rest } = curr;
            return rest;
        });
    };
    return <>
        <Box sx={{
            position: "sticky", top: "0px",
            zIndex: 2,
            paddingY: "10px",
            bgcolor: "white"
        }}>
            <Seperator>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    Allocate Executive
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
        <Box id="sourceForm" sx={{ p: 3 }}>
            <form action={handleSubmit}>
                <Paper elevation={3} sx={{ mb: 4, p: 2 }} square={false}>


                    <Box sx={{
                        display: "grid",
                        columnGap: 2,
                        rowGap: 1,
                        gridTemplateColumns: "repeat(2, 1fr)",
                        p: 2,
                    }}>
                        <AutocompleteDB
                            name={"executive"}
                            id={"executive"}
                            label={"Executive"}
                            width={210}
                            onChange={(e, val, s) =>
                                setSelectValues({ ...selectValues, executive: val })
                            }
                            fetchDataFn={getExecutive}
                            diaglogVal={{
                                id: selectValues.executive?.id,
                                name: selectValues.executive?.name,
                                detail: undefined
                            }}
                            setDialogVal={function (value: React.SetStateAction<optionsDataT>): void {
                            }}
                            fnSetModifyMode={function (id: string): void {
                            }}
                        />
                        <InputControl
                            inputType={InputType.TEXT}
                            name="remark"
                            id="remark"
                            label="Remark"
                            fullWidth
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end"
                        }}
                    >
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button type="submit" variant="contained" sx={{ width: "15%", marginLeft: "5%" }}>
                            Submit
                        </Button>
                    </Box>
                </Paper>
            </form>
            <Snackbar
                open={snackOpen}
                autoHideDuration={1000}
                onClose={() => setSnackOpen(false)}
                message="Record Saved!"
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />
        </Box>
    </>
}