"use client";
import * as zs from "../../zodschema/zodschema";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { SelectMasterWrapper } from "@/app/Widgets/selectMasterWrapper/selectMasterWrapper";
import Snackbar from "@mui/material/Snackbar";
import { masterFormPropsT, selectKeyValueT } from "@/app/models/models";
import {
  getProduct,
  getProductById,
} from "@/app/controllers/product.controller";
import { Collapse, Grid, IconButton, Portal } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import ProductForm from "@/app/Widgets/masters/masterForms/productForm";
import { boolean } from "zod";

export default function ProductList(props: any) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [snackOpen, setSnackOpen] = React.useState(false);

  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {};

    data["product_id"] = selectValues.product ? selectValues.product.id : 0;
    data["product"] = selectValues.product ? selectValues.product.name : "";

    const parsed = zs.supportProductSchema.safeParse(data);

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
              return [...prevData, { id: prevData.length + 1, ...data }];
            }
          })
        : null;

      if (prevDataPresent) return;

      setTimeout(() => {
        props.setDialogOpen ? props.setDialogOpen(false) : null;
      }, 1000);
      setFormError((curr) => {
        const { product, ...rest } = curr;
        return rest;
      });
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

  const onSelectChange = (
    event: React.SyntheticEvent,
    val: any,
    setDialogValue: any,
    name: string
  ) => {
    let values = { ...selectValues };
    values[name] = val;
    setSelectValues(values);
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

      <Box id="sourceForm" sx={{ m: 1, p: 3,  }} >
        <form action={handleSubmit} noValidate>
          <Grid container spacing={1} sx={{width: "350"}}> 
            <Grid item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{p:0}}
                >
                    <SelectMasterWrapper
                      name={"product"}
                      id={"product"}
                      label={"Product Name"}
                      showDetails={true}
                      dialogTitle={"Product"}
                      fetchDataFn={getProduct}
                      // width={350}
                      fnFetchDataByID={getProductById}
                      required
                      formError={formError?.product ?? formError.product}
                      setFormError={setFormError}
                      onChange={(e, v, s) => onSelectChange(e, v, s, "product")}
                      renderForm={(fnDialogOpen, fnDialogValue, data) => (
                        <ProductForm
                          setDialogOpen={fnDialogOpen}
                          setDialogValue={fnDialogValue}
                          data={data}
                        />
                      )}
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
              <Button onClick={handleCancel}>Cancel</Button>
              <Button
                type="submit"
                variant="contained"
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
            autoHideDuration={1000}
            onClose={() => setSnackOpen(false)}
            message="Product Added!"
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          />
        </Portal>
      </Box>
    </>
  );
}
