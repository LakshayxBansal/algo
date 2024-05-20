'use client'
import React from 'react';
import { Grid, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import { createEnquiry } from '@/app/controllers/enquiry.controller';
import Seperator from '@/app/Widgets/seperator';
import {InputControl} from '@/app/Widgets/input/InputControl';
import {InputType} from '@/app/Widgets/input/InputControl';
import { SelectMasterWrapper } from '@/app/Widgets/masters/selectMasterWrapper';
import { getEnquirySource } from '@/app/controllers/enquirySource.controller';
import { getContact } from '@/app/controllers/contact.controller';
import { getExecutive } from '@/app/controllers/executive.controller';
import { getEnquiryCategory } from '@/app/controllers/enquiryCategory.controller';
import { getEnquiryStatus } from '@/app/controllers/enquiryStatus.controller';
import { getEnquirySubStatus } from '@/app/controllers/enquirySubStatus.controller';
import {getEnquiryAction} from '@/app/controllers/enquiryAction.controller';
import SourceForm from '@/app/Widgets/masters/masterForms/sourceForm';
import ContactForm from '@/app/Widgets/masters/masterForms/contactForm';
import ExecutiveForm from '@/app/Widgets/masters/masterForms/executiveForm';
import StatusForm from '@/app/Widgets/masters/masterForms/statusForm';
import ActionForm from '@/app/Widgets/masters/masterForms/actionForm';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';




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




export default function InputForm(props: {baseData: IformData}) {
  const baseData = props.baseData;
  const handleSubmit = async (formData: FormData)=> {

    const result = await createEnquiry(formData);
  }

  const  handleButtonClick = async () => {
    scrA.makeInputReadOnly("ticket_description");

    // Append the script element to the head
    //document.head.appendChild(script);
 
  };

  async function getSubStatusforStatus(stateStr: string) {
    const status = (document.getElementById("status") as HTMLInputElement).value;

    const subStatus = await getEnquirySubStatus(stateStr, status);
    if (subStatus?.length > 0){
      return subStatus;
    } 
  }


  return (
    <form>
      <Grid container spacing={1} style={{ marginLeft: '10px', marginTop: '5px' }}>
        <Grid item xs={11}>
          <Seperator>Inquiry Details</Seperator>
        </Grid>
        <Grid item xs={11}> 
          <Box
            sx={{
              display: 'grid',
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: '2fr 1fr 1fr',
            }}>
            <InputControl label="Ticket Description" 
              id="ticket_description"
              type={InputType.TEXT}
              name="desc" 
              fullWidth
            />
            <InputControl label="Received on "
              type={InputType.DATETIMEINPUT}
              id="date"
              name="date"
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
                  <SourceForm
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
              name = {"rcd_by"}
              id = {"rcd_by"}
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
              <TextField placeholder="Call receipt remarks" label="Call receipt remarks" multiline name="callReceiptRemarks" id="callReceiptRemarks" rows={6} fullWidth />
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <Grid item xs={6} md={12}>
              <TextField placeholder="Suggested Action Remarks" label="Suggested Action Remarks" multiline name="suggestedActionRemarks" id="suggestedActionRemarks" rows={6} fullWidth />
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
            <SelectMasterWrapper
                name = {"status"}
                id = {"status"}
                label = {"Call Status"}
                dialogTitle={"Add Status"}
                fetchDataFn = {getEnquiryStatus}
                renderForm={(fnDialogOpen, fnDialogValue) => 
                  <StatusForm
                    setDialogOpen={fnDialogOpen}
                    setDialogValue={fnDialogValue}
                  />
                }
            />  
            <SelectMasterWrapper
                name = {"substatus"}
                id = {"substatus"}
                label = {"Call Sub-Status"}
                dialogTitle={"Add Sub-Status"}
                fetchDataFn = {getSubStatusforStatus}
                renderForm={(fnDialogOpen, fnDialogValue) => 
                  <StatusForm
                    setDialogOpen={fnDialogOpen}
                    setDialogValue={fnDialogValue}
                  />
                }
            />
            <SelectMasterWrapper
                name = {"actionTaken"}
                id = {"actionTaken"}
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
                name = {"nextAction"}
                id = {"nextAction"}
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
              id="whenDate"
              name="whenDate"
            />
            <Grid item xs={12} md={12}>
              <Grid item xs={6} md={12}>
                <TextField placeholder="Closure remarks" label="Closure remarks" multiline name="closureRemarks" id="closureRemarks" rows={2} fullWidth />
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
