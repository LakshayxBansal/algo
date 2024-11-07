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
import Seperator from "@/app/Widgets/seperator";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import { SelectMasterWrapper } from "@/app/Widgets/masters/selectMasterWrapper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { createEnquiry } from "@/app/controllers/enquiry.controller";
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

import SourceForm from "@/app/Widgets/masters/masterForms/sourceForm";
import ContactForm from "@/app/Widgets/masters/masterForms/contactForm";
import ExecutiveForm from "@/app/Widgets/masters/masterForms/executiveForm";
import ActionForm from "@/app/Widgets/masters/masterForms/actionForm";
import SubStatusForm from "@/app/Widgets/masters/masterForms/subStatusForm";
import CategoryForm from "@/app/Widgets/masters/masterForms/categoryForm";
import AddProductToListForm from "./addProductToListForm";
import ProductGrid from "./productGrid";
import CustomField from "./CustomFields";
import { AddDialog } from "@/app/Widgets/masters/addDialog";

import dayjs from "dayjs";
import { ZodIssue } from "zod";
import { optionsDataT, selectKeyValueT } from "@/app/models/models";
import { enquiryDataFormat } from "@/app/utils/formatData/enquiryDataformat";

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

  const defaultComponentMap = new Map<string, React.ReactNode>([
    [
      "enq_number",
      <InputControl
        key="enq_number"
        label="Enq number"
        id="enq_number"
        inputType={InputType.TEXT}
        name="enq_number"
        fullWidth
        required={false}
        error={formError?.enq_number?.error}
        helperText={formError?.enq_number?.msg}
        autoFocus
      />,
    ],
    [
      "date",
      <InputControl
        key="date"
        label={"date"}
        inputType={InputType.DATETIMEINPUT}
        id="date"
        name="date"
        defaultValue={dayjs(new Date())}
        required={false}
        error={formError?.date?.error}
        helperText={formError?.date?.msg}
        sx={{ display: "flex", flexGrow: 1 }}
      />,
    ],
    [
      "contact",
      <SelectMasterWrapper
        key="contact"
        name="contact"
        id="contact"
        label="contact"
        showDetails={true}
        dialogTitle={"Add Contact"}
        onChange={(e, v, s) => onSelectChange(e, v, s, "contact")}
        fetchDataFn={getContact}
        fnFetchDataByID={getContactById}
        required={false}
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
        name="category"
        id="category"
        label="category"
        dialogTitle={"Add Category"}
        onChange={(e, v, s) => onSelectChange(e, v, s, "category")}
        fetchDataFn={getEnquiryCategory}
        fnFetchDataByID={getCategoryById}
        required={false}
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
        name="source"
        id="source"
        label="source"
        dialogTitle={"Add Source"}
        onChange={(e, v, s) => onSelectChange(e, v, s, "source")}
        fetchDataFn={getEnquirySource}
        fnFetchDataByID={getEnquirySourceById}
        required={false}
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
        name="received_by"
        id="received_by"
        label="received_by"
        showDetails={true}
        dialogTitle={"Add Executive"}
        onChange={(e, v, s) => onSelectChange(e, v, s, "received_by")}
        fetchDataFn={getExecutive}
        fnFetchDataByID={getExecutiveById}
        required={false}
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
      "status",
      <FormControl sx={{ pl: "0.625em" }} required={false} key="status">
        <RadioGroup
          key="status"
          row
          name="status"
          id="status"
          defaultValue="1"
          onChange={onStatusChange}
          sx={{ color: "black" }}
        >
          <FormControlLabel
            key="status1"
            value="Status"
            control={<label />}
            label={fieldPropertiesById("status").label}
          />
          <FormControlLabel
            key="status2"
            value="1"
            control={<Radio />}
            label="Open"
          />
          <FormControlLabel
            key="status3"
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
        name="sub_status"
        id="sub_status"
        label="sub_status"
        dialogTitle={"Add Sub-Status for " + status}
        onChange={(e, v, s) => onSelectChange(e, v, s, "sub_status")}
        fetchDataFn={getSubStatusforStatus}
        fnFetchDataByID={getEnquirySubSatusById}
        required={false}
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
        name="action_taken"
        id="action_taken"
        label="action_taken"
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
        required={false}
      />,
    ],
    [
      "next_action",
      <SelectMasterWrapper
        key="next_action"
        name="next_action"
        id="next_action"
        label="next_action"
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
        required={false}
      />,
    ],
    [
      "next_action_date",
      <InputControl
        key="next_action_date"
        label="next_action_date"
        required={false}
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
        label="closure_remark"
        required={false}
        multiline
        name="closure_remark"
        id="closure_remark"
        rows={1}
        fullWidth
        disabled={status === "1"}
      />,
    ],
  ]);

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

  function fieldPropertiesById(id: string) {
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
  }

  let fieldArr: React.ReactElement[] = [];

  const skipColumns = [
    "product_grid",
    "call_receipt_remark",
    "suggested_action_remark",
  ];

  const enquiryMaintainProducts =
    props.baseData.config_data.enquiryMaintainProducts;

  props.baseData.fields.map((field: any, index) => {
    if (field.is_default_column) {
      if (field.column_name_id === "product_grid") {
        let propsForCallReceiptField = fieldPropertiesById(
          "call_receipt_remark"
        );
        let propsForSugActionField = fieldPropertiesById(
          "suggested_action_remark"
        );

        let fld = (
          <Grid item xs={12} key={`field-default-product-remarks-grid`}>
            <Grid container spacing={2} key={`grid-container-${index}`}>
              {enquiryMaintainProducts && (
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ marginY: "0.5%" }}
                  key={`product-grid-${index}`}
                >
                  <Box
                    sx={{
                      height: 300,
                    }}
                    key={`product-box-${index}`}
                  >
                    <ProductGrid
                      key={`product-grid-component-${index}`}
                      label={field.column_label}
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
                sx={{ display: "flex", flexDirection: "column" }}
                key={`remarks-grid-${index}`}
              >
                <Grid item xs={12} md={12} key={`call-receipt-grid-${index}`}>
                  <TextField
                    key={`call-receipt-field-${index}`}
                    placeholder="Call receipt remarks"
                    label={propsForCallReceiptField.label}
                    multiline
                    name="call_receipt_remark"
                    id="call_receipt_remark"
                    rows={6}
                    fullWidth
                    required={propsForCallReceiptField.required}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  key={`suggested-action-grid-${index}`}
                >
                  <TextField
                    key={`suggested-action-field-${index}`}
                    placeholder="Suggested Action Remarks"
                    label={propsForSugActionField.label}
                    multiline
                    name="suggested_action_remark"
                    id="suggested_action_remark"
                    rows={6}
                    fullWidth
                    required={propsForSugActionField.required}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );

        fieldArr.push(fld);
      } else if (!skipColumns.includes(field.column_name_id)) {
        const baseElement = defaultComponentMap.get(
          field.column_name_id
        ) as React.ReactElement;

        const fld = React.cloneElement(baseElement, {
          ...baseElement.props,
          label: field.column_label,
          required: field.is_mandatory === 1,
          key: `field-default-${field.column_name_id}`,
        });

        fieldArr.push(fld);
      }
    } else {
      const fld = (
        <CustomField
          key={`field-custom-${field.column_name_id}`}
          desc={field}
        />
      );
      fieldArr.push(fld);
    }
    return null; // Add this to satisfy the map function
  });

  return (
    <Box>
      <form action={handleSubmit} style={{ padding: "1em" }} noValidate>
        <Grid item xs={12}>
          <Seperator>Enquiry Details</Seperator>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {fieldArr.map((field, index) => {
              // Extract the original key from the field if it exists
              const fieldKey = field.key as string;
              if (fieldKey.includes("field-default-status")) {
                return (
                  <Grid item xs={12} key={`status-container-${index}`}>
                    <Seperator>Final Status</Seperator>
                    {field}
                  </Grid>
                );
              } else if (
                fieldKey.includes("field-default-product-remarks-grid")
              ) {
                return (
                  <React.Fragment
                    key={`product-grid-remarks-container-${index}`}
                  >
                    {field}
                  </React.Fragment>
                );
              } else {
                return (
                  <Grid item xs={12} sm={3} key={`field-container-${index}`}>
                    {field}
                  </Grid>
                );
              }
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
