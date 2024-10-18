"use client";
import React, { useState, useEffect } from "react";
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
import ItemForm from "@/app/Widgets/masters/masterForms/itemForm";
import UnitForm from "@/app/Widgets/masters/masterForms/unitForm";
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
import { getItem, getItemById } from "@/app/controllers/item.controller";

import dayjs from "dayjs";
import {
  enquiryHeaderSchema,
  enquiryLedgerSchema,
} from "@/app/zodschema/zodschema";
import { ZodIssue } from "zod";
import { optionsDataT, selectKeyValueT } from "@/app/models/models";
import { styled } from "@mui/material/styles";
import { getUnit, getUnitById } from "@/app/controllers/unit.controller";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { AddDialog } from "@/app/Widgets/masters/addDialog";
import AddItemToListForm from "./addItemToListForm";
import ItemGrid from "./itemGrid";

const strA = "custom_script.js";
const scrA = require("./" + strA);
//import {makeInputReadOnly} from './custom_script';

/*
const My_COMPONENTS = {
  ComponentA: require(strA),
  ComponentB: require('./folder/ComponentB'),
}
*/
export interface IformData {
  userName: string;
}

const formConfig = {
  showItems: false,
};

type ModifiedRowT = {
  id?: number;
  enquiry_id?: number;
  item?: string;
  item_id?: number;
  quantity?: string;
  unit?: string;
  unit_id?: number;
  remarks?: string;
};

const rows: any = [];

