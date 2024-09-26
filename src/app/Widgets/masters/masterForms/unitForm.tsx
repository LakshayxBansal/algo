"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Box from "@mui/material/Box";
import { createDepartment } from "../../../controllers/department.controller";
import Grid from "@mui/material/Grid";
import {
  masterFormPropsT,
  selectKeyValueT,
  unitSchemaT,
} from "@/app/models/models";
import Seperator from "../../seperator";
import Snackbar from "@mui/material/Snackbar";
import { createUnit, updateUnit } from "@/app/controllers/unit.controller";
import { Collapse, IconButton } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

export default function UnitForm(props: masterFormPropsT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [snackOpen, setSnackOpen] = React.useState(false);

  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  const entityData: unitSchemaT = props.data ? props.data : {};

  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {}; // Initialize an empty object

    formData = updateFormData(formData);

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    const result = await persistEntity(data as unitSchemaT);
    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name };
      props.setDialogValue ? props.setDialogValue(newVal.name) : null;
      setTimeout(() => {
        props.setDialogOpen ? props.setDialogOpen(false) : null;
      }, 1000);
      setFormError({});
      setSnackOpen(true);
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

  const updateFormData = (formData: FormData) => {
    return formData;
  };

  async function persistEntity(data: unitSchemaT) {
    let result;
    if (props.data) {
      Object.assign(data, { id: props.data.id });
      result = await updateUnit(data);
    } else {
      result = await createUnit(data);
    }
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
    <Box sx={{
        position: "sticky", top: "0px",
        zIndex: 2, 
        paddingY: "10px",
        bgcolor: "white"
      }}>
        <Seperator>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
            {entityData.id ? "Update Unit" : "Add Unit"}
              <IconButton onClick={handleCancel}>
                <CloseIcon/>
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
        <form action={handleSubmit}>
          <Box
            sx={{
              display: "grid",
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            <InputControl
              autoFocus
              id="name"
              label="Unit Name"
              inputType={InputType.TEXT}
              name="name"
              error={formError?.name?.error}
              helperText={formError?.name?.msg}
              defaultValue={entityData.name}
            />
            <InputControl
              autoFocus
              id="uqc"
              label="UQC"
              inputType={InputType.TEXT}
              name="uqc"
              error={formError?.uqc?.error}
              helperText={formError?.uqc?.msg}
              defaultValue={entityData.uqc}
            />
          </Box>
          {/* <Grid container xs={12} md={12}>
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
          </Grid> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
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
    </>
  );
}
