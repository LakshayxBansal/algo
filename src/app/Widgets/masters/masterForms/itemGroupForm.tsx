"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Box from "@mui/material/Box";
import {
  createItemGroup,
  getItemGroupById,
  updateItemGroup,
} from "../../../controllers/itemGroup.controller";
import { SelectMasterWrapper } from "@/app/Widgets/masters/selectMasterWrapper";
import { getItemGroup } from "@/app/controllers/itemGroup.controller";
import {
  itemGroupSchemaT,
  masterFormPropsT,
  optionsDataT,
  selectKeyValueT,
} from "@/app/models/models";
import Seperator from "../../seperator";
import Snackbar from "@mui/material/Snackbar";
import { Collapse, IconButton } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

export default function ItemGroupForm(props: masterFormPropsT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const entityData: itemGroupSchemaT = props.data ? props.data : {};
  // console.log("value in form", selectValues);

  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    formData = updateFormData(data);

    const result = await persistEntity(data as itemGroupSchemaT);
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

  async function persistEntity(data: itemGroupSchemaT) {
    let result;

    console.log(props.data);

    if (props.data) {
      data["id"] = entityData.id;
      data["stamp"] = entityData.stamp;
      result = await updateItemGroup(data);
    } else {
      result = await createItemGroup(data);
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
            {entityData.id ? "Update Item Group" : "Add Item Group"}
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
      <Box id="itemGroupForm" sx={{ m: 2 }}>
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
              label="Group Name"
              name="name"
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
            />
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
            />
            <SelectMasterWrapper
              name={"parent"}
              id={"parent"}
              label={"Parent Group"}
              width={210}
              dialogTitle={"Add Parent Group"}
              defaultValue={
                {
                  id: entityData.id,
                  name: entityData.parent,
                } as optionsDataT
              }
              // defaultValue={
              //   {
              //     id: entityData.parent_id,
              //     name: entityData.name,
              //   } as optionsDataT
              // }
              onChange={(e, val, s) => {
                setSelectValues({
                  ...selectValues,
                  parent: val ? val : { id: 0, name: "" },
                });
              }}
              fetchDataFn={getItemGroup}
              fnFetchDataByID={getItemGroupById}
              allowNewAdd={false}
              allowModify={false}
              formError={formError?.parentgroup}
              renderForm={(fnDialogOpen, fnDialogValue) => (
                <ItemGroupForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                />
              )}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={handleCancel} tabIndex={-1}>Cancel</Button>
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
