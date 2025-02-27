"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Seperator from "../../seperator";
import { Collapse, Grid, IconButton, Portal } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import { masterFormPropsT, nameMasterDataT } from "@/app/models/models";
import {
  createAllocationType,
  updateAllocationType,
} from "@/app/controllers/allocationType.controller";
import { setErrorMap } from "zod";
import { usePathname } from "next/navigation";

export default function AllocationTypeMasterForm(props: masterFormPropsT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = React.useState(false);

  const entityData: nameMasterDataT = props.data ? props.data : {};
  const pathName = usePathname();
  const [formKey, setFormKey] = useState(0);

  const handleSubmit = async (formData: FormData) => {
    const data = { name: formData.get("name") as string };

    const result = await persistEntity(data as nameMasterDataT);
    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name };
      setFormError({});
      setSnackOpen(true);
      if (pathName !== "/cap/admin/lists/allocationTypeList" || entityData.id) {
        setTimeout(() => {
          props.setDialogOpen ? props.setDialogOpen(false) : null;
          props.setDialogValue ? props.setDialogValue(newVal) : null;
        }, 1000);
      } else {
        setFormKey(formKey + 1);
      }
    } else {
      const issues = result.data;

      const errorState: Record<string, { msg: string; error: boolean }> = {};
      // for (const issue of issues) {
      //   for (const path of issue.path) {
      //     errorState[path] = { msg: issue.message, error: true };
      //   }
      // }
      // let flag = 0;
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

  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  async function persistEntity(data: nameMasterDataT) {
    let result;
    if (props.data) {
      data["id"] = entityData.id;
      data["stamp"] = entityData.stamp;
      result = await updateAllocationType(data);
    } else result = await createAllocationType(data);
    return result;
  }

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
      <Box id="allocationForm" sx={{ m: 1, p: 3 }}>
        <form key={formKey} action={handleSubmit} noValidate autoComplete="off">
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <InputControl
                inputType={InputType.TEXT}
                autoFocus
                id="name"
                label="Name"
                name="name"
                required
                style={{ width: "100%" }}
                titleCase={true}
                defaultValue={props.data?.name}
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
      </Box>
      <Portal>
        <Snackbar
          open={snackOpen}
          autoHideDuration={3000}
          onClose={() => setSnackOpen(false)}
          message="Record Saved!"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Portal>
    </>
  );
}
