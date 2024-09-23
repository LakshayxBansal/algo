import { Box, Grid, Typography } from "@mui/material";
import { logger } from "@/app/utils/logger.utils";
import { getSession } from "@/app/services/session.service";
import { getRightsData } from "@/app/controllers/rights.controller";
import { CheckBoxGrid, SubmitButton } from "./CheckBoxGrid";


type DataState = {
    [key: string]: boolean;
};

const objects = ["Action", "Allocation Type", "Area", "Category", "Contact", "Contact Group", "Country", "Currency", "Department", "Executive Dept", "Executive", "Executive Group", "Executive Role", "Invite User", "Company User", "Item", "Item Group", "Notification", "Organisation", "Source", "State", "State List", "Sub Status", "Sub Status List", "Unit"];
const roles = ["admin", "manager", "executive"];
const rights = ["create", "read", "update", "delete"];

function ObjectName() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            {objects.map((i) => (
                <Typography variant="h6" component="h6">
                    {i}
                </Typography>

            ))}
        </Box>
    )
}


export default async function Rights() {
    try {
        const session = await getSession();
        if (session) {
            const rightsData : DataState | undefined = await getRightsData();
            return (
                <>
                    <Box>
                        <Box>
                            <Grid container spacing={1}>
                                <Grid md={2} item spacing={1}>
                                    {/* <SubmitButton /> */}
                                </Grid>
                                {roles.map((role) => (
                                    <Grid md={3} item spacing={2}>
                                        <Typography variant="h6" component="h6">
                                            {role.charAt(0).toUpperCase() + role.slice(1)}
                                        </Typography>
                                    </Grid>
                                ))}

                                <Grid md={1} item spacing={1}>
                                    <SubmitButton />
                                </Grid>

                            </Grid>
                        </Box>
                        <Box>
                            <Grid container spacing={1}>
                                <Grid md={2} item spacing={1}>
                                    <Typography variant="h6" component="h6">
                                        Object Name
                                    </Typography>
                                    <ObjectName />
                                </Grid>
                                <CheckBoxGrid rightsData={rightsData} objects={objects} roles={roles} rights={rights} />
                            </Grid>
                        </Box>
                    </Box>
                </>

            )
        }
    } catch (error) {
        logger.error(error);
    }
}