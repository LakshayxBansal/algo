"use server"
import { getSession } from "../services/session.service";
import { logger } from "../utils/logger.utils"
import { manageRightsDb, getObjectByNameDb, getRightsDataDb, getAllObjectsDB, createDeptInRightsTableDB, delDeptFromRightTableDB, getRightDB } from "../services/rights.service";
import { getAllRoles } from "./executiveRole.controller";
import * as zs from "@/app/zodschema/zodschema"
import { rightSchemaT } from "../models/models";

function normalToCamelCaseString(normalString: string) {
    const objectNameWithOutSpace = normalString.replace(/\s+/g, '');
    return objectNameWithOutSpace.charAt(0).toLowerCase() + objectNameWithOutSpace.slice(1);
}

export async function manageRights(dataArray : Array<rightSchemaT>) {
    try {
        const session = await getSession();
        if (session?.user.dbInfo) {
            let parseSuccess = true;
            dataArray.map((data : rightSchemaT)=>{
                parseSuccess &&= zs.rightSchema.safeParse(data).success;
            })
            if (parseSuccess) {
                const result = await manageRightsDb(session.user.dbInfo.dbName, dataArray);
                if(result===true){
                    return "Record saved!"
                }else{
                    return "Error encountered!"
                }
            } else {
                return "Error in format of data!"
            }
        }
    } catch (error) {
        logger.error(error);
        return "Error encountered!"
    }
}

export async function getRightsData() {
    try {
        const session = await getSession();
        if (session?.user.dbInfo) {
            const result = await getRightsDataDb(session.user.dbInfo.dbName);
            return result;
        }
    } catch (error) {
        logger.error(error);
    }
}

export async function getAllObjects() {
    try {
        const session = await getSession();
        if (session?.user.dbInfo) {
            const objects = await getAllObjectsDB(session.user.dbInfo.dbName);
            return objects;
        }
    } catch (error) {
        logger.error(error);
    }
}

export async function getObjectByName(name: string) {
    try {
        const session = await getSession();
        if (session?.user.dbInfo) {
            const objects = await getObjectByNameDb(session.user.dbInfo.dbName, name);
            return objects;
        }
    } catch (error) {
        logger.error(error);
    }
}

export async function createDeptInRightsTable(deptId: number) {
    try {
        const session = await getSession();
        if (session?.user.dbInfo) {
            const objects = await getAllObjects();
            const roles = await getAllRoles();
            await createDeptInRightsTableDB(session.user.dbInfo.dbName, deptId, objects, roles);
        }
    } catch (error) {
        logger.error(error);
    }
}

export async function delDeptFromRightTable(deptId: number) {
    try {
        const session = await getSession();
        if (session?.user.dbInfo) {
            await delDeptFromRightTableDB(session.user.dbInfo.dbName, deptId);
        }
    } catch (error) {
        logger.error(error);
    }
}

export async function getRight(objectId: number, roleId: number, deptId: number) {
    try {
        const session = await getSession();
        if (session?.user.dbInfo) {
            const right = await getRightDB(session.user.dbInfo.dbName, objectId, roleId, deptId);
            return right[0];
        }
    } catch (error) {
        logger.error(error);
    }
}

