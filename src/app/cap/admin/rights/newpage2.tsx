"use client"
import * as React from 'react';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Checkbox, Grid, Divider, Button } from '@mui/material';
import Switch from '@mui/material/Switch';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import FormControlLabel from '@mui/material/FormControlLabel';
import Snackbar from "@mui/material/Snackbar";
import { VisuallyHiddenInput } from '@/app/utils/styledComponents';
import { manageRights } from '@/app/controllers/rights.controller';
import { logger } from '@/app/utils/logger.utils';

function nameFormat(name: string) {
    const objectNameWithOutSpace = name.replace(/\s+/g, '');
    return name = objectNameWithOutSpace.charAt(0).toLowerCase() + objectNameWithOutSpace.slice(1);
}

function Child({ object, handleChange, data, role, parentName }: { object: any, handleChange: any, data: any, role: any, parentName: string}) {

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
                                        checked={data[`${nameFormat(obj.name)}_${role}_create`]}
                                        onChange={handleChange(`${nameFormat(obj.name)}_${role}_create`, parentName,object.length)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    <Checkbox
                                        checked={data[`${nameFormat(obj.name)}_${role}_read`]}
                                        onChange={handleChange(`${nameFormat(obj.name)}_${role}_read`, parentName,object.length)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    <Checkbox
                                        checked={data[`${nameFormat(obj.name)}_${role}_update`]}
                                        onChange={handleChange(`${nameFormat(obj.name)}_${role}_update`, parentName,object.length)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    <Checkbox
                                        checked={data[`${nameFormat(obj.name)}_${role}_delete`]}
                                        onChange={handleChange(`${nameFormat(obj.name)}_${role}_delete`, parentName,object.length)}
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


export default function NewPage2({ rightsData, masterObjects, transactionObjects, reportObjects, parentCountDefaultValue, parentDataDefaultValue }: { rightsData: any, masterObjects: any, transactionObjects: any, reportObjects: any, parentCountDefaultValue: any, parentDataDefaultValue: any }) {
    const [data, setData] = React.useState(rightsData);
    const [parentDataCount, setParentDataCount] = React.useState<any>(parentCountDefaultValue);
    const [parentData, setParentData] = React.useState<any>(parentDataDefaultValue);
    const [role, setRole] = React.useState("manager");
    const [snackOpen, setSnackOpen] = React.useState(false);
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
    const handleChange = (column: string, parentName: string, parentSize : number) => (event: any) => {
        setData({
            ...data,
            [column]: event.target.checked,
        });
        const parentColumn = `${parentName}_${column.split("_")[1]}_${column.split("_")[2]}`;
        if(event.target.checked===false){
            if(parentDataCount[parentColumn] === 1){
                setParentData({
                    ...parentData,
                    [parentColumn] : false
                })
            }
            setParentDataCount({
                ...parentDataCount,
                [parentColumn]: parentDataCount[parentColumn] - 1
            })
        }else{
                setParentData({
                    ...parentData,
                    [parentColumn] : true
                })
            setParentDataCount({
                ...parentDataCount,
                [parentColumn]: parentDataCount[parentColumn] + 1
            })
        }
    };
    const handleParentChange = (column: string) => (event: any) => {
        const parentObjectName = column.split("_")[0];
        const parentRole = column.split("_")[1];
        const parentRight = column.split("_")[2];
        let object;
        if (parentObjectName === "master") {
            object = masterObjects;
        } else if (parentObjectName === "transaction") {
            object = transactionObjects;
        } else if (parentObjectName === "report") {
            object = reportObjects;
        }
        setParentData({
            ...parentData,
            [column]: event.target.checked,
        });
        event.target.checked === true ? setParentDataCount((prevState: any) => ({
            ...prevState,
            [column]: object.length
        })) : setParentDataCount((prevState: any) => ({
            ...prevState,
            [column]: 0
        }));
        object.map((obj: any) => {
            setData((prevState: any) => ({
                ...prevState,
                [`${nameFormat(obj.name)}_${parentRole}_${parentRight}`]: event.target.checked
            }));
        });
    };

    async function handleSubmit() {
        try {
            await manageRights(data);
            setSnackOpen(true);
        } catch (error) {
            logger.error(error);
        }
    }

    return (
        <Box>
            <Paper sx={{ width: "90%", margin: "auto", marginTop: "6%" }} elevation={3}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Grid container>
                        <Grid item xs={4}>
                            <Typography variant="h6" sx={{ alignItems: "center", marginLeft: "2%", marginTop: "3%" }}>Select Role to Manage Right</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl sx={{ width: "80%", marginLeft: "8%", marginTop: "2%" }}>
                                <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
                                <Select
                                    sx={{ height: "40px", marginBottom: "3%" }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={role}
                                    label="Select Role"
                                    onChange={handleSelectChange}
                                >
                                    <MenuItem value={"manager"}>Manager</MenuItem>
                                    <MenuItem value={"executive"}>Executive</MenuItem>
                                </Select>
                            </FormControl>

                        </Grid>

                    </Grid>
                </Box>
            </Paper>
            <Paper elevation={3} sx={{ width: "90%", height: "60vh", margin: "auto", marginTop: "1%", overflow: "scroll" }}>
                <Box sx={{ marginTop: "1%" }}>
                    <Grid container sx={{ alignItems: "center", padding: "0 2%" }}>
                        <Grid item xs={4}>
                        </Grid>
                        <Grid item xs={4}>
                            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
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
                                    {openMaster === true ? <ExpandLessIcon sx={{ marginLeft: "10px" }} /> : <ExpandMoreIcon sx={{ marginLeft: "10px" }} />}
                                </Typography>
                            </Box>
                        </Grid>
                        {!openMaster && (
                            <Grid item xs={4}>
                                <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                                    <Checkbox
                                        checked={parentData[`master_${role}_create`]}
                                        onChange={handleParentChange(`master_${role}_create`)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        indeterminate={parentDataCount[`master_${role}_create`] !== masterObjects.length && parentDataCount[`master_${role}_create`] !== 0}
                                        color={(parentDataCount[`master_${role}_create`] === masterObjects.length || parentDataCount[`master_${role}_create`] === 0) ? "primary" : "default"}
                                    />
                                    <Checkbox
                                        checked={parentData[`master_${role}_read`]}
                                        onChange={handleParentChange(`master_${role}_read`)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        indeterminate={parentDataCount[`master_${role}_read`] !== masterObjects.length && parentDataCount[`master_${role}_create`] !== 0}
                                        color={(parentDataCount[`master_${role}_read`] === masterObjects.length || parentDataCount[`master_${role}_create`] === 0) ? "primary" : "default"}
                                    />
                                    <Checkbox
                                        checked={parentData[`master_${role}_update`]}
                                        onChange={handleParentChange(`master_${role}_update`)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        indeterminate={parentDataCount[`master_${role}_update`] !== masterObjects.length && parentDataCount[`master_${role}_update`] !== 0}
                                        color={(parentDataCount[`master_${role}_update`] === masterObjects.length || parentDataCount[`master_${role}_update`] === 0) ? "primary" : "default"}
                                    />
                                    <Checkbox
                                        checked={parentData[`master_${role}_delete`]}
                                        onChange={handleParentChange(`master_${role}_delete`)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        indeterminate={parentDataCount[`master_${role}_delete`] !== masterObjects.length && parentDataCount[`master_${role}_delete`] !== 0}
                                        color={(parentDataCount[`master_${role}_delete`] === masterObjects.length || parentDataCount[`master_${role}_delete`] === 0) ? "primary" : "default"}
                                    />
                                </Box>
                            </Grid>

                        )}

                        {openMaster && (<Grid item xs={12}><Child object={masterObjects} handleChange={handleChange} data={data} role={role} parentName="master"/></Grid>)}
                    </Grid>
                    <Divider variant='middle' />
                </Box>
                <Box>
                    <Grid container sx={{ alignItems: "center", padding: "0 2%" }}>
                        <Grid item xs={4}>
                            <Box onClick={handleTransactionChange}>
                                <Typography>
                                    Transaction Object
                                    {openTransaction === true ? <ExpandLessIcon sx={{ marginLeft: "10px" }} /> : <ExpandMoreIcon sx={{ marginLeft: "10px" }} />}
                                </Typography>
                            </Box>
                        </Grid>
                        {!openTransaction && (
                            <Grid item xs={4}>
                                <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                                    <Checkbox
                                        checked={parentData[`transaction_${role}_create`]}
                                        onChange={handleParentChange(`transaction_${role}_create`)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        indeterminate={parentDataCount[`transaction_${role}_create`] !== transactionObjects.length && parentDataCount[`transaction_${role}_create`] !== 0}
                                        color={(parentDataCount[`transaction_${role}_create`] === transactionObjects.length || parentDataCount[`transaction_${role}_create`] === 0) ? "primary" : "default"}
                                    />
                                    <Checkbox
                                        checked={parentData[`transaction_${role}_read`]}
                                        onChange={handleParentChange(`transaction_${role}_read`)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        indeterminate={parentDataCount[`transaction_${role}_read`] !== transactionObjects.length && parentDataCount[`transaction_${role}_read`] !== 0}
                                        color={(parentDataCount[`transaction_${role}_read`] === transactionObjects.length || parentDataCount[`transaction_${role}_read`] === 0) ? "primary" : "default"}
                                    />
                                    <Checkbox
                                        checked={parentData[`transaction_${role}_update`]}
                                        onChange={handleParentChange(`transaction_${role}_update`)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        indeterminate={parentDataCount[`transaction_${role}_update`] !== transactionObjects.length && parentDataCount[`transaction_${role}_update`] !== 0}
                                        color={(parentDataCount[`transaction_${role}_update`] === transactionObjects.length || parentDataCount[`transaction_${role}_update`] === 0) ? "primary" : "default"}
                                    />
                                    <Checkbox
                                        checked={parentData[`transaction_${role}_delete`]}
                                        onChange={handleParentChange(`transaction_${role}_delete`)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        indeterminate={parentDataCount[`transaction_${role}_delete`] !== transactionObjects.length && parentDataCount[`transaction_${role}_delete`] !== 0}
                                        color={(parentDataCount[`transaction_${role}_delete`] === transactionObjects.length || parentDataCount[`transaction_${role}_delete`] === 0) ? "primary" : "default"}
                                    />
                                </Box>
                            </Grid>

                        )}

                        {openTransaction && (<Grid item xs={12}><Child object={transactionObjects} handleChange={handleChange} data={data} role={role} parentName="transaction"/></Grid>)}


                    </Grid>
                    <Divider variant='middle' />
                </Box><Box>
                    <Grid container sx={{ alignItems: "center", padding: "0 2%" }}>
                        <Grid item xs={4}>
                            <Box onClick={handleReportChange}>
                                <Typography>
                                    Report Object
                                    {openReport === true ? <ExpandLessIcon sx={{ marginLeft: "10px" }} /> : <ExpandMoreIcon sx={{ marginLeft: "10px" }} />}
                                </Typography>
                            </Box>
                        </Grid>
                        {!openReport && (
                            <Grid item xs={4}>
                                <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                                    <Checkbox
                                        checked={parentData[`report_${role}_create`]}
                                        onChange={handleParentChange(`report_${role}_create`)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        indeterminate={parentDataCount[`report_${role}_create`] !== reportObjects.length && parentDataCount[`report_${role}_create`] !== 0}
                                        color={(parentDataCount[`report_${role}_create`] === reportObjects.length || parentDataCount[`report_${role}_create`] === 0) ? "primary" : "default"}
                                    />
                                    <Checkbox
                                        checked={parentData[`report_${role}_read`]}
                                        onChange={handleParentChange(`report_${role}_read`)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        indeterminate={parentDataCount[`report_${role}_read`] !== reportObjects.length && parentDataCount[`report_${role}_read`] !== 0}
                                        color={(parentDataCount[`report_${role}_read`] === reportObjects.length || parentDataCount[`report_${role}_read`] === 0) ? "primary" : "default"}
                                    />
                                    <Checkbox
                                        checked={parentData[`report_${role}_update`]}
                                        onChange={handleParentChange(`report_${role}_update`)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        indeterminate={parentDataCount[`report_${role}_update`] !== reportObjects.length && parentDataCount[`report_${role}_update`] !== 0}
                                        color={(parentDataCount[`report_${role}_update`] === reportObjects.length || parentDataCount[`report_${role}_update`] === 0) ? "primary" : "default"}
                                    />
                                    <Checkbox
                                        checked={parentData[`report_${role}_delete`]}
                                        onChange={handleParentChange(`report_${role}_delete`)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        indeterminate={parentDataCount[`report_${role}_delete`] !== reportObjects.length && parentDataCount[`report_${role}_delete`] !== 0}
                                        color={(parentDataCount[`report_${role}_delete`] === reportObjects.length || parentDataCount[`report_${role}_delete`] === 0) ? "primary" : "default"}
                                    />
                                </Box>
                            </Grid>

                        )}

                        {openReport && (<Grid item xs={12}><Child object={reportObjects} handleChange={handleChange} data={data} role={role} parentName="report"/></Grid>)}


                    </Grid>
                    <Divider variant='middle' />
                </Box>
            </Paper>
            <Snackbar
                open={snackOpen}
                autoHideDuration={3000}
                onClose={() => setSnackOpen(false)}
                message="Record Saved!"
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />
            <Button onClick={handleSubmit} variant="contained" sx={{ marginTop: "1%", marginLeft: "85%" }}>Submit</Button>
        </Box>
    );
}
