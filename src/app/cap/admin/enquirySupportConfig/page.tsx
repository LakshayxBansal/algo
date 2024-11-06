// import EnquiryConfigForm from '../enquirySupportConfig/enquirySupportConfig';
import { getRegionalSetting } from "@/app/controllers/config.controller";
import EnquiryConfigForm from "./refactoredCode";
import { loadEnquirySupportConfig } from "@/app/controllers/enquirySupportConfig.controller";
import { getSession } from "@/app/services/session.service";
import { redirect } from "next/navigation";

const EnquiryConfigPage = async () => {
  const session = await getSession();
  if (session) {
    const enquiryConfig = await loadEnquirySupportConfig();
    console.log(enquiryConfig);
    
    const regionalData = (await getRegionalSetting())[0];    
    
    regionalData["config"] = JSON.parse(regionalData["config"]);

    if (!enquiryConfig) {
      redirect("/signin");
    }

    return <EnquiryConfigForm {...enquiryConfig} regionalData={regionalData} />;
  } else {
    redirect("/signin");
  }
};

export default EnquiryConfigPage;
