"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Paper from "@mui/material/Paper";
import {
  companySchemaT,
  masterFormPropsT,
  optionsDataT,
  selectKeyValueT,
} from "@/app/models/models";
import {
  createCompany,
  updateCompany,
} from "../controllers/company.controller";
import Seperator from "../Widgets/seperator";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { SelectMasterWrapper } from "../Widgets/masters/selectMasterWrapper";
import {
  getCountriesMaster,
  getStates,
  getStatesMaster,
} from "../controllers/masters.controller";
import StateForm from "../Widgets/masters/masterForms/stateForm";
import CountryForm from "../Widgets/masters/masterForms/countryForm";
import { Collapse, IconButton } from "@mui/material";
import AutocompleteDB from "../Widgets/AutocompleteDB";

export default function CreateCompany(props: masterFormPropsT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const entityData: companySchemaT = props.data ? props.data : {};

  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    formData = updateFormData(data);

    const result = await persistEntity(data as companySchemaT);
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

  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  const updateFormData = (data: any) => {
    data.country_id = selectValues.country ? selectValues.country.id : 0;
    data.state_id = selectValues.state ? selectValues.state.id : 0;

    return data;
  };

  async function persistEntity(data: companySchemaT) {
    let result;
    if (entityData?.id) {
      data = { ...data, id: entityData.id };

      result = await updateCompany(data);
    } else {
      result = await createCompany(data);
    }

    return result;
  }

  const clearFormError = () => {
    setFormError((curr) => {
      // remove form key from object
      const { form, ...rest } = curr;
      return rest;
    });
  };
  return (
    <Paper>
      <Seperator>{entityData.id ? "Update Company" : "Add Company"}</Seperator>
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
      <Box sx={{ m: 2, p: 3 }}>
        <form action={handleSubmit} noValidate>
          <Box
            sx={{
              display: "grid",
              columnGap: 3,
              gridTemplateColumns: "repeat(2, 1fr)",
              paddingBottom: "10px",
            }}
          >
            <InputControl
              inputType={InputType.TEXT}
              autoFocus
              id="name"
              label="Name"
              name="name"
              required
              error={formError?.name?.error}
              helperText={formError?.name?.msg}
              defaultValue={entityData.name}
            />
            <InputControl
              inputType={InputType.TEXT}
              id="alias"
              label="Alias"
              name="alias"
              required
              error={formError?.alias?.error}
              helperText={formError?.alias?.msg}
              defaultValue={entityData.alias}
            />
          </Box>
          <Box
            sx={{
              display: "grid",
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            <InputControl
              inputType={InputType.TEXT}
              label="Address Line 1"
              name="add1"
              id="add1"
              required
              error={formError?.add1?.error}
              helperText={formError?.add1?.msg}
              fullWidth
              defaultValue={entityData.add1}
            />
            <InputControl
              inputType={InputType.TEXT}
              label="Address Line 2"
              name="add2"
              id="add2"
              error={formError?.add2?.error}
              helperText={formError?.add2?.msg}
              fullWidth
              defaultValue={entityData.add2}
            />

            <InputControl
              inputType={InputType.TEXT}
              name="city"
              id="city"
              label="City"
              error={formError?.city?.error}
              helperText={formError?.city?.msg}
              defaultValue={entityData.city}
            />
            <AutocompleteDB
              name={"country"}
              id={"country"}
              label={"Country"}
              onChange={(e, val, s) => {
                setSelectValues({ country: val, state: null });
              }}
              fetchDataFn={getCountriesMaster}
              diaglogVal={
                entityData.country
                  ? ({
                      id: entityData.country_id,
                      name: entityData.country,
                    } as optionsDataT)
                  : {
                      id: selectValues.country?.id,
                      name: selectValues.country?.name ?? "",
                      detail: undefined,
                    }
              }
              setDialogVal={function (
                value: React.SetStateAction<optionsDataT>
              ): void {}}
              fnSetModifyMode={function (id: string): void {}}
            />
            <AutocompleteDB
              name={"state"}
              id={"state"}
              label={"State"}
              onChange={(e, val, s) =>
                setSelectValues({ ...selectValues, state: val })
              }
              fetchDataFn={(stateStr: string) =>
                getStatesMaster(stateStr, selectValues.country?.name)
              }
              disable={
                selectValues.country || entityData.country ? false : true
              }
              diaglogVal={
                entityData.state
                  ? ({
                      id: entityData.state_id,
                      name: entityData.state,
                    } as optionsDataT)
                  : {
                      id: selectValues.state?.id,
                      name: selectValues.state?.name ?? "",
                      detail: undefined,
                    }
              }
              setDialogVal={function (
                value: React.SetStateAction<optionsDataT>
              ): void {}}
              fnSetModifyMode={function (id: string): void {}}
            />
            <InputControl
              inputType={InputType.TEXT}
              name="pincode"
              id="pincode"
              label="Pin Code"
              error={formError?.pincode?.error}
              helperText={formError?.pincode?.msg}
              defaultValue={entityData.pincode}
            />
          </Box>
          <Box
            sx={{
              mt: 3,
              display: "grid",
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </form>
        <Snackbar
          open={snackOpen}
          autoHideDuration={1000}
          onClose={() => setSnackOpen(false)}
          message="Record Saved!!"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Box>
    </Paper>
  );
}
