'use server';

import { enquiryConfigSchemaT } from '../models/models';
import { Session } from 'next-auth';
import executeQuery from "../utils/db/db";


export async function getEnquirySupportConfigDB(
    crmDb: string,
    configType: string = 'enquiry_support'
): Promise<enquiryConfigSchemaT | null> {
    try {
        const query = `SELECT config FROM app_config WHERE config_type = ?`;
        const values = [configType];

        const result = await executeQuery({
            host: crmDb,
            query: query,
            values: values,
        });

        console.log(result)

        if (result && result.length > 0) {
            return JSON.parse(result[0].config);
        }

        return null;
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
        const query = `
            INSERT INTO app_config (config_type, config)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE
              config = VALUES(config)
        `;

        const values = [
            'enquiry_support',
            JSON.stringify(data),
        ];

        const result = await executeQuery({
            host: session.user.dbInfo.dbName,
            query,
            values,
        });

        if (result.affectedRows > 0) {
            const selectQuery = `SELECT * FROM app_config WHERE config_type = ?`;
            const selectValues = ['enquiry_support'];
            const selectResult = await executeQuery({
                host: session.user.dbInfo.dbName,
                query: selectQuery,
                values: selectValues,
            });

            return selectResult;
        }

        return result;

    } catch (e) {
        return null;
    }
}
