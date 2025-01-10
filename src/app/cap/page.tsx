import React, { Suspense } from "react";
import Dashbaord  from './dashboard/page';
import {  LinearProgress } from "@mui/material";
import TabLayout from "./TabLayout";
import SupportDashboard from "./supportDashboard/page";

export default async function ClientApp() {

  const dashboardContent = await Dashbaord();
  const supportDashboardContent = await SupportDashboard();

  return (
    <Suspense fallback={<LinearProgress/>}>
      <TabLayout 
        dashboardContent={dashboardContent}
        supportDashboardContent={supportDashboardContent}
      />
    </Suspense>
  );
};




