"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Box from "@mui/material/Box";
import { createEnquirySubStatus } from "@/app/controllers/enquirySubStatus.controller";
import Seperator from "../../seperator";
import Snackbar from "@mui/material/Snackbar";
import Paper from "@mui/material/Paper";
import {
  Collapse,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Portal,
  Radio,
  RadioGroup,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import {
  enquirySubStatusMasterT,
  masterFormPropsWithDataT,
} from "@/app/models/models";
import { updateEnquirySubStatusList } from "@/app/controllers/enquirySubStatus.controller";
import { usePathname } from "next/navigation";

export default function SubStatusListForm(props: masterFormPropsWithDataT<enquirySubStatusMasterT>) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [status_id, setStatus] = useState<number | undefined>(
    props.data?.enquiry_status_id
  );
  const entityData: enquirySubStatusMasterT = props.data ? props.data : {} as enquirySubStatusMasterT;
  const pathName = usePathname();
  const [formKey, setFormKey] = useState(0);

  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    data["enquiry_status_id"] = status_id
      ? status_id
      : entityData.enquiry_status_id
        ? entityData.enquiry_status_id
        : 0;

    const result = await persistEntity(data as enquirySubStatusMasterT);
    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name };
      props.setDialogValue ? props.setDialogValue(newVal.name) : null;
      setFormError({});
      setSnackOpen(true);
      if (pathName !== "/cap/admin/lists/subStatusList" || entityData.id) {
        setTimeout(() => {
          props.setDialogOpen ? props.setDialogOpen(false) : null;
        }, 1000);
      } else {
        setFormKey(formKey + 1); 
        // setStatus("");
      }
      // setTimeout(() => {
      //   props.setDialogOpen ? props.setDialogOpen(false) : null;
      // }, 1000);
    } else {
      const issues = result.data;
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

  function onStatusChange(event: React.ChangeEvent<HTMLInputElement>) {
    setStatus(Number(event.target.value));
  }

  async function persistEntity(data: enquirySubStatusMasterT) {
    let result;
    if (props.data) {
      data["id"] = entityData.id;
      data["stamp"] = entityData.stamp;
      result = await updateEnquirySubStatusList(data);
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
    <>
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
      <Box id="subStatusForm" sx={{m:1, p:3}}>
        <form key={formKey} action={handleSubmit} noValidate>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <FormControl sx={{ marginLeft: "1rem", marginTop: "1rem" }}>
                <Grid container alignItems="center">
                  <Grid item sm="auto">
                    <FormControlLabel
                      value="Status"
                      control={<label />}
                      label="Status :"
                    />
                  </Grid>
                  <Grid item sm="auto">
                    <RadioGroup
                      row
                      name="status"
                      id="status"
                      value={status_id}
                      onChange={onStatusChange}
                    >
                      <FormControlLabel
                        value={1}
                        control={
                          <Radio
                            inputProps={{
                              tabIndex: -1,
                              "aria-label": "Open status",
                            }}
                          />
                        }
                        label="Open"
                      />
                      <FormControlLabel
                        value={2}
                        control={
                          <Radio
                            inputProps={{
                              tabIndex: -1,
                              "aria-label": "Closed status",
                            }}
                          />
                        }
                        label="Closed"
                      />
                    </RadioGroup>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <InputControl
                autoFocus
                inputType={InputType.TEXT}
                id="name"
                label="Sub-Status Name"
                name="name"
                fullWidth
                required
                titleCase={true}
                defaultValue={entityData.name}
                error={formError?.name?.error}
                helperText={formError?.name?.msg}
 setFormError={setFormError}
                // onKeyDown={() => {
                //   setFormError((curr) => {
                //     const { name, ...rest } = curr;
                //     return rest;
                //   });
                // }}
                sx={{ marginTop: "1rem" }}
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
        <Portal>
          <Snackbar
            open={snackOpen}
            autoHideDuration={3000}
            onClose={() => setSnackOpen(false)}
            message="Record Saved!"
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          />
        </Portal>
      </Box>
    </>
  );
}
