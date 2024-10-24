"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Box from "@mui/material/Box";
import {
  getExecutiveRole,
  createExecutiveRole,
  updateExecutiveRole,
  getExecutiveRoleById,
} from "@/app/controllers/executiveRole.controller";
import { SelectMasterWrapper } from "@/app/Widgets/masters/selectMasterWrapper";
import {
  executiveRoleSchemaT,
  masterFormPropsWithParentT,
  optionsDataT,
  selectKeyValueT,
} from "@/app/models/models";
import { Snackbar } from "@mui/material";
import Seperator from "../../seperator";
import { Collapse, IconButton } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

export default function ExecutiveRoleForm(props: masterFormPropsWithParentT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});

  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const entityData: executiveRoleSchemaT = props.data ? props.data : {};

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
      const newVal = { id: result.data[0].id, name: result.data[0].name, stamp: result.data[0].stamp };
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
      errorState["form"] = { msg: "Error encountered", error: true };
      for (const issue of issues) {
        for (const path of issue.path) {
          errorState[path] = { msg: issue.message, error: true };
          if(path==="refresh"){
            errorState["form"] = { msg: issue.message, error: true};
          }
        }
      }
      setFormError(errorState);
    }
  };

  const updateFormData = (data: any) => {
    data.parent_id = selectValues.parentRole
      ? selectValues.parentRole.id
      : entityData.parent_id
      ? entityData.parent_id
      : 0;
    return data;
  };

  async function persistEntity(data: executiveRoleSchemaT) {
    let result;
    if (entityData?.id) {
      data = { ...data, id: entityData.id, stamp: entityData.stamp };

      result = await updateExecutiveRole(data);
    } else result = await createExecutiveRole(data);

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
            {entityData.id ? "Update Executive Role" : "Add Executive Role"}
            <IconButton onClick={handleCancel} tabIndex={-1}>
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
      <Box id="executiveRole">
        <form action={handleSubmit} noValidate>
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
              inputType={InputType.TEXT}
              id="name"
              label="Executive Role Name"
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
            <SelectMasterWrapper
              name={"parentrole"}
              id={"parentrole"}
              label={"Parent Executive Role"}
              dialogTitle={"Add Executive Role"}
              fetchDataFn={getExecutiveRole}
              fnFetchDataByID={getExecutiveRoleById}
              defaultValue={
                {
                  id: entityData.id,
                  name: entityData.parentRole,
                } as optionsDataT
              }
              onChange={(e, val, s) =>
                setSelectValues({
                  ...selectValues,
                  parentRole: val ? val : { id: 0, name: "" },
                })
              }
              allowNewAdd={false}
              allowModify={false}
              renderForm={(fnDialogOpen, fnDialogValue, data, parentData) => (
                <ExecutiveRoleForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                  data={data}
                  parentData={selectValues.parent?.parent_id}
                />
              )}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 2,
            }}
          >
            <Button onClick={handleCancel} tabIndex={-1}>
              Cancel
            </Button>
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
          autoHideDuration={1000}
          onClose={() => setSnackOpen(false)}
          message="Record Saved!"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Box>
    </>
  );
}
