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
import { masterFormPropsWithDataT, nameMasterDataT } from "@/app/models/models";
import { Collapse, Grid, IconButton, Portal } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { usePathname } from "next/navigation";

export default function SourceForm(props: masterFormPropsWithDataT<nameMasterDataT>) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const entityData: nameMasterDataT = props.data ? props.data : {} as nameMasterDataT;
  const pathName = usePathname();
  const [formKey, setFormKey] = useState(0);

  // submit function. Save to DB and set value to the dropdown control
  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get("name") as string,
    };

    const result = await persistEntity(data as nameMasterDataT);
    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name, stamp: result.data[0].stamp };
      setFormError({});
      setSnackOpen(true);
      if (pathName !== "/cap/admin/lists/sourceList" || entityData.id) {
        setTimeout(() => {
          props.setDialogOpen ? props.setDialogOpen(false) : null;
          props.setDialogValue ? props.setDialogValue(newVal) : null;
        }, 1000);
      } else {
        setFormKey(formKey + 1); 
      }
    } else {
      const issues = result.data;
      // show error on screen
      const errorState: Record<string, { msg: string; error: boolean }> = {};
      errorState["form"] = { msg: "Error encountered", error: true };
      for (const issue of issues) {
        for (const path of issue.path) {
          errorState[path] = { msg: issue.message, error: true };
          if (path === "refresh") {
            errorState["form"] = { msg: issue.message, error: true };
          }
        }
      }
      setFormError(errorState);
    }
  };

  async function persistEntity(data: nameMasterDataT) {
    let result;
    if (entityData.id) {
      data = { ...data, id: entityData.id, stamp: entityData.stamp };
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
      <Box id="sourceForm" sx={{m:1, p:3}}>
        <form key={formKey} action={handleSubmit} noValidate>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <InputControl
                autoFocus
                inputType={InputType.TEXT}
                id="source_master"
                label="Source Name"
                name="name"
                required
                fullWidth
                titleCase={true}
                error={formError?.name?.error}
                helperText={formError?.name?.msg}
 setFormError={setFormError}
                defaultValue={entityData.name}
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
