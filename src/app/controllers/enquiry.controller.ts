"use server";
import {
  createEnquiryDB,
  getHeaderDataAction,
  getItemDataAction,
  getLedgerDataAction,
  showItemGridDB,
} from "../services/enquiry.service";
import { getSession } from "../services/session.service";
import {
  enquiryDataSchemaT,
  enquiryHeaderSchemaT,
  enquiryItemSchemaT,
  enquiryLedgerSchemaT,
  selectKeyValueT,
} from "@/app/models/models";
import {
  enquiryDataSchema,
  enquiryHeaderSchema,
  enquiryLedgerSchema,
  itemToListFormArraySchema,
  itemToListFormSchema,
} from "@/app/zodschema/zodschema";
import { logger } from "@/app/utils/logger.utils";
import { Session } from "next-auth";

type enqData = {
  head: enquiryHeaderSchemaT;
  ledger: enquiryLedgerSchemaT;
  item: enquiryItemSchemaT[];
};

export async function createEnquiry({
  enqData,
  item,
}: {
  enqData: enquiryDataSchemaT;
  item: enquiryItemSchemaT[];
}) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      const updatedEnqData = {
        ...enqData,
        status_version: 0,
        allocated_to_id: 0,
        allocated_to: "",
        enquiry_tran_type: 1,
        active: 1,
      };
      const enqDataParsed = enquiryDataSchema.safeParse(updatedEnqData);
      const itemParsed = itemToListFormArraySchema.safeParse(item);
      if (enqDataParsed.success && itemParsed.success) {
        const enqActionData = {
          headerLedger: updatedEnqData,
          item: JSON.stringify(item),
        };

        const dbResult = await createEnquiryDB(session, enqActionData);
        if (dbResult.length > 0 && dbResult[0][0].error === 0) {
          result = { status: true, data: dbResult[1] };
        } else {
          result = {
            status: false,
            data: [
              {
                path: [dbResult[0][0].error_path],
                message: dbResult[0][0].error_text,
              },
            ],
          };
        }
      } else {
        let enqIssue: any[] = [];
        let itemIssue: any[] = [];
        if (!enqDataParsed.success) {
          enqIssue = enqDataParsed.error.issues;
        }
        if (!itemParsed.success) {
          itemIssue = itemParsed.error.issues;
        }
        result = {
          status: false,
          data: [
            { enqDataIssue: enqIssue.length > 0 ? enqIssue : null },
            { itemIssue: itemIssue.length > 0 ? itemIssue : null },
          ],
        };
      }
      console.log("result ", result);
      
    } else {
      result = {
        status: false,
        data: [{ path: ["form"], message: "Error: Server Error" }],
      };
    }
    return result;
  } catch (e) {
    logger.error(e);
  }

  result = {
    status: false,
    data: [{ path: ["form"], message: "Error: Unknown Error" }],
  };
  return result;
}

export async function showItemGrid() {
  let result;

  try {
    const session = await getSession();
    if (session) {
      const dbResult = await showItemGridDB(session.user.dbInfo.dbName);
      if (dbResult) {
        result = { status: true, config: dbResult[0].config };
      }
    }
    return result;
  } catch (e) {
    logger.error(e);
  }
}

export async function getEnquiryById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const headerData = await getHeaderDataAction(session, 7);
      const ledgerData = await getLedgerDataAction(session, 7);
      const itemData = await getItemDataAction(session, 7);

      return { headerData, ledgerData, itemData };
    }
  } catch (error) {
    logger.error(error);
  }
}

export async function updateEnquiryById({
  id,
  ledgerData,
}: {
  id: number;
  ledgerData: enquiryLedgerSchemaT;
}) {
  try {
    const session = await getSession();
    if (session) {
      const updateDataParsed = enquiryLedgerSchema.safeParse(ledgerData);
    }
  } catch (error) {
    logger.error(error);
  }
}
