"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Box from "@mui/material/Box";
import {
  createEnquiryCategory,
  updateEnquiryCategory,
} from "../../../controllers/enquiryCategory.controller";
import { nameMasterData } from "../../../zodschema/zodschema";
import Snackbar from "@mui/material/Snackbar";
import Paper from "@mui/material/Paper";
import Seperator from "../../seperator";
import { masterFormPropsT, nameMasterDataT } from "@/app/models/models";
import { Collapse, IconButton } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

export default function CategoryForm(props: masterFormPropsT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const entityData: nameMasterDataT = props.data ? props.data : {};

  async function persistEntity(data: nameMasterDataT) {
    let result;
    if (entityData.id) {
      data.id = entityData.id;
      result = await updateEnquiryCategory(data);
    } else result = await createEnquiryCategory(data);

    return result;
  }

  // submit function. Save to DB and set value to the dropdown control
  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get("name") as string,
    };

    const result = await persistEntity(data as nameMasterDataT);
    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name };
      props.setDialogValue ? props.setDialogValue(newVal.name) : null;
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
      <Seperator>{entityData.id ? "Update Category" : "Add Category"}</Seperator>
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
              id="category_master"
              label="Category Name"
              inputType={InputType.TEXT}
              name="name"
              fullWidth
              error={formError?.name?.error}
              helperText={formError?.name?.msg}
              defaultValue={props.data?.name}
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
          autoHideDuration={1000}
          onClose={() => setSnackOpen(false)}
          message="Record Saved!!"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Box>
    </Paper>
  );
}
