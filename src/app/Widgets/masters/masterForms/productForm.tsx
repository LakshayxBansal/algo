"use client";
import React, { useState } from "react";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { SelectMasterWrapper } from "@/app/Widgets/masters/selectMasterWrapper";
import Seperator from "../../seperator";
import Snackbar from "@mui/material/Snackbar";
import {
  productSchemaT,
  masterFormPropsT,
  optionsDataT,
  selectKeyValueT,
} from "@/app/models/models";
import { createProduct } from "@/app/controllers/product.controller";
import {
  getProductGroup,
  getProductGroupById,
} from "@/app/controllers/productGroup.controller";
import { getUnit, getUnitById } from "@/app/controllers/unit.controller";
import ProductGroupForm from "./productGroupForm";
import UnitForm from "./unitForm";
import { Collapse, Grid, IconButton } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { updateProduct } from "@/app/controllers/product.controller";

export default function ProductForm(props: masterFormPropsT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const entityData: productSchemaT = props.data ? props.data : {};

  entityData.group = props.data?.group_id;
  entityData.unit = props.data?.unit_id;
  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    formData = updateFormData(data);
    const result = await persistEntity(data as productSchemaT);
    if (result.status) {
      const newVal = {
        id: result.data[0].id,
        name: result.data[0].name,
        stamp: result.data[0].stamp,
      };
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

  const updateFormData = (data: any) => {
    data.group = selectValues.productGroup
      ? selectValues.productGroup.id
      : entityData.group
      ? entityData.group
      : 0;
    data.unit = selectValues.unit
      ? selectValues.unit.id
      : entityData.unit
      ? entityData.unit
      : 0;
    return data;
  };

  async function persistEntity(data: productSchemaT) {
    let result;
    if (props.data) {
      Object.assign(data, { id: props.data.id, stamp: props.data.stamp });
      result = await updateProduct(data);
    } else {
      result = await createProduct(data);
    }
    return result;
  }

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
            {entityData.id ? "Update Product" : "Add Product"}
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
      <Box id="sourceForm">
        <form action={handleSubmit} noValidate>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <InputControl
                inputType={InputType.TEXT}
                autoFocus
                id="name"
                label="Name"
                name="name"
                required
                titleCase={true}
                error={formError?.name?.error}
                helperText={formError?.name?.msg}
                defaultValue={entityData.name}
                onKeyDown={() => {
                  setFormError((curr) => {
                    const { name, ...rest } = curr;
                    return rest;
                  });
                }}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <InputControl
                inputType={InputType.TEXT}
                id="alias"
                label="Alias"
                name="alias"
                error={formError?.alias?.error}
                helperText={formError?.alias?.msg}
                defaultValue={entityData.alias}
                onKeyDown={() => {
                  setFormError((curr) => {
                    const { alias, ...rest } = curr;
                    return rest;
                  });
                }}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <SelectMasterWrapper
                name={"productGroup"}
                id={"productGroup"}
                label={"Product Group Name"}
                dialogTitle={"Add Product Group"}
                fetchDataFn={getProductGroup}
                fnFetchDataByID={getProductGroupById}
                allowModify={true}
                defaultValue={
                  {
                    id: entityData.group,
                    name: entityData.group_name,
                  } as optionsDataT
                }
                onChange={(e, val, s) =>
                  setSelectValues({
                    ...selectValues,
                    productGroup: val ? val : { id: 0, name: "" },
                  })
                }
                formError={formError?.productGroup}
                renderForm={(fnDialogOpen, fnDialogValue, data?) => (
                  <ProductGroupForm
                    setDialogOpen={fnDialogOpen}
                    setDialogValue={fnDialogValue}
                    data={data}
                  />
                )}
                width={352}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <SelectMasterWrapper
                name={"unit"}
                id={"unit"}
                label={"Unit Name"}
                dialogTitle={"Add Unit"}
                allowModify={true}
                defaultValue={
                  {
                    id: entityData.unit,
                    name: entityData.unit_name,
                  } as optionsDataT
                }
                onChange={(e, val, s) =>
                  setSelectValues({
                    ...selectValues,
                    unit: val ? val : { id: 0, name: "" },
                  })
                }
                fetchDataFn={getUnit}
                fnFetchDataByID={getUnitById}
                formError={formError.unit}
                renderForm={(fnDialogOpen, fnDialogValue, data?) => (
                  <UnitForm
                    setDialogOpen={fnDialogOpen}
                    setDialogValue={fnDialogValue}
                    data={data}
                  />
                )}
                width={352}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <InputControl
                inputType={InputType.TEXT}
                name="hsn_code"
                id="hsn_code"
                label="HSN Code"
                error={formError?.hsn_code?.error}
                helperText={formError?.hsn_code?.msg}
                defaultValue={entityData.hsn_code}
                onKeyDown={() => {
                  setFormError((curr) => {
                    const { hsn_code, ...rest } = curr;
                    return rest;
                  });
                }}
                style={{ width: "100%" }}
              />
            </Grid>
            {/* </Box>
          <Box
            sx={{
              display: "grid",
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          ></Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 1,
            }}
          >
            <Button onClick={handleCancel} tabIndex={-1}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "15%", marginLeft: "5%" }}
            >
              Submit
            </Button>
          </Box> */}
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 0.5,
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
      </Box>
    </>
  );
}
