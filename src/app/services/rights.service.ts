"use server"

import excuteQuery from "../utils/db/db";

export async function manageRightsDb(crmDb : string,id: number,data : any) {

    try{
        let query = "update rights_master set ";
        data.map((i : any)=>{
            query += `${i.field} = ${i.value}, `
        })
        query = query.slice(0, -2);
        query += ` where id = ${id};`
        const result = await excuteQuery({
            host: crmDb,
            query: query,
            values : []
        })
    }catch(error){
        console.log(error);
    }
}

export async function getRightsDb(crmDb : string) {

    try{
        const result = await excuteQuery({
            host: crmDb,
            query: "select rm.*,om.name as object_name from rights_master rm, object_master om where rm.object_id = om.id",
            values : []
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
            query: "select rm.id as right_id, om.name as object_name, om.id as object_id, om.type as object_type from rights_master rm, object_master om where rm.object_id = om.id",
            values : []
        })
        return result;
    }catch(error){
        console.log(error);
    }
}

export async function getMasterObjectsDb(crmDb : string) {

    try{
        const result = await excuteQuery({
            host: crmDb,
            query: "select om.name as name, om.id as id from object_master om where om.type = 1;",
            values : []
        })
        return result;
    }catch(error){
        console.log(error);
    }
}

export async function getTransactionObjectsDb(crmDb : string) {

    try{
        const result = await excuteQuery({
            host: crmDb,
            query: "select om.name as name, om.id as id from object_master om where om.type = 2;",
            values : []
        })
        return result;
    }catch(error){
        console.log(error);
    }
}

export async function getReportObjectsDb(crmDb : string) {

    try{
        const result = await excuteQuery({
            host: crmDb,
            query: "select om.name as name, om.id as id from object_master om where om.type = 3;",
            values : []
        })
        return result;
    }catch(error){
        console.log(error);
    }
}