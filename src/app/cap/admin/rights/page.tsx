import { Box, Grid, Typography } from "@mui/material";
import { logger } from "@/app/utils/logger.utils";
import { getSession } from "@/app/services/session.service";
import { getMasterObjects, getObjects, getRightsData, getTransactionObjects,getReportObjects } from "@/app/controllers/rights.controller";
import { CheckBoxGrid, SubmitButton } from "./CheckBoxGrid";
import { AutocompleteDB } from "@/app/Widgets/AutocompleteDB";
import { optionsDataT } from "@/app/models/models";
import NewPage from "./newpage";
import NewPage2 from "./newpage2";

import { transformSync } from "next/dist/build/swc";


type DataState = {
    [key: string]: boolean;
};

const objects = ["Action", "Allocation Type", "Area", "Category", "Contact", "Contact Group", "Country", "Currency", "Department", "Executive Dept", "Executive", "Executive Group", "Executive Role", "Invite User", "Company User", "Item", "Item Group", "Notification", "Organisation", "Source", "State", "State List", "Sub Status", "Sub Status List", "Unit"];
const roles = ["manager", "executive"];
const rights = ["create", "read", "update", "delete"];

function ObjectName() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            {objects.map((i) => (
                <Typography variant="h6" component="h6" key={i}>
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
            const rightsData: DataState | undefined = await getRightsData();
            const objectData = await getObjects();
            const masterObjects = await getMasterObjects();
            const transactionObjects = await getTransactionObjects();
            const reportObjects = await getReportObjects();

            return (
                <>
                    <NewPage2 masterObjects={masterObjects} transactionObjects={transactionObjects} reportObjects={reportObjects}/>
                    {/* <NewPage masterObjects={masterObjects} transactionObjects={transactionObjects} reportObjects={reportObjects}/> */}
                    {/* <NewPage2/> */}
                </>

            )
        }
    } catch (error) {
        logger.error(error);
    }
}