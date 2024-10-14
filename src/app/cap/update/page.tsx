import React from "react";
import InputForm from "./InputForm";
import { getSession } from "../../services/session.service";
import { redirect } from "next/navigation";
import { logger } from "@/app/utils/logger.utils";
import { showItemGrid } from "@/app/controllers/enquiry.controller";

export default async function MyForm() {
  try {
    const session = await getSession();

    if (session) {
      const masterData = {
        userName: session.user?.name as string,
      };

      const config_data = await showItemGrid();
      const config = JSON.parse(config_data?.config);
      if (config_data?.status) {
        console.log("Config Data is present->", config);
      } else {
        console.log("Config Data is not present->", config);
      }
      return <InputForm baseData={masterData} config={config}></InputForm>;
    }
  } catch (e) {
    // show error page
    logger.error(e);
  }
  redirect("/signin");
}
