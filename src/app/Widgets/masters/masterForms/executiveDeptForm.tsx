"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Box from "@mui/material/Box";
import {
  getExecutiveDept,
  createExecutiveDept,
  updateExecutiveDept,
} from "@/app/controllers/executiveDept.controller";
import Grid from "@mui/material/Grid";
import { executiveDeptSchemaT, masterFormPropsT } from "@/app/models/models";
import { Snackbar } from "@mui/material";
import { Collapse, IconButton } from "@mui/material";
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Seperator from "../../seperator";

export default function ExecutiveDeptForm(props: masterFormPropsT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});

  const [snackOpen, setSnackOpen] = React.useState(false);
  const entityData: executiveDeptSchemaT = props.data ? props.data : {};
  console.log(entityData);

  // submit function. Save to DB and set value to the dropdown control
  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    const result = await persistEntity(data as executiveDeptSchemaT);
    if (result.status) {
      setSnackOpen(true);
      const newVal = { id: result.data[0].id, name: result.data[0].name };
      props.setDialogValue ? props.setDialogValue(newVal.name) : null;
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

  // Function to create or modify contact
  async function persistEntity(data: executiveDeptSchemaT) {
    let result;
    if (entityData.id) {
      data = { ...data, id: entityData.id };
      result = await updateExecutiveDept(data);
    } else result = await createExecutiveDept(data);

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
    <Seperator>{entityData.id ? "Update Department" : "Add Department"}</Seperator>

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
            label="Executive Dept Name"
            inputType={InputType.TEXT}
            name="name"
            error={formError?.name?.error}
            helperText={formError?.name?.msg}
            defaultValue={entityData.name}
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
        autoHideDuration={1000}
        onClose={() => setSnackOpen(false)}
        message="Record Saved!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
}
