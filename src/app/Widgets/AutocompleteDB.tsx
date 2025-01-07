import {
  useState,
  ReactNode,
  useEffect,
  SyntheticEvent,
  Dispatch,
  SetStateAction,
  HTMLAttributes,
  Fragment,
} from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { debounce } from "@mui/material/utils";
import TextField from "@mui/material/TextField";
import Popper, { PopperProps } from "@mui/material/Popper";
import { formErrorT } from "../models/models";
import { InputControl, InputType } from "./input/InputControl";
import { optionsDataT } from "@/app/models/models";
import { CustomStyledDiv } from "../utils/styledComponents";
import { autocompleteTextfieldSx } from "../utils/theme.util";
import { InputAdornment } from "@mui/material";

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
  width?: number | string;
  diaglogVal: optionsDataT;
  setDialogVal: Dispatch<SetStateAction<optionsDataT>>;
  formError?: formErrorT;
  required?: boolean;
  defaultValue?: optionsDataT;
  notEmpty?: boolean;
  // fnSetModifyMode: (id: string) => void;
  disable?: boolean;
  defaultOptions?: optionsDataT[];
  showDetails?: boolean;
  autoFocus?: boolean;
  iconControl?: React.ReactNode | null;
  setFormError?: (props: any) => void
  //children: React.FunctionComponentElements
};


const filterOpts = async (opts: optionsDataT[], input: string) => {
  return opts.filter((item) =>
    item.name.toLowerCase().includes(input ? input.toLowerCase() : "")
  );
};


/**
 * AutocompleteDB is a functional component that wraps the MUI autocomplete input field.
 * It filters options based on user input searches in the db.
 * It manages various states related to the input field.
 * 
 * Props:
 * - width: The width of the autocomplete input field.
 * - diaglogVal: The current value of the of the field.
 * - setDialogVal: Function to set the dialog value.
 * - formError: Object representing form errors.
 * - required: Boolean indicating if the field is required.
 * - defaultValue: The default value for the autocomplete input.
 * - notEmpty: Boolean indicating if the input should not be empty.
 * - fnSetModifyMode: Function to set modify mode by id.
 * - disable: Boolean indicating if the input should be disabled.
 * - defaultOptions: Array of default options for the autocomplete. this is used in case the values are supplied for initial load.
 * - showDetails: Boolean indicating if details box below the list should be shown.
 * - autoFocus: Boolean indicating if the input should be auto-focused.
 * - iconControl: React node for custom icon control.
 * - setFormError: Function to set form errors.
 * 
 * State:
 * - inputValue: The current input value entered by user.
 * - defaultOpts: The default options for the autocomplete.
 * - options: The filtered options based on user input.
 * - valueChange: Boolean indicating if the value has changed.
 * - autoSelect: Boolean indicating if the input should auto-select.
 * - defaultValue: The current default value.
 * - open: Boolean indicating if the autocomplete dropdown is open.
 * 
 */
