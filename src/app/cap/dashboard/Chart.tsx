'use client'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LinePlot } from '@mui/x-charts/LineChart';
import { ChartsLegend, ChartsTooltip, ChartsXAxis, ChartsYAxis } from '@mui/x-charts';

const splitDataByMonth = (enquiries: any) => {
  let arr = new Array(6).fill(0);
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  
  enquiries.map((item: any) => {  
    let ind = -1;
    if(month >= 5 && (year == item.date.getFullYear())){
      ind = month - item.date.getMonth();
    }
    else if(month < 5 && (year - item.date.getFullYear()) === 1){
      ind = month + (11 - item.date.getMonth());
    }
    if(ind >= 0 && ind <= 5){
      arr[ind]++;
    }
  });
  return arr;
}
const getLineData = (openData: any) => {
  let arr = [openData[0]];

  for (let i = 1; i < openData.length; i++) {
    arr.push(arr[i - 1] + openData[i]);
  }
  return arr;
}

export default function Chart(props: {
  openEnquiries: any,
  closedEnquiries: any
}) {
  const openData = splitDataByMonth(props.openEnquiries)  
  const closedData = splitDataByMonth(props.closedEnquiries)
  const lineData = getLineData(openData)
  
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: "100%"}} elevation={2}>
        <ResponsiveChartContainer
          series={[
            { type: "bar", data: openData, stack: "group1", label: 'Open', color: "#00b0ff"},
            { type: "bar", data: closedData, stack: "group1", label: 'Closed', color: "#00e5ff"},
            { type: "line", data: lineData, label: 'Cumulative open', color:"#26a69a"},
          ]}
          xAxis={[{ scaleType: "band",  data: ['1', '2', '3', '4', '5', '6'], id: 'x-axis-id' }]}
          yAxis={[{ id: 'y-axis-id' }]}
          height={300}
        >
          <BarPlot/>
          <LinePlot />
          <ChartsLegend direction="row" />
          <ChartsXAxis label="Month" position="bottom" axisId="x-axis-id" />
          <ChartsYAxis axisId="y-axis-id" />
          <ChartsTooltip/>
        </ResponsiveChartContainer>
      </Paper>
    </Box>
  );
}