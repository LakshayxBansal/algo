"use server";
import { selectKeyValueT } from "@/app/models/models";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export async function enquiryDataFormat({
  formData,
  selectValues,
  dateTimeFormat,
  otherData,
}: {
  formData: FormData;
  selectValues: selectKeyValueT,
  dateTimeFormat: string;
  otherData?: any;
}) {

  const toISOString = (dateStr: string): string => {
   if (!dateStr || dateStr === "" || dateStr === "Invalid Date") return "";
       if (!dateStr || dateStr === "" || dateStr === "Invalid Date" ) return "";
          const dt = dayjs(dateStr, dateTimeFormat);
          if (!dt.isValid()) return "";
          const formatedDate= dt.format('YYYY-MM-DD HH:mm:ss');
          
      
          const newDate = new Date(formatedDate);
      
      return newDate.toISOString().slice(0, 10) + " " + newDate.toISOString().slice(11,19);
  };
  
  const date = formData.get("date")
    ? toISOString(formData.get("date") as string)
    : otherData?.date ?dayjs(otherData?.date).format('YYYY-MM-DD HH:mm:ss'):null;

  const nextActionDate = formData.get("next_action_date")
    ? toISOString(formData.get("next_action_date") as string)
    : null;

    const actionTakenDate = formData.get("action_taken_date")
    ? toISOString(formData.get("action_taken_date") as string)
    : null;
    
  const headerData = {
    enq_number: (formData.get("enq_number") as string) ?? otherData?.enq_number,
    date:date?.length===0?null:date,
    contact_id: selectValues.contact?.id,
    received_by_id: selectValues.received_by?.id,
    category_id: selectValues.category?.id,
    source_id: selectValues.source?.id,
    contact: selectValues.contact?.name ?? "",
    received_by: selectValues.received_by?.name ?? "",
    category: selectValues.category?.name ?? "",
    source: selectValues.source?.name ?? "",
    call_receipt_remark: (formData.get("call_receipt_remark") ) as string?? otherData?.call_receipt_remark ?? "",
  };

  let ledgerData = {
    date:date?.length===0?null:date,
    status_id: Number(formData.get("status")),
    sub_status_id: selectValues.sub_status?.id,
    sub_status: selectValues.sub_status?.name ?? "",
    action_taken_id: selectValues.action_taken?.id,
    action_taken: selectValues.action_taken?.name ?? "",
    next_action_id: selectValues.next_action?.id,
    next_action: selectValues.next_action?.name ?? "",
    next_action_date: nextActionDate,
    suggested_action_remark:
      ((formData.get("suggested_action_remark") ?? "") as string) ?? null,
    action_taken_remark: (formData.get("action_taken_remark") ?? "") as string,
    closure_remark: (formData.get("closure_remark") ?? "") as string,
    allocated_to_id: selectValues.allocated_to?.id,
    allocated_to: selectValues.allocated_to?.name ?? "",
    action_taken_date: actionTakenDate,
    c_col1: (formData.get("c_col1") ?? "") as string,
    c_col2: (formData.get("c_col2") ?? "") as string,
    c_col3: (formData.get("c_col3") ?? "") as string,
    c_col4: (formData.get("c_col4") ?? "") as string,
    c_col5: (formData.get("c_col5") ?? "") as string,
    c_col6: (formData.get("c_col6") ?? "") as string,
    c_col7: (formData.get("c_col7") ?? "") as string,
    c_col8: (formData.get("c_col8") ?? "") as string,
    c_col9: (formData.get("c_col9") ?? "") as string,
    c_col10: (formData.get("c_col10") ?? "") as string,
  };

  return { ...headerData, ...ledgerData };
}
