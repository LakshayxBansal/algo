'use client'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';

export default function CompositionChart() {
//   const [isResponsive, setIsResponsive] = React.useState(false);

//   const sizingProps = isResponsive ? {} : { width: 500, height: 300 };
  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <Paper sx={{ width: '100%', height: "100%"}} elevation={3}>
        <ResponsiveChartContainer
          series={[
            {
              type: 'bar',
              data: [1, 2, 3, 2, 1],
            },
            {
              type: 'line',
              data: [4, 3, 1, 3, 4],
            },
          ]}
          xAxis={[
            {
              data: ['A', 'B', 'C', 'D', 'E'],
              scaleType: 'band',
              id: 'x-axis-id',
            },
          ]}
          
        //   {...sizingProps}
        >
          <BarPlot />
          <LinePlot />
          <MarkPlot />
          <ChartsXAxis label="X axis" position="bottom" axisId="x-axis-id" />
        </ResponsiveChartContainer>
      </Paper>
    </Box>
  );
}
