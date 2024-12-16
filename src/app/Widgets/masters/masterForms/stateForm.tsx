import React, { useState } from "react";
import Button from "@mui/material/Button";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Box from "@mui/material/Box";
import { createState, updateState } from "@/app/controllers/masters.controller";
import Grid from "@mui/material/Grid";
import {
  masterFormPropsT,
  masterFormPropsWithDataT,
  stateSchemaT,
} from "@/app/models/models";
import { nameMasterData } from "@/app/zodschema/zodschema";
import Seperator from "../../seperator";
import { Collapse, IconButton, Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

export default function StateForm(props: masterFormPropsWithDataT<stateSchemaT>) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const entityData: stateSchemaT = props.data ? props.data : {} as stateSchemaT;
  const parentData: any = props.parentData ? props.parentData : null;

  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get("name") as string,
      alias: formData.get("alias") as string,
    };
    Object.assign(data, { country_id: parentData });

    const result = await persistEntity(data as stateSchemaT);

    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name };
      props.setDialogValue ? props.setDialogValue(newVal) : null;
      // props.setDialogOpen ? props.setDialogOpen(false) : null;
      setFormError({});
      setSnackOpen(true);
      setTimeout(() => {
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
          if (path === "refresh") {
            errorState["form"] = { msg: issue.message, error: true };
          }
        }
      }
      setFormError(errorState);
    }

    async function persistEntity(data: stateSchemaT) {
      let result;
      if (props.data) {
        Object.assign(data, { id: entityData.id, stamp: entityData.stamp });
        result = await updateState(data);
      } else {
        result = await createState(data);
      }
      return result;
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
    <>
      {/* <Box
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
            {props.data ? "Update State" : "Add State"}
            <IconButton onClick={handleCancel} tabIndex={-1}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Seperator>
      </Box> */}
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
      <Box id="stateForm" sx={{m:1, p:3}}>
        <form action={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <InputControl
                autoFocus
                id="name"
                label="State Name"
                titleCase={true}
                inputType={InputType.TEXT}
                defaultValue={entityData.name}
                name="name"
                error={formError?.name?.error}
                helperText={formError?.name?.msg}
  setFormError={setFormError}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <InputControl
                id="alias"
                label="Alias"
                defaultValue={entityData.alias}
                inputType={InputType.TEXT}
                name="alias"
                error={formError?.alias?.error}
                helperText={formError?.alias?.msg}
  setFormError={setFormError}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                // mt: 1,
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
