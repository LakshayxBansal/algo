"use server"
import { getSession } from "../services/session.service";
import { logger } from "../utils/logger.utils"
import { getRightsDb, manageRightsDb,getObjectsDb, getMasterObjectsDb, getTransactionObjectsDb, getReportObjectsDb } from "../services/rights.service";

type DataState = {
    [key: string] : boolean;
};

export async function manageRights(data : any) {
    try{
        const session = await getSession();
        if(session){
            const objects = await getObjectsDb(session.user.dbInfo.dbName);
            let objectMap: Map<string, number> = new Map();
            objects.map((obj : any)=>{
                const objectNameWithOutSpace = obj["object_name"].replace(/\s+/g, '');
                const objectName = objectNameWithOutSpace.charAt(0).toLowerCase() + objectNameWithOutSpace.slice(1);
                objectMap.set(objectName,obj.right_id);
            })
            let dataMap: Map<number,any[]> = new Map();
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const objectName = key.split("_")[0];
                    const role = key.split("_")[1];
                    const right = key.split("_")[2];
                    if(dataMap.has(objectMap.get(objectName) as number)){
                        dataMap.get(objectMap.get(objectName) as number)!.push(data[key]===true ? {"field":`${role}_${right}`,"value":1} : {"field":`${role}_${right}`,"value":0});
                    }else{
                        dataMap.set(objectMap.get(objectName) as number,[]);
                        dataMap.get(objectMap.get(objectName) as number)!.push(data[key]===true ? {"field":`${role}_${right}`,"value":1} : {"field":`${role}_${right}`,"value":0});
                    }
                }
            }
            dataMap.forEach(async(value, key) => {
                await manageRightsDb(session.user.dbInfo.dbName,key,value);
            });


        }
    }catch(error){
        logger.error(error);
    }
}

export async function getRightsData() {
    try{
        const session = await getSession();
        if(session){
            const result = await getRightsDb(session.user.dbInfo.dbName);
            let resultObject : DataState = {};
            const resultLength = result.length;
            for(let i = 0;i<resultLength;i++){
                for (let key in result[i]) {
                    const first_key = key.split("_")[0];
                    if(first_key==="admin" || first_key==="manager" || first_key==="executive"){
                        const objectNameWithOutSpace = result[i]["object_name"].replace(/\s+/g, '');
                        const objectName = objectNameWithOutSpace.charAt(0).toLowerCase() + objectNameWithOutSpace.slice(1);
                        const newKey = `${objectName}_${key}`;
                        if(result[i][key]===1){
                            resultObject[newKey] = true;
                        }else{
                            resultObject[newKey] = false;
                        }
                    }
                }
            }
            return resultObject;
        }
    }catch(error){
        logger.error(error);
    }
}

export async function getObjects() {
    try{
        const session = await getSession();
        if(session){
            const objects = await getObjectsDb(session.user.dbInfo.dbName);
            return objects;
        }
    }catch(error){
        logger.error(error);
    }
}

export async function getMasterObjects() {
    try{
        const session = await getSession();
        if(session){
            const objects = await getMasterObjectsDb(session.user.dbInfo.dbName);
            return objects;
        }
    }catch(error){
        logger.error(error);
    }
}
export async function getTransactionObjects() {
    try{
        const session = await getSession();
        if(session){
            const objects = await getTransactionObjectsDb(session.user.dbInfo.dbName);
            return objects;
        }
    }catch(error){
        logger.error(error);
    }
}
export async function getReportObjects() {
    try{
        const session = await getSession();
        if(session){
            const objects = await getReportObjectsDb(session.user.dbInfo.dbName);
            return objects;
        }
    }catch(error){
        logger.error(error);
    }
}