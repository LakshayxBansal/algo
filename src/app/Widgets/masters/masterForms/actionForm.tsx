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
      setFormError({});
      setSnackOpen(true);
      setTimeout(()=>{
        props.setDialogOpen ? props.setDialogOpen(false) : null;
      }, 1000);
    } else {
      const issues = result.data;

      // show error on screen
      const errorState: Record<string, { msg: string; error: boolean }> = {};
      errorState["form"] = { msg: "Error encountered", error: true };
      for (const issue of issues) {
        for (const path of issue.path) {
          errorState[path] = { msg: issue.message, error: true };
          if(path==="refresh"){
            errorState["form"]={ msg: issue.message, error: true};
          }
        }
      }
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
    let result;
    if (props.data) {
      data["id"] = entityData.id;
      data["stamp"] = entityData.stamp;
      result = await updateEnquiryAction(data);
    } else result = await createEnquiryAction(data);
    return result;
  }

  return (
    <Paper>
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
            {props.data ? "Update Action" : "Add Action"}
            <IconButton onClick={handleCancel} tabIndex={-1}>
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
      <Box sx={{ m: 2, p: 3 }}>
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
              titleCase={true}
              defaultValue={props.data?.name}
              fullWidth
              error={formError?.name?.error}
              helperText={formError?.name?.msg}
            />
            {/* <input type="datetime-local" value={new Date().toString().slice(0, 16)} /> */}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={handleCancel} tabIndex={-1}>Cancel</Button>
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
          autoHideDuration={3000}
          onClose={() => setSnackOpen(false)}
          message="Record Saved!"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Box>
    </Paper>
  );
}
