import { useState, ReactNode, useEffect, SyntheticEvent, Dispatch, SetStateAction}from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { debounce } from '@mui/material/utils';
import TextField from "@mui/material/TextField";
import Popper from "@mui/material/Popper";

type OnChangeFunction = (
  event: any,
  newVal: any,
  setDialogValue: (props: any) => void
) => void;

type SelectOptionsFunction = (option: any) => string;

type autocompleteDBT = {
  name: string;
  id: string;
  label: string;
  fetchDataFn: (arg0: string) => Promise<any>;
  onChange?: OnChangeFunction;
  renderOptions?: SelectOptionsFunction;
  labelOptions?: SelectOptionsFunction;
  highlightOptions?: SelectOptionsFunction;
  width?: number;
  diaglogVal?: any;
  setDialogVal?: Dispatch<SetStateAction<any>>
  //children: React.FunctionComponentElement
};

export function AutocompleteDB<CustomT>(props: autocompleteDBT)
{
  const [inputValue, setInputValue] = useState("");
  let [diaglogValue, setDialogValue] = useState<CustomT>({} as CustomT);
  if (props.diaglogVal && props.setDialogVal) {
    diaglogValue = props.diaglogVal
    setDialogValue = props.setDialogVal
  }
  
  const [options, setOptions] = useState<CustomT[]>([]);
  const width = props.width ? props.width : 300;

  useEffect(() => {
    
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
    event: SyntheticEvent,
    option: any,
    reason: string
  ) {
    const text = document.getElementById(
      "popper_textid_temp_5276"
    ) as HTMLInputElement;

    if (text && option) {
      text.value = getOptions(option, props.highlightOptions);
    }
  }

  return (
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
            value={diaglogValue}
            isOptionEqualToValue={(option, value) => option === value}
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
  );
}

export default AutocompleteDB;