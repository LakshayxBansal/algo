import { loadEnquirySupportConfig } from "@/app/controllers/enquirySupportConfig.controller";
import { getSession } from "@/app/services/session.service";
import { redirect } from "next/navigation";
import EnquiryConfigForm from "./enquirySupportConfig";

const EnquiryConfigPage = async () => {
  const session = await getSession();
  if (session) {
    const enquiryConfig = await loadEnquirySupportConfig();
    return <EnquiryConfigForm {...enquiryConfig}  />;
  } else {
    redirect("/signin");
  }
};

export default EnquiryConfigPage;