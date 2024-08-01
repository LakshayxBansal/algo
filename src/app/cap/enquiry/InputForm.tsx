'use client'
import React, {useState} from 'react';
import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import { createEnquiry } from '@/app/controllers/enquiry.controller';
import Seperator from '@/app/Widgets/seperator';
import {InputControl} from '@/app/Widgets/input/InputControl';
import {InputType} from '@/app/Widgets/input/InputControl';
import { SelectMasterWrapper } from '@/app/Widgets/masters/selectMasterWrapper';
import { getEnquirySource } from '@/app/controllers/enquirySource.controller';
import { getContact } from '@/app/controllers/contact.controller';
import { getExecutive } from '@/app/controllers/executive.controller';
import { getEnquiryCategory } from '@/app/controllers/enquiryCategory.controller';
import { getEnquirySubStatus } from '@/app/controllers/enquirySubStatus.controller';
import {getEnquiryAction} from '@/app/controllers/enquiryAction.controller';
import SourceForm from '@/app/Widgets/masters/masterForms/sourceForm';
import ContactForm from '@/app/Widgets/masters/masterForms/contactForm';
import ExecutiveForm from '@/app/Widgets/masters/masterForms/executiveForm';
import ActionForm from '@/app/Widgets/masters/masterForms/actionForm';
import SubStatusForm from '@/app/Widgets/masters/masterForms/subStatusForm';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CategoryForm from '@/app/Widgets/masters/masterForms/categoryForm';

import dayjs from "dayjs";
import { enquiryHeaderSchema, enquiryLedgerSchema } from '@/app/zodschema/zodschema';
import { ZodIssue } from 'zod';
import {selectKeyValueT} from '@/app/models/models';

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


