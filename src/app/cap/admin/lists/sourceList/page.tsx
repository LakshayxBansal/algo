"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import SourceForm from "@/app/Widgets/masters/masterForms/sourceForm";
import {
  delEnquirySourceById,
  getEnquirySourceById,
  getEnquirySourceByPage,
} from "@/app/controllers/enquirySource.controller";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: false,
  },
];

export default function enquirySource() {
  return (
    <>
      <EntityList
        title="Source"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <SourceForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        fetchDataFn={getEnquirySourceByPage}
        fnFetchDataByID={getEnquirySourceById}
        fnDeleteDataByID={delEnquirySourceById}
        customCols={columns}
        uploadAllowed={true}
        AddAllowed={false}
        height = "60vh"
      ></EntityList>
    </>
  );
}
