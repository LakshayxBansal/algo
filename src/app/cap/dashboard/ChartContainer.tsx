"use client"
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LinePlot } from '@mui/x-charts/LineChart';
import { ChartsLegend, ChartsTooltip, ChartsXAxis, ChartsYAxis } from '@mui/x-charts';

export default function ChartContainer(props: {
    openData: number[],
    closedData: number[],
    lineData: number[],
    xAxisData: string[]
}) {
    return (
        <ResponsiveChartContainer
          series={[
            { type: "bar", data: props.openData, stack: "group1", label: 'Open', color: "rgba(144, 202, 249, 0.85)", highlightScope: {highlighted: "item"}},
            { type: "bar", data: props.closedData, stack: "group1", label: 'Closed', color: "rgba(30, 136, 229, 0.85)", highlightScope: {highlighted: "item"}},
            { type: "line", data: props.lineData, label: 'Cumulative open', color:"rgba(103, 58, 183, 0.85)"},
          ]}
          xAxis={[{ scaleType: "band",  data: props.xAxisData, id: 'x-axis-id' }]}
          yAxis={[{ id: 'y-axis-id' }]}
          height={380}
        >
          <ChartsLegend direction="row"/>
          <BarPlot />
          <LinePlot />
          <ChartsXAxis label="Month" position="bottom" axisId="x-axis-id" />
          <ChartsYAxis axisId="y-axis-id" />
          <ChartsTooltip/>
        </ResponsiveChartContainer>
    )
}