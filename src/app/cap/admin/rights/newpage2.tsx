"use client"
import * as React from 'react';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Checkbox, Grid, Divider,Button } from '@mui/material';
import Switch from '@mui/material/Switch';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import FormControlLabel from '@mui/material/FormControlLabel';
import { VisuallyHiddenInput } from '@/app/utils/styledComponents';


function Child({ object, handleChange, checked }: { object: any, handleChange: any, checked: any }) {

    return (
        <Box>
            {object.map((obj: any) => {
                return (
                    <Box>
                        <Grid container sx={{ alignItems: "center" }}>
                            <Grid item xs={4}>
                                <Typography sx={{ marginLeft: "5%" }}>
                                    {obj.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
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
                            </Grid>
                        </Grid>
                        <Divider variant='middle' />
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
            <Paper sx={{ width: "90%", margin: "auto" ,marginTop: "6%" }} elevation={3}>
                <Box sx={{ display: "flex", alignItems : "center" }}>
                <Typography variant="h6" sx={{alignItems : "center", marginLeft : "2%"}}>Manage Rights for Selected Role</Typography>
                    <FormControl sx={{ width: "20%", margin: "auto"}}>
                        <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
                        <Select
                            sx={{height : "40px", marginBottom : "3%"}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={role}
                            label="Select Role"
                            onChange={handleSelectChange}
                        >
                            <MenuItem value={2}>Manager</MenuItem>
                            <MenuItem value={3}>Executive</MenuItem>
                        </Select>
                    </FormControl>
                    <Button sx={{margin : "1% 5% 1% 5%", height : "40px"}} variant="contained">
                        Submit
                    </Button>
                </Box>
            </Paper>
            <Paper elevation={3} sx={{width : "90%",height: "70vh", margin : "auto",marginTop: "1%", overflow : "scroll"}}>
            <Box sx={{ marginTop: "1%" }}>
                <Grid container sx={{ alignItems: "center", padding: "0 2%" }}>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={4}>
                        <Box sx={{display : "flex", justifyContent : "space-evenly"}}>
                            <Typography>
                                Create
                            </Typography>
                            <Typography>
                                View
                            </Typography>
                            <Typography>
                                Update
                            </Typography>
                            <Typography>
                                Delete
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Grid container sx={{ alignItems: "center", padding: "0 2%" }}>
                    <Grid item xs={4}>
                        <Box onClick={handleMasterChange}>
                            <Typography>
                                Master Object
                                {openMaster === true ? <ExpandLessIcon sx={{marginLeft : "10px"}}/> : <ExpandMoreIcon sx={{marginLeft : "10px"}}/>}
                            </Typography>
                        </Box>
                    </Grid>
                    {!openMaster && (
                        <Grid item xs={4}>
                            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
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
                        </Grid>

                    )}

                    {openMaster && (<Grid item xs={12}><Child object={masterObjects} handleChange={handleChange} checked={checked} /></Grid>)}


                </Grid>
                <Divider variant='middle' />
            </Box>
            <Box>
                <Grid container sx={{ alignItems: "center", padding: "0 2%" }}>
                    <Grid item xs={4}>
                        <Box onClick={handleTransactionChange}>
                            <Typography>
                                Transaction Object
                                {openTransaction === true ? <ExpandLessIcon sx={{marginLeft : "10px"}}/> : <ExpandMoreIcon sx={{marginLeft : "10px"}}/>}
                            </Typography>
                        </Box>
                    </Grid>
                    {!openTransaction && (
                        <Grid item xs={4}>
                            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
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
                        </Grid>

                    )}

                    {openTransaction && (<Grid item xs={12}><Child object={transactionObjects} handleChange={handleChange} checked={checked} /></Grid>)}


                </Grid>
                <Divider variant='middle' />
            </Box><Box>
                <Grid container sx={{ alignItems: "center", padding: "0 2%" }}>
                    <Grid item xs={4}>
                        <Box onClick={handleReportChange}>
                            <Typography>
                                Report Object
                                {openReport === true ? <ExpandLessIcon sx={{marginLeft : "10px"}}/> : <ExpandMoreIcon sx={{marginLeft : "10px"}}/>}
                            </Typography>
                        </Box>
                    </Grid>
                    {!openReport && (
                        <Grid item xs={4}>
                            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
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
                        </Grid>

                    )}

                    {openReport && (<Grid item xs={12}><Child object={reportObjects} handleChange={handleChange} checked={checked} /></Grid>)}


                </Grid>
                <Divider variant='middle' />
            </Box>
            </Paper>
        </Box>
    );
}
