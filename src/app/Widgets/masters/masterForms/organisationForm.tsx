import React, { Dispatch, SetStateAction, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {
  createOrganisation,
  updateOrganisation,
} from "../../../controllers/organisation.controller";
import Grid from "@mui/material/Grid";
import { getCountries } from "../../../controllers/masters.controller";
import { getStates } from "@/app/controllers/masters.controller";
import { organisationSchema } from "@/app/zodschema/zodschema";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import { SelectMasterWrapper } from "@/app/Widgets/masters/selectMasterWrapper";
import CountryForm from "./countryForm";
import StateForm from "./countryForm";
import {
  masterFormPropsT,
  optionsDataT,
  organisationSchemaT,
  selectKeyValueT,
} from "@/app/models/models";
import Seperator from "../../seperator";

export default function OrganisationForm(props: masterFormPropsT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});

  const entityData: organisationSchemaT = props.data ? props.data : {};

  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    formData = updateFormData(data);

    const result = await persistEntity(data as organisationSchemaT);
    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name };
      props.setDialogValue ? props.setDialogValue(newVal.name) : null;
      setTimeout(() => {
        props.setDialogOpen ? props.setDialogOpen(false) : null;
      }, 1000);
      setFormError({});
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
    data.country_id = selectValues.country ? selectValues.country.id : 0;
    data.state_id = selectValues.state ? selectValues.state.id : 0;

    return data;
  };

  async function persistEntity(data: organisationSchemaT) {
    let result;
    if (props.data) {
      Object.assign(data, { id: props.data.id });
      result = await updateOrganisation(data);
    } else {
      result = await createOrganisation(data);
    }
    return result;
  }

  async function getStatesforCountry(stateStr: string) {
    const country = selectValues.country?.name;

    const states = await getStates(stateStr, country);
    if (states.length > 0) {
      return states;
    }
  }

  function onSelectChange(
    event: React.SyntheticEvent,
    val: any,
    setDialogValue: any,
    name: string
  ) {
    let values = { ...selectValues };
    values[name] = val;
    setSelectValues(values);
  }

  return (
    <>
      <Seperator>
        {props.data ? "Update Organsation" : "Add Organisation"}
      </Seperator>
      <Box id="sourceForm" sx={{ m: 2, p: 3 }}>
        {formError?.form?.error && (
          <p style={{ color: "red" }}>{formError?.form.msg}</p>
        )}
        <form action={handleSubmit}>
          <Box
            sx={{
              display: "grid",
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: "2fr 1fr",
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
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            <InputControl
              inputType={InputType.TEXT}
              id="printName"
              label="Print Name"
              name="printName"
              error={formError?.printName?.error}
              helperText={formError?.printName?.msg}
              defaultValue={entityData.printName}
            />
            <InputControl
              inputType={InputType.TEXT}
              id="pan"
              label="PAN"
              name="pan"
              error={formError?.pan?.error}
              helperText={formError?.pan?.msg}
              defaultValue={entityData.pan}
            />
            <InputControl
              inputType={InputType.TEXT}
              id="gstin"
              label="GSTIN"
              name="gstin"
              error={formError?.gstin?.error}
              helperText={formError?.gstin?.msg}
              defaultValue={entityData.gstin}
            />
          </Box>
          <InputControl
            inputType={InputType.TEXT}
            label="Address Line 1"
            name="address1"
            id="address1"
            error={formError?.address1?.error}
            helperText={formError?.address1?.msg}
            defaultValue={entityData.address1}
            fullWidth
          />
          <InputControl
            inputType={InputType.TEXT}
            label="Address Line 2"
            name="address2"
            id="address2"
            error={formError?.address2?.error}
            helperText={formError?.address2?.msg}
            defaultValue={entityData.address2}
            fullWidth
          />
          <InputControl
            inputType={InputType.TEXT}
            label="Address Line 3"
            name="address3"
            id="address3"
            error={formError?.address3?.error}
            helperText={formError?.address3?.msg}
            defaultValue={entityData.address3}
            fullWidth
          />
          <Box
            sx={{
              display: "grid",
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            <SelectMasterWrapper
              name={"country"}
              id={"country"}
              label={"Country"}
              width={210}
              dialogTitle={"Add country"}
              onChange={(e, v, s) => onSelectChange(e, v, s, "country")}
              fetchDataFn={getCountries}
              defaultValue={
                {
                  id: entityData.country_id,
                  name: entityData.country,
                } as optionsDataT
              }
              renderForm={(fnDialogOpen, fnDialogValue) => (
                <CountryForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                />
              )}
            />
            <SelectMasterWrapper
              name={"state"}
              id={"state"}
              label={"State"}
              width={210}
              onChange={(e, v, s) => onSelectChange(e, v, s, "state")}
              dialogTitle={"Add State"}
              fetchDataFn={getStatesforCountry}
              defaultValue={
                {
                  id: entityData.state_id,
                  name: entityData.state,
                } as optionsDataT
              }
              renderForm={(fnDialogOpen, fnDialogValue) => (
                <StateForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                />
              )}
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
          <Grid container>
            <Grid item xs={6} md={6}>
              <Box margin={1} sx={{ display: "flex" }}>
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  m={1}
                >
                  <Button onClick={handleCancel}>Cancel</Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} md={6}>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
                m={1}
              >
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}
