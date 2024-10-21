import React, { useState } from "react";
import Button from "@mui/material/Button";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Box from "@mui/material/Box";
import { createState, updateState } from "@/app/controllers/masters.controller";
import Grid from "@mui/material/Grid";
import {
  masterFormPropsT,
  masterFormPropsWithParentT,
  stateSchemaT,
} from "@/app/models/models";
import { nameMasterData } from "@/app/zodschema/zodschema";
import Seperator from "../../seperator";
import { Collapse, IconButton, Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

export default function StateForm(props: masterFormPropsWithParentT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const entityData: stateSchemaT = props.data ? props.data : {};
  const parentData: any = props.parentData ? props.parentData : null;

  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get("name") as string,
      alias: formData.get("alias") as string,
    };
    Object.assign(data, { country_id: parentData });

    const result = await persistEntity(data as stateSchemaT);

    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name };
      props.setDialogValue ? props.setDialogValue(newVal) : null;
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
      for (const issue of issues) {
        for (const path of issue.path) {
          errorState[path] = { msg: issue.message, error: true };
        }
      }
      errorState["form"] = { msg: "Error encountered", error: true };
      setFormError(errorState);
    }

    async function persistEntity(data: stateSchemaT) {
      let result;
      if (props.data) {
        Object.assign(data, { id: entityData.id });
        result = await updateState(data);
      } else {
        result = await createState(data);
      }
      return result;
    }
  };

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
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
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
