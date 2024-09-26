"use client"
import * as React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Typography, Checkbox, OutlinedInput } from "@mui/material"
import { AutocompleteDB } from "@/app/Widgets/AutocompleteDB"
import { optionsDataT } from "@/app/models/models"
import { getMasterObjects, getObjects, getReportObjects, getTransactionObjects } from "@/app/controllers/rights.controller"
export default function NewPage({masterObjects,transactionObjects,reportObjects}:{masterObjects:any,transactionObjects: any,reportObjects : any}) {
    const [role, setRole] = React.useState('');
    const [masterObject, setMasterObject] = React.useState<string[]>([]);
    const [transactionObject, setTransactionObject] = React.useState<string[]>([]);
    const [reportObject, setReportObject] = React.useState<string[]>([]);

  const handleMasterChange = (event: SelectChangeEvent<any>) => {
    const {
      target: { value },
    } = event;
    setMasterObject(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleTransactionChange = (event: SelectChangeEvent<any>) => {
    const {
      target: { value },
    } = event;
    setTransactionObject(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleReportChange = (event: SelectChangeEvent<any>) => {
    const {
      target: { value },
    } = event;
    setReportObject(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
    const handleChange = (event: SelectChangeEvent) => {
        setRole(event.target.value as string);
    };
    return (
        <Box>
            <Box sx={{ display: "flex", mt: "80px", justifyContent: "center" }}>
                <FormControl sx={{ width: "300px" }}>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={role}
                        label="Role"
                        onChange={handleChange}
                    >
                        <MenuItem value={"2"}>Manager</MenuItem>
                        <MenuItem value={"3"}>Executive</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", marginLeft: "34%", marginTop: "10px", width: "25%" }}>
                <Typography>
                    Create
                </Typography>
                <Typography>
                    Read
                </Typography>
                <Typography>
                    Update
                </Typography>
                <Typography>
                    Delete
                </Typography>
            </Box>
            <Box sx={{ display: "flex", width: "60%" }}>
                <Box sx={{ marginLeft: "1rem", width: "50%" }}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-name-label">Master Object</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={masterObject}
                            onChange={handleMasterChange}
                            input={<OutlinedInput label="Master Object" />}
                            // MenuProps={MenuProps}
                        >
                            {masterObjects.map((object : any) => (
                                <MenuItem
                                    key={object.id}
                                    value={object.name}
                                    // style={getStyles(name, personName, theme)}
                                >
                                    {object.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ display: "flex", width: "50%", justifyContent: "space-evenly" }}>
                    <Checkbox
                        checked={false}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <Checkbox
                        checked={false}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <Checkbox
                        checked={false}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <Checkbox
                        checked={false}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Box>

            </Box>
            <Box sx={{ display: "flex", width: "60%" }}>
                <Box sx={{ marginLeft: "1rem", width: "50%" }}>
                <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-name-label">Transaction Object</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="transaction-object"
                            multiple
                            value={transactionObject}
                            onChange={handleTransactionChange}
                            input={<OutlinedInput label="Transaction Object" />}
                            // MenuProps={MenuProps}
                        >
                            {transactionObjects.map((object : any) => (
                                <MenuItem
                                    key={object.id}
                                    value={object.name}
                                    // style={getStyles(name, personName, theme)}
                                >
                                    {object.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ display: "flex", width: "50%", justifyContent: "space-evenly" }}>
                    <Checkbox
                        checked={false}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <Checkbox
                        checked={false}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <Checkbox
                        checked={false}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <Checkbox
                        checked={false}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Box>

            </Box>
            <Box sx={{ display: "flex", width: "60%" }}>
                <Box sx={{ marginLeft: "1rem", width: "50%" }}>
                <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-name-label">Report Objects</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="report-objects"
                            multiple
                            value={reportObject}
                            onChange={handleReportChange}
                            input={<OutlinedInput label="Report Object" />}
                            // MenuProps={MenuProps}
                        >
                            {reportObjects.map((object : any) => (
                                <MenuItem
                                    key={object.id}
                                    value={object.name}
                                    // style={getStyles(name, personName, theme)}
                                >
                                    {object.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ display: "flex", width: "50%", justifyContent: "space-evenly" }}>
                    <Checkbox
                        checked={false}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <Checkbox
                        checked={false}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <Checkbox
                        checked={false}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <Checkbox
                        checked={false}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Box>

            </Box>
            <Box>

            </Box>
        </Box>
    )
}