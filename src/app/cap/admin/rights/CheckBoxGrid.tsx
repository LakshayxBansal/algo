"use client"
import { Box, Checkbox, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { manageRights } from "@/app/controllers/rights.controller";
import { logger } from "@/app/utils/logger.utils";

type DataState = {
    [key: string]: boolean;
};

let handleSubmit: any;

export function SubmitButton() {
    return (
        <Button onClick={() => handleSubmit()}>Submit</Button>
    );
};


export function CheckBoxGrid({ roles, rights, rightsData, objects }: { roles: string[], rights: string[], rightsData: any, objects: string[] }) {
    const [data, setData] = useState(rightsData);
    const handleChange = (column: string) => (event: any) => {
        setData({
            ...data,
            [column]: event.target.checked,
        });
    };

    handleSubmit = async function () {
        try {
            await manageRights(data);
        } catch (error) {
            logger.error(error);
        }
    }

    const objectNames = objects.map((name: string) => {
        const objectNameWithOutSpace = name.replace(/\s+/g, '');
        return name = objectNameWithOutSpace.charAt(0).toLowerCase() + objectNameWithOutSpace.slice(1);
    })

    return (
        <>
            {roles.map((role) => (
                <Grid md={3} item spacing={2}>
                    <Grid container spacing={1}>
                        {rights.map((right) => (
                            <Grid item md={3} spacing={1}>
                                <Typography variant="h6" component="h6">
                                    {right}
                                </Typography>
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    {objectNames.map((name: string) => (
                                        <Checkbox
                                            key={name}
                                            checked={data[`${name}_${role}_${right}`]}
                                            onChange={handleChange(`${name}_${role}_${right}`)}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    ))}
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            ))}
        </>
    )
}

