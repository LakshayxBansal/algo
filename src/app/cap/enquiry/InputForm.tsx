'use client'

import React, { useState } from 'react';
import { AutocompleteRenderInputParams, Grid, TextField } from '@mui/material';
import DatePick from '../../Widgets/DatePick';
import Paper from '@mui/material/Paper';
import AutocompleteAdd from '../../Widgets/Autocomplete';
import Toolbar from '@mui/material/Toolbar';
import FormMenuBar from './formMenuBar';
import { createInquiry } from '@/app/controllers/inquiry.controller';
import { theme } from '../../utils/theme.util';
import { ThemeProvider } from "@mui/material/styles";
import Seperator from '@/app/Widgets/seperator';
import { SelectOrganisationWrapper } from '../../Widgets/masters/selectOrganisation/selectOrganisationWrapper';
import { SelectContactWrapper } from '../../Widgets/masters/selectContact/selectContactWrapper';
import Typography from '@mui/material/Typography';

export interface IformData {
  userName: string;
  salesPerson: [{id: number; name: string;}],
  catList: [{id: number; name: string;}],
  customer:[{id: number; name: string;}],
  person: [{id: number; name: string}],
  action: [{id: number; name: string}],
}




export default function InputForm(props: {baseData: IformData}) {
  const baseData = props.baseData;
  const [customer, setCustomer] = useState("");

  const handleSubmit = async (formData: FormData)=> {
    const result = await createInquiry(formData);
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Toolbar/>
        <form action={handleSubmit}>
          <FormMenuBar/>
          <Paper style={{ width: '100%', minHeight: '100vh' }}>
            {/*<ProminentAppBar />*/}
            <Grid container spacing={1} style={{ marginLeft: '10px', marginTop: '5px' }}>
              <Grid item xs={12}>
                <Seperator>Inquiry Details</Seperator>
              </Grid>
              <Grid item xs={10} >
                <TextField label="Ticket Description" 
                inputProps={{ style: { fontSize: 20 } }} name="desc" fullWidth/>
              </Grid>
              <Grid item xs={12} md={4}>
                <SelectOrganisationWrapper></SelectOrganisationWrapper>

                <Grid item xs={6} md={12}>
                  <SelectContactWrapper></SelectContactWrapper>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid item xs={6} md={12}>
                  <TextField placeholder="Please enter your comments" multiline name="notes" rows={4} fullWidth />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Seperator>Inquiry Assignment</Seperator>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid item xs={6}>
                  <AutocompleteAdd
                      options={baseData? baseData.salesPerson : []}
                      freeSolo={false}
                      addNew={false}
                      renderInput={(params)=> <TextField {...params} name="salesperson" label="Sales Person" />}
                    />
                </Grid>

                <Grid item xs={6}>
                  <AutocompleteAdd
                        options={baseData? baseData.catList : []}
                        freeSolo={false}
                        addNew={false}
                        renderInput={(params)=> <TextField {...params} name="category" label="Category" />}
                      />
                </Grid>
                <Grid item xs={6}>
                  <DatePick 
                    label="Expected closure date"
                    format="DD-MM-YYYY"
                    name="expclosuredate"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid item xs={6}>
                  <TextField name='Stage'/>
                </Grid>
                <Grid item xs={6}>
                  <AutocompleteAdd
                      options={baseData? baseData.action : []}
                      freeSolo={false}
                      addNew={false}
                      renderInput={(params)=> <TextField {...params} name="nextaction" label="Next Action" />}
                    />
                </Grid>
                <Grid item xs={6}>
                  <DatePick 
                    label="Next Action date"
                    format="DD-MM-YYYY"
                    name="nextactiondate"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Seperator>Other Details</Seperator>
              </Grid>
              {/* create date*/} 
              <Grid item xs={6}>
                <DatePick 
                  label="Create Date"
                  format="DD-MM-YYYY"
                  readOnly={true}
                  defaultValue={new Date()}
                  />
              </Grid>

              {/* creator */}
              <Grid item xs={6}>
                <Typography component="div" sx={{ position: 'relative', backgroundColor: 'white'}}>
                  Created by: {baseData.userName} 
                </Typography>
              </Grid>

            </Grid>
          </Paper>
        </form>
      </ThemeProvider>
    </>
  );
}



/*
                <Grid item xs={6} md={12}>
                  <AddPersonDialog
                    options={baseData? baseData.person:[]}
                    freeSolo={false}
                    addNew={true}
                    renderInput={(params)=> <TextField {...params} name="contactperson" label="Contact Person" />}
                  />
                </Grid>
*/