import { getSession } from "@/app/services/session.service";
import { redirect } from "next/navigation";
import { fetchConfigData, fetchConfigDeptMapData } from "@/app/controllers/configData.controller";
import ConfigForm from "./configForm";
import { getAllDepts } from "@/app/controllers/executiveDept.controller";
import { configDeptMapSchemaT, configSchemaT } from "@/app/models/models";
import { Metadata } from "next";
import { logger } from "@/app/utils/logger.utils";

export const metadata : Metadata = {
  title : 'Manage Configurations'
}

const AppConfigPage = async () => {
  try{
    const session = await getSession();
    if (session) {
      const config  = await fetchConfigData();     // fetch all configs
      const allDepts = await getAllDepts();       // get dept list 
      const configDeptMap = await fetchConfigDeptMapData(); //allocation matrix for transactions
      return <ConfigForm configData={config as configSchemaT} allDepts={allDepts} configDeptMap={configDeptMap as configDeptMapSchemaT}/>
    }
  }catch(error){
    logger.error(error);
  }
  redirect("/signin")
};

export default AppConfigPage;
