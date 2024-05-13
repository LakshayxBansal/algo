"use client";
import React, { useState, ReactNode } from "react";
import { Box, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AddDialog } from "./addDialog";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { IconButton } from "@mui/material";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import { debounce } from "@mui/material/utils";
import Tooltip from "@mui/material/Tooltip";
import Popper from "@mui/material/Popper";

type RenderFormFunction = (
  fnDialogOpen: (props: any) => void,
  fnDialogValue: (props: any) => void
) => JSX.Element;

type OnChangeFunction = (
  event: any,
  newVal: any,
  setDialogValue: (props: any) => void
) => void;

type SelectOptionsFunction = (option: any) => string;

type selectMasterWrapperT = {
  name: string;
  id: string;
  label: string;
  dialogTitle: string;
  fetchDataFn: (arg0: string) => Promise<any>;
  renderForm: RenderFormFunction;
  onChange?: OnChangeFunction;
  renderOptions?: SelectOptionsFunction;
  labelOptions?: SelectOptionsFunction;
  highlightOptions?: SelectOptionsFunction;
  width?: number;
  allowNewAdd?: boolean;
  //children: React.FunctionComponentElement
};

export function SelectMasterWrapper<CustomT>(props: selectMasterWrapperT) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState<CustomT>({} as CustomT);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<CustomT[]>([]);
  const width = props.width ? props.width : 300;
  const allowNewAdd = props.allowNewAdd === false ? false : true;

  React.useEffect(() => {
    /*
    if (inputValue === '') {
      return undefined;
    }
  */

    const getData = debounce(async (input) => {
      const results = (await props.fetchDataFn(input)) as CustomT[];
      if (results) {
        setOptions(results);
      }
    }, 400);

    getData(inputValue);
  }, [inputValue]);

  function getOptions(option: any, selectFunc?: SelectOptionsFunction): string {
    if (Object.keys(option).length > 0) {
      if (selectFunc) {
        return selectFunc(option);
      }
      return option.name;
    }
    return "";
  }

  function onHighlightChange(
    event: React.SyntheticEvent,
    option: any,
    reason: string
  ) {
    const text = document.getElementById(
      "popper_textid_temp_5276"
    ) as HTMLInputElement;

    if (text && option) {
      console.log(option);
      text.value = getOptions(option, props.highlightOptions);
    }
  }

  function openDialog() {
    if (allowNewAdd) {
      setDialogOpen(true);
    }
  }

  //             ListboxComponent={customListbox}

  return (
    <>
      <Grid item xs={12} md={12}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Autocomplete
            id={props.id}
            options={options}
            getOptionLabel={(option) =>
              typeof option === "string"
                ? option
                : getOptions(option, props.labelOptions)
            }
            renderOption={(p, option) => {
              return <li {...p}>{getOptions(option, props.renderOptions)}</li>;
            }}
            sx={{ width: { width } }}
            renderInput={(params) => (
              <TextField {...params} name={props.name} label={props.label} />
            )}
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
                  inputProps={{ style: { color: "blue", fontSize: 10 } }}
                  multiline
                  rows={2}
                  fullWidth
                />
              </Popper>
            )}
            autoComplete
            includeInputInList
            onChange={(event: any, newValue) => {
              setDialogValue(newValue as CustomT);
              props.onChange
                ? props.onChange(event, newValue, setDialogValue)
                : null;
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
          />
          <Tooltip
            title={allowNewAdd ? "Click to add new" : "Not allowed to add"}
            placement="top"
          >
            <IconButton onClick={openDialog}>
              <AddBoxIcon color="action" fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Grid>
      {dialogOpen && (
        <AddDialog
          title={props.dialogTitle}
          open={dialogOpen}
          setDialogOpen={setDialogOpen}
        >
          {props.renderForm(setDialogOpen, setDialogValue)}
        </AddDialog>
      )}
    </>
  );
}
