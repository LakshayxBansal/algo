import React from "react";
import InputForm from "./InputForm";
import { getSession } from "../../services/session.service";
import { redirect } from "next/navigation";
import { logger } from "@/app/utils/logger.utils";
import {
  getLoggedInUserDetails,
  showProductGrid,
} from "@/app/controllers/enquiry.controller";
import { useParams } from 'next/navigation';




export default async function MyForm({ searchParams }: { searchParams: any }) {
  // const params = useParams();
  const id = searchParams.id; // `id` is the route parameter here
  try {
    const session = await getSession();

    if (session) {
      const masterData = {
        userName: session.user?.name as string,
      };

      const data = await getLoggedInUserDetails();
      const config_data = await showProductGrid();
      const config = JSON.parse(config_data?.config);
      if (config_data?.status) {
        console.log("Config Data is present->", config);
      } else {
        console.log("Config Data is not present->", config);
      }
      return (
        <InputForm
          baseData={masterData}
          config={config}
          loggedInUserData={data?.data}
        ></InputForm>
      );
    }
  } catch (e) {
    // show error page
    logger.error(e);
  }
  redirect("/signin");
}
