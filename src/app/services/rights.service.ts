"use server"

import { rightSchemaT } from "../models/models";
import excuteQuery from "../utils/db/db";

export async function manageRightsDb(crmDb: string, dataArray: Array<rightSchemaT>) {
    try {
        dataArray.map(async (data: rightSchemaT) => {
            await excuteQuery({
                host: crmDb,
                query: "update object_rights_master orm set orm.create = ?, orm.read = ?, orm.update = ?, orm.delete = ? where orm.object_id = ? and orm.role_id = ? and orm.dept_id = ?;",
                values: [data.createRight === true ? 1 : 0, data.readRight === true ? 1 : 0, data.updateRight === true ? 1 : 0, data.deleteRight === true ? 1 : 0, data.objectId, data.roleId, data.deptId]
            })
            return true;
        })
    } catch (error) {
        console.log(error);
    }
    return false;
    
}

export async function getRightsDataDb(crmDb: string) {

    try {
        const result = await excuteQuery({
            host: crmDb,
            query: "select orm.id as id, orm.object_id as objectId, orm.role_id as roleId, orm.dept_id as deptId,orm.create as createRight,orm.read as readRight,orm.update as updateRight,orm.delete as deleteRight, otm.name as objectName, otm.type as categoryId, ocm.name as category, erm.name as roleName, edm.name as deptName from object_rights_master orm, object_type_master otm, object_category_master ocm, executive_role_master erm, executive_dept_master edm where orm.object_id = otm.id and otm.type = ocm.id and orm.role_id = erm.id and orm.dept_id = edm.id;",
            values: []
        })
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function getObjectByNameDb(crmDb: string, name: string) {

    try {
        const result = await excuteQuery({
            host: crmDb,
            query: "select om.name as object_name, om.id as object_id, om.type as object_type from object_type_master om where om.name = ?",
            values: [name]
        })
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllObjectsDB(crmDb: string) {

    try {
        const result = await excuteQuery({
            host: crmDb,
            query: "select om.name as object_name, om.id as object_id, om.type as object_type from object_type_master om;",
            values: []
        })
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function createDeptInRightsTableDB(crmDb: string, deptId: number, objects: Array<{ object_name: string, object_id: number }>, roles: Array<{ name: string, id: number }>) {

    try {
        let query = "insert into object_rights_master (object_id,role_id,dept_id) values ";
        objects.map((obj: { object_name: string, object_id: number }) => {
            roles.map((role: { name: string, id: number }) => {
                query += `(${obj.object_id},${role.id},${deptId}),`
            })
        })
        query = query.slice(0, -1);
        query += ";";
        if (query !== "insert into config_dept_mapping (config_id,dept_id) values;") {
            await excuteQuery({
                host: crmDb,
                query: query,
                values: [],
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export async function delDeptFromRightTableDB(crmDb: string, deptId: number) {

    try {
        await excuteQuery({
            host: crmDb,
            query: "delete from object_rights_master where dept_id = ?",
            values: [deptId]
        })
    } catch (error) {
        console.log(error);
    }
}

export async function getRightDB(crmDb: string, objectId: number, roleId: number, deptId: number) {
    try {
        const result = await excuteQuery({
            host: crmDb,
            query: "select orm.id as id, orm.object_id as objectId, orm.role_id as roleId, orm.dept_id as deptId,orm.create as createRight,orm.read as readRight,orm.update as updateRight,orm.delete as deleteRight, otm.name as objectName, otm.type as categoryId, ocm.name as category, erm.name as roleName, edm.name as deptName from object_rights_master orm, object_type_master otm, object_category_master ocm, executive_role_master erm, executive_dept_master edm where orm.object_id = otm.id and otm.type = ocm.id and orm.role_id = erm.id and orm.dept_id = edm.id and orm.object_id = ? and orm.role_id = ? and orm.dept_id = ?;",
            values: [objectId, roleId, deptId]
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}