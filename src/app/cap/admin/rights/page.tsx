import { logger } from "@/app/utils/logger.utils";
import { getSession } from "@/app/services/session.service";
import { getRightsData } from "@/app/controllers/rights.controller";
import RightPage from "./RightPage";
import { Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { getAllRole } from "@/app/controllers/executiveRole.controller";
import Category from "../lists/categoryList/page";

type DataState = {
    id: number,
    objectName: string,
    objectId: number,
    category: string,
    typeId: number,
    roleId: number,
    roleName: string,
    create: string,
    view: string,
    update: string,
    delete: string
};

type DataStateArray = [DataState];

function camelCaseToNormal(camelCaseStr: string) {
    return camelCaseStr
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space before uppercase letters
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // Handle cases like "HTMLParser"
        .trim()
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letter of each word
}

// function getParentCountDefaultValue(rightsData: DataStateArray) {
//     let countData: any = {};
//     for (const key in rightsData) {
//         if (rightsData.hasOwnProperty(key)) {
//             let objectName = key.split("_")[0];
//             const role = key.split("_")[1];
//             const right = key.split("_")[2];
//             objectName = camelCaseToNormal(objectName);
//             if (masterObjects.some((obj: any) => obj.name === objectName)) {
//                 if (rightsData[key] == true) {
//                     if (countData.hasOwnProperty(`master_${role}_${right}`)) {
//                         countData[`master_${role}_${right}`] += 1;
//                     } else {
//                         countData[`master_${role}_${right}`] = 1;
//                     }
//                 } else {
//                     if (!countData.hasOwnProperty(`master_${role}_${right}`)) {
//                         countData[`master_${role}_${right}`] = 0;
//                     }
//                 }
//             }
//             else if (transactionObjects.some((obj: any) => obj.name === objectName)) {
//                 if (rightsData[key] == true) {
//                     if (countData.hasOwnProperty(`transaction_${role}_${right}`)) {
//                         countData[`transaction_${role}_${right}`] += 1;
//                     } else {
//                         countData[`transaction_${role}_${right}`] = 1;
//                     }
//                 } else {
//                     if (!countData.hasOwnProperty(`transaction_${role}_${right}`)) {
//                         countData[`transaction_${role}_${right}`] = 0;
//                     }
//                 }
//             }
//             else if (reportObjects.some((obj: any) => obj.name === objectName)) {
//                 if (rightsData[key] == true) {
//                     if (countData.hasOwnProperty(`report_${role}_${right}`)) {
//                         countData[`report_${role}_${right}`] += 1;
//                     } else {
//                         countData[`report_${role}_${right}`] = 1;
//                     }
//                 } else {
//                     if (!countData.hasOwnProperty(`report_${role}_${right}`)) {
//                         countData[`report_${role}_${right}`] = 0;
//                     }
//                 }
//             }
//         }
//     }
//     return countData;
// }

// function getParentDataDefaultValue(countData: any) {
//     let defaultParentData: any = {};
//     ["master", "transaction", "report"].map((parentObj: any) => {
//         roles.map((role: any) => {
//             rights.map((right: any) => {
//                 if (countData[`${parentObj}_${role}_${right}`] === 0) {
//                     defaultParentData[`${parentObj}_${role}_${right}`] = false;
//                 } else {
//                     defaultParentData[`${parentObj}_${role}_${right}`] = true;
//                 }
//                 // countData[`${parentObj}_${role}_${right}`] === 0 ? defaultParentData[`${parentObj}_${role}_${right}`] = false : defaultParentData[`${parentObj}_${role}_${right}`] = true;
//             })
//         })
//     })
//     return defaultParentData;
// }

function findAllChildren(childMap: Map<number, number[]>, children: Array<{ id: number, name: string }>, roleNames: Map<number, string>, visitedChild: Map<number, boolean>, currRole: number) {
    children.push({ id: currRole, name: roleNames.get(currRole) as string });
    visitedChild.set(currRole, true);
    const childs = childMap.get(currRole);
    if (childs !== undefined) {
        for (const child of childs as number[]) {
            if (visitedChild.get(child) !== true) {
                findAllChildren(childMap, children, roleNames, visitedChild, child);
            }
        }
    }
}

function generateCategoryData(rightsData : DataStateArray){
    let category : Array<{name: string, obejcts : Array<{id:number,name:string}>}> = [];
    for(const ele of rightsData){
        
    }
    return category;

}

function generateRightsData(rightsData : DataStateArray){
    let data : Array<{field: string,value : boolean}> = [];
    for(const ele of rightsData){
        
    }
    return data;
}


export default async function Rights() {
    try {
        const session = await getSession();
        if (session) {
            const rightsData: DataStateArray = await getRightsData();
            const roles = await getAllRole();

            let childMap: Map<number, number[]> = new Map();
            let roleNames: Map<number, string> = new Map();

            for (const role of roles) {
                roleNames.set(role.id, role.name);
                if (childMap.has(role.parent)) {
                    childMap.get(role.parent)!.push(role.id);
                } else {
                    childMap.set(role.parent, []);
                    childMap.get(role.parent)!.push(role.id);
                }
            }
            let children: Array<{ id: number, name: string }> = [];
            let visitedChild: Map<number, boolean> = new Map();
            findAllChildren(childMap, children, roleNames, visitedChild, session.user.dbInfo.roleId);
            children = children.filter(item => item.id !== session.user.dbInfo.roleId && item.name !== roleNames.get(session.user.dbInfo.roleId));
            let category : Array<{name: string, obejcts : Array<{id:number,name:string}>}> = [];
            
            category = generateCategoryData(rightsData);
            
            let data : Array<{field: string,value : boolean}> = [];

            data = generateRightsData(rightsData);

            // const parentCountDefaultValue = getParentCountDefaultValue(rightsData);
            // const parentDataDefaultValue = getParentDataDefaultValue(parentCountDefaultValue);
            // build map and if map is empty for that role then page is not accessible.
            if (childMap.get(session.user.dbInfo.roleId) === undefined) {
                return (
                    <>
                        <Typography>This Page is not Accessible</Typography>
                    </>
                )
            }

            return (
                <>
                    <RightPage rightData={data} category={category} children={children}/>
                </>
            )

        }
    } catch (error) {
        logger.error(error);
    }
    redirect("/signin")
}