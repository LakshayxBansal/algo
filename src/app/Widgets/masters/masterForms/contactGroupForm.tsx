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
  optionsDataT,
  selectKeyValueT,
} from "@/app/models/models";
import Seperator from "../../seperator";
import Snackbar from "@mui/material/Snackbar";
import { masterFormPropsT } from "@/app/models/models";
import { Collapse, IconButton } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

export default function ContactGroupForm(props: masterFormPropsT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const entityData: contactGroupSchemaT = props.data ? props.data : {};

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
      setTimeout(()=>{
        props.setDialogOpen ? props.setDialogOpen(false) : null;
      },1000);
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
      <Box
        sx={{
          position: "sticky",
          top: "0px",
          zIndex: 2,
          paddingY: "10px",
          bgcolor: "white",
          mt: 1
        }}
      >
        <Seperator>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {entityData.id ? "Update Contact Group" : "Add Contact Group"}
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
      <Box id="contactGroup" sx={{ mt: 2, p: 3 }}>
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
              autoFocus
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
              defaultValue={
                {
                  id: entityData.id,
                  name: entityData.parent,
                } as optionsDataT
              }
              onChange={(e, val, s) =>
                setSelectValues({ ...selectValues, parent: val })
              }
              dialogTitle={"Add Parent Group"}
              fetchDataFn={getContactGroup}
              // fnFetchDataByID={getContactGroupById}
              formError={formError?.parentgroup}
              allowNewAdd={false}
              allowModify={false}
              // renderForm={(fnDialogOpen, fnDialogValue) => (
              //   <ContactGroupForm
              //     setDialogOpen={fnDialogOpen}
              //     setDialogValue={fnDialogValue}
              //   />
              // )}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 2
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
