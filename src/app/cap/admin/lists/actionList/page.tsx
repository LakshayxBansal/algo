"use client";
import * as React from "react";

import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import AppBar from "@mui/material/AppBar";
import {
  DeleteActionById,
  getActionById,
  getEnquiryActionByPage,
} from "@/app/controllers/enquiryAction.controller";
import ActionForm from "@/app/Widgets/masters/masterForms/actionForm";

export default function Action() {
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      editable: true,
    },
  ];

  return (
    <div style={{ height: 800, width: "100%" }}>
      <AppBar position="static" color="default"></AppBar>
      <EntityList
        title="Action Form"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <ActionForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        fetchDataFn={getEnquiryActionByPage}
        fnFetchDataByID={getActionById}
        fnDeleteDataByID={DeleteActionById}
        customCols={columns}
        AddAllowed={true}
      ></EntityList>
    </div>
  );
}
