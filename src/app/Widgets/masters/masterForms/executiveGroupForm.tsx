"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Box from "@mui/material/Box";
import {
  getExecutiveGroup,
  createExecutiveGroup,
  updateExecutiveGroup,
} from "@/app/controllers/executiveGroup.controller";
import Grid from "@mui/material/Grid";
import {
  executiveGroupSchema,
  nameMasterData,
} from "../../../zodschema/zodschema";
import {
  optionsDataT,
  executiveGroupSchemaT,
  masterFormPropsWithDataT,
  selectKeyValueT,
} from "@/app/models/models";
import { SelectMasterWrapper } from "../../selectMasterWrapper/selectMasterWrapper";
import Seperator from "../../seperator";
import StateForm from "./stateForm";
import { Collapse, IconButton, Portal, Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import AutocompleteDB from "../../AutocompleteDB";
import { usePathname } from "next/navigation";

export default function ExecutiveGroupForm(
  props: masterFormPropsWithDataT<executiveGroupSchemaT>
) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const entityData: executiveGroupSchemaT = props.data
    ? props.data
    : ({} as executiveGroupSchemaT);
  const pathName = usePathname();
  const [formKey, setFormKey] = useState(0);
  // submit function. Save to DB and set value to the dropdown control
  console.log(selectValues);
  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    formData = updateFormData(data);
    const result = await persistEntity(data as executiveGroupSchemaT);
    if (result.status) {
      const newVal = {
        id: result.data[0].id,
        name: result.data[0].name,
        stamp: result.data[0].stamp,
      };
      setFormError({});
      setSnackOpen(true);
      if (pathName !== "/cap/admin/lists/executiveGroupList" || entityData.id) {
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

  const updateFormData = (data: any) => {
    data.parent_id = selectValues.parent
      ? selectValues.parent.id
      : entityData.parent_id
      ? entityData.parent_id
      : 0;
    return data;
  };

  async function persistEntity(data: executiveGroupSchemaT) {
    let result;
    if (props.data) {
      Object.assign(data, { id: props.data.id, stamp: props.data.stamp });
      result = await updateExecutiveGroup(data);
    } else {
      result = await createExecutiveGroup(data);
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
      <Box id="executiveGroupForm" sx={{ m: 1, p: 3 }}>
        <form key={formKey} action={handleSubmit} noValidate autoComplete="off">
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <InputControl
                autoFocus
                id="name"
                label="Executive Group Name"
                inputType={InputType.TEXT}
                name="name"
                required
                titleCase={true}
                style={{ width: "100%" }}
                defaultValue={entityData.name}
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
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <InputControl
                inputType={InputType.TEXT}
                id="alias"
                label="Alias"
                name="alias"
                defaultValue={entityData.alias}
                error={formError?.alias?.error}
                helperText={formError?.alias?.msg}
                setFormError={setFormError}
                // onKeyDown={() => {
                //   setFormError((curr) => {
                //     const { alias, ...rest } = curr;
                //     return rest;
                //   });
                // }}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <SelectMasterWrapper
                name={"parent"}
                id={"parent"}
                label={"Parent Executive Group"}
                defaultValue={
                  {
                    id: entityData.parent_id,
                    name: entityData.parent,
                  } as optionsDataT
                }
                onChange={(e, val, s) =>
                  setSelectValues({
                    ...selectValues,
                    parent: val ? val : { id: 0, name: "" },
                  })
                }
                dialogTitle={"Parent Executive Group"}
                fetchDataFn={getExecutiveGroup}
                formError={formError?.parentgroup}
                setFormError={setFormError}
                allowModify={false}
                allowNewAdd={false}
                width={350}
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
