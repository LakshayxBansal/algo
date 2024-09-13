import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { getClosedEnquiries, getOpenEnquiries } from '@/app/controllers/dashboard.controller';
import ChartContainer from './ChartContainer';

const splitDataByMonth = (enquiries: any, currMonth: number, currYear: number) => {
  let arr = new Array(6).fill(0);
  
  enquiries.map((item: any) => {  
    let ind = -1;
    if(currYear === item.date.getFullYear()){
      ind = currMonth - item.date.getMonth();
    }
    else if(currMonth < 5 && (currYear - item.date.getFullYear()) === 1){
      ind = currMonth + (11 - item.date.getMonth()) + 1;
    }
    if(ind >= 0 && ind < arr.length){
      arr[ind]++;
    }
  });
  return arr.reverse();
}
const getLineData = (totalOpen: number, openData: any, closedData: any) => {
  let sum = totalOpen - openData.reduce((accumulator: number, curr: number) => accumulator + curr);
  let arr = [sum + openData[0] - closedData[0]];

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
  let [openEnquiries, closedEnquiries] = await Promise.all([getOpenEnquiries(), getClosedEnquiries()]);
  const currMonth = new Date().getMonth();
  const currYear = new Date().getFullYear();
  const openData = splitDataByMonth(openEnquiries, currMonth, currYear);
  const closedData = splitDataByMonth(closedEnquiries, currMonth, currYear);
  const lineData = getLineData(openEnquiries.length, openData, closedData);
  const xAxisData = getXAxisData(currMonth);
  let dispYear = "";
  if(currMonth < 5){
    dispYear = currYear - 1 + "-";
  }
  dispYear += currYear;
  
  return (
    <Box sx={{ width: '100%'}}>
      <Paper sx={{ width: "100%", borderRadius: "16px"}} elevation={2}>
        <Box sx={{display: "flex", justifyContent: "space-between", paddingTop: "10px", width: "90%", margin: "auto"}}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>Enquiries Overview</Typography>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>{dispYear}</Typography>
        </Box>
         {/* <ResponsiveChartContainer
          series={[
            { type: "bar", data: openData, stack: "group1", label: 'Open', color: "rgba(144, 202, 249, 0.85)", highlightScope: {highlighted: "item"}},
            { type: "bar", data: closedData, stack: "group1", label: 'Closed', color: "rgba(30, 136, 229, 0.85)", highlightScope: {highlighted: "item"}},
            { type: "line", data: lineData, label: 'Cumulative open', color:"rgba(103, 58, 183, 0.85)"},
          ]}
          xAxis={[{ scaleType: "band",  data: xAxisData, id: 'x-axis-id' }]}
          yAxis={[{ id: 'y-axis-id' }]}
          height={380}
        >
          <ChartsLegend direction="row"/>
          <BarPlot />
          <LinePlot />
          <ChartsXAxis label="Month" position="bottom" axisId="x-axis-id" />
          <ChartsYAxis axisId="y-axis-id" />
          <ChartsTooltip/>
        </ResponsiveChartContainer> */}
        <ChartContainer openData={openData} closedData={closedData} lineData={lineData} xAxisData={xAxisData}/>
      </Paper>
    </Box>
  );
}