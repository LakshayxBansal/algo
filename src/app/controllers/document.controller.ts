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
        if (session?.user.dbInfo) {
            for (const doc of docData) {
                const formData = new FormData();

                formData.append('application_id', process.env.DOC_APPLICATION_ID);
                formData.append('meta_data', `{"name": "${doc.description}"}`);

                const base64Data = doc?.file?.replace(/^data:.*;base64,/, "");
                const contentType = doc?.fileType;
                const buffer = Buffer.from(base64Data as string, 'base64');
                formData.append('doc', buffer, { filename: doc?.fileName, contentType: contentType });

                const docInfo = await axios.post(`${process.env.DOC_SERVICE_URL}/add`, formData, {
                    headers: {
                        ...formData.getHeaders(),
                        "client_id": process.env.DOC_CLIENT_ID,
                        "access_key": process.env.DOC_ACCESS_KEY
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
        if (session?.user.dbInfo) {
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
        if (session?.user.dbInfo) {
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
        if (session?.user.dbInfo) {
            await updateExecutiveDocDB(session.user.dbInfo.dbName, description, id);
        }
    } catch (error) {
        logger.error(error);
    }
}

export async function deleteExecutiveDoc(id: number, docId: string) {
    try {
        const session = await getSession();
        if (session?.user.dbInfo) {
            const body = {
                "application_id": process.env.DOC_APPLICATION_ID,
                "doc_id": docId
            }

            const result = await axios.delete(`${process.env.DOC_SERVICE_URL}/delete`, {
                data: body, // body data should go inside the `data` field
                headers: {
                    "client_id": process.env.DOC_CLIENT_ID,
                    "access_key": process.env.DOC_ACCESS_KEY
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
        if (session?.user.dbInfo) {
            const body = {
                "application_id": process.env.DOC_APPLICATION_ID,
                "doc_id": documentId
            }

            const result = await axios.post(`${process.env.DOC_SERVICE_URL}/get`, body, {
                headers: {
                    "client_id": process.env.DOC_CLIENT_ID,
                    "access_key": process.env.DOC_ACCESS_KEY
                },
            });

            let base64Data = Buffer.from(result.data.data.doc_buffer.data, "binary").toString("base64");
            return { buffer: base64Data, contentType: result.data.data.doc_type, fileName: result.data.data.doc_title };

        }
    } catch (error) {
        logger.error(error);
    }
}


export async function uploadLogo(docData: mdl.docDescriptionSchemaT) {
    try {
        const session = await getSession();
        if (session?.user) {
            const formData = new FormData();

                formData.append('application_id', process.env.DOC_APPLICATION_ID);
                formData.append('meta_data', `{"name": "${docData.description}"}`);

                const base64Data = docData?.file?.replace(/^data:.*;base64,/, "");
                const contentType = docData?.fileType;
                const buffer = Buffer.from(base64Data as string, 'base64');
                formData.append('doc', buffer, { filename: docData?.fileName, contentType: contentType });

                const docInfo = await axios.post(`${process.env.DOC_SERVICE_URL}/add`, formData, {
                    headers: {
                        ...formData.getHeaders(),
                        "client_id": process.env.DOC_CLIENT_ID,
                        "access_key": process.env.DOC_ACCESS_KEY
                    }
                }
                )

                if (docInfo.data.status) {
                    docData["docId"] = docInfo.data.data.doc_id;
                    return docData.docId;
                }
        }
    } catch (error) {
        logger.error(error);
    }
}

