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

                formData.append('application_id', 'a0dc4140-267f-451f-a759-4d1f18539425');
                formData.append('meta_data', `{"name": "${doc.description}"}`);

                const base64Data = doc?.file?.replace(/^data:.*;base64,/, "");
                const contentType = doc?.fileType;
                const buffer = Buffer.from(base64Data as string, 'base64');
                formData.append('doc', buffer, { filename: doc?.fileName, contentType: contentType });

                const docInfo = await axios.post("http://192.168.1.200:3000/api/document/add", formData, {
                    headers: {
                        ...formData.getHeaders(),
                        "client_id": "f2e99ec3-14a1-42f1-9185-aef0c503059a",
                        "access_key": "f4de5bcec318a80086f8a5f642180626d0bdd1c3e5e8c5d340124f5523d5491d"
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
                "application_id": "a0dc4140-267f-451f-a759-4d1f18539425",
                "doc_id": docId
            }

            const result = await axios.delete("http://192.168.1.200:3000/api/document/delete", {
                data: body, // body data should go inside the `data` field
                headers: {
                    "client_id": "f2e99ec3-14a1-42f1-9185-aef0c503059a",
                    "access_key": "f4de5bcec318a80086f8a5f642180626d0bdd1c3e5e8c5d340124f5523d5491d"
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
                "application_id": "a0dc4140-267f-451f-a759-4d1f18539425",
                "doc_id": documentId
            }

            const result = await axios.post("http://192.168.1.200:3000/api/document/get", body, {
                headers: {
                    "client_id": "f2e99ec3-14a1-42f1-9185-aef0c503059a",
                    "access_key": "f4de5bcec318a80086f8a5f642180626d0bdd1c3e5e8c5d340124f5523d5491d"
                },
            });
            let base64Data = Buffer.from(result.data.data.doc_buffer.data, "binary").toString("base64");
            return { buffer: base64Data, contentType: result.data.data.doc_type, fileName: result.data.data.doc_title };

        }
    } catch (error) {
        logger.error(error);
    }
}