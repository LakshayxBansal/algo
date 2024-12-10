"use client";
import * as zs from "../../zodschema/zodschema";
import React, { useState } from "react";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { SelectMasterWrapper } from "@/app/Widgets/masters/selectMasterWrapper";
import Seperator from "../../Widgets/seperator";
import {
  masterFormPropsT,
  optionsDataT,
  selectKeyValueT,
} from "@/app/models/models";
import {
  getProduct,
  getProductById,
} from "@/app/controllers/product.controller";
import { getUnit, getUnitById } from "@/app/controllers/unit.controller";
import UnitForm from "../../Widgets/masters/masterForms/unitForm";
import { Collapse, IconButton, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import ProductForm from "@/app/Widgets/masters/masterForms/productForm";

interface customprop extends masterFormPropsT {
  setData: (props: any) => void;
}

export default function AddProductToListForm(props: customprop) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [defaultValueForUnitUsingProduct, setDefaultValueForUnitUsingProduct] =
    useState<selectKeyValueT>({});
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
    let prevDataPresent = false;
    if (parsed.success) {
      props.setData
        ? props.setData((prevData: any) => {
            prevDataPresent = prevData.some(
              (item: any) => item.product_id === data.product_id
            );
            if (prevDataPresent) {
              const errorState: Record<
                string,
                { msg: string; error: boolean }
              > = {};
              errorState["form"] = {
                msg: "Product already exists in the list",
                error: true,
              };
              setFormError((curr: any) => {
                return { ...curr, ...errorState };
              });
              return prevData;
            } else {
              return [
                ...prevData,
                {
                  id: Math.max(0, ...prevData.map((item : any) => item.id)) + 1,
                  ...data,
                },
              ];
            }
          })
        : null;

      if (prevDataPresent) return;

      props.setDialogOpen ? props.setDialogOpen(false) : null;
      setFormError({});
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

  async function onSelectChange(
    event: React.SyntheticEvent,
    val: any,
    setDialogValue: any,
    name: string
  ) {
    let values = { ...selectValues };
    values[name] = val;

    if (name === "product" && val?.id) {
      try {
        const res = await getProductById(val.id);
        if (res[0].id !== 0) {
          setDefaultValueForUnitUsingProduct({
            id: res[0].unit_id,
            name: res[0].unit_name,
          });
          values["unit"] = {
            id: res[0].unit_id,
            name: res[0].unit_name,
          };
        }
      } catch (error) {
        console.error("Error in getProductById:", error);
      }
    } else if (name === "unit" && val?.id) {
      setDefaultValueForUnitUsingProduct({ id: val.id, name: val.name });
      values["unit"] = { id: val.id, name: val.name };
    } else {
      setDefaultValueForUnitUsingProduct({ id: 0, name: "" });
      values["unit"] = {};
    }

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
      <Box id="sourceForm" sx={{ m: 2, p: 3 }}>
        <form action={handleSubmit} noValidate>
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
            width={649}
          />

          <Box
            sx={{
              display: "grid",
              columnGap: 2,
              rowGap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            <InputControl
              required
              inputType={InputType.TEXT}
              type="number"
              id="quantity"
              label="Quantity"
              name="quantity"
              inputProps={{
                min: 0,
                max: 10000000,
                // style: { textAlign: "right" },
                onKeyDown: (e: any) => {
                  // Prevent 'e' character
                  if (
                    e.key === "e" ||
                    e.key === "E" ||
                    e.key === "-" ||
                    e.key === "+"
                  ) {
                    e.preventDefault();
                  }
                },
              }}
              error={formError?.quantity?.error}
              helperText={formError?.quantity?.msg}
            />
            <SelectMasterWrapper
              key={defaultValueForUnitUsingProduct.id}
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
              defaultValue={
                {
                  id: defaultValueForUnitUsingProduct.id,
                  name: defaultValueForUnitUsingProduct.name,
                } as optionsDataT
              }
            />
          </Box>
          <InputControl
            inputType={InputType.TEXTFIELD}
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
            <Button onClick={handleCancel} tabIndex={-1}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "15%", marginLeft: "5%" }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
