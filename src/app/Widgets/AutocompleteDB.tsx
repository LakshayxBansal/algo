import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { getCountries } from '../controllers/masters.controller';

function AutocompleteDB(props) {
  const [selectedValue, setSelectedValue] = useState(null);
  const [options, setOptions] = useState([]);

  const fetchOptions = async (inputValue: string) => {
    // Fetch data from your API or database based on inputValue
    // Update the options state with the fetched data
    // Example: const fetchedOptions = await fetchData(inputValue);
    // setOptions(fetchedOptions);
    console.log(inputValue);
    const result = await getCountries(inputValue);
    if (result) {
      setOptions(result);
    }
  };

  return (
    <Autocomplete
      options={props.options}
      value={selectedValue}
      onChange={(event, newValue) => setSelectedValue(newValue)}
      onInputChange={(event, newInputValue) => fetchOptions(newInputValue)}
      renderInput={(params) => <TextField {...params} label="Search" />}
    />
  );
}

export default AutocompleteDB;