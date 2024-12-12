"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Box from "@mui/material/Box";
import { createArea, updateArea } from "../../../controllers/area.controller";
import Grid from "@mui/material/Grid";
import { nameMasterData } from "../../../zodschema/zodschema";
import { masterFormPropsWithDataT, areaSchemaT } from "@/app/models/models";
import Seperator from "../../seperator";
import { Collapse, IconButton, Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { usePathname } from "next/navigation";

export default function AreaForm(props: masterFormPropsWithDataT<areaSchemaT>) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const entityData: areaSchemaT = props.data ? props.data : {} as areaSchemaT;
  // submit function. Save to DB and set value to the dropdown control
  const pathName = usePathname();
  const [formKey, setFormKey] = useState(0);
  console.log(entityData);
  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get("name") as string,
    };
    const result = await persistEntity(data);
    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name };
      props.setDialogValue ? props.setDialogValue(newVal) : null;
      setFormError({});
      setSnackOpen(true);
      // setTimeout(()=>{
      //   props.setDialogOpen ? props.setDialogOpen(false) : null;
      // }, 1000);
      if (pathName !== "/cap/admin/lists/areaList") {
        setTimeout(() => {
          props.setDialogOpen ? props.setDialogOpen(false) : null;
        }, 1000);
      } else {
        setFormKey(formKey + 1); 
      }
    }
    // } else {
    //   issues = parsed.error.issues;
    // }

    // if (parsed.success && result?.status) {
    //   props.setDialogOpen ? props.setDialogOpen(false) : null;
    // }
    else {
      // show error on screen
      const issues = result.data;
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

  async function persistEntity(data: areaSchemaT) {
    let result;
    if (props.data) {
      Object.assign(data, { id: props.data.id, stamp: props.data.stamp });
      result = await updateArea(data);
    } else {
      result = await createArea(data);
    }
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
      <form key={formKey} action={handleSubmit} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <InputControl
              autoFocus
              id="name"
              name="name"
              label="Area Name"
              required
              titleCase={true}
              defaultValue={entityData.name}
              inputType={InputType.TEXT}
              error={formError?.name?.error}
              helperText={formError?.name?.msg}
              style={{ width: "100%" }}
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