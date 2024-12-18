"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import {
  delOrganisationById,
  getOrganisationById,
  getOrganisationByPage,
} from "@/app/controllers/organisation.controller";
import OrganisationForm from "@/app/Widgets/masters/masterForms/organisationForm";
import { Box } from "@mui/material";
import SecondNavbar from "@/app/cap/navbar/SecondNavbar";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: true,
  },
  {
    field: "alias",
    headerName: "Alias",
    editable: true,
  },
];

export default function organisation() {
  return (
    <>
      <Box sx={{margin: "20px 20px"}}>
      <SecondNavbar title={"List of Organisation"}/>
      </Box>
      <EntityList
        title="Organisation"
        renderForm={(fnDialogOpen, fnDialogValue, metaData, data) => (
          <OrganisationForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            metaData={metaData}
            data={data}
          />
        )}
        fetchDataFn={getOrganisationByPage}
        fnFetchDataByID={getOrganisationById}
        fnDeleteDataByID={delOrganisationById}
        customCols={columns}
        uploadAllowed={true}
        AddAllowed={false}
        height="60vh"
      ></EntityList>
    </>
  );
}