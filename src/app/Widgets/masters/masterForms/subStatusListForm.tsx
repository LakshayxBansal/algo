"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Box from "@mui/material/Box";
import {
  createEnquirySubStatus,
  updateEnquirySubStatus,
} from "@/app/controllers/enquirySubStatus.controller";
import Seperator from "../../seperator";
import Snackbar from "@mui/material/Snackbar";
import Paper from "@mui/material/Paper";
import {
  Collapse,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import {
  enquirySubStatusMasterT,
  masterFormPropsWithDataT,
  selectKeyValueT,
} from "@/app/models/models";

export default function SubStatusListForm(props: masterFormPropsWithDataT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [status_id, setStatus] = useState<number>(1);
  const entityData: enquirySubStatusMasterT = props.data ? props.data : {};

  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    data["status_id"] = status_id;

    const result = await persistEntity(data as enquirySubStatusMasterT);
    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name };
      props.setDialogValue ? props.setDialogValue(newVal.name) : null;
      props.setDialogOpen ? props.setDialogOpen(false) : null;
      setFormError({});
      setSnackOpen(true);
    } else {
      const issues = result.data;
      const errorState: Record<string, { msg: string; error: boolean }> = {};
      for (const issue of issues) {
        for (const path of issue.path) {
          errorState[path] = { msg: issue.message, error: true };
        }
      }
      setFormError(errorState);
    }
  };

  function onStatusChange(event: React.SyntheticEvent) {
    setStatus(Number((event.target as HTMLInputElement).value));
  }

  async function persistEntity(data: enquirySubStatusMasterT) {
    let result;
    if (props.data) {
      data["id"] = entityData.id;
      result = await updateEnquirySubStatus(data);
    } else result = await createEnquirySubStatus(data);
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
    <Paper>
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
            {props.data ? "Update Sub-Status" : "Add Sub-Status"}
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
      <Box id="sourceForm" sx={{ m: 2, p: 3 }}>
        <form action={handleSubmit}>
          <Box
            sx={{
              display: "grid",
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            <FormControl>
              <RadioGroup
                row
                name="status"
                id="status"
                defaultValue={1}
                onChange={onStatusChange}
              >
                <FormControlLabel
                  value="Status"
                  control={<label />}
                  label="Status :"
                />
                <FormControlLabel value={1} control={<Radio />} label="Open" />
                <FormControlLabel
                  value={2}
                  control={<Radio />}
                  label="Closed"
                />
              </RadioGroup>
            </FormControl>
            <InputControl
              autoFocus
              id="name"
              label="Sub-Status Name"
              inputType={InputType.TEXT}
              name="name"
              defaultValue={entityData.name}
              error={formError?.name?.error}
              helperText={formError?.name?.msg}
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
          autoHideDuration={3000}
          onClose={() => setSnackOpen(false)}
          message="Record Saved!"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Box>
    </Paper>
  );
}
