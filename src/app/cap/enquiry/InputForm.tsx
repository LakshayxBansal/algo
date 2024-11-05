"use client";
import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
} from "@mui/material";

import { createEnquiry } from "@/app/controllers/enquiry.controller";
import Seperator from "@/app/Widgets/seperator";
import { InputControl } from "@/app/Widgets/input/InputControl";
import { InputType } from "@/app/Widgets/input/InputControl";
import { SelectMasterWrapper } from "@/app/Widgets/masters/selectMasterWrapper";
import {
  getEnquirySource,
  getEnquirySourceById,
} from "@/app/controllers/enquirySource.controller";
import {
  getContact,
  getContactById,
} from "@/app/controllers/contact.controller";
import {
  getCategoryById,
  getEnquiryCategory,
} from "@/app/controllers/enquiryCategory.controller";
import SourceForm from "@/app/Widgets/masters/masterForms/sourceForm";
import ContactForm from "@/app/Widgets/masters/masterForms/contactForm";
import ExecutiveForm from "@/app/Widgets/masters/masterForms/executiveForm";
import ActionForm from "@/app/Widgets/masters/masterForms/actionForm";
import SubStatusForm from "@/app/Widgets/masters/masterForms/subStatusForm";
import CategoryForm from "@/app/Widgets/masters/masterForms/categoryForm";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import {
  getExecutive,
  getExecutiveById,
} from "@/app/controllers/executive.controller";
import {
  getEnquirySubSatusById,
  getEnquirySubStatus,
} from "@/app/controllers/enquirySubStatus.controller";
import {
  getActionById,
  getEnquiryAction,
} from "@/app/controllers/enquiryAction.controller";

import dayjs from "dayjs";
import { ZodIssue } from "zod";
import { optionsDataT, selectKeyValueT } from "@/app/models/models";

import { AddDialog } from "@/app/Widgets/masters/addDialog";
import AddProductToListForm from "./addProductToListForm";
import ProductGrid from "./productGrid";
import { enquiryDataFormat } from "@/app/utils/formatData/enquiryDataformat";
import CustomField from "./CustomFields";

export interface IformData {
  fields: Array<any>;
  enqData: Record<string, any>;
  rights: Record<string, any>;
  config_data: Record<string, any>;
  loggedInUserData: Record<string, any>;
}

const rows: any = [];

