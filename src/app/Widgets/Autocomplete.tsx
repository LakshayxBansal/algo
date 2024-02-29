import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Chip from '@mui/material/Chip';

//const filter = createFilterOptions();

interface propsData {
  allowFreeSolo: boolean;
  data: [{
    id: number;
    name: string;
  }]
  addNew: boolean;
  label: string;
}

/**
 * 
 * @param props json
 * allowFreeSolo = true/false for allowing free text
 * data = function to get the options data
 * addNew = true/false for option to add new
 * label = label for the select box
 * @returns 
 */
export default function AutocompleteAdd(props: propsData) {
  const [selectedValue, setSelectedValue] = useState(null);
  const [arrValues, setarrValues] = useState([]);
  /*
  useEffect(() => {
    // Fetch options from your database (e.g., using an API call)
    // and update the 'options' state.
    // Replace this with your actual data fetching logic.
    const fetchData = async () => {
      try {

        //const response = await props.data(); // Your API endpoint
        console.log(props.data);
        const data = JSON.parse(props.data);
        //const data = await response.json();
        setarrValues(data); // Assuming your data is an array of objects
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchData();
  }, [props]);


        value={selectedValue}
        onChange={(event, newValue) => {
          arrValues.some((option) => {
            if (option.name === newValue) {
              setSelectedValue(option);
            }}) 
          //setSelectedValue(newValue);
        }}
        filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;

        // Suggest creating a new value if it doesn't exist
        if (inputValue !== "" && props.addNew && !options.some((option) => option.name === inputValue)) {
          filtered.push({
            name: inputValue,
            label: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
          
  */
  return (
    <Autocomplete

      options={props.data}
      renderOption={(props, option) => (
        <li {...props} key={option.name}>{option.label || option.name}</li>
      )}
      freeSolo={props.allowFreeSolo} // Allow free text input
      getOptionLabel={(option) => (typeof option === "string" ? option : option.name)}
      renderInput={(params) => <TextField {...params} label={props.label} />}
    />
  );
}
