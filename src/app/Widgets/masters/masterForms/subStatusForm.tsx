"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Box from "@mui/material/Box";
import {
  createEnquirySubStatus,
  updateEnquirySubStatus,
} from "@/app/controllers/enquirySubStatus.controller";
import Grid from "@mui/material/Grid";
import { enquirySubStatusMaster } from "../../../zodschema/zodschema";
import Seperator from "../../seperator";
import Snackbar from "@mui/material/Snackbar";
import Paper from "@mui/material/Paper";
import { Collapse, IconButton } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import {
  enquirySubStatusMasterT,
  masterFormPropsWithDataT,
} from "@/app/models/models";

export default function SubStatusForm(props: masterFormPropsWithDataT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const entityData: enquirySubStatusMasterT = props.data ? props.data : {};
  const statusName = props.parentData === "1" ? "Open" : "Closed";

  // submit function. Save to DB and set value to the dropdown control
  const handleSubmit = async (formData: FormData) => {
    // formData.append("status", props.statusName as string);

    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    data["status"] = statusName;

    // let result;
    // let issues;
    // let data: { [key: string]: any } = {}; // Initialize an empty object

    // for (const [key, value] of formData.entries()) {
    //   data[key] = value;
    // }
    // const parsed = enquirySubStatusMaster.safeParse(data);
    // if (parsed.success) {
    //   result = await createEnquirySubStatus(formData);
    //   if (result.status){
    //     const newVal = {id: result.data[0].id, name: result.data[0].name};
    //     props.setDialogValue? props.setDialogValue(newVal.name) : null;
    //     setSnackOpen(true);
    //   } else {
    //     issues = result?.data;
    //   }
    // } else {
    //   issues = parsed.error.issues;
    // }

    // if (parsed.success && result?.status) {
    //   props.setDialogOpen? props.setDialogOpen(false) : null;
    // } else {
    //   // show error on screen
    //   const errorState: Record<string, {msg: string, error: boolean}> = {};
    //   for (const issue of issues) {
    //     errorState[issue.path[0]] = {msg: issue.message, error: true};
    //   }
    //   setFormError(errorState);
    // }
    const result = await persistEntity(data as enquirySubStatusMasterT);
    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name };
      props.setDialogValue ? props.setDialogValue(newVal.name) : null;
      props.setDialogOpen ? props.setDialogOpen(false) : null;
      setFormError({});
      setSnackOpen(true);
    } else {
      const issues = result.data;
      // show error on screen
      const errorState: Record<string, { msg: string; error: boolean }> = {};
      for (const issue of issues) {
        for (const path of issue.path) {
          errorState[path] = { msg: issue.message, error: true };
        }
      }
      // errorState["form"] = { msg: "Error encountered", error: true };
      setFormError(errorState);
    }
  };

  async function persistEntity(data: enquirySubStatusMasterT) {
    let result;
    if (props.data) {
      data["id"] = entityData.id;
      result = await updateEnquirySubStatus(data);
    } else result = await createEnquirySubStatus(data);
    return result;
  }

  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  const clearFormError = () => {
    setFormError((curr) => {
      const { form, ...rest } = curr;
      return rest;
    });
  };

  return (
    <Paper>
      <Seperator>{"Add Sub-Status for " + props.statusName} </Seperator>
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
        <form action={handleSubmit}>
          <Box
            sx={{
              display: "grid",
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            <InputControl
              autoFocus
              id="name"
              label="Sub-Status Name"
              inputType={InputType.TEXT}
              name="name"
              defaultValue={entityData.name}
              error={formError?.name?.error}
              helperText={formError?.name?.msg}
            />
          </Box>
          <Grid container>
            <Grid item xs={6} md={6}>
              <Box margin={1} sx={{ display: "flex" }}>
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  m={1}
                >
                  <Button onClick={handleCancel}>Cancel</Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} md={6}>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
                m={1}
              >
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={snackOpen}
          autoHideDuration={3000}
          onClose={() => setSnackOpen(false)}
          message="Record Saved!"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Box>
    </Paper>
  );
}
