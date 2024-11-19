'use server';

import { enquiryConfigSchemaT } from '../models/models';
import { Session } from 'next-auth';
import executeQuery from "../utils/db/db";


export async function getConfigTypeId(crmDb: string, configType: string): Promise<number | null> {
    try {
        const query = `SELECT id FROM config_meta_data WHERE config_type = ?`;
        const result = await executeQuery({
            host: crmDb,
            query: query,
            values: [configType],
        });

        if (result && result.length > 0) {
            return result[0].id;
        }

        return null;
    } catch (error) {
        console.error(`Error fetching config type ID for ${configType}:`, error);
        return null;
    }
}



export async function getEnquirySupportConfigDB(
    crmDb: string,
    configType: string = 'enquiry'
): Promise<enquiryConfigSchemaT | null> {
    try {
        const configTypeId = await getConfigTypeId(crmDb, configType);
        console.log('config id : ', configTypeId);
        if (!configTypeId) {
            throw new Error(`No config type found for ${configType}`);
        }

        const configQuery = `SELECT config FROM app_config WHERE config_type_id = ?`;
        const configResult = await executeQuery({
            host: crmDb,
            query: configQuery,
            values: [configTypeId],
        });

        console.log("result", configResult[0]);

        if (configResult && configResult.length > 0) {
            return JSON.parse(configResult[0].config);
        }

        return initEnquiryConfigSchema();

    } catch (e) {
        console.error("Error fetching config data:", e);
        return null;
    }
}




export async function updateEnquirySupportConfigDB(
    session: Session,
    data: enquiryConfigSchemaT
) {
    try {
        const crmDb = session.user.dbInfo.dbName;
        const configTypeId = await getConfigTypeId(crmDb, 'enquiry');

        if (!configTypeId) {
            throw new Error(`No config type found for enquiry`);
        }

        const query = `
            INSERT INTO app_config (config_type_id, config)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE
              config = VALUES(config)
        `;

        const values = [
            configTypeId,
            JSON.stringify(data),
        ];

        const result = await executeQuery({
            host: crmDb,
            query,
            values,
        });

        if (result.affectedRows > 0) {
            const selectQuery = `SELECT * FROM app_config WHERE config_type_id = ?`;
            const selectResult = await executeQuery({
                host: crmDb,
                query: selectQuery,
                values: [configTypeId],
            });

            return selectResult;
        }

        return result;

    } catch (e) {
        console.error("Error updating config data:", e);
        return null;
    }
}



export async function initEnquiryConfigSchema(): Promise<enquiryConfigSchemaT> {
    return {
        enquiryReqd: false,
        supportReqd: false,
        enquiryCloseCall: false,
        enquiryMaintainProducts: false,
        enquirySaveFAQ: false,
        enquiryMaintainAction: false,
        supportCloseCall: false,
        supportMaintainProducts: false,
        supportSaveFAQ: false,
        supportMaintainAction: false,
        generalMaintainArea: false,
        generalMaintainImage: false,
        generalShowList: false,
    };
}





