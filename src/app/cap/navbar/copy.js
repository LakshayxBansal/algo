

<TextField
variant="outlined"
fullWidth
placeholder="Search..." 
value={""}
// onChange={}
// margin="normal"
// style={{"& .MuiInputBase-input-MuiOutlinedInput-i
// }}}
InputProps={{
  startAdornment: (
    <InputAdornment position="start">
      <SearchIcon />
    </InputAdornment>
  ),
  style: {
    backgroundColor: "#f5f5f5",
    height: "2.5em",
    marginTop: 8,
  },
}}
InputLabelProps={{
  style: {
    backgroundColor: "#f5f5f5",
  },
}}
/>