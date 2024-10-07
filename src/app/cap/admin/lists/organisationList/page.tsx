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
      <EntityList
        title="Organisation List"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <OrganisationForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        fetchDataFn={getOrganisationByPage}
        fnFetchDataByID={getOrganisationById}
        fnDeleteDataByID={delOrganisationById}
        customCols={columns}
        AddAllowed={true}
        height="40em"
      ></EntityList>
    </>
  );
}
