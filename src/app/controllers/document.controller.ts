"use server";

import * as mdl from "../models/models";
import * as zs from "../zodschema/zodschema";
import { getSession } from "../services/session.service";
import { addDocumentDB, deleteExecutiveDocDB, getDocsDB, updateExecutiveDocDB } from "../services/document.service";
import { logger } from "../utils/logger.utils";
import FormData from 'form-data';
import { Buffer } from "buffer";
import axios from "axios";

export async function uploadDocument(docData: mdl.docDescriptionSchemaT[], objectId: number, objectTypeId : number) {
    try {
        const session = await getSession();
        if (session) {
            for (const doc of docData) {
                const formData = new FormData();

                formData.append('app_id', '9334f8d1-1b69-476f-b143-2b5b048cc458');
                formData.append('meta_data', `{"name": "${doc.description}"}`);

                const base64Data = doc?.file?.replace(/^data:.*;base64,/, "");
                const contentType = doc?.fileType;
                const buffer = Buffer.from(base64Data as string, 'base64');
                formData.append('doc', buffer, { filename: doc?.fileName, contentType: contentType });

                const docInfo = await axios.post("http://192.168.1.200:3000/addDoc", formData, {
                    headers: {
                        ...formData.getHeaders(),
                        "client_id": "fd85c348-8d54-4e20-b75e-c085d507a8ab",
                        "access_key": "5616e450142cb9214437e6a7d0f1eb944ca733b02883226a876e43b597f64011"
                    }
                }
                )

                if (docInfo.data.status) {
                    doc["docId"] = docInfo.data.data.doc_id;
                    doc["objectId"] = objectId;
                    await addDocument(doc,objectTypeId);
                }
            }
        }
    } catch (error) {
        logger.error(error);
    }
}

export async function addDocument(data: mdl.docDescriptionSchemaT, objectTypeId : number) {
    let result;
    try {
        const session = await getSession();
        if (session) {
            const parsed = zs.docDescriptionSchema.safeParse(data);
            if (parsed.success) {
                result = await addDocumentDB(
                    session.user.dbInfo.dbName,
                    data as mdl.docDescriptionSchemaT,
                    objectTypeId
                );
            }
        }
        return result;
    } catch (e: any) {
        console.log(e);
    }
    return result;
}

export async function getDocs(objectId: number,objectTypeId : number) {
    try {
        const session = await getSession();
        if (session) {
            const result = await getDocsDB(session.user.dbInfo.dbName, objectId, objectTypeId);
            return result;
        }
    } catch (error) {
        logger.error(error);
    }
}

export async function updateExecutiveDoc(description: string, id: number) {
    try {
        const session = await getSession();
        if (session) {
            await updateExecutiveDocDB(session.user.dbInfo.dbName, description, id);
        }
    } catch (error) {
        logger.error(error);
    }
}

export async function deleteExecutiveDoc(id: number, docId: string) {
    try {
        const session = await getSession();
        if (session) {
            const body = {
                "app_id": "9334f8d1-1b69-476f-b143-2b5b048cc458",
                "doc_id": docId
            }

            const result = await axios.delete("http://192.168.1.200:3000/deleteDoc", {
                data: body, // body data should go inside the `data` field
                headers: {
                    "client_id": "fd85c348-8d54-4e20-b75e-c085d507a8ab",
                    "access_key": "5616e450142cb9214437e6a7d0f1eb944ca733b02883226a876e43b597f64011"
                }
            });
            await deleteExecutiveDocDB(session.user.dbInfo.dbName, id);

        }
    } catch (error) {
        logger.error(error);
    }
}


export async function viewExecutiveDoc(documentId: string) {
    try {
        const session = await getSession();
        if (session) {
            const body = {
                "app_id": "9334f8d1-1b69-476f-b143-2b5b048cc458",
                "doc_id": documentId
            }

            const result = await axios.post("http://192.168.1.200:3000/getDoc", body, {
                headers: {
                    "client_id": "fd85c348-8d54-4e20-b75e-c085d507a8ab",
                    "access_key": "5616e450142cb9214437e6a7d0f1eb944ca733b02883226a876e43b597f64011"
                },
            });
            let base64Data = Buffer.from(result.data.data.doc_buffer.data, "binary").toString("base64");
            return { buffer: base64Data, contentType: result.data.data.doc_type, fileName: result.data.data.doc_title };

        }
    } catch (error) {
        logger.error(error);
    }
}