import * as React from 'react';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { debounce } from '@mui/material/utils';
import { optionsDataT } from '../models/models';

export type AutocompletePropsDataT = {
  addNew: boolean;
  setDialogOpen?: (props: any) => void;
  setDialogValue?: (props: any) => void;
  dataValues: (arg0: string) => Promise<any>;
} & AutocompleteProps<any, false, false, false>;

const AutocompleteDB: React.FC<AutocompletePropsDataT> = ({
    addNew,
    setDialogOpen,
    setDialogValue, 
    dataValues,
    ...otherProps}) => 
{
  const [value, setValue] = React.useState<optionsDataT | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<optionsDataT[]>([]);

  React.useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }
    
    const getData = debounce(async (input) => {
      const results = await dataValues(input);

      if (input !== "" && !results?.some((option:optionsDataT) => option.name === input)) {
        results.push({
          id: 0,
          name: `Add ${input}`,
        });
      }

      if (results) {
        setOptions(results);
        console.log(options);
      }
    },400);

    getData(inputValue);

    return () => {
      active = false;
    };
  }, [value, inputValue]);


  const handleOnChange = (event: any, value: optionsDataT | any) => {
    if (value && addNew && value.id==0) {
      // remove add from options
      const updatedOptions = options.filter(obj => obj.id !== 0);
      setOptions(updatedOptions);
      // remove "Add " from the value
      const val = {id: 0, name: value.name.slice(4) as string};
      setInputValue("");
      if(setDialogValue) {
        setDialogValue(val);
      }

      if (setDialogOpen) {
        setDialogOpen(true);
      }

      setValue(val);
    } else {
      setValue(value);
    }
  };

  return (
    <Autocomplete
      {...otherProps}
      defaultValue={value}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.name
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="Please type a few chars..."
      onChange={handleOnChange}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={otherProps.renderInput}
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
      }}/>
  );
}

export default AutocompleteDB;
