"use server"
import excuteQuery from "../utils/db/db";

export async function getCallEnquiriesDb(crmDb: string,filterValueState: any) {
    try {
      let query: string =  "select eh.id, ecm.name callCategory, cm.name contactParty, eh.date, em.name executive,esm.name callStatus,\
                essm.name subStatus,eam.name actionTaken,eaxm.name nextAction, am.name area,  el.next_action_date actionDate\
                from enquiry_header_tran eh \
                left join enquiry_ledger_tran el on el.enquiry_id=eh.id \
                left join contact_master cm on eh.contact_id=cm.id\
                left join enquiry_category_master ecm on eh.category_id=ecm.id\
                left join enquiry_status_master esm on el.status_id=esm.id\
                left join enquiry_sub_status_master essm on el.sub_status_id=essm.id\
                left join enquiry_action_master eam on el.action_taken_id=eam.id\
                left join enquiry_action_master eaxm on el.action_taken_id=eaxm.id\
                left join area_master am on am.id=cm.area_id\
                left join executive_master em on em.id=el.allocated_to";
                
                const whereConditions: string[] = [];
                let values = [];

      if (filterValueState.callCategory) {       
        whereConditions.push(`ecm.name = ?`);     
        values.push(filterValueState.callCategory.name)
      }
      if (filterValueState.area) {           
        whereConditions.push(`am.name = ?`);       
        values.push(filterValueState.area.name)
      }
      if (filterValueState.nextAction) {           
        whereConditions.push(`eaxm.name = ?`);       
        values.push(filterValueState.nextAction.name)
      }

      if (whereConditions.length > 0) {
        query += ` WHERE ` + whereConditions.join(' AND ');
      }

      const result = await excuteQuery({
      host: crmDb,query,
      values: values,
      });
      return result;
    } catch (e) {
      console.log(e);
    }
  }