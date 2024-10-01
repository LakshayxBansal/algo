import { logger } from "@/app/utils/logger.utils";
import { getSession } from "@/app/services/session.service";
import { getMasterObjects, getRightsData, getTransactionObjects, getReportObjects } from "@/app/controllers/rights.controller";
import NewPage2 from "./newpage2";
import { Typography } from "@mui/material";


type DataState = {
    [key: string]: boolean;
};

const objects = ["Action", "Allocation Type", "Area", "Category", "Contact", "Contact Group", "Country", "Currency", "Department", "Executive Dept", "Executive", "Executive Group", "Executive Role", "Invite User", "Company User", "Item", "Item Group", "Notification", "Organisation", "Source", "State", "State List", "Sub Status", "Sub Status List", "Unit"];
const roles = ["manager", "executive"];
const rights = ["create", "read", "update", "delete"];

function camelCaseToNormal(camelCaseStr: string) {
    return camelCaseStr
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space before uppercase letters
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // Handle cases like "HTMLParser"
        .trim()
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letter of each word
}

function getParentCountDefaultValue(rightsData: any, masterObjects: any, transactionObjects: any, reportObjects: any) {
    let countData: any = {};
    for (const key in rightsData) {
        if (rightsData.hasOwnProperty(key)) {
            let objectName = key.split("_")[0];
            const role = key.split("_")[1];
            const right = key.split("_")[2];
            objectName = camelCaseToNormal(objectName);
            if (masterObjects.some((obj: any) => obj.name === objectName)) {
                if (rightsData[key] == true) {
                    if (countData.hasOwnProperty(`master_${role}_${right}`)) {
                        countData[`master_${role}_${right}`] += 1;
                    } else {
                        countData[`master_${role}_${right}`] = 1;
                    }
                }else{
                    if (!countData.hasOwnProperty(`master_${role}_${right}`)) {
                        countData[`master_${role}_${right}`] = 0;
                    }
                }
            }
            else if (transactionObjects.some((obj: any) => obj.name === objectName)) {
                if (rightsData[key] == true) {
                    if (countData.hasOwnProperty(`transaction_${role}_${right}`)) {
                        countData[`transaction_${role}_${right}`] += 1;
                    } else {
                        countData[`transaction_${role}_${right}`] = 1;
                    }
                }else{
                    if (!countData.hasOwnProperty(`transaction_${role}_${right}`)) {
                        countData[`transaction_${role}_${right}`] = 0;
                    }
                }
            }
            else if (reportObjects.some((obj: any) => obj.name === objectName)) {
                if (rightsData[key] == true) {
                    if (countData.hasOwnProperty(`report_${role}_${right}`)) {
                        countData[`report_${role}_${right}`] += 1;
                    } else {
                        countData[`report_${role}_${right}`] = 1;
                    }
                }else{
                    if (!countData.hasOwnProperty(`report_${role}_${right}`)) {
                        countData[`report_${role}_${right}`] = 0;
                    }
                }
            }
        }
    }
    return countData;
}

function getParentDataDefaultValue(countData: any) {
    let defaultParentData: any = {};
    ["master", "transaction", "report"].map((parentObj: any) => {
        roles.map((role: any) => {
            rights.map((right: any) => {
                if(countData[`${parentObj}_${role}_${right}`] === 0){
                    defaultParentData[`${parentObj}_${role}_${right}`] = false;
                }else{
                    defaultParentData[`${parentObj}_${role}_${right}`] = true;
                }
                // countData[`${parentObj}_${role}_${right}`] === 0 ? defaultParentData[`${parentObj}_${role}_${right}`] = false : defaultParentData[`${parentObj}_${role}_${right}`] = true;
            })
        })
    })
    return defaultParentData;
}


export default async function Rights() {
    try {
        const session = await getSession();
        if (session) {
            console.log("right page : ",session);
            const rightsData: DataState | undefined = await getRightsData();
            const masterObjects = await getMasterObjects();
            const transactionObjects = await getTransactionObjects();
            const reportObjects = await getReportObjects();
            const parentCountDefaultValue = getParentCountDefaultValue(rightsData, masterObjects, transactionObjects, reportObjects);
            const parentDataDefaultValue = getParentDataDefaultValue(parentCountDefaultValue);

            if(session.user.dbInfo.roleId===3){
                return (
                    <>
                        <Typography>This Page is not Accessible</Typography>
                    </>
                )
            }
        
            return (
                <>
                    <NewPage2 userRoleId={session.user.dbInfo.roleId} rightsData={rightsData} masterObjects={masterObjects} transactionObjects={transactionObjects} reportObjects={reportObjects} parentCountDefaultValue={parentCountDefaultValue} parentDataDefaultValue={parentDataDefaultValue} />
                </>
            )
        }
    } catch (error) {
        logger.error(error);
    }
}