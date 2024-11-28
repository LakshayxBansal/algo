import React from "react";
import InputForm from "./InputForm";
import { getSession } from "../../services/session.service";
import { redirect } from "next/navigation";
import { logger } from "@/app/utils/logger.utils";
import {
  getLoggedInUserDetails,
  getConfigData,
  getEnquiryById,
} from "@/app/controllers/enquiry.controller";
import { getRightsData } from "@/app/controllers/rights.controller";
import { getScreenDescription } from "@/app/controllers/object.controller";
import { ENQUIRY_ID } from "@/app/utils/consts.utils";

interface SearchParams {
  id?: string;
}

interface MasterData {
  fields: Array<Record<string, any>>;
  enqData: Record<string, any>;
  // rights: Record<string, any>;
  config_data: Record<string, any>;
  regional_setting: Record<string, any>;
  loggedInUserData: Record<string, any>;
}

export default async function MyForm({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const enquiryId = searchParams.id ? parseInt(searchParams.id, 10) : undefined;

  try {
    const session = await getSession();

    if (!session) {
      redirect("/signin");
      return null; // Ensures no further code executes
    }

    const fields = await getScreenDescription(ENQUIRY_ID);
    const enqData = enquiryId ? await getEnquiryById(enquiryId) : undefined;
    // const rights = await getRightsData();
    const config_data = await getConfigData();
    const loggedInUserData = await getLoggedInUserDetails();

    if (
      !fields ||
      !config_data ||
      !loggedInUserData ||
      !Array.isArray(config_data) ||
      config_data.length < 2
    ) {
      logger.error("Required data is missing or invalid.");
      redirect("/signin");
      return null;
    }

    const masterData: MasterData = {
      fields: fields ?? [],
      enqData: enqData ?? {},
      /*rights: rights ?? {},*/
      config_data: JSON.parse(config_data[0].config) ?? {},
      regional_setting: JSON.parse(config_data[1].config) ?? {},
      loggedInUserData: loggedInUserData ?? {},
    };

    return <InputForm baseData={masterData}></InputForm>;
    return <InputForm baseData={masterData}></InputForm>;
  } catch (e) {
    // show error page
    logger.error("An error occurred:", e);
    redirect("/signin");
    return null;
  }
}
