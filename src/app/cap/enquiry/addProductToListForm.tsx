"use client";
import * as zs from "../../zodschema/zodschema";
import React, { useState } from "react";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { SelectMasterWrapper } from "@/app/Widgets/masters/selectMasterWrapper";
import Seperator from "../../Widgets/seperator";
import Snackbar from "@mui/material/Snackbar";
import { masterFormPropsT, selectKeyValueT } from "@/app/models/models";
import { getProduct, getProductById } from "@/app/controllers/product.controller";
import { getUnit, getUnitById } from "@/app/controllers/unit.controller";
import UnitForm from "../../Widgets/masters/masterForms/unitForm";
import { Collapse, IconButton, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import ProductForm from "@/app/Widgets/masters/masterForms/productForm";

export default function AddProductToListForm(props: masterFormPropsT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [snackOpen, setSnackOpen] = React.useState(false);

  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (const [key, value] of formData.entries()) {
      if (key === "quantity") {
        data[key] = Number(value);
      } else {
        data[key] = value;
      }
    }

    formData = updateFormData(data);
    const parsed = zs.productToListFormSchema.safeParse(data);
    if (parsed.success) {
      props.setData
        ? props.setData((prevData: any) => [
            ...prevData,
            { id: prevData.length + 1, ...data },
          ])
        : null;
      setTimeout(() => {
        props.setDialogOpen ? props.setDialogOpen(false) : null;
      }, 1000);
      setFormError({});
      setSnackOpen(true);
    } else {
      const issues = parsed.error.issues;
      const errorState: Record<string, { msg: string; error: boolean }> = {};
      for (const issue of issues) {
        for (const path of issue.path) {
          errorState[path] = { msg: issue.message, error: true };
        }
      }
      setFormError(errorState);
    }
  };

  const updateFormData = (data: any) => {
    data.product_id = selectValues.product ? selectValues.product.id : 0;
    data.unit_id = selectValues.unit ? selectValues.unit.id : 0;
    return data;
  };

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
            Add Product To Product List
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
        <form action={handleSubmit} noValidate>
          <Box
            sx={{
              display: "grid",
              columnGap: 2,
              rowGap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            <SelectMasterWrapper
              name={"product"}
              id={"product"}
              label={"Product Name"}
              showDetails={true}
              dialogTitle={"Add Product"}
              fetchDataFn={getProduct}
              fnFetchDataByID={getProductById}
              required
              formError={formError?.product ?? formError.product}
              onChange={(e, v, s) => onSelectChange(e, v, s, "product")}
              renderForm={(fnDialogOpen, fnDialogValue, data) => (
                <ProductForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                  data={data}
                />
              )}
            />
            <InputControl
              required
              inputType={InputType.TEXT}
              type="number"
              decPlaces={0}
              min={0}
              max={10}
              // style= { textAlign: "right" },
              name="quantity"
              id="quantity"
              label="Quantity"
              error={formError?.quantity?.error}
              helperText={formError?.quantity?.msg}
            />
            <SelectMasterWrapper
              name={"unit"}
              id={"unit"}
              label={"Unit Name"}
              dialogTitle={"Add Unit"}
              fetchDataFn={getUnit}
              fnFetchDataByID={getUnitById}
              required
              formError={formError?.unit ?? formError.unit}
              onChange={(e, v, s) => onSelectChange(e, v, s, "unit")}
              renderForm={(fnDialogOpen, fnDialogValue, data) => (
                <UnitForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                  data={data}
                />
              )}
            />
          </Box>
          <TextField
            placeholder="Remarks"
            label="Remarks"
            multiline
            name="remarks"
            id="product_remark"
            rows={6}
            fullWidth
          />

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
          message="Product Added (See the end of the list)!"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Box>
    </>
  );
}
