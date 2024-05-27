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
  const [status, setStatus] = useState("Open");
  const baseData = props.baseData;
  const [selectValues, setSelectValues] = useState({});

  let result;
  let issues;
  const handleSubmit = async (formData: FormData)=> {
    const headerData = {
      enq_number: formData.get("enq_number") as string,
      date: formData.get("date"),
      contact: JSON.parse(formData.get("contact") as string).id,
      received_by: JSON.parse(formData.get("received_by") as string).id,
      category: JSON.parse(formData.get("category") as string).id,
      source: JSON.parse(formData.get("source") as string).id,
      };
    let ledgerData = {
      status_version: 0,
      allocated_to: '',
      date: formData.get("date"),
      status: formData.get("status"),
      sub_status: JSON.parse(formData.get("sub_status") as string).id,
      action_taken: JSON.parse(formData.get("action_taken") as string).id,
      next_action: JSON.parse(formData.get("next_action") as string).id,
      next_action_date: formData.get("next_action_date"),
      enquiry_remark: formData.get("enquiry_remark") ?? '',
      suggested_action_remark: formData.get("suggested_action_remark") ?? '',
      action_taken_remark: formData.get("action_taken_remark") ?? '',
      closure_remark: formData.get("closure_remark") ?? '',
      enquiry_tran_type: 1,
      active : 1
    }

    const headerParsed = enquiryHeaderSchema.safeParse(headerData);
    if (headerParsed.success) {
      const ledgerParsed = enquiryLedgerSchema.safeParse(ledgerData);
      console.log("parsed.error.issues")
    }
    //const result = await createEnquiry(formData);
  }

  const  handleButtonClick = async () => {
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

  function onSelectChange(event: React.SyntheticEvent, value: any){
    const controlName = event.currentTarget.name;
    const newObj = {[controlName]: value};
    const values = {...selectValues, newObj};
    const val1 = {
        status : {id: 1, name: "name"}
      };
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
              type={InputType.TEXT}
              name="enq_number" 
              fullWidth
            />
            <InputControl label="Received on "
              type={InputType.DATETIMEINPUT}
              id="date"
              name="date"
              defaultValue={dayjs(new Date())}
            />
            <SelectMasterWrapper
              name = {"contact"}
              id = {"contact"}
              label = {"Contact"}
              dialogTitle={"Add Contact"}
              fetchDataFn = {getContact}
              renderForm={(fnDialogOpen, fnDialogValue) => 
                  <ContactForm
                    setDialogOpen={fnDialogOpen}
                    setDialogValue={fnDialogValue}
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
              fetchDataFn = {getEnquiryCategory}
              renderForm={(fnDialogOpen, fnDialogValue) => 
                <CategoryForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                />}
            />

            <SelectMasterWrapper
              name = {"source"}
              id = {"source"}
              label = {"Source"}
              dialogTitle={"Add Source"}
              fetchDataFn = {getEnquirySource}
              renderForm={(fnDialogOpen, fnDialogValue) => 
                  <SourceForm
                    setDialogOpen={fnDialogOpen}
                    setDialogValue={fnDialogValue}
                  />}
            />

            <SelectMasterWrapper
              name = {"received_by"}
              id = {"received_by"}
              label = {"Received By"}
              dialogTitle={"Add Executive"}
              fetchDataFn = {getExecutive}
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
                fetchDataFn = {getSubStatusforStatus}
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
                fetchDataFn = {getEnquiryAction}
                renderForm={(fnDialogOpen, fnDialogValue) => 
                  <ActionForm
                    setDialogOpen={fnDialogOpen}
                    setDialogValue={fnDialogValue}
                  />
                }
            />
            <InputControl label="When "
              type={InputType.DATETIMEINPUT}
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