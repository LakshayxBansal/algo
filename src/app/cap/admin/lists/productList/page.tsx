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

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", editable: false },
  { field: "group_name", headerName: "Group Name", editable: false },
  { field: "alias", headerName: "Alias", editable: false },
  { field: "unit_name", headerName: "Unit Name", editable: false },
];

export default function Products() {
  return (
    <>
      <EntityList
        title="Product Master"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <ProductForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
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
      ></EntityList>
    </>
  );
}
