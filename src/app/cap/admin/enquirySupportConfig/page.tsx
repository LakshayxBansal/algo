// import EnquiryConfigForm from '../enquirySupportConfig/enquirySupportConfig';
import { getRegionalSetting } from "@/app/controllers/config.controller";
import { loadEnquirySupportConfig } from "@/app/controllers/enquirySupportConfig.controller";
import { getSession } from "@/app/services/session.service";
import { redirect } from "next/navigation";
import EnquiryConfigForm from "./newEnquirySupportConfig";

interface ConfigBase {
  reqd: boolean;
  closeCall: boolean;
  maintainProducts: boolean;
  saveFAQ: boolean;
  maintainAction: boolean;
  voucherNumber: boolean;
  prefix: string | null;
  suffix: string | null;
  length: string | null;
  prefillWithZero: boolean;
}

interface RegionalSettingConfig {
  country_id: number | null;
  state_id: number | null;
  dateFormat: string | null;
  timeFormat: string | null;
  currencySymbol: string | null;
  currencyString: string | null;
  currencySubString: string | null;
  currencyCharacter: string | null;
  decimalPlaces: string | null;
}

interface ConfigProps {
  enquiryConfig: ConfigBase;
  supportConfig: ConfigBase;
  contractConfig: {
    voucherNumber: boolean;
    prefix: string | null;
    suffix: string | null;
    length: string | null;
    prefillWithZero: boolean;
  };
  regionalSettingConfig: RegionalSettingConfig;
  enquiryGenerationConfig: {
    voucherNumber: boolean;
    prefix: string | null;
    suffix: string | null;
    length: string | null;
    prefillWithZero: boolean;
  };
}

const EnquiryConfigPage = async () => {
  const session = await getSession();
  if (session) {
    const enquiryConfig = await loadEnquirySupportConfig();
    // console.log("Data at page", enquiryConfig);
    
    // const regionalData = (await getRegionalSetting())[0];    
    
    // regionalData["config"] = JSON.parse(regionalData["config"]);

    return <EnquiryConfigForm {...enquiryConfig}  />;
    // return <EnquiryConfigForm />;

  } else {
    redirect("/signin");
  }
};

export default EnquiryConfigPage;
