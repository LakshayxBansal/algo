'use client'

import React, { Children, useState } from "react";
import Autocomplete, { createFilterOptions, AutocompleteProps } from "@mui/material/Autocomplete";
import { optionsDataT } from '../models/models';

const filter = createFilterOptions<optionsDataT>();

// : JSX.Element
//  renderInput: (params: object) => ReactNode;


export interface propsDataT extends AutocompleteProps<optionsDataT, boolean | undefined, boolean | undefined, boolean | undefined> {
  addNew: boolean;
  setDlgValue?: (props: any) => void;
  inputProps?: object;
}

/**
 * 
 * @param props json
 * data = function to get the options data
 * addNew = true/false for option to add new
 * label = label for the select box
 * @returns 
 */
const AutocompleteAdd = (props: propsDataT) => {
//export default function AutocompleteAdd(props: propsData) {
  const [selectedValue, setSelectedValue] = useState<optionsDataT>();
  //const [arrValues, setarrValues] = useState<optionsData[]>([]);
  const optionsData = props.options;

  const handleOnChange = (event: any, value: any) => {
    // Update the selected city in state
    console.log(value);
    if (value && props.addNew && value.id==0 && props.setDlgValue) {
      // remove "Add " from the value
      const str = value.name.slice(4);
      props.setDlgValue({name: str});
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
        getOptionLabel={(option) => (typeof option === "string" ? option : option.name)}
        renderInput={props.renderInput}
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


export default AutocompleteAdd;