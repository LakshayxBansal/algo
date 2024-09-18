"use server"
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { getOverviewGraphData } from '@/app/controllers/dashboard.controller';
import ChartContainer from './ChartContainer';

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
  let data = await getOverviewGraphData();  
  const result: Array<Array<Number>> = [];
  for(let i = 0; i < data.length - 1; i++){
    for (const ele of data[i]) {
      let arr = [];
      for(const key in ele){
        arr.push(Number(ele[key]));
      }
      result.push(arr);
    }
  }  
  const lineData = getLineData(result[0][0], result[1], result[2]);

  const currMonth = new Date().getMonth();
  const currYear = new Date().getFullYear();
  const xAxisData = getXAxisData(currMonth);
  let dispYear = "";
  if(currMonth < 5){
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
        <ChartContainer openData={result[1]} closedData={result[2]} lineData={lineData} xAxisData={xAxisData}/>
      </Paper>
    </Box>
  );
}