"use server";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Paper, Typography } from "@mui/material";
import { getExecutiveEnquiriesOverview } from "@/app/controllers/dashboard.controller";
import weekOfYear from "dayjs/plugin/weekOfYear";
import dayjs from "dayjs";
import { logger } from "@/app/utils/logger.utils";

const pgSize = 5;
const groupByName = (enquiries: any, data: any) => {
  const currWeek = dayjs().week();
  const maxWeekLastYear = 52;

  let result: any = {};
  data.forEach((ele: any) => {
    result[ele["name"]] = new Array(5);
    result[ele["name"]][0] = ele["name"];
    result[ele["name"]][1] = Number(ele["total"]);
    result[ele["name"]][2] = 0;
    result[ele["name"]][3] = 0;
    result[ele["name"]][4] = 0;
  });

  enquiries.forEach((ele: any) => {
    let weekDifference;

    if(ele['week'] > currWeek) {
      weekDifference = (currWeek - ele["week"] + maxWeekLastYear) % maxWeekLastYear;
    } else {
      weekDifference = currWeek - ele['week'];
    }

    
    

    if (weekDifference === 0) {
      result[ele["name"]][2] += Number(ele["count"]);
    } else if (weekDifference === 1) {
      result[ele["name"]][3] += Number(ele["count"]);
    } else {
      result[ele["name"]][4] += Number(ele["count"]);
    }
  });

  return result;
};

const createTableData = (data: any) => {
  let result = [];
  for (const key in data) {
    let obj: any = {};
    obj["id"] = result.length + 1;
    obj["name"] = key;
    obj["total"] = data[key][1];
    obj["since3w"] = data[key][4];
    obj["since2w"] = data[key][3];
    obj["since1w"] = data[key][2];

    result.push(obj);
  }

  return result;
};
export default async function ExecutiveEnquiryList() {
  dayjs.extend(weekOfYear);
  let result, data;
  try {
    result = await getExecutiveEnquiriesOverview();


    const groupedData = groupByName(result![1], result![0]);
    data = createTableData(groupedData);
  } catch (e) {
    logger.info(e);
  }


  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Executive", width: 200 },
    { field: "total", headerName: "Total", width: 150 },
    {
      field: "since1w",
      headerName: "This Week",
      width: 150,
    },
    {
      field: "since2w",
      headerName: "Last Week",
      width: 150,
    },
    {
      field: "since3w",
      headerName: "Earlier",
      width: 150,
    },
  ];

  return (
    <>
      <Paper elevation={2} sx={{ p: 2, borderRadius: "16px" }}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Open Enquiries
        </Typography>
        <DataGrid
          disableColumnMenu
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[pgSize, 10, 20]}
          disableRowSelectionOnClick
          autoHeight
        />
      </Paper>
    </>
  );
}
