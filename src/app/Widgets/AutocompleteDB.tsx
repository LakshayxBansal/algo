import * as React from 'react';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { debounce } from '@mui/material/utils';
import { optionsDataT } from '../models/models';

export type AutocompletePropsDataT = {
  dataValues: (arg0: string) => Promise<any>;
} & AutocompleteProps<any, false, false, false>;

const AutocompleteDB: React.FC<AutocompletePropsDataT> = ({
    dataValues,
    ...otherProps}) => 
{
  const [inputValue, setInputValue] = React.useState(otherProps.value);
  const [options, setOptions] = React.useState<optionsDataT[]>([]);

  React.useEffect(() => {
/*
    if (inputValue === '') {
      return undefined;
    }
  */  
    
    const getData = debounce(async (input) => {
      const results = await dataValues(input);
      if (results) {
        setOptions(results);
      }
    },400);

    getData(inputValue);
  }, [inputValue]);


  return (
    <Autocomplete
      {...otherProps}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.name
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={inputValue}
      noOptionsText="Please type a few chars or click + to add..."
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
      }}
    />
  );
}

export default AutocompleteDB;
