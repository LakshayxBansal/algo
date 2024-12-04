import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Box from "@mui/material/Box";
import {
  createState,
  getCountries,
  updateState,
  getCountryById,
} from "@/app/controllers/masters.controller";
import {
  masterFormPropsWithDataT,
  optionsDataT,
  selectKeyValueT,
  stateListSchemaT,
} from "@/app/models/models";
import Seperator from "../../seperator";
import { Collapse, Grid, IconButton, Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { SelectMasterWrapper } from "../selectMasterWrapper";
import CountryForm from "./countryForm";

export default function StateFormList(props: masterFormPropsWithDataT<stateListSchemaT>) {
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  let entityData: stateListSchemaT = props.data ? props.data : {} as stateListSchemaT;

  useEffect(() => {
    setSelectValues(entityData);
    console.log("entity data", entityData);

  }, [])

  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    data.country_id = selectValues.country?.id
      ? selectValues.country.id
      : selectValues.country_id
        ? selectValues.country_id
        : 0;

    const result = await persistEntity(data as stateListSchemaT);

    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name };
      props.setDialogValue ? props.setDialogValue(newVal.name) : null;
      // props.setDialogOpen ? props.setDialogOpen(false) : null;
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
          if (path === "refresh") {
            errorState["form"] = { msg: issue.message, error: true };
          }
        }
      }
      setFormError(errorState);
    }
  };


  async function persistEntity(data: stateListSchemaT) {
    let result;
    if (props.data) {
      Object.assign(data, { id: entityData.id, stamp: entityData.stamp });
      result = await updateState(data);
    } else {
      result = await createState(data);
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
            {props.data ? "Update State" : "Add State"}
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
       <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <SelectMasterWrapper
            name={"country"}
            id={"country"}
            label={"Country"}
            formError={formError.country}
            dialogTitle={"country"}
            onChange={(e, val, s) => {
              setSelectValues((prevSelectValues) => ({
                ...prevSelectValues,
                country: val,
                country_id:val
              }));
            }}
            fetchDataFn={getCountries}
            fnFetchDataByID={getCountryById}
            defaultValue={
              {
                id: entityData.country_id,
                name: entityData.country,
              } as optionsDataT
            }
            renderForm={(fnDialogOpen, fnDialogValue, data) => (
              <CountryForm
                setDialogOpen={fnDialogOpen}
                setDialogValue={fnDialogValue}
                data={data}
              />
            )}
            required
            width={350}
          />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <InputControl
              autoFocus
              id="name"
              label="State Name"
              titleCase={true}
              inputType={InputType.TEXT}
              defaultValue={entityData.name}
              name="name"
              error={formError?.name?.error}
              helperText={formError?.name?.msg}
              required
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <InputControl
              id="alias"
              label="Alias"
              defaultValue={entityData.alias}
              inputType={InputType.TEXT}
              name="alias"
              error={formError?.alias?.error}
              helperText={formError?.alias?.msg}
              style={{ width: "100%" }}
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
