import React, { Suspense } from "react";
import Dashbaord  from './dashboard/page';
import {  LinearProgress } from "@mui/material";
import TabLayout from "./TabLayout";
import SupportDashboard from "./supportDashboard/page";
import { getConfigData } from "../controllers/enquiry.controller";

export default async function ClientApp() {

  const dashboardContent = await Dashbaord();
  const supportDashboardContent = await SupportDashboard();
  const resultEnquiry = await getConfigData('enquiry');
  const enquiryEnabled = JSON.parse(resultEnquiry[0].config).reqd;
  const resultSupport = await getConfigData('support');
  const supportEnabled = JSON.parse(resultSupport[0].config).reqd;
  return (
    <Suspense fallback={<LinearProgress/>}>
      <TabLayout 
        dashboardContent={dashboardContent}
        supportDashboardContent={supportDashboardContent}
        enquiryEnabled={enquiryEnabled}
        supportEnabled={supportEnabled}
      />
    </Suspense>
  );
};




