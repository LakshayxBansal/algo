import {
  Fragment,
  useState,
  ReactNode,
  useEffect,
  SyntheticEvent,
  Dispatch,
  SetStateAction,
} from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { debounce } from "@mui/material/utils";
import TextField from "@mui/material/TextField";
import Popper from "@mui/material/Popper";
import { formErrorT } from "../models/models";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

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
  setDialogVal?: Dispatch<SetStateAction<any>>;
  formError?: formErrorT;
  required?: boolean;
  defaultValue?: string;
  notEmpty?: boolean;
  //children: React.FunctionComponentElement
};

export function AutocompleteDB<CustomT>(props: autocompleteDBT) {
  const [inputValue, setInputValue] = useState(
    props.defaultValue ? props.defaultValue : null
  );
  const [options, setOptions] = useState<CustomT[]>([]);
  const width = props.width ? props.width : 300;
  const [valueChange, setvalueChange] = useState(true);
  const [autoSelect, setAutoSelect] = useState(props.notEmpty);
  const [selectDefault, setSelectDefault] = useState(
    Boolean(props.defaultValue)
  );
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  let [diaglogValue, setDialogValue] = useState<CustomT>({} as CustomT);

  if (props.diaglogVal && props.setDialogVal) {
    diaglogValue = props.diaglogVal;
    setDialogValue = props.setDialogVal;
  }

  useEffect(() => {
    console.log('effect jp')
    const getData = debounce(async (input) => {
      console.log(input)
      const results = (await props.fetchDataFn(input)) as CustomT[]
      setLoading(false)
      if (results) {
        if (
          (autoSelect && inputValue === "") ||
          (selectDefault && results.length === 1)
        ) {
          setDialogValue(results[0]);
        }
        setOptions(results);
        setSelectDefault(false);
      }
    }, 400);
    if (valueChange || autoSelect) {
      setLoading(true)
      getData(inputValue);
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
      loading={loading}
      getOptionLabel={(option) => {
        return typeof option === "string"
          ? option
          : getOptions(option, props.labelOptions);
      }}
      renderOption={(p, option) => {
        return <li {...p}>{getOptions(option, props.renderOptions)}</li>;
      }}
      sx={{ width: { width } }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            name={props.name}
            label={props.label}
            required={props.required}
            error={props.formError?.error}
            helperText={props.formError?.msg}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Fragment>
                  <IconButton
                    onClick={(param) => {
                      console.log("modify- " + param);
                      console.log(param);
                      console.log(params.inputProps.value);
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            }}
          />
        );
      }}
      onHighlightChange={onHighlightChange}
      value={diaglogValue}
      isOptionEqualToValue={(option, value) => option === value}
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
      onBlur={(e) => setAutoSelect(props.notEmpty)}
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
          setDialogValue(newValue ? (newValue as CustomT) : ({} as CustomT));
          props.onChange
            ? props.onChange(event, diaglogValue, setDialogValue)
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
      autoHighlight
      autoComplete
      includeInputInList
    />
  );
}

export default AutocompleteDB;
