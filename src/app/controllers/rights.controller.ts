"use server"
import { getSession } from "../services/session.service";
import { logger } from "../utils/logger.utils"
import { manageRightsDb, getObjectByNameDb, getRightsDataDb, getAllObjectsDB, createDeptInRightsTableDB, delDeptFromRightTableDB } from "../services/rights.service";
import { getAllRoles } from "./executiveRole.controller";

function normalToCamelCaseString(normalString: string) {
    const objectNameWithOutSpace = normalString.replace(/\s+/g, '');
    return objectNameWithOutSpace.charAt(0).toLowerCase() + objectNameWithOutSpace.slice(1);
}

export async function manageRights(prevData: { [key: string]: boolean }, data: { [key: string]: boolean }, objects: Array<{ name: string, id: number, type: number }>, roles: Array<{ name: string, id: number }>, depts: Array<{ name: string, id: number }>) {
    try {
        const session = await getSession();
        if (session) {
            let updatedData: { [key: string]: boolean } = {};
            for (const key in data) {
                if (prevData.hasOwnProperty(key)) {
                    if (prevData[key] !== data[key]) {
                        updatedData[key] = data[key];
                    }
                }
            }
            let objectMap: Map<string, number> = new Map();
            objects.map((obj) => {
                objectMap.set(normalToCamelCaseString(obj.name), obj.id);
            })

            let roleMap: Map<string, number> = new Map();
            roles.map((role) => {
                roleMap.set(normalToCamelCaseString(role.name), role.id);
            })

            let deptMap: Map<string, number> = new Map();
            depts.map((dept) => {
                deptMap.set(normalToCamelCaseString(dept.name), dept.id);
            })

            let queryMap: Map<string, Array<{ field: string, value: number }>> = new Map();

            for (const key in updatedData) {
                const primaryKey = `${key.split("_")[0]}_${key.split("_")[1]}_${key.split("_")[2]}`;
                if (queryMap.has(primaryKey)) {
                    queryMap.get(primaryKey)!.push(updatedData[key] === true ? { "field": `${key.split("_")[3].replace(/Right$/, '')}`, "value": 1 } : { "field": `${key.split("_")[3].replace(/Right$/, '')}`, "value": 0 });
                } else {
                    queryMap.set(primaryKey, []);
                    queryMap.get(primaryKey)!.push(updatedData[key] === true ? { "field": `${key.split("_")[3].replace(/Right$/, '')}`, "value": 1 } : { "field": `${key.split("_")[3].replace(/Right$/, '')}`, "value": 0 });
                }
            }
            let queryArray: string[] = [];

            queryMap.forEach(async (value, key) => {
                let query = "update object_rights_master orm set ";
                value.map((i: any) => {
                    query += `orm.${i.field} = ${i.value}, `
                })
                query = query.slice(0, -2);
                query += ` where orm.object_id = ${objectMap.get(key.split("_")[0])} and orm.role_id = ${roleMap.get(key.split("_")[1])} and orm.dept_id = ${deptMap.get(key.split("_")[2])};`
                queryArray.push(query);
            });
            queryArray.map(async (query) => {
                await manageRightsDb(session.user.dbInfo.dbName, query);
            })
        }
    } catch (error) {
        logger.error(error);
    }
}

export async function getRightsData() {
    try {
        const session = await getSession();
        if (session) {
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
        if (session) {
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
        if (session) {
            const objects = await getObjectByNameDb(session.user.dbInfo.dbName, name);
            return objects;
        }
    } catch (error) {
        logger.error(error);
    }
}

export async function createDeptInRightsTable(deptId:number) {
    try {
        const session = await getSession();
        if (session) {
            const objects = await getAllObjects();
            const roles = await getAllRoles();
            await createDeptInRightsTableDB(session.user.dbInfo.dbName,deptId,objects,roles);
        }
    } catch (error) {
        logger.error(error);
    }
}

export async function delDeptFromRightTable(deptId:number) {
    try {
        const session = await getSession();
        if (session) {
            await delDeptFromRightTableDB(session.user.dbInfo.dbName,deptId);
        }
    } catch (error) {
        logger.error(error);
    }
}

