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
import { ORGANISATION_OBJECT_ID } from "@/app/utils/consts.utils";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: false,
  },
  {
    field: "alias",
    headerName: "Alias",
    editable: false,
  },
];

export default function organisation() {
  return (
    <>
      <SecondNavbar title={"List of Organisations"}/>
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
        fnFetchColumns={19}
        customCols={columns}
        uploadAllowed={true}
        AddAllowed={false}
        height="60vh"
        objectTypeId={ORGANISATION_OBJECT_ID}
      ></EntityList>
    </>
  );
}