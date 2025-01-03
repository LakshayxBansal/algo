"use client";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Alert,
  Badge,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import Seperator from "@/app/Widgets/seperator";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import { SelectMasterWrapper } from "@/app/Widgets/selectMasterWrapper/selectMasterWrapper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DocModal from "@/app/utils/docs/DocModal";

import {
  createEnquiry,
  updateEnquiry,
} from "@/app/controllers/enquiry.controller";
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

import dayjs from "dayjs";
import { ZodIssue } from "zod";
import {
  docDescriptionSchemaT,
  enquiryDataSchemaT,
  enquiryProductArraySchemaT,
  optionsDataT,
  selectKeyValueT,
} from "@/app/models/models";

import { AddDialog } from "@/app/Widgets/masters/addDialog";
import AddProductToListForm from "./addProductToListForm";
import ProductGrid from "./productGrid";
import CustomField from "./CustomFields";

import ContactForm from "@/app/Widgets/masters/masterForms/contactForm";
import CategoryForm from "@/app/Widgets/masters/masterForms/categoryForm";
import SourceForm from "@/app/Widgets/masters/masterForms/sourceForm";
import ExecutiveForm from "@/app/Widgets/masters/masterForms/executiveForm";
import SubStatusForm from "@/app/Widgets/masters/masterForms/subStatusForm";
import ActionForm from "@/app/Widgets/masters/masterForms/actionForm";
import { enquiryDataFormat } from "@/app/utils/formatData/enquiryDataformat";
import { GridCloseIcon } from "@mui/x-data-grid";
import { adjustToLocal } from "@/app/utils/utcToLocal";
import { nameMasterData } from "@/app/zodschema/zodschema";
import generateVoucher from "@/app/utils/generateVoucher";
import { idID } from "@mui/material/locale";

export interface InputFormProps {
  baseData: {
    fields: Array<any>;
    enqData: Record<string, any>;
    // rights: Record<string, any>;
    config_data: Record<string, any>;
    regional_setting: Record<string, any>;
    loggedInUserData?: Record<string, any>;
    statusUpdate?: boolean;
    voucherNumber?: {
      voucherString: string | null;
      newVoucherNumber: number;
    };
  };
}

