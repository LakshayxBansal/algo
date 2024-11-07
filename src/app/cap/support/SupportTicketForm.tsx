"use client";
import React, { useEffect, useState } from "react";
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
import { InputControl } from "@/app/Widgets/input/InputControl";
import { InputType } from "@/app/Widgets/input/InputControl";
import { SelectMasterWrapper } from "@/app/Widgets/masters/selectMasterWrapper";
import {
  getContact,
  getContactById,
} from "@/app/controllers/contact.controller";

import ContactForm from "@/app/Widgets/masters/masterForms/contactForm";
import ExecutiveForm from "@/app/Widgets/masters/masterForms/executiveForm";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import {
  getExecutive,
  getExecutiveById,
} from "@/app/controllers/executive.controller";

import dayjs from "dayjs";

import { AddDialog } from "@/app/Widgets/masters/addDialog";
import {
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
import { createSupportTicket, updateSupportData } from "@/app/controllers/supportTicket.controller";
import { supportDataFormat } from "@/app/utils/formatData/supportDataformat";
import {
  getProduct,
  getProductById,
} from "@/app/controllers/product.controller";
import ProductForm from "@/app/Widgets/masters/masterForms/productForm";
import ProductList from "./productList";
import SupportProductGrid from "./SupportProductGrid";
import { ZodIssue } from "zod";
import { update } from "lodash";
import { format } from "path";

const SupportTicketForm = (props: masterFormPropsT) => {

  const masterData = props.data.masterData ?? {};

  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});

  const [snackOpen, setSnackOpen] = useState(false);
  const [selectValues, setSelectValues] = useState<selectKeyValueT>(masterData);
  const [status, setStatus] = useState(masterData.status.id!= null ? masterData.status.id.toString() : "1");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [productFormError, setProductFormError] = useState<
    Record<number, Record<string, { msg: string; error: boolean }>>
  >({});

  
  const [data, setData] = useState<suppportProductArraySchemaT>(props.data.productData ?? []);


  const handleSubmit = async (formData: FormData) => {
    const formatedData = await supportDataFormat({ formData, selectValues });

    let result:any;

    result = await persistEntity(formatedData as supportTicketSchemaT, data);
    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name };
      setSnackOpen(true);
      setTimeout(function () {
        setFormError;
        location.reload();
      }, 3000);
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

  const isProduct = props?.data?.mantainProduct ? true : true;
  async function persistEntity(
    data: supportTicketSchemaT,
    productData: suppportProductArraySchemaT
  ) {
    let result;
    if (props.data) {
     data.id = props.data.ticket_id;
     data.created_by= props.data.created_by;
     data.stamp = props.data.stamp;
      result = await updateSupportData(data, productData);
    } else {
    result = await createSupportTicket({
      supportData: data,
      productData: productData,
    });
    }
    return result;
  }

  async function getSubStatusforStatus(stateStr: string) {
    const subStatus = await getSupportSubStatus(stateStr, status);
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

  return (
    <Box>
      <form action={handleSubmit} style={{ padding: "1em" }} noValidate>
        <Grid container>
          <Grid item xs={12}>
            <Seperator>Support Ticket Details </Seperator>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {/* Main Grid Container */}
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6}>
                    <SelectMasterWrapper
                      name="contact"
                      id="contact"
                      label="Contact"
                      showDetails={true}
                      dialogTitle="Add Contact"
                      onChange={(e, v, s) => onSelectChange(e, v, s, "contact")}
                      fetchDataFn={getContact}
                      fnFetchDataByID={getContactById}
                      required
                      formError={formError?.contact ?? formError.contact}
                      defaultValue={masterData.contact}
                      renderForm={(fnDialogOpen, fnDialogValue, data) => (
                        <ContactForm
                          setDialogOpen={fnDialogOpen}
                          setDialogValue={fnDialogValue}
                          data={data}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <InputControl
                      label="Received on"
                      inputType={InputType.DATETIMEINPUT}
                      id="date"
                      name="date"
                      // defaultValue={headerData?.date ?? dayjs(new Date())}
                      defaultValue={dayjs(props?.data?.date)?? dayjs(new Date())}
                      required
                      error={formError?.date?.error}
                      helperText={formError?.date?.msg}
                      sx={{ display: "flex", flexGrow: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12}>
                    <InputControl
                      label="Ticket Description"
                      id="tkt_number"
                      inputType={InputType.TEXT}
                      name="tkt_number"
                      fullWidth
                      required
                      defaultValue={props.data?.tkt_number}
                      error={formError?.tkt_number?.error}
                      helperText={formError?.tkt_number?.msg}
                      sx={{
                        "& .MuiInputBase-root": {
                          height: 100,
                          alignItems: "start",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <SelectMasterWrapper
                      name="category"
                      id="category"
                      label="Category"
                      dialogTitle="Add Category"
                      onChange={(e, v, s) =>
                        onSelectChange(e, v, s, "category")
                      }
                      fetchDataFn={getSupportCategory}
                      fnFetchDataByID={getSupportCategoryById}
                      required
                      formError={formError?.category ?? formError.category}
                      defaultValue={
                       masterData.category
                      }
                      renderForm={(fnDialogOpen, fnDialogValue, data) => (
                        <SupportCategoryForm
                          setDialogOpen={fnDialogOpen}
                          setDialogValue={fnDialogValue}
                          data={data}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <SelectMasterWrapper
                      name="received_by"
                      id="received_by"
                      label="Received By"
                      showDetails={true}
                      dialogTitle="Add Executive"
                      onChange={(e, v, s) =>
                        onSelectChange(e, v, s, "received_by")
                      }
                      fetchDataFn={getExecutive}
                      fnFetchDataByID={getExecutiveById}
                      required
                      formError={
                        formError?.received_by ?? formError.received_by
                      }
                      defaultValue={
                        masterData.received_by
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
                  {/* <Grid item xs={12} sm={6} md={12}>
                <InputControl
                  label="Ticket Description"
                  id="tkt_number"
                  inputType={InputType.TEXT}
                  name="tkt_number"
                  fullWidth
                  required
                  error={formError?.tkt_number?.error}
                  helperText={formError?.tkt_number?.msg}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: 100, 
                      alignItems: "start", 
                    },
                    
                  }}
                />
                
              </Grid> */}
                </Grid>
              </Grid>
              <Grid item xs={12} md={6} sx={{ marginY: "0.5%" }}>
                <Box
                  sx={{
                    height: 300,
                  }}
                >
                  <SupportProductGrid
                    dgData={data}
                    setdgData={setData}
                    setdgDialogOpen={setDialogOpen}
                    dgFormError={formError}
                    setdgFormError={setFormError}
                    dgProductFormError={productFormError}
                  />
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                md={12}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Grid item xs={12} md={12}>
                  <TextField
                    placeholder="Call receipt remarks"
                    label="Call receipt remarks"
                    multiline
                    name="call_receipt_remark"
                    id="call_receipt_remark"
                    defaultValue={props.data?.call_receipt_remark}
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
                    defaultValue={props.data?.suggested_action_remark}
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
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                },
              }}
            >
              <FormControl sx={{ pl: "0.625em" }}>
                <RadioGroup
                  row
                  name="status"
                  id="status"
                  defaultValue={(masterData?.status != null ? masterData?.status.id.toString() : "1")}
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
                fnFetchDataByID={getSupportSubSatusById}
                required
                formError={formError?.sub_status ?? formError.sub_status}
                defaultValue={
                 masterData.sub_status
                }
                allowNewAdd={status === '1'}
                renderForm={(fnDialogOpen, fnDialogValue, data) => (
                  <SupportSubStatusForm
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
                fetchDataFn={getSupportAction}
                fnFetchDataByID={getSupportActionById}
                formError={formError?.action_taken ?? formError.action_taken}
                defaultValue={
                  masterData.action_taken
                }
                renderForm={(fnDialogOpen, fnDialogValue, data) => (
                  <SupportActionForm
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
                fetchDataFn={getSupportAction}
                formError={formError?.next_action ?? formError.next_action}
                defaultValue={
                  masterData.next_action
                }
                renderForm={(fnDialogOpen, fnDialogValue, data) => (
                  <SupportActionForm
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
                // defaultValue={ledgerData?.next_action_date ?? dayjs(new Date())}
                defaultValue={dayjs(props.data?.next_action_date ) ?? dayjs(new Date())}
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
                    defaultValue={props.data?.closure_remark}
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
            title="Add Product to Product List"
            open={dialogOpen}
            setDialogOpen={setDialogOpen}
          >
            <ProductList setDialogOpen={setDialogOpen} setData={setData} />
          </AddDialog>
        )}
      </form>
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        message={props.data ?"Ticket Details updated successfully!" :"Ticket Details saved successfully!"}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
};

export default SupportTicketForm;
