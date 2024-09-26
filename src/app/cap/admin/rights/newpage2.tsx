"use client"
import * as React from 'react';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Checkbox } from '@mui/material';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import FormControlLabel from '@mui/material/FormControlLabel';
import { VisuallyHiddenInput } from '@/app/utils/styledComponents';

// const child = (
//     <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
//         <svg>
//             <Box
//                 component="polygon"
//                 points="0,100 50,00, 100,100"
//                 sx={(theme) => ({
//                     fill: theme.palette.common.white,
//                     stroke: theme.palette.divider,
//                     strokeWidth: 1,
//                 })}
//             />
//         </svg>
//     </Paper>
// );

function Child({ object, handleChange, checked }: { object: any, handleChange: any, checked: any }) {

    return (
        <Box>
            {object.map((obj: any) => {
                return (
                    <Box sx={{ display: "flex" }}>
                        <Typography>
                            {obj.name}
                        </Typography>
                        <Box>
                            <Checkbox
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <Checkbox
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <Checkbox
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <Checkbox
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </Box>
                    </Box>
                )
            })}
        </Box>
    )
}

export default function NewPage2({ masterObjects, transactionObjects, reportObjects }: { masterObjects: any, transactionObjects: any, reportObjects: any }) {
    const [role, setRole] = React.useState(2);
    const [checked, setChecked] = React.useState(false);
    const [openMaster, setOpenMaster] = React.useState(false);
    const [openTransaction, setOpenTransaction] = React.useState(false);
    const [openReport, setOpenReport] = React.useState(false);
    const handleMasterChange = () => {
        setOpenMaster((prev) => !prev);
        setOpenTransaction(false);
        setOpenReport(false);
    };
    const handleTransactionChange = () => {
        setOpenMaster(false);
        setOpenTransaction((prev) => !prev);
        setOpenReport(false);
    };
    const handleReportChange = () => {
        setOpenMaster(false);
        setOpenTransaction(false);
        setOpenReport((prev) => !prev);
    };
    const handleSelectChange = (event: any) => {
        setRole(event.target.value)
    };
    const handleChange = () => { };

    return (
        <Box>
            <Box sx={{ display: "flex" }}>
                <FormControl sx={{ width: "20%", margin: "auto", marginTop: "10px" }}>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={role}
                        label="Role"
                        onChange={handleSelectChange}
                    >
                        <MenuItem value={2}>Manager</MenuItem>
                        <MenuItem value={3}>Executive</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box>
                <Box sx={{ display: "flex" }}>
                    <Box onClick={handleMasterChange}>
                        <Typography>
                            Master Object
                        </Typography>
                    </Box>
                    {!openMaster && (
                        <Box>
                            <Checkbox
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <Checkbox
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <Checkbox
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <Checkbox
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </Box>

                    )}
                </Box>
                {openMaster && <Child object={masterObjects} handleChange={handleChange} checked={checked} />}
            </Box>
            <Box sx={{ display: "flex" }}>
                <Box onClick={handleTransactionChange}>
                    <Typography>
                        Transaction Object
                    </Typography>
                </Box>
                {!openTransaction && (
                    <Box>
                        <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </Box>

                )}
            </Box>
            {openTransaction && <Child object={transactionObjects} handleChange={handleChange} checked={checked} />}
            <Box sx={{ display: "flex" }}>
            <Box onClick={handleReportChange}>
                    <Typography>
                        Report Object
                    </Typography>
                </Box>
                {!openReport && (
                    <Box>
                        <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </Box>

                )}
            </Box>
            {openReport && <Child object={reportObjects} handleChange={handleChange} checked={checked} />}
        </Box>
    );
}
