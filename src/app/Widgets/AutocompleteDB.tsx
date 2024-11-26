import {
  useState,
  ReactNode,
  useEffect,
  SyntheticEvent,
  Dispatch,
  SetStateAction,
  HTMLAttributes,
} from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { debounce } from "@mui/material/utils";
import TextField from "@mui/material/TextField";
import Popper from "@mui/material/Popper";
import { formErrorT } from "../models/models";
import { InputControl, InputType } from "./input/InputControl";
import { optionsDataT } from '@/app/models/models';
import { CustomStyledDiv } from "../utils/styledComponents";
import { autocompleteTextfieldSx } from "../utils/theme.util";
import { propagateServerField } from "next/dist/server/lib/render-server";

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
  diaglogVal: optionsDataT;
  setDialogVal: Dispatch<SetStateAction<optionsDataT>>;
  formError?: formErrorT;
  required?: boolean;
  defaultValue?: optionsDataT;
  notEmpty?: boolean;
  fnSetModifyMode: (id: string) => void;
  disable?: boolean;
  defaultOptions?: optionsDataT[]
  showDetails?: boolean
  autoFocus?: boolean
  //children: React.FunctionComponentElements
};

export function AutocompleteDB(props: autocompleteDBT) {
  const filterOpts = async (opts: optionsDataT[], input: string) => {
    return opts.filter(item => item.name.toLowerCase().includes(input ? input.toLowerCase() : ''));
  }

  const [inputValue, setInputValue] = useState<string | undefined>(undefined);

  const [defaultOpts, setDefaultOpts] = useState<optionsDataT[]>(props.defaultOptions ? props.defaultOptions : []);
  const [options, setOptions] = useState<optionsDataT[]>(defaultOpts);
  const width = props.width ? props.width : 300;
  const [valueChange, setvalueChange] = useState(true);
  const [autoSelect, setAutoSelect] = useState(props.notEmpty);
  const [defaultValue, setDefaultValue] = useState<optionsDataT | undefined>(props.defaultValue);
  let hltIndex = -1;
  let isTabbingOut = 0;
  // const [selectDefault, setSelectDefault] = useState(
  // Boolean(props.defaultValue? true: false)
  // );
  // const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showDetails = props.showDetails ? props.showDetails : false;

  if (defaultValue?.name !== props.defaultValue?.name) {
    props.setDialogVal(props.defaultValue as optionsDataT);
    console.log("set the default value!");
  }

  // useEffect(() => {

  // }, [props.defaultValue]);

  useEffect(() => {

    const getData = debounce(async (input) => {
      let results
      if (!(props.defaultOptions && !props.diaglogVal.reloadOpts) && open) {
        results = (await props.fetchDataFn(props.defaultOptions ? '' : input)) as optionsDataT[];
        if (props.diaglogVal?.reloadOpts) {
          setDefaultOpts(results)
          props.setDialogVal({ ...props.diaglogVal, reloadOpts: false })
          return
        }
      }
      else {
        results = await filterOpts(defaultOpts, input)
      }

      setOptions([] as optionsDataT[]);
      // setLoading(false);
      if (results) {
        if (autoSelect && inputValue === "") {
          props.setDialogVal(results[0]);
        }
        setOptions(results);
      }
    }, 400);
    if (defaultValue?.name !== props.defaultValue?.name) {
      console.log("in the defaultvalue condition ------", defaultValue, "- ", props.defaultValue);
      setvalueChange(true);
      props.setDialogVal(props.defaultValue as optionsDataT);
      setDefaultValue(props.defaultValue);
      setOptions(defaultOpts);
    }

    if (valueChange || autoSelect) {
      if (open) {
        // setLoading(true)
        getData(inputValue);
      }
    }
  }, [inputValue, autoSelect, open]);


  function getOptions(option: any, selectFunc?: SelectOptionsFunction): string {
    if (Object.keys(option).length > 0) {
      if (selectFunc) {
        return selectFunc(option);
      }
      return option.name;
    }
    return "";
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Tab') {
      isTabbingOut = 1;
    }
  }

  function onHighlightChange(event: SyntheticEvent, option: optionsDataT | null, reason: string) {
    if (option) {
      hltIndex = options.indexOf(option);
    }
    const text = document.getElementById(
      "popper_textid_temp_5276"
    ) as HTMLInputElement;

    if (text && option) {
      text.value = option.detail ?? option.name;
    }
  }

  return (
    <Autocomplete
      id={props.id}
      disabled={props.disable ? props.disable : false}
      options={options}
      // loading={loading}
      getOptionLabel={(option) => option.name ?? ""}
      autoHighlight
      onKeyDown={handleKeyDown}
      filterOptions={(options, { inputValue }) =>
        options.filter(option =>
          // option.detail? option.detail.toLowerCase().includes(inputValue.toLowerCase()) : option.name.toLowerCase().includes(inputValue.toLowerCase())
          `${option.detail ?? ''}${option.name ?? ''}`.toLowerCase().includes(inputValue.toLowerCase())
        )
      }
      renderOption={(p, option) => {
        const pWithKey = p as HTMLAttributes<HTMLLIElement> & { key: string };
        const { ["key"]: _, ...newP } = pWithKey;
        return (
          <li key={pWithKey.key} {...newP}>
            {option.name}
          </li>
        );
        //return <li>{getOptions(option, props.renderOptions)}</li>;
      }}
      sx={{ width: { width } }}
      renderInput={(params) => {
        return (
          <InputControl
            {...params}
            inputType={InputType.TEXT}
            name={props.name}
            label={props.label}
            required={props.required}
            error={props.formError?.error}
            helperText={props.formError?.msg}
          />
        );
      }}
      onHighlightChange={onHighlightChange}
      value={props.diaglogVal}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      PopperComponent={(props) =>

        showDetails ? (
          <Popper
            {...props}
          >
            <CustomStyledDiv>
              {props.children as ReactNode}

              <TextField
                id="popper_textid_temp_5276"
                variant="standard"
                defaultValue={" "}
                InputProps={{
                  style: {
                    ...autocompleteTextfieldSx,
                    height: "100%"
                  },
                }}
                multiline
                rows={4}
                fullWidth

              />
            </CustomStyledDiv>
          </Popper>

        ) : (
          <Popper {...props}>
            <CustomStyledDiv>
              {props.children as ReactNode}
            </CustomStyledDiv>
          </Popper>
        )
      }
      onBlur={(e) => {
        setAutoSelect(props.notEmpty)

        if (isTabbingOut) {
          console.log("index ---:", hltIndex);
          if (hltIndex >= 0 && options.length > 0) {
            setInputValue(options[hltIndex].name);
            props.setDialogVal(options[hltIndex]);
            if (props.onChange) {
              props.onChange(e, options[hltIndex], props.setDialogVal)
            }
          }
          isTabbingOut = 0;
          hltIndex = -1
        }
      }}
      onOpen={(e) => {
        setOpen(true);
        setvalueChange(true);
        setInputValue("");
      }}
      onClose={(e) => {
        setOpen(false);
        setvalueChange(false);
      }}
      onChange={(event: any, newValue, reason) => {
        if (reason != "blur") {
          props.setDialogVal(
            newValue ? (newValue as optionsDataT) : ({} as optionsDataT)
          );
          props.onChange
            ? props.onChange(event, newValue, props.setDialogVal)
            : null;
        }
        console.log("change---!!!");
      }}
      onInputChange={(event, newInputValue, reason) => {
        setAutoSelect(false);
        if (reason != "reset") {
          setvalueChange(true);
          setInputValue(newInputValue);
        }
      }}
      forcePopupIcon={true}
      // autoHighlight
      noOptionsText={" "}
      autoComplete
      includeInputInList
      disableClearable={
        inputValue ? inputValue.length === 0 : !Boolean(props.diaglogVal?.id)
      }
    />
  );
}

export default AutocompleteDB;
