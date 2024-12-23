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

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", editable: true },
  { field: "group_name", headerName: "Group Name", editable: true },
  { field: "alias", headerName: "Alias", editable: true },
  { field: "unit_name", headerName: "Unit Name", editable: true },
];

export default function Products() {
  return (
    <>
      <Box sx={{margin: "20px 20px"}}>
      <SecondNavbar title={"List of Product"}/>
      </Box>
      <EntityList
        title="Product"
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
