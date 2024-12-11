'use server'
import Category from "@/app/cap/admin/lists/categoryList/page";
import { selectKeyValueT } from "@/app/models/models";
import { adjustToLocal } from "../utcToLocal";

export async function supportDataFormat({
  formData,
  selectValues,
  otherData
}: {
  formData: FormData;
  selectValues: selectKeyValueT;
  otherData?: any
}) {
  const formatDate = (dateStr: string | null | undefined ): string => {
    if (!dateStr || dateStr === "" || dateStr === "Invalid Date") return "";
    const dt = new Date(dateStr);
    return dt.toISOString().slice(0, 10) + " " + dt.toISOString().slice(11, 19);
  };

  const date= formatDate(  formData.get("date") ? formData.get("date") as string: adjustToLocal(otherData?.masterData.date).toString() );
  const nextActionDate = formatDate(formData.get("next_action_date") as string);

  const headerData = {
    tkt_number: formData.get("tkt_number") as string ?? otherData?.tkt_number,
    date: date,
    contact_id: selectValues.contact?.id,
    received_by_id: selectValues.received_by?.id,
    category_id: selectValues.category?.id,
    contact: selectValues.contact?.name ?? "",
    received_by: selectValues.received_by?.name ?? "",
    category: selectValues.category?.name ?? "",
    call_receipt_remark: (formData.get("call_receipt_remark") ?? "") as string ?? otherData?.call_receipt_remark,
  };

  let ledgerData = {
    date,
    status_id: Number(formData.get("status")),
    sub_status_id: selectValues.sub_status?.id,
    sub_status: selectValues.sub_status?.name ?? "",
    action_taken_id: selectValues.action_taken?.id,
    action_taken: selectValues.action_taken?.name ?? "",
    next_action_id: selectValues.next_action?.id,
    next_action: selectValues.next_action?.name ?? "",
    next_action_date: nextActionDate,
    suggested_action_remark: (formData.get("suggested_action_remark")?? "" ) as string ?? otherData?.suggested_action_remark,
    action_taken_remark: (formData.get("action_taken_remark" )?? "") as string ,
    closure_remark: (formData.get("closure_remark") ?? "") as string ?? otherData?.closure_remark,
    allocated_to_id: selectValues.allocated_to?.id ?? otherData?.ledger_allocated_to,
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

  return { ...headerData, ...ledgerData};
}



