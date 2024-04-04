import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


// use Autocomplete with options for advanced select options


export default function BasicSelect({id, label, menuItems}: {id: string, label: string, menuItems: {value:string, label:string}[]}) {
  const [value, setValue] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          labelId={id}
          id="demo-simple-select"
          variant="standard"
          value={value}
          label={label}
          onChange={handleChange}
        >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {menuItems.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
        </Select>
      </FormControl>
    </Box>
  );
}