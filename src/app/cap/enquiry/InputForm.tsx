'use client'
import React from 'react';
import { Grid, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import { createEnquiry } from '@/app/controllers/enquiry.controller';
import Seperator from '@/app/Widgets/seperator';
import FullFeaturedCrudGrid from './tasks';
import {InputControl} from '@/app/Widgets/input/InputControl';
import {InputType} from '@/app/Widgets/input/InputControl';
import { SelectMasterWrapper } from '@/app/Widgets/masters/selectMasterWrapper';
import { getEnquirySource } from '@/app/controllers/enquirySource.controller';
import { getContact } from '@/app/controllers/contact.controller';
import { getEnquiryCategory } from '@/app/controllers/enquiryCategory.controller';
import SourceForm from '@/app/Widgets/masters/masterForms/sourceForm';
import ContactForm from '@/app/Widgets/masters/masterForms/contactForm';
import {theme} from '@/app/utils/theme.util'
import { ThemeProvider } from "@mui/material/styles";
import Box from '@mui/material/Box';



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

  //       

  return (
    <ThemeProvider theme={theme}>
        <form >
          {/*<FormMenuBar/>*/}
          <Paper style={{ width: '100%', minHeight: '100vh' }}>
            {/*<ProminentAppBar />*/}
            <Grid container spacing={1} style={{ marginLeft: '10px', marginTop: '5px' }}>
              <Grid item xs={12}>
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
                    fetchDataFn = {getContact}
                    renderForm={(fnDialogOpen, fnDialogValue) => 
                        <ContactForm
                        setDialogOpen={fnDialogOpen}
                        setDialogValue={fnDialogValue}
                        />
                      }
                  />
                </Box>

                <Grid item xs={12} md={12}>
                  <Grid item xs={6} md={12}>
                    <TextField placeholder="Call receipt remarks" label="Call receipt remarks" multiline name="callReceiptRemarks" rows={6} fullWidth />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Grid item xs={6} md={12}>
                    <TextField placeholder="Suggested Action Remarks" label="Suggested Action Remarks" multiline name="suggestedActionRemarks" rows={6} fullWidth />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Seperator>Final Status</Seperator>
                </Grid>
                <SelectMasterWrapper
                    name = {"status"}
                    id = {"status"}
                    label = {"Call Status"}
                    dialogTitle={"Add Status"}
                    fetchDataFn = {getContact}
                    renderForm={(fnDialogOpen, fnDialogValue) => 
                        <ContactForm
                        setDialogOpen={fnDialogOpen}
                        setDialogValue={fnDialogValue}
                        />
                      }
                  />

              </Grid>
              <Grid item xs={7}>
                <FullFeaturedCrudGrid></FullFeaturedCrudGrid>
              </Grid>
              <Grid item xs={12}>
                <Seperator>Inquiry Assignment</Seperator>
              </Grid>


 
            </Grid>
          </Paper>
        </form>
      </ThemeProvider>
  );
}

