"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Box from "@mui/material/Box";
import { createItemGroup, updateItemGroup } from "../../../controllers/itemGroup.controller";
import { SelectMasterWrapper } from "@/app/Widgets/masters/selectMasterWrapper";
import { getItemGroup } from "@/app/controllers/itemGroup.controller";
import { itemGroupSchemaT, masterFormPropsT, optionsDataT, selectKeyValueT } from "@/app/models/models";
import Seperator from "../../seperator";
import Snackbar from "@mui/material/Snackbar";
import { Collapse, IconButton } from "@mui/material";
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';

export default function ItemGroupForm(props: masterFormPropsT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const entityData: itemGroupSchemaT = props.data ? props.data : {};

  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {}; // Initialize an empty object

    formData = updateFormData(formData);

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    const result = await persistEntity(data as itemGroupSchemaT);
    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name };
      props.setDialogValue ? props.setDialogValue(newVal.name) : null;
      props.setDialogOpen ? props.setDialogOpen(false) : null;
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

  const updateFormData = (data: any) => {
    data.append(
      "itemGroup_id",
      selectValues.parent ? selectValues.parent.id : entityData.parent_id ? entityData.parent_id : 0
    );

    return data;
  };

  async function persistEntity(data: itemGroupSchemaT) {
    let result;
  
      console.log(props.data);
  
      if (props.data) {
        data["id"] = entityData.id;
        result = await updateItemGroup(data);
      } else {
        result = await createItemGroup(data);
      }
   
    return result;
  }
  const clearFormError = () => {
    setFormError(curr => {
      const {form, ...rest} = curr;
      return rest;
    });
  };

  return (
    <>
      <Seperator>{entityData.id ? "Update Item Group" : "Add Item Group"}</Seperator>
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
        {/* {formError?.form?.error && (
          <p style={{ color: "red" }}>{formError?.form.msg}</p>
        )} */}
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
              label="Group Name"
              inputType={InputType.TEXT}
              name="name"
              defaultValue={entityData.name}
              error={formError?.name?.error}
              helperText={formError?.name?.msg}
            />
            <InputControl
              autoFocus
              id="alias"
              label="Alias"
              inputType={InputType.TEXT}
              name="alias"
              defaultValue={entityData.alias}
              error={formError?.alias?.error}
              helperText={formError?.alias?.msg}
            />
            <SelectMasterWrapper
              name={"parent"}
              id={"parent"}
              label={"Parent Group"}
              width={210}
              dialogTitle={"Add Parent Group"}
              defaultValue={
                {
                  id: entityData.parent_id,
                  name: entityData.name,
                } as optionsDataT
              }
              onChange={(e, val, s) =>
                setSelectValues({ ...selectValues, parent: val })
              }
              fetchDataFn={getItemGroup}
              allowNewAdd={false}
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
              mt: 3,
              display: "grid",
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            <Button>Upload File</Button>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="submit" variant="contained">
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
