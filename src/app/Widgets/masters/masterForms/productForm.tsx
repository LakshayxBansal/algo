"use client";
import React, { useState } from "react";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { SelectMasterWrapper } from "@/app/Widgets/selectMasterWrapper/selectMasterWrapper";
import Seperator from "../../seperator";
import Snackbar from "@mui/material/Snackbar";
import {
  productSchemaT,
  masterFormPropsWithDataT,
  optionsDataT,
  selectKeyValueT,
  docDescriptionSchemaT,
} from "@/app/models/models";
import { createProduct } from "@/app/controllers/product.controller";
import {
  getProductGroup,
  getProductGroupById,
} from "@/app/controllers/productGroup.controller";
import { getUnit, getUnitById } from "@/app/controllers/unit.controller";
import ProductGroupForm from "./productGroupForm";
import UnitForm from "./unitForm";
import { Collapse, Grid, IconButton, Portal } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { updateProduct } from "@/app/controllers/product.controller";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { VisuallyHiddenInput } from "@/styledComponents";
import CustomField from "@/app/cap/enquiry/CustomFields";

export default function ProductForm(
  props: masterFormPropsWithDataT<productSchemaT>
) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const entityData: productSchemaT = props.data
    ? props.data
    : ({} as productSchemaT);
  const pathName = usePathname();
  const [formKey, setFormKey] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(props?.data?.profileDocument?.file ? `data:image/png;base64,${props.data.profileDocument?.file}` : null)
  const [profileImage, setProfileImage] = useState<docDescriptionSchemaT>(props.data?.profileDocument ? props?.data?.profileDocument : {} as docDescriptionSchemaT);
  
  let fieldArr: React.ReactElement[] = [];

 const defaultComponentMap = new Map<string, React.ReactNode>([
  [
    "name",
    <InputControl
      key="name"
      inputType={InputType.TEXT}
      autoFocus
      id="name"
      label="Name"
      name="name"
      required
      titleCase={true}
      error={formError?.name?.error}
      helperText={formError?.name?.msg}
      setFormError={setFormError}
      defaultValue={entityData.name}
      style={{ width: "100%" }}
    />
  ],
  [
    "alias",
    <InputControl
      key='alias'
      inputType={InputType.TEXT}
      id="alias"
      label="Alias"
      name="alias"
      error={formError?.alias?.error}
      helperText={formError?.alias?.msg}
      setFormError={setFormError}
      defaultValue={entityData.alias}
      style={{ width: "100%" }}
    />
  ],
  [
    "product_group_name",
    <SelectMasterWrapper
      key='product_group_name'
      name={"productGroup"}
      id={"productGroup"}
      label={"Product Group Name"}
      dialogTitle={"Product Group"}
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
      setFormError={setFormError}
      renderForm={(fnDialogOpen, fnDialogValue, data?) => (
        <ProductGroupForm
          setDialogOpen={fnDialogOpen}
          setDialogValue={fnDialogValue}
          data={data}
        />
      )}
      width={352}
    />
  ],
  [
    "unit_name",
    <SelectMasterWrapper
      key='unit'
      name={"unit"}
      id={"unit"}
      label={"Unit Name"}
      dialogTitle={"Unit"}
      required
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
      setFormError={setFormError}
      renderForm={(fnDialogOpen, fnDialogValue, data?) => (
        <UnitForm
          setDialogOpen={fnDialogOpen}
          setDialogValue={fnDialogValue}
          data={data}
        />
      )}
      width={352}
    />
  ],
  [
    "hsn_code",
    <InputControl
      key='hsn_code'
      inputType={InputType.TEXT}
      name="hsn_code"
      id="hsn_code"
      label="HSN Code"
      error={formError?.hsn_code?.error}
      helperText={formError?.hsn_code?.msg}
      setFormError={setFormError}
      defaultValue={entityData.hsn_code}
      style={{ width: "100%" }}
  />
  ]
 ]);

  props.metaData?.fields.map((field: any) => {
    if(field.is_default_column === 1)
    {
      const baseElement = defaultComponentMap.get(
        field.column_name_id
      ) as React.ReactElement;



      const fld = React.cloneElement(baseElement, {
        ...baseElement.props,
        label: field.column_label,
        required: field.is_mandatory === 1,
        key: `field-name-${field.column_name_id}`,
        disabled: field.is_disabled === 1 ? true : false,
      });

      fieldArr.push(fld);
    } else {
        const fld = (
        <CustomField
          key={`field-custom-${field.column_name_id}`}
          desc={field}
          defaultValue={
            entityData[field.column_name_id as keyof productSchemaT]
          }
        />
      );
      fieldArr.push(fld);
    }
    return null;
  })

  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {};

    for (let i = 1; i <= 10; ++i) {
      data[`c_col${i}`] = "";
    }

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    if(uploadedImage)
    {
        profileImage["file"] = uploadedImage as string;
    }
    profileImage["description"] = "Product Image";
    data.profileDocument = profileImage;

    formData = updateFormData(data);
    const result = await persistEntity(data as productSchemaT);
    if (result.status) {
      const newVal = {
        id: result.data[0].id,
        name: result.data[0].name,
        stamp: result.data[0].stamp,
      };
      setFormError({});
      setSnackOpen(true);
      if (pathName !== "/cap/admin/lists/productList" || entityData.id) {
        setTimeout(() => {
          props.setDialogOpen ? props.setDialogOpen(false) : null;
          props.setDialogValue ? props.setDialogValue(newVal) : null;
        }, 1000);
      } else {
        setFormKey(formKey + 1);
        setUploadedImage(null);
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

    const handleProfileUpload = (event: any) => {
      setFormError({});
      let data: docDescriptionSchemaT = {} as docDescriptionSchemaT;
      const imageFile = event.target.files[0];
      if(imageFile)
      {
        const fileSizeInKb = imageFile.size / 1024;
        if(fileSizeInKb < 50 || fileSizeInKb > 500)
        {
          const errorState: Record<string, { msg: string; error: boolean }> = {};
          errorState["form"] = { msg: "Invalid file size. Please upload an image between 50KB and 500KB.", error: true };
          setFormError(errorState);
          return;
        }
  
        if(imageFile.type !== 'image/png')
        {
          const errorState: Record<string, { msg: string; error: boolean }> = {};
          errorState["form"] = { msg: "Invalid file type. Please upload a PNG image.", error: true };
          setFormError(errorState);
          return;
        }
  
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setUploadedImage(fileReader.result as string);
        }
        fileReader.readAsDataURL(imageFile);
  
        data["fileName"] = imageFile.name;
        data["fileType"] = imageFile.type;
        setProfileImage(data);
      }
    }

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
        <form key={formKey} action={handleSubmit} noValidate>
          <Grid container spacing={1}>
            {
              fieldArr.map((field, index) => {
                const fieldKey = field.key as string;
                return (
                  <Grid key={fieldKey} item xs={12} sm={6} md={4} >
                    <div key={index}>{field}</div>
                  </Grid>
                )
              })
            }
            <Grid container item xs={12}>
                <Grid item xs={6} sx={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-start" }}>
                  <Box>
                    {uploadedImage && (
                      <Box sx={{ display: "flex", p: 1 }}>
                        <Image
                          src={uploadedImage}
                          alt="Uploaded Logo"
                          width={90}
                          height={90}
                          style={{ borderRadius: "8px", objectFit: "contain" }}
                        />
                      </Box>
                    )}
                    <Button
                      component="label"
                      role={undefined}
                      variant="text"
                      tabIndex={-1}
                      sx={{ backgroundColor: "white" }}
                    >
                      Upload Image
                      <VisuallyHiddenInput type="file" onChange={handleProfileUpload} multiple />
                    </Button>
                  </Box>
                </Grid>

                <Grid item xs={6} sx={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
                  <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                    <Button
                      onClick={handleCancel}
                      tabIndex={-1}
                      sx={{ marginRight: "1rem" }}
                    >
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
                </Grid>
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
