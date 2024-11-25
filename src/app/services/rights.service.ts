"use server"

import excuteQuery from "../utils/db/db";

export async function manageRightsDb(crmDb : string,query : string) {

    try{
        const result = await excuteQuery({
            host: crmDb,
            query: query,
            values : []
        })
    }catch(error){
        console.log(error);
    }
}

export async function getRightsDataDb(crmDb : string) {

    try{
        const result = await excuteQuery({
            host: crmDb,
            query: "select orm.id as id, orm.object_id as objectId, orm.role_id as roleId, orm.dept_id as deptId,orm.create as createRight,orm.read as readRight,orm.update as updateRight,orm.delete as deleteRight, otm.name as objectName, otm.type as categoryId, ocm.name as category, erm.name as roleName, edm.name as deptName from object_rights_master orm, object_type_master otm, object_category_master ocm, executive_role_master erm, executive_dept_master edm where orm.object_id = otm.id and otm.type = ocm.id and orm.role_id = erm.id and orm.dept_id = edm.id;",
            values : []
        })
        return result;
    }catch(error){
        console.log(error);
    }
}

export async function getObjectByNameDb(crmDb : string,name : string) {

    try{
        const result = await excuteQuery({
            host: crmDb,
            query: "select om.name as object_name, om.id as object_id, om.type as object_type from object_type_master om where om.name = ?",
            values : [name]
        })
        return result;
    }catch(error){
        console.log(error);
    }
}

export async function getObjectsDb(crmDb : string) {

    try{
        const result = await excuteQuery({
            host: crmDb,
            query: "select rm.id as right_id, om.name as object_name, om.id as object_id, om.type as object_type from object_rights_master rm, object_type_master om where rm.object_id = om.id",
            values : []
        })
        return result;
    }catch(error){
        console.log(error);
    }
}


