import AllocationTypeMasterForm from "../Widgets/masters/masterForms/allocationTypeMaster";
import ContactGroupForm from "../Widgets/masters/masterForms/contactGroupForm";
import CurrencyForm from "../Widgets/masters/masterForms/currencyForm";
import { getAllocationTypeById } from "../controllers/allocationType.controller";

export default async function allocationType() {
  let id = null;

  let data = null;
  if (id) {
    const res = await getAllocationTypeById(id as number);
    data = res[0];
  }

  return <CurrencyForm data={data} />;
}
