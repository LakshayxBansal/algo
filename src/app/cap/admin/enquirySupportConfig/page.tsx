import { getSession } from "@/app/services/session.service";
import { redirect } from "next/navigation";
import { fetchConfigData, fetchConfigDeptMapData } from "@/app/controllers/configData.controller";
import ConfigForm from "./config";
import { getAllDepts } from "@/app/controllers/executiveDept.controller";

const data = {
  enquiry : {"reqd":true,"closeCall":false,"maintainProducts":false,"saveFAQ":true,"maintainAction":true,"voucher":{"voucherNumber":true,"prefix":"Algo","suffix":"-fast","length":"4","prefillWithZero":true}},
  support : {"reqd":true,"closeCall":true,"maintainProducts":true,"saveFAQ":true,"maintainAction":true,"voucher":{"voucherNumber":true,"prefix":"Algo","suffix":"fast","length":"4","prefillWithZero":true}},
  contract : {"reqd":true,"voucher":{"voucherNumber":true,"prefix":"Prefix","suffix":"Suffix","length":"4","prefillWithZero":true}},
  enquiryGeneration : {"reqd":true,"voucher":{"voucherNumber":true,"prefix":"Algo","suffix":"-fast","length":"6","prefillWithZero":true}},
  regionalSetting : {"reqd":true,"country":"Iceland","state":"Reykjavík","country_id":106,"state_id":108,"dateFormat":"DD.MM.YYYY","timeFormat":"12 Hours","currencySymbol":"Rs","currencyString":"Krona","currencySubString":"ISK","currencyCharacter":"kr","decimalPlaces":"Three Digits","voucher":{"voucherNumber":true,"prefix":"Algo","suffix":"fast","length":"5","prefillWithZero":true}}
}

const EnquiryConfigPage = async () => {
  const session = await getSession();
  if (session) {
    const config = await fetchConfigData();
    const allDepts = await getAllDepts();
    const configDeptMap = await fetchConfigDeptMapData();
    // console.log("config data : ",config)
    // console.log("allDepts : ", allDepts);
    // console.log("config map : ", configDeptMap);
    // return <ConfigForm {...config} />;
    return <ConfigForm configData={config} allDepts={allDepts} configDeptMap={configDeptMap}/>
  } else {
    redirect("/signin");
  }
};

export default EnquiryConfigPage;
