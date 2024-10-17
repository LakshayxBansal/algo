"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import {
  delItemById,
  getItemById,
  getItemByPage,
} from "@/app/controllers/item.controller";
import ItemForm from "@/app/Widgets/masters/masterForms/itemForm";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", editable: true },
  { field: "group_id", headerName: "Group Id", editable: true },
  { field: "alias", headerName: "Alias", editable: true },
  { field: "unit_id", headerName: "Unit Id", editable: true },
];

export default function Items() {
  return (
    <>
      <EntityList
        title="Item Master"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <ItemForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        fetchDataFn={getItemByPage}
        fnFetchDataByID={getItemById}
        fnDeleteDataByID={delItemById}
        customCols={columns}
        AddAllowed={true}
        height = "30em"
      ></EntityList>
    </>
  );
}