export default function InputForm(props: { baseData: IformData; config: any }) {
  const [status, setStatus] = useState("1");
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [data, setData] = React.useState(rows);
  const [modifiedRowData, setModifiedRowData] = useState<ModifiedRowT>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  let result;
  let issues;

  const handleSubmit = async (formData: FormData) => {
    let dt = new Date(formData.get("date") as string);
    const date =
      dt.toISOString().slice(0, 10) + " " + dt.toISOString().slice(11, 19);
    dt = new Date(formData.get("next_action_date") as string);
    const nextActionDate =
      dt.toISOString().slice(0, 10) + " " + dt.toISOString().slice(11, 19);

    const headerData = {
      enq_number: formData.get("enq_number") as string,
      date: date,
      contact_id: selectValues.contact?.id,
      received_by_id: selectValues.received_by?.id,
      category_id: selectValues.category?.id,
      source_id: selectValues.source?.id,
      contact: selectValues.contact?.name,
      received_by: selectValues.received_by?.name,
      category: selectValues.category?.name,
      source: selectValues.source?.name,
      call_receipt_remark: (formData.get("call_receipt_remark") ??
        "") as string,
    };
    let ledgerData = {
      status_version: 0,
      allocated_to_id: 0,
      allocated_to: "",
      date: date,
      status_id: Number(formData.get("status")),
      sub_status_id: selectValues.sub_status?.id,
      sub_status: selectValues.sub_status?.name,
      action_taken_id: selectValues.action_taken?.id,
      action_taken: selectValues.action_taken?.name,
      next_action_id: selectValues.next_action?.id,
      next_action: selectValues.next_action?.name,
      next_action_date: nextActionDate,
      suggested_action_remark: (formData.get("suggested_action_remark") ??
        "") as string,
      action_taken_remark: (formData.get("action_taken_remark") ??
        "") as string,
      closure_remark: (formData.get("closure_remark") ?? "") as string,
      enquiry_tran_type: 1,
      active: 1,
    };

    let itemData = {};

    const headerParsed = enquiryHeaderSchema.safeParse(headerData);
    const ledgerParsed = enquiryLedgerSchema.safeParse(ledgerData);
    let issues: ZodIssue[] = [];
    if (headerParsed.success && ledgerParsed.success) {
      console.log(ledgerData);
      //const itemData = data.map(({ item, unit , ...rest }) => rest);
      result = await createEnquiry({
        head: headerData,
        ledger: ledgerData,
        item: data,
      });
      if (result.status) {
        const newVal = { id: result.data[0].id, name: result.data[0].name };
        setSnackOpen(true);
        setTimeout(function () {
          location.reload();
        }, 3000);
      } else {
        issues = result?.data;
      }
    } else {
      if (!ledgerParsed.success) {
        issues = [...ledgerParsed.error.issues];
      }
      if (!headerParsed.success) {
        issues = [...issues, ...headerParsed.error.issues];
      }
    }

    if (issues.length > 0) {
      // show error on screen
      const errorState: Record<string, { msg: string; error: boolean }> = {};
      for (const issue of issues) {
        errorState[issue.path[0]] = { msg: issue.message, error: true };
      }
      setFormError(errorState);
    }
  };

  const handleButtonClick = async () => {
    scrA.makeInputReadOnly("ticket_description");

    // Append the script element to the head
    //document.head.appendChild(script);
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

  const enquiryMaintainItems = props.config.enquiryMaintainItems;

  return (
    <Box>
      <form action={handleSubmit} style={{ padding: "1em" }}>
        <Grid container>
          <Grid item xs={12}>
            <Seperator>Enquiry Details</Seperator>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} md={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={6}>
                    <InputControl
                      label="Enquiry Description"
                      id="enq_number"
                      inputType={InputType.TEXT}
                      name="enq_number"
                      fullWidth
                      required
                      error={formError?.enq_number?.error}
                      helperText={formError?.enq_number?.msg}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3} md={3}>
                    <InputControl
                      label="Received on"
                      inputType={InputType.DATETIMEINPUT}
                      id="date"
                      name="date"
                      defaultValue={dayjs(new Date())}
                      required
                      error={formError?.date?.error}
                      helperText={formError?.date?.msg}
                      sx={{ display: "flex", flexGrow: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3} md={3}>
                    <SelectMasterWrapper
                      name={"contact"}
                      id={"contact"}
                      label={"Contact"}
                      dialogTitle={"Add Contact"}
                      onChange={(e, v, s) => onSelectChange(e, v, s, "contact")}
                      fetchDataFn={getContact}
                      fnFetchDataByID={getContactById}
                      required
                      formError={formError?.contact ?? formError.contact}
                      renderForm={(fnDialogOpen, fnDialogValue, data) => (
                        <ContactForm
                          setDialogOpen={fnDialogOpen}
                          setDialogValue={fnDialogValue}
                          data={data}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={12}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Grid container spacing={5}>
                      <Grid item xs={12} md={6}>
                        <SelectMasterWrapper
                          name={"category"}
                          id={"category"}
                          label={"Category"}
                          dialogTitle={"Add Category"}
                          onChange={(e, v, s) =>
                            onSelectChange(e, v, s, "category")
                          }
                          fetchDataFn={getEnquiryCategory}
                          fnFetchDataByID={getCategoryById}
                          required
                          formError={formError?.category ?? formError.category}
                          renderForm={(fnDialogOpen, fnDialogValue, data) => (
                            <CategoryForm
                              setDialogOpen={fnDialogOpen}
                              setDialogValue={fnDialogValue}
                              data={data}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <SelectMasterWrapper
                          name={"source"}
                          id={"source"}
                          label={"Source"}
                          dialogTitle={"Add Source"}
                          onChange={(e, v, s) =>
                            onSelectChange(e, v, s, "source")
                          }
                          fetchDataFn={getEnquirySource}
                          fnFetchDataByID={getEnquirySourceById}
                          required
                          formError={formError?.source ?? formError.source}
                          renderForm={(fnDialogOpen, fnDialogValue, data) => (
                            <SourceForm
                              setDialogOpen={fnDialogOpen}
                              setDialogValue={fnDialogValue}
                              data={data}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <SelectMasterWrapper
                      name={"received_by"}
                      id={"received_by"}
                      label={"Received By"}
                      dialogTitle={"Add Executive"}
                      onChange={(e, v, s) =>
                        onSelectChange(e, v, s, "received_by")
                      }
                      fetchDataFn={getExecutive}
                      fnFetchDataByID={getExecutiveById}
                      required
                      formError={
                        formError?.received_by ?? formError.received_by
                      }
                      renderForm={(fnDialogOpen, fnDialogValue, data) => (
                        <ExecutiveForm
                          setDialogOpen={fnDialogOpen}
                          setDialogValue={fnDialogValue}
                          data={data}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              {enquiryMaintainItems && (
                <Grid item xs={12} md={6} sx={{ marginY: "0.5%" }}>
                  <Box
                    sx={{
                      height: 300,
                    }}
                  >
                    <ItemGrid
                      dgData={data}
                      setdgData={setData}
                      setdgDialogOpen={setDialogOpen}
                      dgFormError={formError}
                      setdgFormError={setFormError}
                    />
                  </Box>
                </Grid>
              )}

              <Grid
                item
                xs={12}
                md={enquiryMaintainItems ? 6 : 12}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Grid item xs={12} md={12}>
                  <TextField
                    placeholder="Call receipt remarks"
                    label="Call receipt remarks"
                    multiline
                    name="call_receipt_remark"
                    id="call_receipt_remark"
                    rows={6}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    placeholder="Suggested Action Remarks"
                    label="Suggested Action Remarks"
                    multiline
                    name="suggested_action_remark"
                    id="suggested_action_remark"
                    rows={6}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Seperator>Final Status</Seperator>
            </Grid>
            <Box
              sx={{
                display: "grid",
                columnGap: 3,
                rowGap: 1,
                gridTemplateColumns: "repeat(3, 1fr)",
              }}
            >
              <FormControl sx={{ pl: "0.625em" }}>
                <RadioGroup
                  row
                  name="status"
                  id="status"
                  defaultValue="1"
                  onChange={onStatusChange}
                  sx={{ color: "black" }}
                >
                  <FormControlLabel
                    value="Status"
                    control={<label />}
                    label="Status :"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Open"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Closed"
                  />
                </RadioGroup>
              </FormControl>
              <SelectMasterWrapper
                name={"sub_status"}
                id={"sub_status"}
                label={"Call Sub-Status"}
                dialogTitle={"Add Sub-Status for " + status}
                onChange={(e, v, s) => onSelectChange(e, v, s, "sub_status")}
                fetchDataFn={getSubStatusforStatus}
                fnFetchDataByID={getEnquirySubSatusById}
                required
                formError={formError?.sub_status ?? formError.sub_status}
                renderForm={(fnDialogOpen, fnDialogValue, data) => (
                  <SubStatusForm
                    setDialogOpen={fnDialogOpen}
                    setDialogValue={fnDialogValue}
                    parentData={status}
                    data={data}
                  />
                )}
              />
              <SelectMasterWrapper
                name={"action_taken"}
                id={"action_taken"}
                label={"Action Taken"}
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
              />
              <SelectMasterWrapper
                name={"next_action"}
                id={"next_action"}
                label={"Next Action"}
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
              />
              <InputControl
                label="When"
                inputType={InputType.DATETIMEINPUT}
                id="next_action_date"
                name="next_action_date"
                defaultValue={dayjs(new Date())}
              />
              <Grid item xs={12} md={12}>
                <Grid item xs={6} md={12}>
                  <TextField
                    placeholder="Closure remarks"
                    label="Closure remarks"
                    multiline
                    name="closure_remark"
                    id="closure_remark"
                    rows={2}
                    fullWidth
                    disabled={status === "1"}
                  />
                </Grid>
              </Grid>
            </Box>
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
                  m={1}
                >
                  <Button>Cancel</Button>
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        {dialogOpen && (
          <AddDialog
            title="Add Item to Item List"
            open={dialogOpen}
            setDialogOpen={setDialogOpen}
          >
            <AddItemToListForm
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
