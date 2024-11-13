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
  masterFormPropsT,
  selectKeyValueT,
} from "@/app/models/models";
import { SelectMasterWrapper } from "../../masters/selectMasterWrapper";
import Seperator from "../../seperator";
import StateForm from "./stateForm";
import { Collapse, IconButton, Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import AutocompleteDB from "../../AutocompleteDB";

export default function ExecutiveGroupForm(props: masterFormPropsT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const entityData: executiveGroupSchemaT = props.data ? props.data : {};
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
            errorState["form"] = { msg: issue.message, error: true} ;
          }
        }
      }
      setFormError(errorState);
    }
  };

  const updateFormData = (data: any) => {
    data.parent_id = selectValues.parent ? selectValues.parent.id : entityData.parent_id? entityData.parent_id: 0;
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
            {props.data ? "Update Executive Group" : "Add Executive Group"}
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
            id="name"
            label="Executive Group Name"
            inputType={InputType.TEXT}
            name="name"
            fullWidth
            required
            titleCase={true}
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
            fullWidth
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
            label={"Parent Executive Group"}
            width={210}
            defaultValue={
              {
                id: entityData.parent_id,
                name: entityData.parent,
              } as optionsDataT
            }
            onChange={(e, val, s) =>
              setSelectValues({ ...selectValues, parent: val ? val : { id: 0, name: "" } })
            }
            dialogTitle={"Parent Executive Group"}
            fetchDataFn={getExecutiveGroup}
            formError={formError?.parentgroup}
            allowModify={false}
            allowNewAdd={false}
            // disable={selectValues.country ? false : true}
            // renderForm={(fnDialogOpen, fnDialogValue, data, parentData) =>
            //   <StateForm
            //     setDialogOpen={fnDialogOpen}
            //     setDialogValue={fnDialogValue}
            //     data={data}
            //     parentData={selectValues.country?.id}
            //   />
            // }
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
          autoHideDuration={1000}
          onClose={() => setSnackOpen(false)}
          message="Record Saved!"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
    </>
  );
}
