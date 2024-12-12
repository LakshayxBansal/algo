"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Box from "@mui/material/Box";
import {
  createContactGroup,
  getContactGroupById,
  updateContactGroup,
} from "../../../controllers/contactGroup.controller";
import { SelectMasterWrapper } from "@/app/Widgets/masters/selectMasterWrapper";
import { getContactGroup } from "@/app/controllers/contactGroup.controller";
import {
  contactGroupSchemaT,
  masterFormPropsWithDataT,
  optionsDataT,
  selectKeyValueT,
} from "@/app/models/models";
import Seperator from "../../seperator";
import Snackbar from "@mui/material/Snackbar";
import { masterFormPropsT } from "@/app/models/models";
import { Autocomplete, Collapse, Grid, IconButton } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { usePathname } from "next/navigation";

export default function ContactGroupForm(props: masterFormPropsWithDataT<contactGroupSchemaT>) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const entityData: contactGroupSchemaT = props.data ? props.data : {} as contactGroupSchemaT;
  const pathName = usePathname();
  const [formKey, setFormKey] = useState(0);

  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    formData = updateFormData(data);
    console.log("data", formData);

    const result = await persistEntity(data as contactGroupSchemaT);
    if (result.status) {
      const newVal = {
        id: result.data[0].id,
        name: result.data[0].name,
      };
      props.setDialogValue ? props.setDialogValue(newVal) : null;
      setFormError({});
      setSnackOpen(true);
      // setTimeout(() => {
      //   props.setDialogOpen ? props.setDialogOpen(false) : null;
      // }, 1000);
      if (pathName !== "/cap/admin/lists/contactGroupList") {
        setTimeout(() => {
          props.setDialogOpen ? props.setDialogOpen(false) : null;
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

  async function persistEntity(data: contactGroupSchemaT) {
    let result;
    console.log(props.data);

    if (props.data) {
      data["id"] = entityData.id;
      data["stamp"] = entityData.stamp;
      result = await updateContactGroup(data);
    } else {
      result = await createContactGroup(data);
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
      <Box id="contactGroup">
        <form key={formKey} action={handleSubmit} noValidate>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <InputControl
                autoFocus
                inputType={InputType.TEXT}
                id="name"
                label="Group Name"
                name="name"
                titleCase={true}
                required
                defaultValue={entityData.name}
                error={formError?.name?.error}
                helperText={formError?.name?.msg}
                onKeyDown={() => {
                  setFormError((curr) => {
                    const { name, ...rest } = curr;
                    return rest;
                  });
                }}
                style={{ width: "100%" }}
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
                onKeyDown={() => {
                  setFormError((curr) => {
                    const { alias, ...rest } = curr;
                    return rest;
                  });
                }}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <SelectMasterWrapper
                name={"parent"}
                id={"parent"}
                label={"Parent Group"}
                // width={210}
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
                dialogTitle={"Add Parent Group"}
                fetchDataFn={getContactGroup}
                fnFetchDataByID={getContactGroupById}
                formError={formError?.parentgroup}
                allowNewAdd={false}
                allowModify={false}
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
