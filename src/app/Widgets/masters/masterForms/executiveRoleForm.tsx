"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Box from "@mui/material/Box";
import {
  getExecutiveRole,
  createExecutiveRole,
  updateExecutiveRole,
} from "@/app/controllers/executiveRole.controller";
import Grid from "@mui/material/Grid";
import { SelectMasterWrapper } from "@/app/Widgets/masters/selectMasterWrapper";
import {
  executiveRoleSchemaT,
  masterFormPropsWithParentT,
  optionsDataT,
  selectKeyValueT,
} from "@/app/models/models";
import { Snackbar } from "@mui/material";
import Seperator from "../../seperator";

export default function ExecutiveRoleForm(props: masterFormPropsWithParentT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});

  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const entityData: executiveRoleSchemaT = props.data ? props.data : {};
  console.log(entityData);
  

  // submit function. Save to DB and set value to the dropdown control
  const handleSubmit = async (formData: FormData) => {
    // const parsed = nameMasterData.safeParse(data);
    // let result;
    // let issues;

    // if (parsed.success) {
    //   result = await createExecutiveRole(formData);
    //   if (result.status) {
    //     const newVal = { id: result.data[0].id, name: result.data[0].name };
    //     props.setDialogValue(newVal.name);
    //   } else {
    //     issues = result?.data;
    //   }
    // } else {
    //   issues = parsed.error.issues;
    // }

    // if (parsed.success && result?.status) {
    //   props.setDialogOpen(false);
    // } else {
    //   // show error on screen
    //   const errorState: Record<string, { msg: string; error: boolean }> = {};
    //   for (const issue of issues) {
    //     errorState[issue.path[0]] = { msg: issue.message, error: true };
    //   }
    //   setFormError(errorState);
    // }
    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    formData = updateFormData(data);
    data["department_id"] = props.parentData;

    const result = await persistEntity(data as executiveRoleSchemaT);
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

  const updateFormData = (data: any) => {
    data.parent_id = selectValues.parentRole ? selectValues.parentRole.id : 0;
    return data;
  };

  async function persistEntity(data: executiveRoleSchemaT) {
    let result;
    if (entityData?.id) {
      data = { ...data, id: entityData.id };

      result = await updateExecutiveRole(data);
    } else result = await createExecutiveRole(data);

    return result;
  }

  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  return (
    <>
      {/* {formError?.form?.error && (
        <p style={{ color: "red" }}>{formError?.form.msg}</p>
      )} */}
      <Seperator>{entityData.id ? "Update Role" : "Add Role"}</Seperator>
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
              label="Executive Role Name"
              inputType={InputType.TEXT}
              name="name"
              error={formError?.name?.error}
              helperText={formError?.name?.msg}
              defaultValue={entityData.name}
            />
            <SelectMasterWrapper
              name={"parentrole"}
              id={"parentrole"}
              label={"Parent Executive Role"}
              width={210}
              dialogTitle={"Add Executive Role"}
              fetchDataFn={getExecutiveRole}
              defaultValue={
                {
                  id: entityData.parent_id,
                  name: entityData.parentRole
                } as optionsDataT
              }
              onChange={(e, val, s) =>
                setSelectValues({ ...selectValues, parentRole: val })
              }
              allowNewAdd={false}
              renderForm={(fnDialogOpen, fnDialogValue) => (
                <ExecutiveRoleForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                />
              )}
            />
          </Box>
          {/* <Grid container xs={12} md={12}> */}
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
