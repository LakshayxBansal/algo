import React, { useState } from "react";
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
  masterFormPropsWithParentT,
  optionsDataT,
  selectKeyValueT,
  stateListSchemaT,
} from "@/app/models/models";
import Seperator from "../../seperator";
import { Collapse, IconButton } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { SelectMasterWrapper } from "../selectMasterWrapper";
import CountryForm from "./countryForm";

export default function StateFormList(props: masterFormPropsWithParentT) {
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const entityData: stateListSchemaT = props.data ? props.data : {};

  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    formData = updateFormData(data);

    const result = await persistEntity(data as stateListSchemaT);

    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name };
      props.setDialogValue ? props.setDialogValue(newVal.name) : null;
      props.setDialogOpen ? props.setDialogOpen(false) : null;
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
    data.country_id = selectValues.country
      ? selectValues.country.id
      : entityData.country_id
      ? entityData.country_id
      : 0;

    return data;
  };

  async function persistEntity(data: stateListSchemaT) {
    let result;
    if (props.data) {
      Object.assign(data, { id: entityData.id });
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
            {props.data ? "Modify State" : "Add State"}
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
      <form action={handleSubmit}>
        <Box
          sx={{
            display: "grid",
            columnGap: 3,
            rowGap: 1,
            gridTemplateColumns: "repeat(3, 0.70fr)",
          }}
        >
          <SelectMasterWrapper
            name={"country"}
            id={"country"}
            label={"Country"}
            dialogTitle={"country"}
            onChange={(e, val, s) =>
              setSelectValues({ ...selectValues, country: val })
            }
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
          />
          <InputControl
            autoFocus
            id="name"
            label="State Name"
            inputType={InputType.TEXT}
            defaultValue={entityData.name}
            name="name"
            error={formError?.name?.error}
            helperText={formError?.name?.msg}
          />
          <InputControl
            id="alias"
            label="Alias"
            defaultValue={entityData.alias}
            inputType={InputType.TEXT}
            name="alias"
            error={formError?.alias?.error}
            helperText={formError?.alias?.msg}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
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
    </>
  );
}
