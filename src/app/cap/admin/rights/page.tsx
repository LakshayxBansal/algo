import { logger } from "@/app/utils/logger.utils";
import { getSession } from "@/app/services/session.service";
import { getRightsData } from "@/app/controllers/rights.controller";
import RightPage from "./RightPage";
import { redirect } from "next/navigation";
import { rightSchemaT } from "@/app/models/models";
import { Metadata } from 'next';

export const metadata : Metadata = {
    title: 'Manage Rights'
}

type rightSchemaArray = [rightSchemaT];

function normalToCamelCaseString(normalString: string) {
    const objectNameWithOutSpace = normalString.replace(/\s+/g, '');
    return objectNameWithOutSpace.charAt(0).toLowerCase() + objectNameWithOutSpace.slice(1);
}

function getParentCountDefaultValue(rightsData: rightSchemaArray) {
    let countData: { [key: string]: number } = {};
    for (const ele of rightsData) {
        ["createRight", "readRight", "updateRight", "deleteRight"].map((right) => {
            const key = `${normalToCamelCaseString(ele.category as string)}_${normalToCamelCaseString(ele.roleName as string)}_${normalToCamelCaseString(ele.deptName as string)}_${right}`;
            if (ele[right as keyof rightSchemaT] === 1) {
                if (countData.hasOwnProperty(key)) {
                    countData[key] += 1;
                } else {
                    countData[key] = 1;
                }
            } else {
                if (!countData.hasOwnProperty(key)) {
                    countData[key] = 0;
                }
            }
        })
    }
    return countData;
}


function getParentDataDefaultValue(countData: { [key: string]: number }) {
    let defaultParentData: { [key: string]: boolean } = {};
    for (const key in countData) {
        if (countData[key] === 0) {
            defaultParentData[key] = false;
        } else {
            defaultParentData[key] = true;
        }
    }
    return defaultParentData;
}

function getRighsDataObject(rightsData: rightSchemaArray) {
    let data: { [key: string]: boolean } = {};
    for (const ele of rightsData) {
        ["createRight", "readRight", "updateRight", "deleteRight"].map((right) => {
            const key = `${normalToCamelCaseString(ele.objectName as string)}_${normalToCamelCaseString(ele.roleName as string)}_${normalToCamelCaseString(ele.deptName as string)}_${right}`;
            if (ele[right as keyof rightSchemaT] === 1) {
                data[key] = true;
            } else {
                data[key] = false;
            }
        })
    }
    return data;
}

function getUniqueData(rightsData: rightSchemaArray, name: string, id: string) {
    const data = rightsData.reduce<any>((acc, obj: any) => {
        const key = `${obj[name]}-${obj[id]}`;
        if (!acc.some((item: any) => `${item.name}-${item.id}` === key)) {
            acc.push({
                name: obj[name],
                id: obj[id]
            });
        }
        return acc;
    }, []);
    return data;
}


export default async function Rights() {
    try {
        const session = await getSession();
        if (session) {
            const rightsData: rightSchemaArray = await getRightsData();
            const rightsDataObject = getRighsDataObject(rightsData);
            const depts = getUniqueData(rightsData, "deptName", "deptId");
            const roles = getUniqueData(rightsData, "roleName", "roleId")
            const categorys = getUniqueData(rightsData, "category", "categoryId");
            const objects = rightsData.reduce<any>((acc, obj: any) => {
                const key = `${obj.objectName}-${obj.objectId}-${obj.categoryId}`;
                if (!acc.some((item: any) => `${item.name}-${item.id}-${item.type}` === key)) {
                    acc.push({
                        name: obj.objectName,
                        id: obj.objectId,
                        type: obj.categoryId
                    });
                }
                return acc;
            }, []);
            const parentCountDefaultValue = getParentCountDefaultValue(rightsData);
            const parentDataDefaultValue = getParentDataDefaultValue(parentCountDefaultValue);

            return (
                <>
                    <RightPage rightsData={rightsDataObject} categorys={categorys} roles={roles} depts={depts} objects={objects} parentCountDefaultValue={parentCountDefaultValue} parentDataDefaultValue={parentDataDefaultValue} />
                </>
            )

        }
    } catch (error) {
        logger.error(error);
    }
    redirect("/signin")
}