"use server";

import excuteQuery from "../utils/db/db";
import { docDescriptionSchemaT } from "../models/models";
import { logger } from "../utils/logger.utils";

export async function addDocumentDB(crmDb: string, data: docDescriptionSchemaT, objectTypeId : number) {
    try {
        const result = await excuteQuery({
            host: crmDb,
            query: "insert into object_docs_table (description,doc_id,object_id,object_type_id) values (?,?,?,?);",
            values: [data.description, data.docId, data.objectId, objectTypeId]
        });
        return result;
    } catch (e) {
        logger.error(e);
    }
}

export async function getDocsDB(crmDb: string, objectId: number,objectTypeId : number) {
    try {
        const result = await excuteQuery({
            host: crmDb,
            query: "select id as id, description as description, doc_id as docId,'db' as type from object_docs_table where object_id = ? and object_type_id = ?;",
            values: [objectId,objectTypeId]
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
            query: "update object_docs_table set description = ? where id = ?;",
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
            query: "delete from object_docs_table where id = ?;",
            values: [id]
        });
    } catch (e) {
        logger.error(e);
    }
}