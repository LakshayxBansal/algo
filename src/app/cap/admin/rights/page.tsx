import { logger } from "@/app/utils/logger.utils";
import { getSession } from "@/app/services/session.service";
import { getRightsData } from "@/app/controllers/rights.controller";
import RightPage from "./RightPage";
import { redirect } from "next/navigation";
import { Metadata } from 'next';

export const metadata : Metadata = {
    title: 'Manage Rights'
}

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

type DataStateArray = [DataState];

function normalToCamelCaseString(normalString: string) {
    const objectNameWithOutSpace = normalString.replace(/\s+/g, '');
    return objectNameWithOutSpace.charAt(0).toLowerCase() + objectNameWithOutSpace.slice(1);
}

function getParentCountDefaultValue(rightsData: DataStateArray) {
    let countData: { [key: string]: number } = {};
    for (const ele of rightsData) {
        ["createRight", "readRight", "updateRight", "deleteRight"].map((right) => {
            const key = `${normalToCamelCaseString(ele.category)}_${normalToCamelCaseString(ele.roleName)}_${normalToCamelCaseString(ele.deptName)}_${right}`;
            if (ele[right as keyof DataState] === 1) {
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

function getRighsDataObject(rightsData: DataStateArray) {
    let data: { [key: string]: boolean } = {};
    for (const ele of rightsData) {
        ["createRight", "readRight", "updateRight", "deleteRight"].map((right) => {
            const key = `${normalToCamelCaseString(ele.objectName)}_${normalToCamelCaseString(ele.roleName)}_${normalToCamelCaseString(ele.deptName)}_${right}`;
            if (ele[right as keyof DataState] === 1) {
                data[key] = true;
            } else {
                data[key] = false;
            }
        })
    }
    return data;
}

function getUniqueData(rightsData: DataStateArray, name: string, id: string) {
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
            const rightsData: DataStateArray = await getRightsData();
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