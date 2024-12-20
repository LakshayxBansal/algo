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