export default function InputForm(props: {baseData: IformData}) {
  const [status, setStatus] = useState("1");
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [formError, setFormError] = useState<Record<string, {msg: string, error: boolean}>>({});

  let result;
  let issues;

  const handleSubmit = async (formData: FormData)=> {


    let dt = new Date(formData.get("date") as string);
    const date = (dt.toISOString().slice(0,10)+ " " + dt.toISOString().slice(11,19));
    dt = new Date(formData.get("next_action_date") as string);
    const nextActionDate = (dt.toISOString().slice(0,10)+ " " + dt.toISOString().slice(11,19));

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
      };
    let ledgerData = {
      status_version: 0,
      allocated_to_id: 0,
      allocated_to: '',
      date: date,
      status_id: Number(formData.get("status")),
      sub_status_id: selectValues.sub_status?.id,
      sub_status: selectValues.sub_status?.name,
      action_taken_id: selectValues.action_taken?.id,
      action_taken: selectValues.action_taken?.name,
      next_action_id: selectValues.next_action?.id,
      next_action: selectValues.next_action?.name,
      next_action_date: nextActionDate,
      enquiry_remark: (formData.get("enquiry_remark") ?? '') as string,
      suggested_action_remark: (formData.get("suggested_action_remark") ?? '') as string,
      action_taken_remark: (formData.get("action_taken_remark") ?? '') as string,
      closure_remark: (formData.get("closure_remark") ?? '') as string,
      enquiry_tran_type: 1,
      active : 1
    }

    const headerParsed = enquiryHeaderSchema.safeParse(headerData);
    const ledgerParsed = enquiryHeaderSchema.safeParse(headerData);
    let issues: ZodIssue[] = [];
    if (headerParsed.success && ledgerParsed.success) {
      result = await createEnquiry({head: headerData, ledger: ledgerData});
      if (result.status){
        const newVal = {id: result.data[0].id, name: result.data[0].name};
      } else {
        issues = result?.data;
      }
      console.log("parsed.error.issues")
    } else {
      if (!ledgerParsed.success) {
        issues = [...ledgerParsed.error.issues]
      }
      if (!headerParsed.success) {
        issues = [...issues, ...headerParsed.error.issues]
      }
    }
    
    if (issues.length > 0) {
      // show error on screen
      const errorState: Record<string, {msg: string, error: boolean}> = {};
      for (const issue of issues) {
        errorState[issue.path[0]] = {msg: issue.message, error: true};
      }
      setFormError(errorState);
    } 
  }

  const handleButtonClick = async () => {
    scrA.makeInputReadOnly("ticket_description");

    // Append the script element to the head
    //document.head.appendChild(script);
  };

  async function getSubStatusforStatus(stateStr: string) {
    const subStatus = await getEnquirySubStatus(stateStr, status);
    if (subStatus?.length > 0){
      return subStatus;
    } 
  }

  function onStatusChange(event: React.SyntheticEvent, value: any) {
    setStatus(value);
  }

  function onSelectChange(event: React.SyntheticEvent, val: any, setDialogValue: any, name: string){
    let values =  {...selectValues};
    values[name] = val;
    setSelectValues(values);
  }

  return (
    <form action={handleSubmit}>
      <Grid container spacing={1} style={{ marginLeft: '10px', marginTop: '5px' }}>
        <Grid item xs={11}>
          <Seperator>Enquiry Details</Seperator>
        </Grid>
        <Grid item xs={11}> 
          <Box
            sx={{
              display: 'grid',
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: '2fr 1fr 1fr',
            }}>
            <InputControl label="Enquiry Description" 
              id="enq_number"
              inputType={InputType.TEXT}
              name="enq_number" 
              fullWidth
              required
              error={formError?.enq_number?.error}
              helperText={formError?.enq_number?.msg} 
            />
            <InputControl label="Received on "
              inputType={InputType.DATETIMEINPUT}
              id="date"
              name="date"
              defaultValue={dayjs(new Date())}
              required
              error={formError?.date?.error}
              helperText={formError?.date?.msg} 
            />
            <SelectMasterWrapper
              name = {"contact"}
              id = {"contact"}
              label = {"Contact"}
              dialogTitle={"Add Contact"}
              onChange={(e, v, s) => onSelectChange(e, v, s, "contact")}
              fetchDataFn = {getContact}
              required
              formError={formError?.contact?? formError.contact}
              renderForm={(fnDialogOpen, fnDialogValue, id) => 
                <ContactForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                  id={id}
                />
              }
            />
          </Box>
          <Box
            sx={{
              display: 'grid',
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: 'repeat(3, 1fr)',
            }}>
            <SelectMasterWrapper
              name = {"category"}
              id = {"category"}
              label = {"Category"}
              dialogTitle={"Add Category"}
              onChange={(e, v, s) => onSelectChange(e, v, s, "category")}
              fetchDataFn = {getEnquiryCategory}
              required
              formError={formError?.category?? formError.category}
              renderForm={(fnDialogOpen, fnDialogValue) => 
                <CategoryForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                />}
            />
            <SelectMasterWrapper
              name={"source"}
              id={"source"}
              label={"Source"}
              dialogTitle={"Add Source"}
              onChange={(e, v, s) => onSelectChange(e, v, s, "source")}
              fetchDataFn={getEnquirySource}
              required
              formError={formError?.source?? formError.source}
              renderForm={(fnDialogOpen, fnDialogValue) => (
                <SourceForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                />
              )}
            />
            <SelectMasterWrapper
              name = {"received_by"}
              id = {"received_by"}
              label = {"Received By"}
              dialogTitle={"Add Executive"}
              onChange={(e, v, s) => onSelectChange(e, v, s, "received_by")}
              fetchDataFn = {getExecutive}
              required
              formError={formError?.received_by?? formError.received_by}
              renderForm={(fnDialogOpen, fnDialogValue) => 
                  <ExecutiveForm
                    setDialogOpen={fnDialogOpen}
                    setDialogValue={fnDialogValue}
                  />
                }
            />
          </Box>

          <Grid item xs={12} md={12}>
            <Grid item xs={6} md={12}>
              <TextField placeholder="Call receipt remarks" label="Call receipt remarks" multiline name="enquiry_remark" id="enquiry_remark" rows={6} fullWidth />
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <Grid item xs={6} md={12}>
              <TextField placeholder="Suggested Action Remarks" label="Suggested Action Remarks" multiline name="suggested_action_remark" id="suggested_action_remark" rows={6} fullWidth />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Seperator>Final Status</Seperator>
          </Grid>
          <Box 
            sx={{ display: 'grid', 
                  columnGap: 3,
                  rowGap: 1,
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                }}>
            <FormControl>
              <RadioGroup
                row
                name="status"
                id="status"
                defaultValue='1'
                onChange={onStatusChange}
              >
                <FormControlLabel value="Status" control={<label />} label="Status :" />
                <FormControlLabel value="1" control={<Radio />} label="Open" />
                <FormControlLabel value="2" control={<Radio />} label="Closed" />
              </RadioGroup>
            </FormControl>
            <SelectMasterWrapper
              name = {"sub_status"}
              id = {"sub_status"}
              label = {"Call Sub-Status"}
              dialogTitle={"Add Sub-Status for " + status}
              onChange={(e, v, s) => onSelectChange(e, v, s, "sub_status")}
              fetchDataFn = {getSubStatusforStatus}
              required
              formError={formError?.sub_status?? formError.sub_status}
              renderForm={(fnDialogOpen, fnDialogValue) => 
                <SubStatusForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                  statusName={status}
                />
              }
            />
            <SelectMasterWrapper
                name = {"action_taken"}
                id = {"action_taken"}
                label = {"Action Taken"}
                dialogTitle={"Add Action"}
                onChange={(e, v, s) => onSelectChange(e, v, s, "action_taken")}
                fetchDataFn = {getEnquiryAction}
                renderForm={(fnDialogOpen, fnDialogValue) => 
                  <ActionForm
                    setDialogOpen={fnDialogOpen}
                    setDialogValue={fnDialogValue}
                  />
                }
            />
            <SelectMasterWrapper
                name = {"next_action"}
                id = {"next_action"}
                label = {"Next Action"}
                dialogTitle={"Add Action"}
                onChange={(e, v, s) => onSelectChange(e, v, s, "next_action")}
                fetchDataFn = {getEnquiryAction}
                required
                formError={formError?.next_action?? formError.next_action}
                renderForm={(fnDialogOpen, fnDialogValue) => 
                  <ActionForm
                    setDialogOpen={fnDialogOpen}
                    setDialogValue={fnDialogValue}
                  />
                }
            />
            <InputControl label="When "
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
                  multiline name="closure_remark" 
                  id="closure_remark" 
                  rows={2} 
                  fullWidth
                  required={status==="2"} 
                  disabled={status==="1"}
                />
              </Grid>
            </Grid>
          </Box>

        </Grid>
        <Grid item xs={11}>
            <Seperator></Seperator>
          </Grid>
        <Grid container>
          <Grid item xs={5} md={5}>
            <Box  margin={1} sx={{display: "flex"}}>
              <Box display="flex" justifyContent="flex-start" alignItems="flex-start" m={1}>
                <Button>Cancel</Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} md={6}>
            <Box display="flex" justifyContent="flex-end" alignItems="flex-end" m={1}>
              <Button type="submit" variant="contained">Submit</Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}


/*
            <AutocompleteDB<optionsDataT>
                name = {"status"}
                id = {"status"}
                label = {"Call Status"}
                fetchDataFn = {getEnquiryStatus}
                onChange={onStatusChange}
            /> 
*/
