"use client";
import React, { useEffect, useState } from "react";
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
    <Paper elevation={3} sx={{ mt: 2, mb: 1.5, p: 2 }} square={false}>
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
            {entityData.id ? "Update Company" : "Add Company"}
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
      <Box sx={{ m: 2 }}>
        <form action={handleSubmit} noValidate>
          <Box
            sx={{
              display: "grid",
              columnGap: 3,
              rowGap: 1,
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
              fullWidth
              error={formError?.name?.error}
              helperText={formError?.name?.msg}
              defaultValue={entityData.name}
              FormHelperTextProps={{
                sx: { backgroundColor: "white", margin: 0 },
              }}
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
              fullWidth
              error={formError?.add1?.error}
              helperText={formError?.add1?.msg}
              defaultValue={entityData.add1}
              onKeyDown={() => {
                setFormError((curr) => {
                  const { add1, ...rest } = curr;
                  return rest;
                });
              }}
            />
            <InputControl
              inputType={InputType.TEXT}
              label="Address Line 2"
              name="add2"
              id="add2"
              fullWidth
              error={formError?.add2?.error}
              helperText={formError?.add2?.msg}
              defaultValue={entityData.add2}
              onKeyDown={() => {
                setFormError((curr) => {
                  const { add2, ...rest } = curr;
                  return rest;
                });
              }}
            />
            <AutocompleteDB
              name={"country"}
              id={"country"}
              label={"Country"}
              onChange={(e, val, s) => {
                setSelectValues({ country: val, state: null });
                entityData.country_id = undefined;
                entityData.country = "";
                entityData.state_id = undefined;
                entityData.state = "";
              }}
              fetchDataFn={getCountriesMaster}
              diaglogVal={
                selectValues.country
                  ? {
                      id: selectValues.country?.id,
                      name: selectValues.country?.name ?? "",
                      detail: undefined,
                    }
                  : ({
                      id: entityData.country_id,
                      name: entityData.country,
                    } as optionsDataT)
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
              onChange={(e, val, s) => {
                setSelectValues({ ...selectValues, state: val });
                entityData.state_id = undefined;
                entityData.state = "";
              }}
              fetchDataFn={(stateStr: string) => {
                const country =
                  selectValues.country?.name ?? entityData.country;
                return getStatesMaster(stateStr, country);
              }}
              disable={
                selectValues.country || entityData.country ? false : true
              }
              diaglogVal={
                selectValues.state
                  ? {
                      id: selectValues.state?.id,
                      name: selectValues.state?.name ?? "",
                      detail: undefined,
                    }
                  : ({
                      id: entityData.state_id,
                      name: entityData.state,
                    } as optionsDataT)
              }
              setDialogVal={function (
                value: React.SetStateAction<optionsDataT>
              ): void {}}
              fnSetModifyMode={function (id: string): void {}}
            />

            <InputControl
              inputType={InputType.TEXT}
              name="city"
              id="city"
              label="City"
              fullWidth
              error={formError?.city?.error}
              helperText={formError?.city?.msg}
              defaultValue={entityData.city}
              onKeyDown={() => {
                setFormError((curr) => {
                  const { city, ...rest } = curr;
                  return rest;
                });
              }}
            />
            <InputControl
              inputType={InputType.TEXT}
              name="pincode"
              id="pincode"
              label="Pin Code"
              fullWidth
              error={formError?.pincode?.error}
              helperText={formError?.pincode?.msg}
              defaultValue={entityData.pincode}
              onKeyDown={() => {
                setFormError((curr) => {
                  const { pincode, ...rest } = curr;
                  return rest;
                });
              }}
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
          message="Record Saved!!"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Box>
    </Paper>
  );
}
