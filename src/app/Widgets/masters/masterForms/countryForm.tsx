import React, { useState } from "react";
import Button from "@mui/material/Button";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Box from "@mui/material/Box";
import {
  createCountry,
  updateCountry,
} from "@/app/controllers/masters.controller";
import Grid from "@mui/material/Grid";
import { nameMasterData } from "@/app/zodschema/zodschema";
import { masterFormPropsT, countrySchemaT } from "@/app/models/models";
import Seperator from "../../seperator";
import { Collapse, IconButton } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

export default function CountryForm(props: masterFormPropsT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const entityData: countrySchemaT = props.data ? props.data : {};

  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get("name") as string,
      alias: formData.get("alias") as string,
    };
    const result = await persistEntity(data);
    console.log(result);
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

  async function persistEntity(data: countrySchemaT) {
    let result;
    if (props.data) {
      Object.assign(data, { id: props.data.id });
      // console.log(data)
      result = await updateCountry(data);
    } else {
      result = await createCountry(data);
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
      <Seperator>{props.data ? "Modify Country" : "Add Country"}</Seperator>
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
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          <InputControl
            autoFocus
            id="name"
            label="Country Name"
            inputType={InputType.TEXT}
            defaultValue={entityData.name}
            name="name"
            error={formError?.name?.error}
            helperText={formError?.name?.msg}
          />
          <InputControl
            id="alias"
            label="Alias"
            inputType={InputType.TEXT}
            defaultValue={entityData.alias}
            name="alias"
            error={formError?.alias?.error}
            helperText={formError?.alias?.msg}
          />
        </Box>
        <Grid container xs={12} md={12}>
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
    </>
  );
}
