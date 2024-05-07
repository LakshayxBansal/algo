'use client'
import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import AutocompleteDB from '@/app/Widgets/AutocompleteDB';
import {AddDialog} from './addDialog';
import { optionsDataT } from '../../models/models';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { IconButton } from "@mui/material";
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import { debounce } from '@mui/material/utils';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

type RenderFormFunction = (
  fnDialogOpen: (props: any) => void,
  fnDialogValue: (props: any) => void
) => JSX.Element;


type selectMasterWrapperT = {
  name: string,
  id: string,
  label: string,
  dialogTitle: string,
  width?: number,
  allowNewAdd?:boolean,
  fetchDataFn: (arg0: string) => Promise<any>,
  renderForm: RenderFormFunction,
  //children: React.FunctionComponentElement
}

export function SelectMasterWrapper(props: selectMasterWrapperT ) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState<optionsDataT>({id:0, name: ""});
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<optionsDataT[]>([]);
  const width = props.width? props.width: 300;
  const allowNewAdd = props.allowNewAdd === false? false: true;

  React.useEffect(() => {
/*
    if (inputValue === '') {
      return undefined;
    }
  */  
    
    const getData = debounce(async (input) => {
      const results = await props.fetchDataFn(input);
      if (results) {
        setOptions(results);
      }
    },400);

    getData(inputValue);
  }, [inputValue]);



  function openDialog(){
    if (allowNewAdd) {
      setDialogOpen(true);
    }
  }
  return (
    <>
      <Grid item xs={12} md={12}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Autocomplete
              id={props.id} 
              getOptionLabel={(option) =>
              typeof option === 'string' ? option : option.name
              }
            filterOptions={(x) => x}
            sx={{ width: {width} }}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            onChange={(event: any, newValue) => {
              setDialogValue(newValue as optionsDataT);
            }}
            value={dialogValue}
            noOptionsText="Please type a few chars or click + to add..."
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            renderInput={(params)=> <TextField {...params} name={props.name} label={props.label} />} 
            renderOption={(props, option) => {
              return (
                <li {...props}>
                  <Grid container alignItems="center">
                    <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                      <Typography variant="body2" color="text.secondary">
                        {option.name}
                      </Typography>
                    </Grid>
                  </Grid>
                </li>
              );
            }}
          />
          <Tooltip  title={allowNewAdd? "Click to add new" : "Not allowed to add"} placement="top">
            <IconButton onClick={openDialog}>
              <AddBoxIcon color="primary" fontSize="large"/>
            </IconButton>
          </Tooltip>
        </Box>
      </Grid>
      {dialogOpen && 
        <AddDialog
          title={props.dialogTitle} 
          open={dialogOpen} 
          setDialogOpen={setDialogOpen} 
          >
            {props.renderForm(setDialogOpen, setDialogValue)}
        </AddDialog>
      }
    </>
  );
}

/*



          <AutocompleteDB
            id={props.id} 
            sx={{ width: {width} }}
            renderInput={(params)=> <TextField {...params} name={props.name} label={props.label} />} 
            options={[]}
            dataValues={props.fetchDataFn}
            value={dialogValue}
          />
*/