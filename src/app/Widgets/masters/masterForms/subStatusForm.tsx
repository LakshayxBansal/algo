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
import Seperator from "../../seperator";
import Snackbar from "@mui/material/Snackbar";
import Paper from "@mui/material/Paper";
import { Collapse, IconButton, Portal } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import {
  enquirySubStatusMasterT,
  masterFormPropsWithDataT,
} from "@/app/models/models";

export default function SubStatusForm(
  props: masterFormPropsWithDataT<enquirySubStatusMasterT>
) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const entityData: enquirySubStatusMasterT = props.data
    ? props.data
    : ({} as enquirySubStatusMasterT);
  const statusName = props.parentData === 1 ? "Open" : "Closed";

  // submit function. Save to DB and set value to the dropdown control
  const handleSubmit = async (formData: FormData) => {
    // formData.append("status", props.statusName as string);

    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    data["status"] = statusName;
    const result = await persistEntity(data as enquirySubStatusMasterT);
    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name };
      setFormError({});
      setSnackOpen(true);
      setTimeout(() => {
        props.setDialogOpen ? props.setDialogOpen(false) : null;
        props.setDialogValue ? props.setDialogValue(newVal) : null;
      }, 1000);
    } else {
      const issues = result.data;
      // show error on screen
      const errorState: Record<string, { msg: string; error: boolean }> = {};
      errorState["form"] = { msg: "Error encountered", error: true };
      for (const issue of issues) {
        errorState[issue.path[0]] = { msg: issue.message, error: true };
        if (issue.path[0] === "refresh") {
          errorState["form"] = { msg: issue.message, error: true };
        }
      }
      setFormError(errorState);
    }
  };

  async function persistEntity(data: enquirySubStatusMasterT) {
    data["enquiry_status_id"] = Number(props.parentData);
    let result;
    if (props.data) {
      data["id"] = entityData.id;
      data["stamp"] = entityData.stamp;
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
    <>
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
      <Box id="sourceForm" sx={{ m: 1, p: 3 }}>
        <form action={handleSubmit} noValidate>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <InputControl
                autoFocus
                inputType={InputType.TEXT}
                id="name"
                label="Sub-Status Name"
                name="name"
                required
                style={{ width: "100%" }}
                titleCase={true}
                defaultValue={entityData.name}
                error={formError?.name?.error}
                helperText={formError?.name?.msg}
                setFormError={setFormError}
                // onKeyDown={() => {
                //   setFormError((curr) => {
                //     const { name, ...rest } = curr;
                //     return rest;
                //   });
                // }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 1,
              }}
            >
              <Button onClick={handleCancel} tabIndex={-1}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "15%", marginLeft: "5%" }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        <Portal>
          <Snackbar
            open={snackOpen}
            autoHideDuration={3000}
            onClose={() => setSnackOpen(false)}
            message="Record Saved!"
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          />
        </Portal>
      </Box>
    </>
  );
}
