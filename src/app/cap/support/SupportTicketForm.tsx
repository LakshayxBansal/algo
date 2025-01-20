"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Badge,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import Seperator from "@/app/Widgets/seperator";
import { InputControl } from "@/app/Widgets/input/InputControl";
import { InputType } from "@/app/Widgets/input/InputControl";
import { SelectMasterWrapper } from "@/app/Widgets/selectMasterWrapper/selectMasterWrapper";
import {
  getContact,
  getContactById,
} from "@/app/controllers/contact.controller";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ContactForm from "@/app/Widgets/masters/masterForms/contactForm";
import ExecutiveForm from "@/app/Widgets/masters/masterForms/executiveForm";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import {
  getExecutive,
  getExecutiveById,
  getExecutiveForAllocation,
} from "@/app/controllers/executive.controller";

import dayjs from "dayjs";

import { AddDialog } from "@/app/Widgets/masters/addDialog";
import {
  docDescriptionSchemaT,
  masterFormPropsT,
  selectKeyValueT,
  supportHeaderSchemaT,
  supportLedgerSchemaT,
  supportProductSchemaT,
  supportTicketSchemaT,
  suppportProductArraySchemaT,
} from "@/app/models/models";
import SupportCategoryForm from "@/app/Widgets/masters/masterForms/supportCatergoryForm";
import {
  getSupportCategory,
  getSupportCategoryById,
} from "@/app/controllers/supportCategory.controller";
import {
  getSupportAction,
  getSupportActionById,
} from "@/app/controllers/supportAction.controller";
import SupportActionForm from "@/app/Widgets/masters/masterForms/supportActionForm";
import {
  getSupportSubSatusById,
  getSupportSubStatus,
} from "@/app/controllers/supportSubStatus.controller";
import Support from "./page";
import SupportSubStatusForm from "@/app/Widgets/masters/masterForms/supportSubStatusForm";
import {
  createSupportTicket,
  updateSupportData,
} from "@/app/controllers/supportTicket.controller";
import { supportDataFormat } from "@/app/utils/formatData/supportDataformat";
import {
  getProduct,
  getProductById,
} from "@/app/controllers/product.controller";
import ProductForm from "@/app/Widgets/masters/masterForms/productForm";
import ProductList from "./productList";
import SupportProductGrid from "./SupportProductGrid";
import { ZodIssue } from "zod";
import DocModal from "@/app/utils/docs/DocModal";
import { set, update } from "lodash";
import { format } from "path";
import { useRouter } from "next/navigation";
import { adjustToLocal } from "@/app/utils/utcToLocal";
import CustomField from "../enquiry/CustomFields";
import { GridCloseIcon } from "@mui/x-data-grid";
import AlertDialog from "@/app/Widgets/AlertDialog";
import { SUPPORT_CONFIG_ID } from "@/app/utils/consts.utils";

interface customprop extends masterFormPropsT {
  userDetails: {
    id: string | number;
    name: string;
  };
  status: string | string[] | undefined;
  fields: Array<Record<string, any>>;
  config_data: Record<string, any>;
  regional_setting: Record<string, any>;
  voucherNumber?: {
    voucherString: string | null;
    newVoucherNumber: number;
  };
}

