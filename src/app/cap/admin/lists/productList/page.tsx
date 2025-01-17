"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import {
  delProductById,
  getProductById,
  getProductByPage,
} from "@/app/controllers/product.controller";
import ProductForm from "@/app/Widgets/masters/masterForms/productForm";
import { Box } from "@mui/material";
import SecondNavbar from "@/app/cap/navbar/SecondNavbar";
import { PRODUCT_OBJECT_ID } from "@/app/utils/consts.utils";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", editable: false },
  { field: "group_name", headerName: "Group Name", editable: false },
  { field: "alias", headerName: "Alias", editable: false },
  { field: "unit_name", headerName: "Unit Name", editable: false },
];

export default function Products() {
  return (
    <>
      <SecondNavbar title={"List of Product"}/>
      <EntityList
        title="Product"
        renderForm={(fnDialogOpen, fnDialogValue,metaData, data) => (
          <ProductForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            metaData={metaData}
            data={data}
          />
        )}
        fetchDataFn={getProductByPage}
        fnFetchDataByID={getProductById}
        fnDeleteDataByID={delProductById}
        customCols={columns}
        uploadAllowed={true}
        AddAllowed={false}
        height = "60vh"
        objectTypeId={PRODUCT_OBJECT_ID}
      ></EntityList>
    </>
  );
}
