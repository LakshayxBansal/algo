'use client'
import React, { useState, forwardRef, ReactNode } from 'react';
import { Box, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import {AddDialog} from './addDialog';
import { optionsDataT } from '../../models/models';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { IconButton } from "@mui/material";
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import { debounce } from '@mui/material/utils';
import Tooltip from '@mui/material/Tooltip';
import Popper from '@mui/material/Popper';

type RenderFormFunction = (
  fnDialogOpen: (props: any) => void,
  fnDialogValue: (props: any) => void,
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


  function onHighlightChange(event: React.SyntheticEvent, option: any, reason: string) {
    const text = document.getElementById("popper_textid_temp_5276") as HTMLInputElement;

    if (text && option) {
      const val = option.name;
      console.log(option?.name);
      text.value = 'new' + val;
    }
  }

  function openDialog(){
    if (allowNewAdd) {
      setDialogOpen(true);
    }
  }

//             ListboxComponent={customListbox}


  return (
    <>
      <Grid item xs={12} md={12}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Autocomplete
            id={props.id} 
            options={options}
            getOptionLabel={(option) => typeof option === 'string' ? option : option.name }
            sx={{ width: {width} }}
            renderInput={(params)=> <TextField {...params} name={props.name} label={props.label} />} 
            onHighlightChange={onHighlightChange} 
            autoSelect={true}
            autoHighlight={true}
            value={dialogValue}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            freeSolo={true}
            forcePopupIcon={true}
            PopperComponent={(props) => (
              <Popper {...props}>
                {props.children as ReactNode}
                <TextField
                  id="popper_textid_temp_5276"
                  variant="outlined"
                  inputProps={{ style: { color: "blue", fontSize:10 } }}
                  multiline
                  rows={2}
                  fullWidth
                />
              </Popper>
            )}
            autoComplete
            includeInputInList
            onChange={(event: any, newValue) => {
              setDialogValue(newValue as optionsDataT);
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
          />
          <Tooltip  title={allowNewAdd? "Click to add new" : "Not allowed to add"} placement="top">
            <IconButton onClick={openDialog}>
              <AddBoxIcon color="action" fontSize="small"/>
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

          <Autocomplete
            id={props.id} 
            getOptionLabel={(option) => typeof option === 'string' ? option : option.name }
            onChange={(event: any, newValue) => {
              setDialogValue(newValue as optionsDataT);
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            renderInput={(params)=> <TextField {...params} name={props.name} label={props.label} />} 
            options={options}       // needed
            autoComplete            // needed
            includeInputInList      // needed
            filterSelectedOptions   // causing issues
            filterOptions={(x) => x} // not needed
            onHighlightChange={onHighlightChange}   // not working
            PopperComponent={(props) => (
              <Popper {...props}>
                {props.children}
                <TextField
                  label="Additional Details"
                  variant="outlined"
                  value={addtionalDetails? addtionalDetails.name: ''}
                  disabled={true}
                  multiline
                  rows={2}
                  fullWidth
                />
              </Popper>
            )}

            value={dialogValue}
            noOptionsText="Please type a few chars or click + to add..."

          />



            filterOptions={(x) => x}
            sx={{ width: {width} }}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={dialogValue}
            noOptionsText="Please type a few chars or click + to add..."


            renderOption={(props, option) => {      // not needed as of now
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


                            <TextField
                  label="Additional Details"
                  variant="outlined"
                  value={addtionalDetails? addtionalDetails.name: ''}
                  disabled={true}
                  multiline
                  rows={2}
                  fullWidth
                />
          */