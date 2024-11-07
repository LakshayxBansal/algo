"use server";
import { selectKeyValueT } from "@/app/models/models";

export async function enquiryDataFormat({
  formData,
  selectValues,
}: {
  formData: FormData;
  selectValues: selectKeyValueT;
}) {
  const formatDate = (dateStr: string): string => {
    const dt = new Date(dateStr);
    return dt.toISOString().slice(0, 10) + " " + dt.toISOString().slice(11, 19);
  };

  const date = formatDate(formData.get("date") as string);
  const nextActionDate = formData.get("next_action_date")
    ? formatDate(formData.get("next_action_date") as string)
    : null;
  // console.log(nextActionDate);
  const headerData = {
    enq_number: formData.get("enq_number") as string,
    date,
    contact_id: selectValues.contact?.id,
    received_by_id: selectValues.received_by?.id,
    category_id: selectValues.category?.id,
    source_id: selectValues.source?.id,
    contact: selectValues.contact?.name ?? "",
    received_by: selectValues.received_by?.name ?? "",
    category: selectValues.category?.name ?? "",
    source: selectValues.source?.name ?? "",
    call_receipt_remark: (formData.get("call_receipt_remark") ?? "") as string,
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
    suggested_action_remark: (formData.get("suggested_action_remark") ??
      "") as string,
    action_taken_remark: (formData.get("action_taken_remark") ?? "") as string,
    closure_remark: (formData.get("closure_remark") ?? "") as string,
  };

  return { ...headerData, ...ledgerData };
}
