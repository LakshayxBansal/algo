"use client"
import * as React from 'react';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Checkbox, Grid, Divider, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Paper from '@mui/material/Paper';
import Snackbar from "@mui/material/Snackbar";
import { manageRights } from '@/app/controllers/rights.controller';
import { logger } from '@/app/utils/logger.utils';

type DataState = {
    id: number,
    name: string,
    objectName: string,
    objectId: number,
    category: string,
    categoryId: number,
    roleId: number,
    roleName: string,
    deptId: number,
    deptName: string,
    createRight: string,
    readRight: string,
    updateRight: string,
    deleteRight: string
};


function normalToCamelCaseString(normalString: string) {
    const objectNameWithOutSpace = normalString.replace(/\s+/g, '');
    return objectNameWithOutSpace.charAt(0).toLowerCase() + objectNameWithOutSpace.slice(1);
}

function Child({ object, handleChange, data, role, dept, parentName }: { object: any, handleChange: any, data: any, role: string, dept: string, parentName: string }) {

    return (
        <Box>
            {object.map((obj: any) => {
                return (
                    <Box key={obj.id}>
                        <Grid container sx={{ alignItems: "center" }}>
                            <Grid item xs={4}>
                                <Typography sx={{ marginLeft: "5%" }}>
                                    {obj.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                                    {["createRight", "readRight", "updateRight", "deleteRight"].map((right) => (
                                        <Checkbox
                                            checked={data[`${normalToCamelCaseString(obj.name)}_${normalToCamelCaseString(role)}_${normalToCamelCaseString(dept)}_${normalToCamelCaseString(right)}`]}
                                            onChange={handleChange(`${normalToCamelCaseString(obj.name)}_${normalToCamelCaseString(role)}_${normalToCamelCaseString(dept)}_${normalToCamelCaseString(right)}`, parentName, object.length)}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    ))}
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


export default function RightPage({ rightsData, categorys, roles, depts, objects, parentCountDefaultValue, parentDataDefaultValue }: { rightsData: { [key: string]: boolean }, categorys: Array<{ name: string, id: number }>, roles: Array<{ name: string, id: number }>, depts: Array<{ name: string, id: number }>, objects: Array<{ name: string, id: number, type: number }>, parentCountDefaultValue: { [key: string]: number }, parentDataDefaultValue: { [key: string]: boolean } }) {
    const [data, setData] = React.useState(rightsData);
    const [parentData, setParentData] = React.useState<any>(parentDataDefaultValue);
    const [parentDataCount, setParentDataCount] = React.useState<any>(parentCountDefaultValue);
    let parentObject: { [key: string]: boolean } = {};
    for (const ele of categorys) {
        parentObject[ele.name] = false;
    }
    const [role, setRole] = React.useState(roles[0].name || "");
    const [dept, setDept] = React.useState(depts[0].name || "");
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [openParent, setOpenParent] = React.useState<{ [key: string]: boolean }>(parentObject);

    const setParentKeyActive = (key: string) => {
        setOpenParent((prevState) => {
            const newState = { ...prevState }; // Copy current state
            Object.keys(newState).forEach((k) => {
                if (k !== key)
                    newState[k] = false; // Set all to false
            });
            newState[key] = !newState[key]; // Set the selected key to true
            return newState;
        });
    };

    const handleRoleSelectChange = (event: any) => {
        setRole(event.target.value);
    };
    const handleDeptSelectChange = (event: any) => {
        setDept(event.target.value);
    };
    const handleChange = (column: string, parentName: string, parentSize: number) => (event: any) => {
        setData({
            ...data,
            [column]: event.target.checked,
        });
        const parentColumn = `${normalToCamelCaseString(parentName)}_${column.split("_")[1]}_${column.split("_")[2]}_${column.split("_")[3]}`;
        if (event.target.checked === false) {
            if (parentDataCount[parentColumn] === 1) {
                setParentData({
                    ...parentData,
                    [parentColumn]: false
                })
            }
            setParentDataCount({
                ...parentDataCount,
                [parentColumn]: parentDataCount[parentColumn] - 1
            })
        } else {
            if (parentDataCount[parentColumn] === parentSize - 1) {
                setParentData({
                    ...parentData,
                    [parentColumn]: true
                })
            }
            setParentDataCount((prevState: any) => ({
                ...prevState,
                [parentColumn]: prevState[parentColumn] + 1
            }))
        }
    };
    const handleParentChange = (column: string, object: any) => (event: any) => {
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
                [`${normalToCamelCaseString(obj.name)}_${column.split("_")[1]}_${column.split("_")[2]}_${column.split("_")[3]}`]: event.target.checked
            }));
        });
    };

    async function handleSubmit() {
        try {
            await manageRights(rightsData, data, objects, roles, depts);
            setSnackOpen(true);
        } catch (error) {
            logger.error(error);
        }
    }

    return (
        <Box sx={{ height: "100vh" }}>
            <Paper sx={{ width: "90%", margin: "auto" }} elevation={3}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Grid container>
                        <Grid item xs={5}>
                            <Typography variant="h6" sx={{ alignItems: "center", marginLeft: "2%", marginTop: "3%" }}>Select Department and Role to Manage Rights</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Box sx={{ display: "flex" }}>
                                <FormControl sx={{ width: "80%", marginLeft: "10%", marginTop: "2%" }}>
                                    <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
                                    <Select
                                        sx={{ height: "40px", marginBottom: "3%" }}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={role}
                                        label="Select Role"
                                        onChange={handleRoleSelectChange}
                                    >
                                        {roles.map((role) => (
                                            <MenuItem value={role.name}>{role.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box>
                                <FormControl sx={{ width: "80%", marginLeft: "10%", marginTop: "2%" }}>
                                    <InputLabel id="demo-simple-select-label">Select Department</InputLabel>
                                    <Select
                                        sx={{ height: "40px", marginBottom: "3%" }}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={dept}
                                        label="Select Department"
                                        onChange={handleDeptSelectChange}
                                    >
                                        {depts.map((dept) => (
                                            <MenuItem value={dept.name}>{dept.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
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
                {categorys.map((category) => (
                    <Box>
                        <Grid container sx={{ alignItems: "center", padding: "0 2%" }}>
                            <Grid item xs={4}>
                                <Box onClick={() => setParentKeyActive(category.name)}>
                                    <Typography>
                                        {`${category.name} Object`}
                                        {openParent[category.name] === true ? <ExpandLessIcon sx={{ marginLeft: "10px" }} /> : <ExpandMoreIcon sx={{ marginLeft: "10px" }} />}
                                    </Typography>
                                </Box>
                            </Grid>
                            {!openParent[category.name] && (
                                <Grid item xs={4}>
                                    <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                                        {["createRight", "readRight", "updateRight", "deleteRight"].map((right) => (
                                            <Checkbox
                                                checked={parentData[`${normalToCamelCaseString(category.name)}_${normalToCamelCaseString(role)}_${normalToCamelCaseString(dept)}_${right}`]}
                                                onChange={handleParentChange(`${normalToCamelCaseString(category.name)}_${normalToCamelCaseString(role)}_${normalToCamelCaseString(dept)}_${right}`, objects.filter((obj) => obj.type === category.id))}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                                indeterminate={parentDataCount[`${normalToCamelCaseString(category.name)}_${normalToCamelCaseString(role)}_${normalToCamelCaseString(dept)}_${right}`] !== objects.filter((obj) => obj.type === category.id).length && parentDataCount[`${normalToCamelCaseString(category.name)}_${normalToCamelCaseString(role)}_${normalToCamelCaseString(dept)}_${right}`] !== 0}
                                                color={(parentDataCount[`${normalToCamelCaseString(category.name)}_${normalToCamelCaseString(role)}_${normalToCamelCaseString(dept)}_${right}`] === objects.filter((obj) => obj.type === category.id).length || parentDataCount[`${normalToCamelCaseString(category.name)}_${normalToCamelCaseString(role)}_${normalToCamelCaseString(dept)}_${right}`] === 0) ? "primary" : "default"}
                                            />
                                        ))}

                                    </Box>
                                </Grid>

                            )}

                            {openParent[category.name] && (<Grid item xs={12}><Child object={objects.filter((obj) => obj.type === category.id)} handleChange={handleChange} data={data} role={role} dept={dept} parentName={category.name} /></Grid>)}
                        </Grid>
                        <Divider variant='middle' />
                    </Box>

                ))}

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
