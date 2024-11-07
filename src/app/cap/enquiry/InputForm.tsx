"use client";
import React, { useState } from "react";
import {
  Badge,
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
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DocModal from "@/app/utils/docs/DocModal";

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

export interface IformData {
  userName: string;
}

const rows: any = [];

export default function InputForm(props: {
  baseData: IformData;
  config: any;
  loggedInUserData: any;
}) {
  const [status, setStatus] = useState("1");
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({
    received_by: {
      id: props.loggedInUserData.id,
      name: props.loggedInUserData.name,
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
  const [docData, setDocData] = React.useState([]);
  const [docDialogOpen, setDocDialogOpen] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    const formatedData = await enquiryDataFormat({ formData, selectValues });

    let result;
    let issues = [];

    result = await createEnquiry({
      enqData: formatedData,
      product: data,
      docData: docData
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
        console.log("Product Issues", temp);
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

  const enquiryMaintainProducts = props.config.enquiryMaintainProducts;

  return (
    <Box>
      <form action={handleSubmit} style={{ padding: "1em" }} noValidate>
        <Grid container>
          <Grid item xs={12}>
            <Seperator><div style={{ fontSize: "0.8em" , fontWeight: "bold"}}>Enquiry Details</div></Seperator>
            <Tooltip
              title={docData.length > 0 ? (
                docData.map((file: any, index: any) => (
                  <Typography variant="body2" key={index}>
                    {file.description}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2" color="white">
                  No files available
                </Typography>
              )}
            >
              <IconButton
                sx={{ float: "right", position: "relative", paddingRight: 0 }}
                onClick={() => setDocDialogOpen(true)}
                aria-label="file"
              >
                <Badge badgeContent={docData.length} color="primary">
                  <AttachFileIcon></AttachFileIcon>
                </Badge>

              </IconButton>
            </Tooltip>
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
                      showDetails={true}
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
                      showDetails={true}
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
                      defaultValue={
                        {
                          id: props.loggedInUserData?.id,
                          name: props.loggedInUserData?.name,
                        } as optionsDataT
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              {enquiryMaintainProducts && (
                <Grid item xs={12} md={6} sx={{ marginY: "0.5%" }}>
                  <Box
                    sx={{
                      height: 300,
                    }}
                  >
                    <ProductGrid
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
                    error={formError?.call_receipt_remark?.error}
                    helperText={formError?.call_receipt_remark?.msg}
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
              <Seperator><div style={{ fontSize: "0.8em" , fontWeight: "bold"}}>Final Status</div></Seperator>
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
                allowNewAdd={status === "1"}
              />
              <SelectMasterWrapper
                name={"action_taken"}
                id={"action_taken"}
                label={"Action Taken"}
                dialogTitle={"Add Action"}
                onChange={(e, v, s) => onSelectChange(e, v, s, "action_taken")}
                fetchDataFn={getEnquiryAction}
                fnFetchDataByID={getActionById}
                formError={formError?.action_taken ?? formError.action_taken}
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
                disabled={status === "2"}
                error={formError?.next_action_date?.error}
                helperText={formError?.next_action_date?.msg}
              />
              <Grid item xs={12} md={12}>
                <Grid item xs={6} md={12}>
                  <TextField
                    placeholder="Closure remarks"
                    label="Closure remarks"
                    multiline
                    name="closure_remark"
                    id="closure_remark"
                    rows={1}
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
            title=""
            open={docDialogOpen}
            setDialogOpen={setDocDialogOpen}
          >
            <DocModal docData={docData} setDocData={setDocData} setDialogOpen={setDocDialogOpen} />
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