const checkVoucherConflict = (savedVoucherNumber: number, newVoucherNumber: number| undefined) => {
  if(savedVoucherNumber ===0 || savedVoucherNumber === newVoucherNumber ) {
    return false;
  }
  return true;
}
const SupportTicketForm = (props: customprop) => {
  const masterData = props?.data?.masterData ?? {};

  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});

  const [snackOpen, setSnackOpen] = useState(false);
  const [selectValues, setSelectValues] = useState<selectKeyValueT>(
    props?.data?.tkt_number
      ? masterData
      : { received_by: props?.userDetails, allocated_to: props?.userDetails }
  );
  const [status, setStatus] = useState(
    masterData?.status?.id != null ? masterData.status.id.toString() : "1"
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [docData, setDocData] = React.useState<docDescriptionSchemaT[]>(
    props?.data?.docData ?? []
  );
  const [docDialogOpen, setDocDialogOpen] = useState(false);
  const [productFormError, setProductFormError] = useState<
    Record<number, Record<string, { msg: string; error: boolean }>>
  >({});

  const [defaultValues, setDefaultValues] = useState({
    sub_status: masterData?.sub_status,
    next_action: masterData?.next_action,
  });
  const [data, setData] = useState<suppportProductArraySchemaT>(
    props?.data?.productData ?? []
  );
  const [voucherConflict, setVoucherConflict] = useState({
    status: false,
    message: "",
  });

  const router = useRouter();

  const { dateFormat, timeFormat } = props.regional_setting;
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
    .join(" "); 
  const handleSubmit = async (formData: FormData) => {
    const formatedData = await supportDataFormat({
      formData,
      selectValues,
      otherData: props?.data,
      dateTimeFormat,
    });

    let result: any;

    result = await persistEntity(formatedData as supportTicketSchemaT, data);
    if (result.status) {
      const savedVoucherNumber = result.data[0].auto_number;      
      const localVoucherNumber = props.voucherNumber?.newVoucherNumber;
      const isVoucherConflict = checkVoucherConflict(savedVoucherNumber, localVoucherNumber)


      if (isVoucherConflict) {
        setVoucherConflict({
          status: true,
          message: `Your Ticket has been saved with Voucher Number (${result.data[0].voucher_number})`,
        });
        return;
      }

      setSnackOpen(true);
      if(props.status){
        setTimeout(function () {
          router.back();
        },1000)
      }
      else{
      setTimeout(function () {
        setFormError;
        location.reload();
      }, 3000);
    }
    } else {
      const issues = result?.data;

      let formIssue: ZodIssue[] = [];
      let productIssue = [];

      formIssue = issues[0]?.ticketDataIssue
        ? issues[0].ticketDataIssue
        : issues;
      productIssue = issues[1]?.productIssue;

      if (formIssue?.length > 0) {
        // set errors for form inputs
        const errorState: Record<string, { msg: string; error: boolean }> = {};
        for (const issue of formIssue) {
          errorState[issue.path[0]] = { msg: issue.message, error: true };
        }
        console.log("error state : ", errorState);
        
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

  const clearFormError = () => {
    setFormError((curr) => {
      const { form, ...rest } = curr;
      return rest;
    });
  };  

  const defaultComponentMap = useMemo(() => {
    return new Map<string, React.ReactNode>([
      [
        "tkt_number",
        <InputControl
          key="tkt_number"
          label="Ticket Description"
          id="tkt_number"
          inputType={InputType.TEXT}
          name="tkt_number"
          fullWidth
          required
          autoFocus
          defaultValue={props.data?.tkt_number}
          error={formError?.tkt_number?.error}
          helperText={formError?.tkt_number?.msg}
          setFormError={setFormError}
          // sx={{
          //   "& .MuiInputBase-root": {
          //     height: 100,
          //     alignItems: "start",
          //   },
          // }}
          disabled={props?.status === "true" ? true : false}
        />,
      ],
      [
        "date",
        <InputControl
          format ={dateTimeFormat}
          key="date"
          label="Received on"
          inputType={InputType.DATETIMEINPUT}
          id="date"
          name="date"
          defaultValue={
           props.status? adjustToLocal(masterData.date) : dayjs()
          }
          required
          setFormError={setFormError}
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
          disabled={props?.status === "true" ? true : false}
        />,
      ],
      [
        "contact",
        <SelectMasterWrapper
          key={"contact"}
          name="contact"
          id="contact"
          label="Contact"
          showDetails={true}
          dialogTitle="Contact"
          onChange={(e, v, s) => onSelectChange(e, v, s, "contact")}
          fetchDataFn={getContact}
          fnFetchDataByID={getContactById}
          required
          formError={formError?.contact ?? formError.contact}
          setFormError={setFormError}
          defaultValue={masterData.contact}
          renderForm={(fnDialogOpen, fnDialogValue, metaData, data) => (
            <ContactForm
              setDialogOpen={fnDialogOpen}
              setDialogValue={fnDialogValue}
              metaData={metaData}
              data={data}
            />
          )}
          disabled={props?.status === "true" ? true : false}
        />,
      ],
      [
        "category",
        <SelectMasterWrapper
          key={"category"}
          name="category"
          id="category"
          label="Category"
          dialogTitle="Category"
          onChange={(e, v, s) => onSelectChange(e, v, s, "category")}
          fetchDataFn={getSupportCategory}
          fnFetchDataByID={getSupportCategoryById}
          required
          formError={formError?.category ?? formError.category}
          setFormError={setFormError}
          defaultValue={masterData.category}
          renderForm={(fnDialogOpen, fnDialogValue, data) => (
            <SupportCategoryForm
              setDialogOpen={fnDialogOpen}
              setDialogValue={fnDialogValue}
              data={data}
            />
          )}
          disabled={props?.status === "true" ? true : false}
        />,
      ],
      [
        "received_by",
        <SelectMasterWrapper
          key={"received_by"}
          name="received_by"
          id="received_by"
          label="Received By"
          showDetails={true}
          dialogTitle="Executive"
          onChange={(e, v, s) => onSelectChange(e, v, s, "received_by")}
          fetchDataFn={getExecutive}
          fnFetchDataByID={getExecutiveById}
          required
          formError={formError?.received_by ?? formError.received_by}
          defaultValue={
            props?.data?.tkt_number ? masterData.received_by : props.userDetails
          }
          renderForm={(fnDialogOpen, fnDialogValue, metaData, data) => (
            <ExecutiveForm
              setDialogOpen={fnDialogOpen}
              setDialogValue={fnDialogValue}
              metaData={metaData}
              data={data}
            />
          )}
          disabled={props?.status === "true" ? true : false}
        />,
      ],
      [
        "status",
        <FormControl sx={{ pl: "0.625em" }} key={"status"}>
          <RadioGroup
            row
            name="status"
            id="status"
            defaultValue={
              masterData?.status != null
                ? masterData?.status.id.toString()
                : "1"
            }
            onChange={onStatusChange}
            sx={{ color: "black" }}
          >
            <FormControlLabel
              value="Status"
              control={<label />}
              label="Status :"
            />
            <FormControlLabel value="1" control={<Radio />} label="Open" />
            <FormControlLabel value="2" control={<Radio />} label="Closed" />
          </RadioGroup>
        </FormControl>,
      ],
      [
        "sub_status",
        <SelectMasterWrapper
          name={"sub_status"}
          id={"sub_status"}
          label={"Call Sub-Status"}
          dialogTitle={`Sub-Status for ${status === "1" ? "Open" : "Closed"}`}
          onChange={(e, v, s) => onSelectChange(e, v, s, "sub_status")}
          fetchDataFn={getSubStatusforStatus}
          fnFetchDataByID={getSupportSubSatusById}
          required
          key={`sub_status`}
          formError={formError?.sub_status ?? formError.sub_status}
          setFormError={setFormError}
          defaultValue={defaultValues.sub_status}
          allowNewAdd={status === "1"}
          renderForm={(fnDialogOpen, fnDialogValue, data) => (
            <SupportSubStatusForm
              setDialogOpen={fnDialogOpen}
              setDialogValue={fnDialogValue}
              parentData={parseInt(status)}
              data={data}
            />
          )}
        />,
      ],
      [
        "action_taken",
        <SelectMasterWrapper
          key={`action_taken`}
          name={"action_taken"}
          id={"action_taken"}
          label={"Action Taken"}
          dialogTitle={"Action"}
          onChange={(e, v, s) => onSelectChange(e, v, s, "action_taken")}
          fetchDataFn={getSupportAction}
          fnFetchDataByID={getSupportActionById}
          formError={formError?.action_taken ?? formError.action_taken}
          setFormError={setFormError}
          defaultValue={masterData.action}
          renderForm={(fnDialogOpen, fnDialogValue, data) => (
            <SupportActionForm
              setDialogOpen={fnDialogOpen}
              setDialogValue={fnDialogValue}
              data={data}
            />
          )}
        />,
      ],
      [
        "action_taken_date",
        <InputControl
          format={dateTimeFormat}
          key={`action_taken_date`}
          label="Action Date"
          inputType={InputType.DATETIMEINPUT}
          sx={{ display: "flex", flexGrow: 1 }}
          id="action_taken_date"
          name="action_taken_date"
          error={formError?.action_taken_date?.error}
          helperText={formError?.action_taken_date?.msg}
          setFormError={setFormError}
          defaultValue={
            status === "1"
              ? masterData?.action_taken_date
                ? adjustToLocal(masterData.action_taken_date)
                : props.status
                ? null
                : dayjs()
              : null
          }
          slotProps={{
            openPickerButton: {
              tabIndex: -1,
            },
          }}
          disabled={status === "2"}
        />,
      ],
      [
        "allocate_to",
        <SelectMasterWrapper
          key="allocated_to"
          name={"allocated_to"}
          id={"allocated_to"}
          label={"Allocate to"}
          showDetails={true}
          dialogTitle={"Executive"}
          onChange={(e, v, s) => onSelectChange(e, v, s, "allocated_to")}
          fetchDataFn={(arg:any)=>getExecutiveForAllocation(SUPPORT_CONFIG_ID,arg)}
          fnFetchDataByID={getExecutiveById}
          required
          formError={formError?.allocated_to ?? formError.allocated_to}
          setFormError={setFormError}
          defaultValue={masterData?.allocated_to ?? props.userDetails}
          renderForm={(fnDialogOpen, fnDialogValue, metaData, data) => (
            <ExecutiveForm
              setDialogOpen={fnDialogOpen}
              setDialogValue={fnDialogValue}
              metaData={metaData}
              data={data}
            />
          )}
          disabled={status === "2"}
        />,
      ],
      [
        "next_action",
        <SelectMasterWrapper
          key={`next_action`}
          name={"next_action"}
          id={"next_action"}
          label={"Next Action"}
          dialogTitle={"Action"}
          onChange={(e, v, s) => onSelectChange(e, v, s, "next_action")}
          fetchDataFn={getSupportAction}
          fnFetchDataByID={getSupportActionById}
          formError={formError?.next_action ?? formError.next_action}
          setFormError={setFormError}
          defaultValue={defaultValues.next_action}
          renderForm={(fnDialogOpen, fnDialogValue, data) => (
            <SupportActionForm
              setDialogOpen={fnDialogOpen}
              setDialogValue={fnDialogValue}
              data={data}
            />
          )}
          disabled={status === "2"}
        />,
      ],
      [
        "next_action_date",
        <InputControl
          format={dateTimeFormat}
          key={`next_action_date`}
          label="When"
          inputType={InputType.DATETIMEINPUT}
          sx={{ display: "flex", flexGrow: 1 }}
          id="next_action_date"
          name="next_action_date"
          error={formError?.next_action_date?.error}
          helperText={formError?.next_action_date?.msg}
          setFormError={setFormError}
          defaultValue={
            status === "1"
              ? masterData?.next_action_date
                ? adjustToLocal(masterData.next_action_date)
                : props.status
                ? null
                : dayjs()
              : null
          }
          slotProps={{
            openPickerButton: {
              tabIndex: -1,
            },
          }}
          disabled={status === "2"}
        />,
      ],
      [
        "closure_remark",
        <InputControl
          inputType={InputType.TEXTFIELD}
          key={`closure-remark-${status}`}
          defaultValue={status === "1" ? "" : props.data?.closure_remark}
          placeholder="Closure remarks"
          label="closure_remark"
          required={false}
          multiline
          name="closure_remark"
          id="closure_remark"
          rows={1}
          fullWidth
          disabled={status === "1"}
          error={formError?.closure_remark?.error}
          helperText={formError?.closure_remark?.msg}
          setFormError={setFormError}
          sx={{
            "& .MuiFormHelperText-root": {
              margin: 0,
            },
          }}
        />,
      ],
    ]);
  }, [formError, onSelectChange, props]);

  const isProduct = props?.data?.mantainProduct ? true : true;
  async function persistEntity(
    data: supportTicketSchemaT,
    productData: suppportProductArraySchemaT
  ) {
    let result;
    // if (props.data) {
    //   Object.assign(data, { id: props.data.id, stamp: props.data.stamp });
    //    result = await updateOrganisation(data);
    // } else {
    const newDocsData = docData.filter((row: any) => row.type !== "db");
    if (props.data) {
      data.id = props.data.ticket_id;
      data.created_by = props.data.created_by;
      data.stamp = props.data.stamp;

      data.ticket_tran_type =
        props?.status === "true"
          ? masterData.allocated_to.id === selectValues.allocated_to.id
            ? 4 // If status exists and allocation matches, assign 4
            : 2 // If status exists but allocation doesn't match, assign 2
          : 3; // If no status then it is full update, assign 3
      result = await updateSupportData(data, productData,newDocsData);
    } else {
      result = await createSupportTicket({
        supportData: data,
        productData: productData,
        docData: newDocsData,
      });
    }
    return result;
  }

  const handleCancel = () => {
    router.back();
  };

  const handleDialogClose = () => {
    setSnackOpen(true);
    setTimeout(() => {
      location.reload();
    }, 3000);
    setVoucherConflict({ status: false, message: '' });
  };


  async function getSubStatusforStatus(stateStr: string) {
    const subStatus = await getSupportSubStatus(stateStr, status);
    if (subStatus?.length > 0) {
      return subStatus;
    }
  }

  function onStatusChange(event: React.SyntheticEvent, value: any) {
    setDefaultValues({
      sub_status: { id: 0, name: "" },
      next_action: { id: 0, name: "" },
    });
    setSelectValues((prev) => {
      return {
        ...prev,
        next_action: { id: 0, name: "" },
        sub_status: { id: 0, name: "" },
      };
    });

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
    const field = props.fields.find((item: any) => item.column_name_id === id);

    if (field) {
      return {
        label: field.column_label,
        required: field.is_mandatory === 1,
        disabled: field.is_disabled === 1,
      };
    }
    return { label: "default label", required: false, disabled: false }; // Default if no match is found
  }

  const skipColumns = [
    "product_grid",
    "call_receipt_remark",
    "suggested_action_remark",
    "action_taken_remark",
  ];

  const statusAffectedColumns= [
    "sub_status",
    "next_action",
    "next_action_date",
    "closure_remark"
  ]

  const maintainProducts = props.config_data.maintainProducts;
  const fieldArr = useMemo(() => {
    let fields: React.ReactElement[] = [];
    props.fields.map((field: any, index) => {
      if (field.is_default_column) {
        if (field.column_name_id === "product_grid") {
          let propsForCallReceiptField = fieldPropertiesById(
            "call_receipt_remark"
          );
          let propsForSugActionField = fieldPropertiesById(
            "suggested_action_remark"
          );
          let propsForActionTakenRemField = fieldPropertiesById(
            "action_taken_remark"
          );

          let fld = (
            <Grid item xs={12} key={`field-default-product-remarks-grid`}>
              <Grid container spacing={2} key={`grid-container-${index}`}>
                {maintainProducts && (
                
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{ marginY: "0.5%" }}
                    key={`product-grid-${index}`}
                  >
                    <Box
                      sx={{
                        height: 264,
                      }}
                      key={`product-box-${index}`}
                    >
                      <SupportProductGrid
                        key={`product-grid-component-${index}`}
                        // id="product_grid"
                        // name="product_grid"
                        isDisable={props?.status === "true" ? true : false}
                        dgData={data}
                        setdgData={setData}
                        setdgDialogOpen={setDialogOpen}
                        dgFormError={formError}
                        setdgFormError={setFormError}
                        dgProductFormError={productFormError}
                        setDgProductFormError={setProductFormError}
                      />
                    </Box>
                  </Grid>
                )}
                <Grid
                  item
                  xs={12}
                  md={maintainProducts ? 6 : 12}
                  sx={{ display: "flex", flexDirection: "column" }}
                  key={`remarks-grid-${index}`}
                >
                  {props.status !== "true" && (
                    <Grid
                      item
                      xs={12}
                      md={12}
                      key={`call-receipt-grid-${index}`}
                    >
                      <InputControl
                        placeholder="Call Receipt Remarks"
                        multiline
                        inputType={InputType.TEXTFIELD}
                        label={propsForCallReceiptField.label}
                        name="call_receipt_remark"
                        id="call_receipt_remark"
                        error={formError?.call_receipt_remark?.error}
                        helperText={formError?.call_receipt_remark?.msg}
                        setFormError={setFormError}
                        defaultValue={props.data?.call_receipt_remark}
                        rows={6}
                        fullWidth
                        required={propsForCallReceiptField.required}
                        disabled={props?.status === "true" || Boolean(propsForCallReceiptField.disabled)}
                      />
                    </Grid>
                  )}
                  <Grid
                    item
                    xs={12}
                    md={12}
                    key={`suggested-action-grid-${index}`}
                  >
                    <InputControl
                      placeholder="Suggested Action Remarks"
                      multiline
                      inputType={InputType.TEXTFIELD}
                      label={propsForSugActionField.label}
                      name="suggested_action_remark"
                      id="suggested_action_remark"
                      error={formError?.suggested_action_remark?.error}
                      helperText={formError?.suggested_action_remark?.msg}
                      setFormError={setFormError}
                      defaultValue={props.data?.suggested_action_remark}
                      rows={6}
                      fullWidth
                      required={propsForSugActionField.required}
                      disabled={props?.status === "true" || Boolean(propsForSugActionField.disabled)}
                    />
                  </Grid>
                  {props?.status === "true" && (
                    <Grid
                      item
                      xs={12}
                      md={12}
                      key={`action-taken-remarks-grid-${index}`}
                    >
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
                        sx={{
                          "& .MuiFormHelperText-root": {
                            margin: 0,
                          },
                        }}
                        disabled={Boolean(propsForActionTakenRemField.disabled)}
                        required={propsForActionTakenRemField.required}
                        defaultValue={props.data?.action_taken_remark}
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
          const baseElement = defaultComponentMap.get(
            field.column_name_id
          ) as React.ReactElement;
          let fld;
          if (baseElement && !statusAffectedColumns.includes(field.column_name_id)) {
            fld = React.cloneElement(baseElement, {
              ...baseElement.props,
              label: field.column_label,
              required: field.is_mandatory === 1,
              disabled: field.is_disabled ? true : baseElement.props.disabled,
              key: `field-default-${field.column_name_id}`,
            });
           
            
          }
          else{
            fld = React.cloneElement(baseElement, {
              ...baseElement.props,
              label: field.column_label,
              required: field.is_mandatory === 1,
              disabled: field.is_disabled ? true : baseElement.props.disabled,
              key: `field-default-${field.column_name_id}-${status}`,
            })
          }
          fields.push(fld);
        }
      } else {
        const fld = (
          <CustomField
            key={`field-custom-${field.column_name_id}`}
            desc={field}
            defaultValue={props.data?.[field.column_name] ?? ""}
          />
        );
        fields.push(fld);
      }
      return null; // Add this to satisfy the map function
    });
    return fields; // Return the final list of fields
  }, [defaultComponentMap, formError, props, skipColumns]);

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
      <form action={handleSubmit} style={{ padding: "1em" }} noValidate autoComplete="off">
        <Grid item xs={12}>
          <Seperator>
            <div style={{ fontSize: "0.8em", fontWeight: "bold" }}>
              {`Support Ticket ${props.voucherNumber?.voucherString ? `(${props.voucherNumber?.voucherString})` : ""}`}
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
                  <React.Fragment key={`final-status-container-${index}`}>
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
            title="Add Product to Product List "
            open={dialogOpen}
            setDialogOpen={setDialogOpen}
          >
            <ProductList setDialogOpen={setDialogOpen} setData={setData} />
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
      <AlertDialog
        open={voucherConflict.status}
        message={voucherConflict.message}
        onClose={handleDialogClose}
      />
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        message={
          props.data
            ? "Ticket Details updated successfully!"
            : "Ticket Details saved successfully!"
        }
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
};

export default SupportTicketForm;
