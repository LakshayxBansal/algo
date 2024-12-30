import React, { Suspense } from "react";
import Dashbaord  from './dashboard/page';
import {  LinearProgress } from "@mui/material";



export default function ClientApp() {

  return (
    <Suspense fallback={<LinearProgress/>}>
    <Dashbaord></Dashbaord>
    </Suspense>
  );
};




