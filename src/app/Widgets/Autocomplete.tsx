'use client'

import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Chip from '@mui/material/Chip';

const filter = createFilterOptions<optionsData>();

export interface optionsData {
  id: number;
  name: string;
}

export interface propsData {
  allowFreeSolo: boolean;
  data: optionsData[];
  addNew: boolean;
  label: string;
  addFunction?: (props: any) => void;
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
  //const [arrValues, setarrValues] = useState<optionsData[]>([]);
  const optionsData = props.data;

  const handleOnChange = (event: any, value: any) => {
    // Update the selected city in state
    console.log(value);
    if (props.addNew && value.id==0 && props.addFunction) {
      // remove "Add " from the value
      const str = value.name.slice(4);
      props.addFunction({name: str});
    } else {
      setSelectedValue(value);
    }
  };

  return (
    <Autocomplete
      options={optionsData?  optionsData: []}
      renderOption={(props, option) => (
        <li {...props} key={option.name}>{option.name}</li>
      )}
      freeSolo={props.allowFreeSolo} // Allow free text input
      getOptionLabel={(option) => (typeof option === "string" ? option : option.name)}
      renderInput={(params) => <TextField {...params} label={props.label} />}
      value={selectedValue}
      onChange={handleOnChange}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;

        // Suggest creating a new value if it doesn't exist
        if (inputValue !== "" && props.addNew && !options.some((option) => option.name === inputValue)) {
          filtered.push({
            id: 0,
            name: `Add ${inputValue}`,
          });
        }

        return filtered;
      }}

    />
  );
}
