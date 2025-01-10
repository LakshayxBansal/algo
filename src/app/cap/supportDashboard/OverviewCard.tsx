"use server";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { getOverviewGraphTicketsData } from "@/app/controllers/dashboard.controller";
import ChartContainer from "./ChartContainer";
import { logger } from "@/app/utils/logger.utils";

const getBarData = (data: any[], currMonth: number) => {
  const result: number[] = new Array(6).fill(0);

  data.forEach((ele: any) => {
    const month = ele["month"];
    const count = Number(ele["count"]);

    const index =
      currMonth < 6 ? (currMonth + (12 - month)) % 6 : (currMonth - month) % 6;

    result[index] = count;
  });

  return result.reverse();
};

const getLineData = (totalOpen: any, openData: any, closedData: any) => {
  let initial =
    totalOpen -
    openData.reduce((accumulator: number, curr: number) => accumulator + curr);
  let arr = [initial + openData[0] - closedData[0]];

  for (let i = 1; i < openData.length; i++) {
    arr.push(arr[i - 1] + openData[i] - closedData[i]);
  }
  return arr;
};
const getXAxisData = (currMonth: number) => {
  const monthArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let data: Array<string> = [];

  for (let i = 0; i < 6; i++) {    
    const ind = currMonth - 1;
    currMonth = currMonth === 1 ? 12 : currMonth - 1;
    data.push(monthArr[ind]);
  }
  return data.reverse();
};

export default async function OverviewCard() {
  let data = [],
    totalOpen,
    openTickets = [],
    closedTickets = [];
  try {
    data = (await getOverviewGraphTicketsData())!;
    totalOpen = Number(data![0][0].totalOpen);
    openTickets = data![1];
    closedTickets = data![2];
  } catch (e) {
    logger.info(e);
  }

  const date = new Date();
  const currMonth = date.getMonth() + 1;
  const openData = getBarData(openTickets, currMonth);
  const closedData = getBarData(closedTickets, currMonth);
  const lineData = getLineData(totalOpen, openData, closedData);
  const xAxisData = getXAxisData(currMonth);
  return (
    <Box>
      <Paper sx={{ width: "100%", borderRadius: "16px" }} elevation={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pt: 2,
            width: "90%",
            margin: "auto",
          }}
        >
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Tickets Overview
          </Typography>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            {date.toDateString()}
          </Typography>
        </Box>
        <ChartContainer
          openData={openData}
          closedData={closedData}
          lineData={lineData}
          xAxisData={xAxisData}
        />
      </Paper>
    </Box>
  );
}
