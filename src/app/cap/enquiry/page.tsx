import React from "react";
import InputForm from "./InputForm2";
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

interface SearchParams {
  id?: string;
}

export default async function MyForm({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const enquiryId = searchParams.id ? parseInt(searchParams.id, 10) : undefined;

  try {
    const session = await getSession();

    if (session) {
      const fields = await getScreenDescription(26, 1);
      const enqData = await getEnquiryById(enquiryId);
      const rights = await getRightsData();
      const config_data = await getConfigData();
      const loggedInUserData = await getLoggedInUserDetails();

      const masterData = {
        fields: fields as Array<any>,
        enqData: enqData as Record<string, any>,
        rights: rights as Record<string, any>,
        config_data: JSON.parse(config_data?.config) as Record<string, any>,
        loggedInUserData: loggedInUserData?.data as Record<string, any>,
      };

      return <InputForm baseData={masterData}></InputForm>;
    }
  } catch (e) {
    // show error page
    logger.error(e);
  }
  redirect("/signin");
}
