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
import { Box } from "@mui/material";
import SecondNavbar from "@/app/cap/navbar/SecondNavbar";
import { COUNTRY_OBJECT_ID } from "@/app/utils/consts.utils";

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
      <SecondNavbar title={"List of Country"}/>
      <EntityList
        title="Country"
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
        objectTypeId={COUNTRY_OBJECT_ID}
      ></EntityList>
    </>
  );
}