export default function InputForm({ baseData }: InputFormProps) {
  const defaultData = baseData.enqData.defaultData ?? {};
  const enqData = baseData.enqData;

  const [status, setStatus] = useState(
    defaultData?.status?.id != null ? defaultData.status.id.toString() : "1"
  );
  const [selectValues, setSelectValues] = useState<selectKeyValueT>(
    enqData?.enquiry_id
      ? defaultData
      : {
          received_by: {
            id: baseData.loggedInUserData?.id,
            name: baseData.loggedInUserData?.name,
          },
          allocated_to:{
            id: baseData.loggedInUserData?.id,
            name: baseData.loggedInUserData?.name
          }
        }
  );
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [productFormError, setProductFormError] = useState<
    Record<number, Record<string, { msg: string; error: boolean }>>
  >({});
  const [data, setData] = useState<enquiryProductArraySchemaT>(
    baseData?.enqData?.updatedProducts ?? []
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [docData, setDocData] = React.useState<docDescriptionSchemaT[]>([]);
  const [docDialogOpen, setDocDialogOpen] = useState(false);
  const [subStatus, setSubStatus] = useState<optionsDataT>(
    defaultData?.sub_status ?? {}
  );
  const [voucherConflict, setVoucherConflict] = useState({
    status: false,
    message: "",
  });

  const [nextAction, setNextAction] = useState<optionsDataT>(
    defaultData?.next_action ?? {}
  );

  const router = useRouter();

  const { dateFormat, timeFormat } = baseData.regional_setting;
  const timeFormatString = timeFormat
    ? timeFormat === "12 Hours"
      ? "hh:mm A"
      : "HH:mm"
    : "HH:mm";
  const dateTimeFormat = [
    dateFormat || "DD/MM/YYYY", // Add dateFormat if it exists
    timeFormatString, // Add timeFormatString if timeFormat is valid
  ]
    .filter(Boolean)
    .join(" "); // Remove empty strings and join with space

  const defaultComponentMap = useMemo(() => {
    return new Map<string, React.ReactNode>([ 
    [
      "enq_number",
      <InputControl
        autoFocus
        key="enq_number"
        label="Enq number"
        id="enq_number"
        inputType={InputType.TEXT}
        name="enq_number"
        fullWidth
        required={false}
        error={formError?.enq_number?.error}
        helperText={formError?.enq_number?.msg}
        setFormError={setFormError}
        defaultValue={enqData?.enq_number ?? ""}
        disabled={baseData.statusUpdate}
      />,
    ],
    [
      "date",
      <InputControl
        format={dateTimeFormat}
        key="date"
        label="date"
        inputType={InputType.DATETIMEINPUT}
        id="date"
        name="date"
        required={false}
        sx={{ display: "flex", flexGrow: 1 }}
        slotProps={{
          textField: {
            error: formError?.date?.error,
            helperText: formError?.date?.msg,
          },
          openPickerButton: {
            tabIndex: -1,
          },
        }}
        defaultValue={enqData?.date ? adjustToLocal(enqData.date) : dayjs()}
        disabled={baseData.statusUpdate}
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
        dialogTitle={"Contact"}
        onChange={(e, v, s) => onSelectChange(e, v, s, "contact")}
        fetchDataFn={getContact}
        fnFetchDataByID={getContactById}
        required={false}
        formError={formError?.contact ?? formError.contact}
        setFormError={setFormError}
        renderForm={(fnDialogOpen, fnDialogValue, metaData, data) => (
          <ContactForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            metaData={metaData}
            data={data}
          />
        )}
        defaultValue={defaultData?.contact ?? {}}
        disabled={baseData.statusUpdate}
      />,
    ],
    [
      "category",
      <SelectMasterWrapper
        key="category"
        name="category"
        id="category"
        label="category"
        dialogTitle={"Category"}
        onChange={(e, v, s) => onSelectChange(e, v, s, "category")}
        fetchDataFn={getEnquiryCategory}
        fnFetchDataByID={getCategoryById}
        required={false}
        formError={formError?.category ?? formError.category}
        setFormError={setFormError}
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <CategoryForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        defaultValue={defaultData?.category ?? {}}
        disabled={baseData.statusUpdate}
      />,
    ],
    [
      "source",
      <SelectMasterWrapper
        key="source"
        name="source"
        id="source"
        label="source"
        dialogTitle={"Source"}
        onChange={(e, v, s) => onSelectChange(e, v, s, "source")}
        fetchDataFn={getEnquirySource}
        fnFetchDataByID={getEnquirySourceById}
        required={false}
        formError={formError?.source ?? formError.source}
        setFormError={setFormError}
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <SourceForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        defaultValue={defaultData?.source ?? {}}
        disabled={baseData.statusUpdate}
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
        dialogTitle={"Executive"}
        onChange={(e, v, s) => onSelectChange(e, v, s, "received_by")}
        fetchDataFn={getExecutive}
        fnFetchDataByID={getExecutiveById}
        required={false}
        formError={formError?.received_by ?? formError.received_by}
        setFormError={setFormError}
        renderForm={(fnDialogOpen, fnDialogValue, metaData, data) => (
          <ExecutiveForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            metaData={metaData}
            data={data}
          />
        )}
        defaultValue={
          enqData?.enquiry_id
            ? defaultData?.received_by ?? {}
            : ({
                id: baseData?.loggedInUserData?.id,
                name: baseData?.loggedInUserData?.name,
              } as optionsDataT)
        }
        disabled={baseData.statusUpdate}
      />,
    ],
   
    [
      "sub_status",
      <SelectMasterWrapper
        key={`sub-status-${status}`}
        name="sub_status"
        id="sub_status"
        label="sub_status"
        dialogTitle={`Sub-Status for ${status === "1" ? "Open" : "Closed"}`}
        onChange={(e, v, s) => onSelectChange(e, v, s, "sub_status")}
        fetchDataFn={getSubStatusforStatus}
        fnFetchDataByID={getEnquirySubSatusById}
        required={false}
        formError={formError?.sub_status ?? formError.sub_status}
        setFormError={setFormError}
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <SubStatusForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            parentData={parseInt(status)}
            data={data}
          />
        )}
        allowNewAdd={status === "1"}
        defaultValue={subStatus}
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
          defaultValue={defaultData?.status?.id?.toString() ?? "1"}
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
      "allocate_to",
      <SelectMasterWrapper
        key="allocated_to"
        name="allocated_to"
        id="allocated_to"
        label="allocated_to"
        showDetails={true}
        dialogTitle={"Allocated To"}
        onChange={(e, v, s) => onSelectChange(e, v, s, "allocated_to")}
        fetchDataFn={getExecutive}
        fnFetchDataByID={getExecutiveById}
        required={false}
        formError={formError?.allocated_to ?? formError.allocated_to}
        setFormError={setFormError}
        renderForm={(fnDialogOpen, fnDialogValue, metaData, data) => (
          <ExecutiveForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            metaData={metaData}
            data={data}
          />
        )}
        defaultValue={ defaultData?.allocated_to ?? {id: baseData?.loggedInUserData?.id, name: baseData?.loggedInUserData?.name}  }
      />,
    ],
    [
      "action_taken",
      <SelectMasterWrapper
        key="action_taken"
        name="action_taken"
        id="action_taken"
        label="action_taken"
        dialogTitle={"Action"}
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
        defaultValue={defaultData?.action_taken ?? {}}
      />,
    ],
    [
      "next_action",
      <SelectMasterWrapper
        key={`next-action-${status}`}
        name="next_action"
        id="next_action"
        label="next_action"
        dialogTitle={"Action"}
        onChange={(e, v, s) => onSelectChange(e, v, s, "next_action")}
        fetchDataFn={getEnquiryAction}
        formError={formError?.next_action ?? formError.next_action}
        setFormError={setFormError}
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <ActionForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        disabled={status === "2"}
        required={false}
        defaultValue={nextAction}
      />,
    ],
    [
      "next_action_date",
      <InputControl
        format={dateTimeFormat}
        key={status}
        label="When"
        sx={{ display: "flex", flexGrow: 1 }}
        inputType={InputType.DATETIMEINPUT}
        id="next_action_date"
        name="next_action_date"
        setFormError={setFormError}
        slotProps={{
          textField: {
            error: formError?.next_action_date?.error,
            helperText: formError?.next_action_date?.msg,
          },
          openPickerButton: {
            tabIndex: -1,
          },
        }}
        disabled={status === "2"}
        required={false}
        defaultValue={
          status === "1"
            ? enqData?.next_action_date
              ? adjustToLocal(enqData.next_action_date)
              : dayjs()
            : null
        }
      />,
    ],
    [
      "closure_remark",
      <InputControl
        inputType={InputType.TEXTFIELD}
        key={`closure-remark-${status}`}
        placeholder="Closure remarks"
        label="closure_remark"
        multiline
        name="closure_remark"
        id="closure_remark"
        rows={1}
        fullWidth
        error={formError?.closure_remark?.error}
        helperText={formError?.closure_remark?.msg}
        setFormError={setFormError}
        sx={{
          "& .MuiFormHelperText-root": {
            margin: 0,
          },
        }}
        disabled={status === "1"}
        required={false}
        defaultValue={status === "1" ? "" : enqData?.closure_remark ?? ""}
      />,
    ],
  ]);
},[formError, onSelectChange,baseData])

  const handleSubmit = async (formData: FormData) => {
    setFormError({});
    setProductFormError({});
    const formatedData = await enquiryDataFormat({
      formData,
      selectValues,
      dateFormat,
      timeFormat,
      otherData: enqData,
    });

    let result;
    let issues = [];

    result = await persistEntity(
      formatedData as enquiryDataSchemaT,
      data as enquiryProductArraySchemaT
    );

    console.log("result", result);
    
    if (result.status) {
      // const newVal = { id: result.data[0].id, name: result.data[0].name };
      const isVoucherNumberChanged =
        result.data[0].auto_number !==
        baseData?.voucherNumber?.newVoucherNumber;
      if (isVoucherNumberChanged) {
        setVoucherConflict({
          status: true,
          message: `Your Enquiry has been saved with Voucher Number (${result.data[0].voucher_number})`,
        });
        return;
      } else {
        setSnackOpen(true);
        setTimeout(function () {
          location.reload();
        }, 3000);
      }
    } else {
      issues = result?.data;

      let formIssue: ZodIssue[] = [];
      let productIssue = [];

      formIssue = issues[0]?.enqDataIssue;
      productIssue = issues[1]?.productIssue;

      // set errors for form inputs
      if (formIssue?.length > 0) {
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
            temp[key] = {}; console.log("field");
    
          }

          // Add or update the field's error message
          temp[key][field] = { msg: row.message, error: true };
        });
        setProductFormError(temp);
      }
    }
  };

  async function persistEntity(
    enquirydata: enquiryDataSchemaT,
    productData: enquiryProductArraySchemaT
  ) {
    let result;
    const newDocsData = docData.filter((row: any) => row.type !== "db");
    if (enqData?.enquiry_id) {
      enquirydata.id = enqData.enquiry_id;
      enquirydata.stamp = enqData.stamp;
      enquirydata.enquiry_tran_type = baseData.statusUpdate
        ? defaultData.allocated_to.id === selectValues.allocated_to.id
          ? 4 // If status exists and allocation matches, assign 4
          : 2 // If status exists but allocation doesn't match, assign 2
        : 3; // If no status then it is full update, assign 3
      enquirydata.created_by = enqData.created_by;
      enquirydata.status_version = 0;
      result = await updateEnquiry({
        enqData: enquirydata,
        product: productData,
      });
    } else {
      result = await createEnquiry({
        enqData: enquirydata,
        product: productData,
        docData: newDocsData,
      });
    }
    return result;
  }

  const handleCancel = () => {
    router.back();
  };

  async function getSubStatusforStatus(stateStr: string) {
    const subStatus = await getEnquirySubStatus(stateStr, status);
    if (subStatus?.length > 0) {
      return subStatus;
    }
  }

  function onStatusChange(event: React.SyntheticEvent, value: any) {
    setStatus(value);
    // setSubStatus({ id: 0, name: "" });
    // setNextAction({ id: 0, name: "" });
    setSelectValues({ ...selectValues, sub_status: null, next_action: null });
  }

  function onSelectChange(
    event: React.SyntheticEvent,
    val: any,
    setDialogValue: any,
    name: string
  ) {
    console.log("select is called ", val, name);
    
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

  function fieldPropertiesById(id: string) {
    const field = baseData.fields.find(
      (item: any) => item.column_name_id === id
    );

    if (field) {
      return {
        label: field.column_label,
        required: field.is_mandatory === 1,
        disabled: field.is_disabled === 1,
      };
    }
    return { label: "default label", required: false, disabled: false }; // Default if no match is found
  }

  // let fieldArr: React.ReactElement[] = [];

  const skipColumns = [
    "product_grid",
    "call_receipt_remark",
    "suggested_action_remark",
    "action_taken_remark",
  ];

  const enquiryMaintainProducts = baseData.config_data.maintainProducts;


  const fieldArr = useMemo(() => {
    let fields : React.ReactElement[] = [];
    baseData.fields.map((field: any, index) => {
      if (field.is_default_column) {
        if (field.column_name_id === "product_grid") {
          let propsForCallReceiptField = fieldPropertiesById("call_receipt_remark");
          let propsForSugActionField = fieldPropertiesById("suggested_action_remark");
          let propsForActionTakenRemField = fieldPropertiesById("action_taken_remark");
  
          const fld = (
            <Grid item xs={12} key={`field-default-product-remarks-grid`}>
              <Grid container spacing={2} key={`grid-container-${index}`}>
                {enquiryMaintainProducts && (
                  <Grid item xs={12} md={6} sx={{ marginY: "0.5%" }} key={`product-grid-${index}`}>
                    <Box sx={{ height: 264 }} key={`product-box-${index}`}>
                      <ProductGrid
                        key={`product-grid-component-${index}`}
                        id="product_grid"
                        name="product_grid"
                        dgData={data}
                        setdgData={setData}
                        setdgDialogOpen={setDialogOpen}
                        dgFormError={formError}
                        setdgFormError={setFormError}
                        dgProductFormError={productFormError}
                        disabled={baseData.statusUpdate || Boolean(field.is_disabled)}
                      />
                    </Box>
                  </Grid>
                )}
  
                <Grid item xs={12} md={enquiryMaintainProducts ? 6 : 12} sx={{ display: "flex", flexDirection: "column" }} key={`remarks-grid-${index}`}>
                  {!baseData.statusUpdate && (
                    <Grid item xs={12} md={12} key={`call-receipt-grid-${index}`}>
                      <InputControl
                        inputType={InputType.TEXTFIELD}
                        key={`call-receipt-field-${index}`}
                        placeholder="Call receipt remarks"
                        label={propsForCallReceiptField.label}
                        multiline
                        name="call_receipt_remark"
                        id="call_receipt_remark"
                        rows={6}
                        fullWidth
                        error={formError?.call_receipt_remark?.error}
                        helperText={formError?.call_receipt_remark?.msg}
                        setFormError={setFormError}
                        sx={{ "& .MuiFormHelperText-root": { margin: 0 } }}
                        disabled={baseData.statusUpdate || Boolean(propsForCallReceiptField.disabled)}
                        required={propsForCallReceiptField.required}
                        defaultValue={enqData?.call_receipt_remark ?? ""}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} md={12} key={`suggested-action-grid-${index}`}>
                    <InputControl
                      inputType={InputType.TEXTFIELD}
                      key={`suggested-action-field-${index}`}
                      placeholder="Suggested Action Remarks"
                      label={propsForSugActionField.label}
                      multiline
                      name="suggested_action_remark"
                      id="suggested_action_remark"
                      rows={6}
                      fullWidth
                      error={formError?.suggested_action_remark?.error}
                      helperText={formError?.suggested_action_remark?.msg}
                      setFormError={setFormError}
                      sx={{ "& .MuiFormHelperText-root": { margin: 0 } }}
                      disabled={baseData.statusUpdate || Boolean(propsForSugActionField.disabled)}
                      required={propsForSugActionField.required}
                      defaultValue={enqData.suggested_action_remark}
                    />
                  </Grid>
                  {baseData.statusUpdate && (
                    <Grid item xs={12} md={12} key={`action-taken-grid-${index}`}>
                      <InputControl
                        inputType={InputType.TEXTFIELD}
                        key={`action-taken-field-${index}`}
                        placeholder="Action Taken Remarks"
                        label={propsForActionTakenRemField.label}
                        multiline
                        name="action_taken_remark"
                        id="action_taken_remark"
                        rows={6}
                        fullWidth
                        error={formError?.action_taken_remark?.error}
                        helperText={formError?.action_taken_remark?.msg}
                        setFormError={setFormError}
                        sx={{ "& .MuiFormHelperText-root": { margin: 0 } }}
                        disabled={Boolean(propsForActionTakenRemField.disabled)}
                        required={propsForActionTakenRemField.required}
                        defaultValue={enqData.action_taken_remark}
                      />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          );
  
          fields.push(fld);
          fields.push(
            <Grid item xs={12} key={`final-status-container`}>
              <Seperator>
                <div style={{ fontSize: "0.8em", fontWeight: "bold" }}>
                  Final Status
                </div>
              </Seperator>
            </Grid>
          );
        } else if (!skipColumns.includes(field.column_name_id)) {
          const baseElement = defaultComponentMap.get(field.column_name_id) as React.ReactElement;
  
          const fld = React.cloneElement(baseElement, {
            ...baseElement.props,
            key: `field-default-${field.column_name_id}`,
            label: field.column_label,
            required: field.is_mandatory === 1,
            disabled: field.is_disabled ? true : baseElement.props.disabled,
          });
  
          fields.push(fld);
        }
      } else {
        const fld = (
          <CustomField key={`field-custom-${field.column_name_id}`} desc={field} defaultValue={enqData[field.column_name_id]} />
        );
        fields.push(fld);
      }
  
      return null; // Satisfy map's return type, but this does not affect the field array
    });
  
    return fields; // Return the final list of fields
  }, [defaultComponentMap,formError, baseData, enqData, skipColumns]);
  
  
  return (
    <Box>
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
              <GridCloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {formError?.form?.msg}
        </Alert>
      </Collapse>
      <form action={handleSubmit} style={{ padding: "1em" }} noValidate>
        <Grid item xs={12}>
          <Seperator>
            <div style={{ fontSize: "0.8em", fontWeight: "bold" }}>
              {`Enquiry Details ${
                baseData.voucherNumber?.voucherString
                  ? `(${baseData.voucherNumber.voucherString})`
                  : ""
              }`}
            </div>
          </Seperator>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {fieldArr.map((field, index) => {
              // Extract the original key from the field if it exists
              const fieldKey = field.key as string;
              if (fieldKey.includes("final-status-container")) {
                return (
                  <React.Fragment
                  key={`final-status-container-${index}`}>
                    {field}
                  </React.Fragment>
                  
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
            <Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  my={2}
                >
                  <Tooltip
                    title={
                      docData.length > 0 ? (
                        docData.map((file: any, index: any) => (
                          <Typography variant="body2" key={index}>
                            {file.description}
                          </Typography>
                        ))
                      ) : (
                        <Typography variant="body2" color="white">
                          No files available
                        </Typography>
                      )
                    }
                  >
                    <IconButton
                      sx={{ marginRight: "3rem" }}
                      onClick={() => setDocDialogOpen(true)}
                      aria-label="file"
                      tabIndex={-1}
                    >
                      <Badge badgeContent={docData.length} color="primary">
                        <AttachFileIcon></AttachFileIcon>
                      </Badge>
                    </IconButton>
                  </Tooltip>
                  <Button onClick={handleCancel} tabIndex={-1}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </Box>
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
        {docDialogOpen && (
          <AddDialog
            title="Document List"
            open={docDialogOpen}
            setDialogOpen={setDocDialogOpen}
          >
            <DocModal
              docData={docData}
              setDocData={setDocData}
              setDialogOpen={setDocDialogOpen}
            />
          </AddDialog>
        )}
      </form>
      <Dialog
        open={voucherConflict.status}
        onClose={() => {
          setSnackOpen(true);
          setTimeout(() => {
            location.reload();
          }, 3000);
          setVoucherConflict({ status: false, message: "" });
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        {/* <DialogTitle id="alert-dialog-title">Voucher Conflict</DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {voucherConflict.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setSnackOpen(true);
              setTimeout(() => {
                location.reload();
              }, 3000);
              setVoucherConflict({ status: false, message: "" });
            }}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        message={
          enqData?.enquiry_id
            ? "Enquiry details updated successfully!"
            : "Enquiry details saved successfully!"
        }
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
}
