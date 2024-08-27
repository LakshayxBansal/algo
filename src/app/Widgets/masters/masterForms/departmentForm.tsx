"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Box from "@mui/material/Box";
import {
  createDepartment,
  updateDepartment,
} from "../../../controllers/department.controller";
import Grid from "@mui/material/Grid";
import { nameMasterDataT, selectKeyValueT } from "@/app/models/models";
import Seperator from "../../seperator";
import Snackbar from "@mui/material/Snackbar";
import { masterFormPropsT } from "@/app/models/models";

export default function DepartmentForm(props: masterFormPropsT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const entityData: nameMasterDataT = props.data ? props.data : {};

  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

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
        errorState[issue.path[0]] = { msg: issue.message, error: true };
      }
      errorState["form"] = { msg: "Error encountered", error: true };
      setFormError(errorState);
    }
  };

  async function persistEntity(data: nameMasterDataT) {
    let result;
    if (entityData.id) {
      data = { ...data, id: entityData.id };
      result = await updateDepartment(data);
    } else result = await createDepartment(data);

    return result;
  }

  return (
    <>
      <Seperator>
        {entityData.id ? "Update Department" : "Add Department"}
      </Seperator>
      <Box id="sourceForm" sx={{ m: 2, p: 3 }}>
        {formError?.form?.error && (
          <p style={{ color: "red" }}>{formError?.form.msg}</p>
        )}
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
              label="Department Name"
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
      </Box>
    </>
  );
}
