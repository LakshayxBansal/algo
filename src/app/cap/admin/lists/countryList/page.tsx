"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import CountryForm from "@/app/Widgets/masters/masterForms/countryForm";
import {
  delCountryById,
  getCountryById,
  getCountryByPage,
} from "@/app/controllers/masters.controller";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: false,
  },
];

export default function Country() {
  return (
    <>
      <EntityList
        title="Country Master"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <CountryForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        fetchDataFn={getCountryByPage}
        fnFetchDataByID={getCountryById}
        fnDeleteDataByID={delCountryById}
        customCols={columns}
        uploadAllowed={true}
        AddAllowed={false}
        height = "60vh"
      ></EntityList>
    </>
  );
}
