"use server"
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { getOverviewGraphData } from '@/app/controllers/dashboard.controller';
import ChartContainer from './ChartContainer';

const getBarData = (data: any, currMonth: number) => {
  let result: Array<Number> = new Array(6).fill(0);
  
  data.forEach((ele: any) => {
    let ind = -1;
    if(currMonth < 6){
      const month = ele["month"];
      ind = currMonth + (12 - month);
    }
    else{
      ind = currMonth - ele["month"];
    }
    const count = Number(ele["count"]);
    result[ind] = count;
  });
  return result.reverse();
}
const getLineData = (totalOpen: any, openData: any, closedData: any) => {
  let initial = totalOpen - openData.reduce((accumulator: number, curr: number) => accumulator + curr);
  let arr = [initial + openData[0] - closedData[0]];

  for (let i = 1; i < openData.length; i++) {
    arr.push(arr[i - 1] + openData[i] - closedData[i]);
  }
  return arr;
}
const getXAxisData = (currMonth: number) => {
  const monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  let data: Array<string> = [];
  
  for(let i = 0; i < 6; i++){
    const ind = currMonth;
    currMonth = currMonth === 0 ? 11 : currMonth - 1;
    data.push(monthArr[ind]);
  }
  return data.reverse();
}

export default async function OverviewCard() {
  const data = await getOverviewGraphData();
  const totalOpen = Number(data[0][0].totalOpen);
  
  
  const currMonth = (new Date().getMonth() + 1);
  const currYear = new Date().getFullYear();

  const openData = getBarData(data[1], currMonth);
  const closedData = getBarData(data[2], currMonth);
  const lineData = getLineData(totalOpen, openData, closedData);  
  const xAxisData = getXAxisData(currMonth);
  let dispYear = "";
  if(currMonth < 6){
    dispYear = currYear - 1 + "-";
  }
  dispYear += currYear;
  
  return (
    <Box>
      <Paper sx={{ width: "100%", borderRadius: "16px"}} elevation={2}>
        <Box sx={{display: "flex", justifyContent: "space-between", pt: 2, width: "90%", margin: "auto"}}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>Enquiries Overview</Typography>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>{dispYear}</Typography>
        </Box>
        <ChartContainer openData={openData} closedData={closedData} lineData={lineData} xAxisData={xAxisData}/>
      </Paper>
    </Box>
  );
}