"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import ProductGroupForm from "@/app/Widgets/masters/masterForms/productGroupForm";
import {
  delProductGroupById,
  getProductGroupById,
  getProductGroupByPage,
} from "@/app/controllers/productGroup.controller";
import { Box } from "@mui/material";
import SecondNavbar from "@/app/cap/navbar/SecondNavbar";
import { PRODUCT_GROUP_OBJECT_ID } from "@/app/utils/consts.utils";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: false,
  },
];

export default function ProductGroup() {
  return (
    <>
      <SecondNavbar title={"List of Product Group"}/>
      <EntityList
        title="Product Group"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <ProductGroupForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        fetchDataFn={getProductGroupByPage}
        fnFetchDataByID={getProductGroupById}
        fnDeleteDataByID={delProductGroupById}
        customCols={columns}
        uploadAllowed={true}
        AddAllowed={false}
        height = "60vh"
        objectTypeId={PRODUCT_GROUP_OBJECT_ID}
      ></EntityList>
    </>
  );
}
