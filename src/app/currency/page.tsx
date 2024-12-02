import CurrencyForm from "../Widgets/masters/masterForms/currencyForm";
import { getCurrencyById } from "../controllers/currency.controller";
import { Metadata } from "next";

export const metadata : Metadata = {
  title : 'Add Currency'
}

export default async function CurrencyData() {
  let id = null;

  let data = null;
  if (id) {
    const res = await getCurrencyById(id as number);
    data = res[0];
  }

  return <CurrencyForm data={data} />;
}