export default function InputForm(props: { baseData: IformData }) {
  const [status, setStatus] = useState("1");
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({
    received_by: {
      id: props.baseData.loggedInUserData.id,
      name: props.baseData.loggedInUserData.name,
    },
  });
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [productFormError, setProductFormError] = useState<
    Record<number, Record<string, { msg: string; error: boolean }>>
  >({});
  const [data, setData] = React.useState(rows);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    const formatedData = await enquiryDataFormat({ formData, selectValues });

    let result;
    let issues = [];

    result = await createEnquiry({
      enqData: formatedData,
      product: data,
    });
    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name };
      setSnackOpen(true);
      setTimeout(function () {
        setFormError;
        location.reload();
      }, 3000);
    } else {
      issues = result?.data;

      let formIssue: ZodIssue[] = [];
      let productIssue = [];

      formIssue = issues[0]?.enqDataIssue ? issues[0].enqDataIssue : issues;
      productIssue = issues[1]?.productIssue;

      if (formIssue?.length > 0) {
        // set errors for form inputs
        const errorState: Record<string, { msg: string; error: boolean }> = {};
        for (const issue of formIssue) {
          errorState[issue.path[0]] = { msg: issue.message, error: true };
        }
        setFormError(errorState);
      }
      //set errors for product grid
      if (productIssue?.length > 0) {
        const temp: Record<
          number,
          Record<string, { msg: string; error: boolean }>
        > = {};

        productIssue.forEach((row: any) => {
          const key = row.path[0];
          const field = row.path[1];
          if (!temp[key]) {
            temp[key] = {};
          }

          // Add or update the field's error message
          temp[key][field] = { msg: row.message, error: true };
        });
        setProductFormError(temp);
      }
    }
  };

  async function getSubStatusforStatus(stateStr: string) {
    const subStatus = await getEnquirySubStatus(stateStr, status);
    if (subStatus?.length > 0) {
      return subStatus;
    }
  }

  function onStatusChange(event: React.SyntheticEvent, value: any) {
    setStatus(value);
  }

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

  const fieldPropertiesById = (id: string) => {
    const field = props.baseData.fields.find(
      (item: any) => item.column_name_id === id
    );

    if (field) {
      return {
        label: field.column_label,
        required: field.is_mandatory === 1, // True if mandatory, otherwise false
      };
    }
    return { label: "default label", required: false }; // Default if no match is found
  };

  const defaultComponentMap = new Map<string, React.ReactElement>([
    [
      "enq_number",
      <InputControl
        key="enq_number"
        label={fieldPropertiesById("enq_number").label}
        id="enq_number"
        inputType={InputType.TEXT}
        name="enq_number"
        fullWidth
        required={fieldPropertiesById("enq_number").required}
        error={formError?.enq_number?.error}
        helperText={formError?.enq_number?.msg}
      />,
    ],
    [
      "date",
      <InputControl
        key="date"
        label={fieldPropertiesById("date").label}
        inputType={InputType.DATETIMEINPUT}
        id="date"
        name="date"
        defaultValue={dayjs(new Date())}
        required={fieldPropertiesById("date").required}
        error={formError?.date?.error}
        helperText={formError?.date?.msg}
        sx={{ display: "flex", flexGrow: 1 }}
      />,
    ],
    [
      "contact",
      <SelectMasterWrapper
        key="contact"
        name={"contact"}
        id={"contact"}
        label={fieldPropertiesById("contact").label}
        showDetails={true}
        dialogTitle={"Add Contact"}
        onChange={(e, v, s) => onSelectChange(e, v, s, "contact")}
        fetchDataFn={getContact}
        fnFetchDataByID={getContactById}
        required={fieldPropertiesById("contact").required}
        formError={formError?.contact ?? formError.contact}
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <ContactForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
      />,
    ],
    [
      "category",
      <SelectMasterWrapper
        key="category"
        name={"category"}
        id={"category"}
        label={fieldPropertiesById("category").label}
        dialogTitle={"Add Category"}
        onChange={(e, v, s) => onSelectChange(e, v, s, "category")}
        fetchDataFn={getEnquiryCategory}
        fnFetchDataByID={getCategoryById}
        required={fieldPropertiesById("category").required}
        formError={formError?.category ?? formError.category}
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <CategoryForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
      />,
    ],
    [
      "source",
      <SelectMasterWrapper
        key="source"
        name={"source"}
        id={"source"}
        label={fieldPropertiesById("source").label}
        dialogTitle={"Add Source"}
        onChange={(e, v, s) => onSelectChange(e, v, s, "source")}
        fetchDataFn={getEnquirySource}
        fnFetchDataByID={getEnquirySourceById}
        required={fieldPropertiesById("source").required}
        formError={formError?.source ?? formError.source}
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <SourceForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
      />,
    ],
    [
      "received_by",
      <SelectMasterWrapper
        key="received_by"
        name={"received_by"}
        id={"received_by"}
        label={fieldPropertiesById("received_by").label}
        showDetails={true}
        dialogTitle={"Add Executive"}
        onChange={(e, v, s) => onSelectChange(e, v, s, "received_by")}
        fetchDataFn={getExecutive}
        fnFetchDataByID={getExecutiveById}
        required={fieldPropertiesById("received_by").required}
        formError={formError?.received_by ?? formError.received_by}
        renderForm={(fnDialogOpen, fnDialogValue, desc, data) => (
          <ExecutiveForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            desc={desc}
            data={data}
          />
        )}
        defaultValue={
          {
            id: props.baseData?.loggedInUserData?.id,
            name: props.baseData?.loggedInUserData?.name,
          } as optionsDataT
        }
      />,
    ],
    [
      "call_receipt_remark",
      <TextField
        key="call_receipt_remark"
        placeholder="Call receipt remarks"
        label={fieldPropertiesById("call_receipt_remark").label}
        multiline
        name="call_receipt_remark"
        id="call_receipt_remark"
        rows={6}
        fullWidth
        required={fieldPropertiesById("call_receipt_remark").required}
      />,
    ],
    [
      "suggested_action_remark",
      <TextField
        key="suggested_action_remark"
        placeholder="Suggested Action Remarks"
        label={fieldPropertiesById("suggested_action_remark").label}
        multiline
        name="suggested_action_remark"
        id="suggested_action_remark"
        rows={6}
        fullWidth
        required={fieldPropertiesById("suggested_action_remark").required}
      />,
    ],
    [
      "status",
      <FormControl
        sx={{ pl: "0.625em" }}
        required={fieldPropertiesById("status").required}
        key="status"
      >
        <RadioGroup
          // key="status"
          row
          name="status"
          id="status"
          defaultValue="1"
          onChange={onStatusChange}
          sx={{ color: "black" }}
        >
          <FormControlLabel
            // key="status"
            value="Status"
            control={<label />}
            label={fieldPropertiesById("status").label}
          />
          <FormControlLabel
            // key="open"
            value="1"
            control={<Radio />}
            label="Open"
          />
          <FormControlLabel
            // key="closed"
            value="2"
            control={<Radio />}
            label="Closed"
          />
        </RadioGroup>
      </FormControl>,
    ],
    [
      "sub_status",
      <SelectMasterWrapper
        key="sub_status"
        name={"sub_status"}
        id={"sub_status"}
        label={fieldPropertiesById("sub_status").label}
        dialogTitle={"Add Sub-Status for " + status}
        onChange={(e, v, s) => onSelectChange(e, v, s, "sub_status")}
        fetchDataFn={getSubStatusforStatus}
        fnFetchDataByID={getEnquirySubSatusById}
        required={fieldPropertiesById("sub_status").required}
        formError={formError?.sub_status ?? formError.sub_status}
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <SubStatusForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            parentData={status}
            data={data}
          />
        )}
        allowNewAdd={status === "1"}
      />,
    ],
    [
      "action_taken",
      <SelectMasterWrapper
        key="action_taken"
        name={"action_taken"}
        id={"action_taken"}
        label={fieldPropertiesById("action_taken").label}
        dialogTitle={"Add Action"}
        onChange={(e, v, s) => onSelectChange(e, v, s, "action_taken")}
        fetchDataFn={getEnquiryAction}
        fnFetchDataByID={getActionById}
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <ActionForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        required={fieldPropertiesById("action_taken").required}
      />,
    ],
    [
      "next_action",
      <SelectMasterWrapper
        key="next_action"
        name={"next_action"}
        id={"next_action"}
        label={fieldPropertiesById("next_action").label}
        dialogTitle={"Add Action"}
        onChange={(e, v, s) => onSelectChange(e, v, s, "next_action")}
        fetchDataFn={getEnquiryAction}
        formError={formError?.next_action ?? formError.next_action}
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <ActionForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        disable={status === "2"}
        required={fieldPropertiesById("next_action").required}
      />,
    ],
    [
      "next_action_date",
      <InputControl
        key="next_action_date"
        label={fieldPropertiesById("next_action_date").label}
        required={fieldPropertiesById("next_action_date").required}
        inputType={InputType.DATETIMEINPUT}
        id="next_action_date"
        name="next_action_date"
        defaultValue={dayjs(new Date())}
      />,
    ],
    [
      "closure_remark",
      <TextField
        key="closure_remark"
        placeholder="Closure remarks"
        label={fieldPropertiesById("closure_remark").label}
        required={fieldPropertiesById("closure_remark").required}
        multiline
        name="closure_remark"
        id="closure_remark"
        rows={1}
        fullWidth
        disabled={status === "1"}
      />,
    ],
    [
      "product_grid",
      <ProductGrid
        key="product_grid"
        label={fieldPropertiesById("product_grid").label}
        id="product_grid"
        name="product_grid"
        dgData={data}
        setdgData={setData}
        setdgDialogOpen={setDialogOpen}
        dgFormError={formError}
        setdgFormError={setFormError}
        dgProductFormError={productFormError}
      />,
    ],
  ]);

  const CustomFields = props.baseData.fields.filter(
    (row: any) => row.is_default_column === 0
  );

  const CustomComponentMap = new Map<string, React.ReactElement>(
    CustomFields.map((field: any) => [
      field.column_name_id, // Use `id` as the key for the fieldArr
      <CustomField
        key={field.id}
        desc={
          field
        } /*defaultValue={entityData[field.column_name_id as keyof executiveSchemaT]}*/
      />, // React element as value
    ])
  );

  let fieldArr: React.ReactElement[] = [];

  const skipColumns = [
    "product_grid",
    "call_receipt_remark",
    "suggested_action_remark",
  ];

  props.baseData.fields.map((field: any) => {
    if (field.is_default_column) {
      if (field.column_name_id === "product_grid") {
        fieldArr.push(
          React.cloneElement(
            defaultComponentMap.get("product_grid") as React.ReactElement,
            {
              key: `default_product_grid`,
            }
          )
        );
        fieldArr.push(
          React.cloneElement(
            defaultComponentMap.get(
              "call_receipt_remark"
            ) as React.ReactElement,
            {
              key: `default_call_receipt_remark`,
            }
          )
        );
        fieldArr.push(
          React.cloneElement(
            defaultComponentMap.get(
              "suggested_action_remark"
            ) as React.ReactElement,
            {
              key: `default_suggested_action_remark`,
            }
          )
        );
      } else if (!skipColumns.includes(field.column_name_id)) {
        fieldArr.push(
          React.cloneElement(
            defaultComponentMap.get(field.column_name_id) as React.ReactElement,
            {
              key: `default_${field.column_name_id}`,
            }
          )
        );
      }
    } else if (!skipColumns.includes(field.column_name_id)) {
      fieldArr.push(
        React.cloneElement(
          CustomComponentMap.get(field.column_name_id) as React.ReactElement,
          {
            key: `custom_${field.column_name_id}`,
          }
        )
      );
    }
  });

  const enquiryMaintainProducts =
    props.baseData.config_data.enquiryMaintainProducts;

  return (
    <Box>
      <form action={handleSubmit} style={{ padding: "1em" }} noValidate>
        <Grid item xs={12}>
          <Seperator>Enquiry Details</Seperator>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {fieldArr.map((field, index) => {
              if (field.key === "default_status") {
                return (
                  <Grid item xs={12} key={`status_${index}`}>
                    <Seperator>Final Status</Seperator>
                    {field}
                  </Grid>
                );
              }

              if (
                field.key !== "default_product_grid" &&
                field.key !== "default_call_receipt_remark" &&
                field.key !== "default_suggested_action_remark"
              ) {
                return (
                  <Grid item xs={12} sm={3} key={`field_${index}`}>
                    {field}
                  </Grid>
                );
              }

              if (field.key === "default_product_grid") {
                return (
                  <Grid item xs={12} key={`fixed_box_${index}`}>
                    <Grid container spacing={2}>
                      {enquiryMaintainProducts && (
                        <Grid
                          item
                          xs={12}
                          md={6}
                          key="product-grid-container"
                          sx={{ marginY: "0.5%" }}
                        >
                          <Box
                            sx={{
                              height: 300,
                            }}
                          >
                            <ProductGrid
                              label={fieldPropertiesById("product_grid").label}
                              id="product_grid"
                              name="product_grid"
                              dgData={data}
                              setdgData={setData}
                              setdgDialogOpen={setDialogOpen}
                              dgFormError={formError}
                              setdgFormError={setFormError}
                              dgProductFormError={productFormError}
                            />
                          </Box>
                        </Grid>
                      )}

                      <Grid
                        item
                        xs={12}
                        md={enquiryMaintainProducts ? 6 : 12}
                        key="remarks-container"
                        sx={{ display: "flex", flexDirection: "column" }}
                      >
                        <Grid item xs={12} md={12} key="call-receipt-remark">
                          <TextField
                            placeholder="Call receipt remarks"
                            label={
                              fieldPropertiesById("call_receipt_remark").label
                            }
                            multiline
                            name="call_receipt_remark"
                            id="call_receipt_remark"
                            rows={6}
                            fullWidth
                            required={
                              fieldPropertiesById("call_receipt_remark")
                                .required
                            }
                          />
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          md={12}
                          key="suggested-action-remark"
                        >
                          <TextField
                            placeholder="Suggested Action Remarks"
                            label={
                              fieldPropertiesById("suggested_action_remark")
                                .label
                            }
                            multiline
                            name="suggested_action_remark"
                            id="suggested_action_remark"
                            rows={6}
                            fullWidth
                            required={
                              fieldPropertiesById("suggested_action_remark")
                                .required
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              }
              return null;
            })}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Seperator></Seperator>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
                my={2}
              >
                <Button>Cancel</Button>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {dialogOpen && (
          <AddDialog
            title="Add Product to Product List"
            open={dialogOpen}
            setDialogOpen={setDialogOpen}
          >
            <AddProductToListForm
              setDialogOpen={setDialogOpen}
              setData={setData}
            />
          </AddDialog>
        )}
      </form>
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        message={"Enquiry saved successfully!"}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
}
