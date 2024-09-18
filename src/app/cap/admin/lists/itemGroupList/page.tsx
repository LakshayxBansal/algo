"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import ItemGroupForm from "@/app/Widgets/masters/masterForms/itemGroupForm";
import {
  delItemGroupById,
  getItemGroupById,
  getItemGroupByPage,
} from "@/app/controllers/itemGroup.controller";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: true,
  },
];

export default function ItemGroup() {
  return (
    <>
      <EntityList
        title="Item Group Master"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <ItemGroupForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        fetchDataFn={getItemGroupByPage}
        fnFetchDataByID={getItemGroupById}
        fnDeleteDataByID={delItemGroupById}
        customCols={columns}
        AddAllowed={true}
      ></EntityList>
    </>
  );
}
