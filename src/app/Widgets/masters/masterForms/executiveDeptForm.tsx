"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Box from "@mui/material/Box";
import {
  createExecutiveDept,
  updateExecutiveDept,
} from "@/app/controllers/executiveDept.controller";
import {
  executiveDeptSchemaT,
  masterFormPropsT,
  masterFormPropsWithDataT,
} from "@/app/models/models";
import { Grid, Portal, Snackbar } from "@mui/material";
import { Collapse, IconButton } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import Seperator from "../../seperator";
import CustomField from "@/app/cap/enquiry/CustomFields";
import { usePathname } from "next/navigation";

export default function ExecutiveDeptForm(
  props: masterFormPropsWithDataT<executiveDeptSchemaT>
) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});

  const [snackOpen, setSnackOpen] = React.useState(false);
  const entityData: executiveDeptSchemaT = props.data
    ? props.data
    : ({} as executiveDeptSchemaT);
  const pathName = usePathname();
  const [formKey, setFormKey] = useState(0);

  const defaultComponentMap = new Map<string, React.ReactNode>([
    [
      "name",
      <InputControl
        key="name"
        autoFocus
        inputType={InputType.TEXT}
        id="name"
        titleCase={true}
        label="Department Name"
        name="name"
        style={{ width: "100%" }}
        required
        error={formError?.name?.error}
        helperText={formError?.name?.msg}
        setFormError={setFormError}
        defaultValue={entityData.name}
        // onKeyDown={() => {
        //   setFormError((curr) => {
        //     const { name, ...rest } = curr;
        //     return rest;
        //   });
        // }}
      />,
    ],
  ]);

  let fieldArr: React.ReactElement[] = [];

  // submit function. Save to DB and set value to the dropdown control
  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (let i = 1; i <= 10; ++i) {
      data[`c_col${i}`] = "";
    }

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    const result = await persistEntity(data as executiveDeptSchemaT);
    if (result.status) {
      // setSnackOpen(true);
      const newVal = {
        id: result.data[0].id,
        name: result.data[0].name,
        stamp: result.data[0].stamp,
      };
      setFormError({});
      setSnackOpen(true);
      if (pathName !== "/cap/admin/lists/executiveDeptList" || entityData.id) {
        setTimeout(() => {
          props.setDialogOpen ? props.setDialogOpen(false) : null;
          props.setDialogValue ? props.setDialogValue(newVal) : null;
        }, 1000);
      } else {
        setFormKey(formKey + 1);
      }
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

  // Function to create or modify contact
  async function persistEntity(data: executiveDeptSchemaT) {
    let result;
    if (entityData.id) {
      data = { ...data, id: entityData.id, stamp: entityData.stamp };
      result = await updateExecutiveDept(data);
    } else {
      result = await createExecutiveDept(data);
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

  props.metaData?.fields.map((field: any) => {
    if (field.is_default_column) {
      const baseElement = defaultComponentMap.get(
        field.column_name_id
      ) as React.ReactElement;

      const fld = React.cloneElement(baseElement, {
        ...baseElement.props,
        label: field.column_label,
        required: field.is_mandatory === 1,
        key: `field-default-${field.column_name_id}`,
        disabled: field.is_disabled === 1 ? true : false,
      });

      fieldArr.push(fld);
    } else {
      const fld = (
        <CustomField
          key={`field-custom-${field.column_name_id}`}
          desc={field}
          defaultValue={
            entityData[field.column_name_id as keyof executiveDeptSchemaT]
          }
        />
      );
      fieldArr.push(fld);
    }
    return null;
  });

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
      <Box id="sourceForm" sx={{ m: 1, p: 3 }}>
        <form key={formKey} action={handleSubmit} noValidate autoComplete="off">
          <Grid container spacing={1}>
            {fieldArr.map((field, index) => {
              const fieldKey = field.key as string;
              return (
                <Grid key={fieldKey} item xs={12} sm={12} md={12} lg={12}>
                  <div key={index}>{field}</div>
                </Grid>
              );
            })}
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
