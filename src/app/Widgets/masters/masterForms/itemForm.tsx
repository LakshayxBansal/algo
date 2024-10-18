"use client";
import React, { useState } from "react";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { SelectMasterWrapper } from "@/app/Widgets/masters/selectMasterWrapper";
import Seperator from "../../seperator";
import Snackbar from "@mui/material/Snackbar";
import {
  itemSchemaT,
  masterFormPropsT,
  optionsDataT,
  selectKeyValueT,
} from "@/app/models/models";
import { createItem } from "@/app/controllers/item.controller";
import {
  getItemGroup,
  getItemGroupById,
} from "@/app/controllers/itemGroup.controller";
import { getUnit, getUnitById } from "@/app/controllers/unit.controller";
import ItemGroupForm from "./itemGroupForm";
import UnitForm from "./unitForm";
import { Collapse, IconButton } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { updateItem } from "@/app/controllers/item.controller";

export default function ItemForm(props: masterFormPropsT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const entityData: itemSchemaT = props.data ? props.data : {};

  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    formData = updateFormData(data);
    const result = await persistEntity(data as itemSchemaT);
    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name };
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
    data.group = selectValues.itemGroup
      ? selectValues.itemGroup.id
      : entityData.group
      ? entityData.group_name
      : 0;
    data.unit = selectValues.unit
      ? selectValues.unit.id
      : entityData.unit
      ? entityData.unit_name
      : 0;
    return data;
  };

  async function persistEntity(data: itemSchemaT) {
    let result;
    if (props.data) {
      Object.assign(data, { id: props.data.id });
      result = await updateItem(data);
    } else {
      result = await createItem(data);
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
            {entityData.id ? "Update Item" : "Add Item"}
            <IconButton onClick={handleCancel}>
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
      <Box id="sourceForm" sx={{ m: 2 }}>
        <form action={handleSubmit} noValidate>
          <Box
            sx={{
              display: "grid",
              columnGap: 2,
              rowGap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            <InputControl
              inputType={InputType.TEXT}
              autoFocus
              id="name"
              label="Name"
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
            <InputControl
              inputType={InputType.TEXT}
              id="alias"
              label="Alias"
              name="alias"
              fullWidth
              error={formError?.alias?.error}
              helperText={formError?.alias?.msg}
              defaultValue={entityData.alias}
              onKeyDown={() => {
                setFormError((curr) => {
                  const { alias, ...rest } = curr;
                  return rest;
                });
              }}
            />
            <SelectMasterWrapper
              name={"itemGroup"}
              id={"itemGroup"}
              label={"Item Group Name"}
              dialogTitle={"Add Item Group"}
              fetchDataFn={getItemGroup}
              fnFetchDataByID={getItemGroupById}
              allowModify={true}
              defaultValue={
                {
                  id: entityData.group,
                  name: entityData.group_name,
                } as optionsDataT
              }
              onChange={(e, val, s) =>
                setSelectValues({ ...selectValues, itemGroup: val ? val : { id: 0, name: "" } })
              }
              formError={formError?.itemGroup}
              renderForm={(fnDialogOpen, fnDialogValue, data?) => (
                <ItemGroupForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                  data={data}
                />
              )}
            />
            <SelectMasterWrapper
              name={"unit"}
              id={"unit"}
              label={"Unit Name"}
              // width={210}
              dialogTitle={"Add Unit"}
              allowModify={true}
              defaultValue={
                {
                  id: entityData.unit,
                  name: entityData.unit_name,
                } as optionsDataT
              }
              onChange={(e, val, s) =>
                setSelectValues({ ...selectValues, unit: val ? val : { id: 0, name: "" } })
              }
              fetchDataFn={getUnit}
              fnFetchDataByID={getUnitById}
              renderForm={(fnDialogOpen, fnDialogValue, data?) => (
                <UnitForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                  data={data}
                />
              )}
            />
            <InputControl
              inputType={InputType.TEXT}
              name="hsn_code"
              id="hsn_code"
              label="HSN Code"
              fullWidth
              error={formError?.hsn_code?.error}
              helperText={formError?.hsn_code?.msg}
              defaultValue={entityData.hsn_code}
              onKeyDown={() => {
                setFormError((curr) => {
                  const { hsn_code, ...rest } = curr;
                  return rest;
                });
              }}
            />
          </Box>
          <Box
            sx={{
              display: "grid",
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          ></Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 1,
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
          autoHideDuration={1000}
          onClose={() => setSnackOpen(false)}
          message="Record Saved!"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Box>
    </>
  );
}
