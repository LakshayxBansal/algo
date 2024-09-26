"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Box from "@mui/material/Box";
import {
  createEnquiryAction,
  updateEnquiryAction,
} from "@/app/controllers/enquiryAction.controller";
import Paper from "@mui/material/Paper";
import Seperator from "../../seperator";
import Snackbar from "@mui/material/Snackbar";
import { masterFormPropsT, nameMasterDataT } from "@/app/models/models";
import { Collapse, IconButton } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

export default function ActionForm(props: masterFormPropsT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const entityData: nameMasterDataT = props.data ? props.data : {};

  // submit function. Save to DB and set value to the dropdown control
  const handleSubmit = async (formData: FormData) => {
    // const data = { name: formData.get("name") as string };
    // console.log(data);
    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    // const parsed = nameMasterData.safeParse(data);
    // let result;
    // let issues;

    // if (parsed.success) {
    //   let id;
    //   if (props.data) id = props.data.id;
    //   result = await createEnquiryAction(formData, id);
    //   if (result.status) {
    //     const newVal = { id: result.data[0].id, name: result.data[0].name };
    //     props.setDialogValue ? props.setDialogValue(newVal.name) : null;
    //     setSnackOpen(true);
    //   } else {
    //     issues = result?.data;
    //   }
    // } else {
    //   issues = parsed.error.issues;
    // }

    // if (parsed.success && result?.status) {
    //   props.setDialogOpen ? props.setDialogOpen(false) : null;
    // } else {
    //   // show error on screen
    //   const errorState: Record<string, { msg: string; error: boolean }> = {};
    //   for (const issue of issues) {
    //     errorState[issue.path[0]] = { msg: issue.message, error: true };
    //   }
    //   setFormError(errorState);
    // }
    const result = await persistEntity(data as nameMasterDataT);
    console.log(result)
    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name };
      props.setDialogValue ? props.setDialogValue(newVal) : null;
      props.setDialogOpen ? props.setDialogOpen(false) : null;
      setFormError({});
      setSnackOpen(true);
    } else {
      const issues = result.data;
      console.log("these are issues",issues);

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

  async function persistEntity(data: nameMasterDataT) {
    console.log(data);
    let result;
    if (props.data) {
      console.log("prosp",props.data)
      data["id"] = entityData.id;
      result = await updateEnquiryAction(data);
    } else result = await createEnquiryAction(data);
    console.log("result",result);
    return result;
  }

  return (
    <Paper>
      <Seperator>{props.data ? "Update Action" : "Add Action"}</Seperator>
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
      <Box sx={{ m: 2, p: 3 }}>
        {formError?.form?.error && (
          <p style={{ color: "red" }}>{formError?.form.msg}</p>
        )}
        <form action={handleSubmit}>
          <Box
            sx={{
              display: "grid",
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: "repeat(1, 1fr)",
            }}
          >
            <InputControl
              autoFocus
              id="name"
              label="Action Name"
              inputType={InputType.TEXT}
              name="name"
              defaultValue={props.data?.name}
              onChange
              fullWidth
              error={formError?.name?.error}
              helperText={formError?.name?.msg}
            />
          </Box>
          <Box
            sx={{
              mt: 3,
              display: "grid",
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            <Button>Upload File</Button>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
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
