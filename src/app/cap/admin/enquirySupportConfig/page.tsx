import { getSession } from "@/app/services/session.service";
import { redirect } from "next/navigation";
import { fetchConfigData } from "@/app/controllers/configData.controller";
import ConfigForm from "./config";

const EnquiryConfigPage = async () => {
  const session = await getSession();
  if (session) {
    const config = await fetchConfigData();
    return <ConfigForm {...config} />;
  } else {
    redirect("/signin");
  }
};

export default EnquiryConfigPage;