export function AutocompleteDB(props: autocompleteDBT) {
  const [inputValue, setInputValue] = useState<string | undefined>(undefined);
  const [defaultOpts, setDefaultOpts] = useState<optionsDataT[]>(
    props.defaultOptions ? props.defaultOptions : []
  );
  const [options, setOptions] = useState<optionsDataT[]>(defaultOpts);
  const width = props.width ? props.width : '100%';
  const [valueChange, setvalueChange] = useState(false);
  const [autoSelect, setAutoSelect] = useState(props.notEmpty);
  const [defaultValue, setDefaultValue] = useState<optionsDataT | undefined>(
    props.defaultValue
  );
  const [open, setOpen] = useState(false);
  const showDetails = props.showDetails ? props.showDetails : false;
  let hltIndex = -1;
  let isTabbingOut = 0;

  if (defaultValue?.name !== props.defaultValue?.name) {
    props.setDialogVal(props.defaultValue as optionsDataT);
  }


  const fetchData = async (input: string) => {

      let results;
      if (!(props.defaultOptions && !props.diaglogVal.reloadOpts)) {
        results = (await props.fetchDataFn(
          props.defaultOptions ? "" : input
        )) as optionsDataT[];
  
        if (props.diaglogVal?.reloadOpts) {
          setDefaultOpts(results);
          props.setDialogVal({ ...props.diaglogVal, reloadOpts: false });
          return;
        }
      } else {
        results = await filterOpts(defaultOpts, input);
      }
  
      // setOptions([] as optionsDataT[]);
      // setLoading(false);
      if (results) {
        if (autoSelect && inputValue === "") {
          props.setDialogVal(results[0]);
        }
        setOptions(results);
      }
  };

  

  useEffect(() => {
    const getData = debounce(async (input) => await fetchData(input), 400);
    if (defaultValue?.name !== props.defaultValue?.name) {
      setvalueChange(true);
      props.setDialogVal(props.defaultValue as optionsDataT);
      setDefaultValue(props.defaultValue);
      setOptions(defaultOpts);
    }

    if (valueChange || autoSelect) {
      // if (open) {
        // setLoading(true)
        getData(inputValue?.trim() ?? "");
      // }
    }
  }, [inputValue, autoSelect, open]);


  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Tab") {
      isTabbingOut = 1;
    }
  }

  function onHighlightChange(
    event: SyntheticEvent,
    option: optionsDataT | null,
    reason: string
  ) {
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

    /**
   * Renders the input control for the Autocomplete component.
   * 
   * @param {any} params - The parameters passed from the Autocomplete component.
   * @returns {JSX.Element} The rendered input control.
   */
  function renderInput(params: any): JSX.Element {
    return (
      <InputControl
        {...params}
        // {...props}
        inputType={InputType.TEXT}
        name={props.name}
        label={props.label}
        required={props.required}
        error={props.formError?.error}
        helperText={props.formError?.msg}
        setFormError={props.setFormError}
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <Fragment>
              {props.iconControl ? (
                <InputAdornment position="end">
                  {props.iconControl}
                </InputAdornment>
              ) : (
                params?.InputProps?.endAdornment
              )}
            </Fragment>
          ),
        }}
      />
    );
  }

  /**
   * Renders a Popper component with custom styling and optional TextField.
   * 
   * @param {PopperProps} props - The properties passed to the Popper component.
   * @returns {JSX.Element} The rendered Popper component.
   */
  function showPopper(props: PopperProps): JSX.Element {
    if (showDetails) {
      return (
        <Popper {...props}>
          <CustomStyledDiv>
            {props.children as ReactNode}
            {/* TextField component with custom styling and multiline support */}
            <TextField
              id="popper_textid_temp_5276"
              variant="standard"
              defaultValue={" "}
              InputProps={{
                style: {
                  ...autocompleteTextfieldSx,
                  height: "100%",
                },
              }}
              multiline
              rows={4}
              fullWidth
            />
          </CustomStyledDiv>
        </Popper>
      );
    } else {
      return (
        <Popper {...props}>
          <CustomStyledDiv>{props.children as ReactNode}</CustomStyledDiv>
        </Popper>
      );
    }
  }


  return (
    <Autocomplete
      open={open}
      id={props.id}
      disabled={props.disable ? props.disable : false}
      options={options}
      getOptionLabel={(option) => option.name ?? ""}
      autoHighlight
      onKeyDown={handleKeyDown}
      renderInput={(params) => renderInput(params)}
      onHighlightChange={onHighlightChange}
      value={props.diaglogVal?.id ? props.diaglogVal : null}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      PopperComponent={(props) =>  showPopper(props)}
      filterOptions={(options, { inputValue }) =>
        options.filter((option) =>
          `${option.detail ?? ""}${option.name ?? ""}`
            .toLowerCase()
            .includes((inputValue.toLowerCase()).trim())
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
      }}
      sx={{
        width: { width },
        "&.MuiAutocomplete-hasPopupIcon .MuiAutocomplete-inputRoot": {
          paddingRight: 1,
        },
        "&.MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon .MuiAutocomplete-inputRoot":
        {
          paddingRight: 1,
        },
      }}
      

      onBlur={(e) => {
        setAutoSelect(props.notEmpty);

        if (isTabbingOut) {
          if (hltIndex >= 0 && options.length > 0) {
            setInputValue(options[hltIndex].name);
            props.setDialogVal(options[hltIndex]);
            if (props.onChange) {
              props.onChange(e, options[hltIndex], props.setDialogVal);
            }
          }
          isTabbingOut = 0;
          hltIndex = -1;
        }
      }}
      onOpen={async (e) => {
        await fetchData("");
        setvalueChange(true);
        setInputValue("");
        setOpen(true);

      }}
      onClose={(e) => {
        setOpen(false);
        setvalueChange(false);
      }}
      onChange={(event: any, newValue, reason) => {
        if (props.formError?.error && props.setFormError) {
          props.setFormError((prevFormError: Record<string, any>) => {
            const updatedFormError = { ...prevFormError };

            if (updatedFormError['form']) {
              delete updatedFormError['form']; // Remove the 'formError' property
            }

            return {
              ...updatedFormError,
              [props.name]: {
                error: false,
                msg: "",
              },
            };
          });
        }

        if (reason != "blur") {
          props.setDialogVal(
            newValue ? (newValue as optionsDataT) : ({} as optionsDataT)
          );
          props.onChange
            ? props.onChange(event, newValue, props.setDialogVal)
            : null;
        }
      }}
      onInputChange={(event, newInputValue, reason) => {
        setAutoSelect(false);
        if (reason != "reset") {
          setvalueChange(true);
          setInputValue(newInputValue);
        }
      }}
      forcePopupIcon={true}
      autoComplete
      includeInputInList
      disableClearable={
        inputValue ? inputValue.length === 0 : !Boolean(props.diaglogVal?.id)
      }
    />
  );
}

export default AutocompleteDB;
