"use server";

import excuteQuery from "../utils/db/db";
import { docDescriptionSchemaT } from "../models/models";
import { logger } from "../utils/logger.utils";

export async function addDocumentDB(crmDb: string, data: docDescriptionSchemaT, objectId : number) {
    try {
        const result = await excuteQuery({
            host: crmDb,
            query: "insert into docs_table (description,doc_id,data_id,object_id) values (?,?,?,?);",
            values: [data.description, data.docId, data.dataId, objectId]
        });
        return result;
    } catch (e) {
        logger.error(e);
    }
}

export async function getDocsDB(crmDb: string, dataId: number,objectId : number) {
    try {
        const result = await excuteQuery({
            host: crmDb,
            query: "select *,'db' as type from docs_table where data_id = ? and object_id = ?;",
            values: [dataId,objectId]
        });
        return result;
    } catch (e) {
        logger.error(e);
    }
}

export async function updateExecutiveDocDB(crmDb: string, description: string, id: number) {
    try {
        await excuteQuery({
            host: crmDb,
            query: "update docs_table set description = ? where id = ?;",
            values: [description, id]
        });
    } catch (e) {
        logger.error(e);
    }
}

export async function deleteExecutiveDocDB(crmDb: string, id: number) {
    try {
        await excuteQuery({
            host: crmDb,
            query: "delete from docs_table where id = ?;",
            values: [id]
        });
    } catch (e) {
        logger.error(e);
    }
}