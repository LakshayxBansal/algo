"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Box from "@mui/material/Box";
import {
  createEnquirySource,
  updateEnquirySource,
} from "../../../controllers/enquirySource.controller";
import Seperator from "../../seperator";
import Snackbar from "@mui/material/Snackbar";
import Paper from "@mui/material/Paper";
import { masterFormPropsT, nameMasterDataT } from "@/app/models/models";
import { Collapse, IconButton } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

export default function SourceForm(props: masterFormPropsT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const entityData: nameMasterDataT = props.data ? props.data : {};

  // submit function. Save to DB and set value to the dropdown control
  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get("name") as string,
    };

    const result = await persistEntity(data as nameMasterDataT);
    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name };
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

  async function persistEntity(data: nameMasterDataT) {
    let result;
    if (entityData.id) {
      data = { ...data, id: entityData.id };
      result = await updateEnquirySource(data);
    } else result = await createEnquirySource(data);

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
    <Paper elevation={3} sx={{ mt: 2, p: 1 }} square={false}> 
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
            {entityData.id ? "Update Source" : "Add Source"}
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
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: "repeat(1, 1fr)",
            }}
          >
            <InputControl
              autoFocus
              inputType={InputType.TEXT}
              id="source_master"
              label="Source Name"
              name="name"
              required
              fullWidth
              error={formError?.name?.error}
              helperText={formError?.name?.msg}
              defaultValue={entityData.name}
              onKeyDown={() => {
                setFormError((curr) => {
                  const { name, ...rest } = curr;
                  return rest;
                });
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 2,
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
          autoHideDuration={3000}
          onClose={() => setSnackOpen(false)}
          message="Record Saved!"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Box>
    </Paper>
  );
}
