"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import CategoryForm from "@/app/Widgets/masters/masterForms/categoryForm";
import {
  delCategoryById,
  getCategoryById,
  getEnquiryCategoryByPage,
} from "@/app/controllers/enquiryCategory.controller";
import { Box } from "@mui/material";
import SecondNavbar from "@/app/cap/navbar/SecondNavbar";
import { CATEGORY_OBJECT_ID } from "@/app/utils/consts.utils";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: false,
  },
];

export default function Category() {
  return (
    <>
      <SecondNavbar title={"List of Enquiry Category"}/>
      <EntityList
        title="Enquiry Category"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <CategoryForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        fetchDataFn={getEnquiryCategoryByPage}
        fnFetchDataByID={getCategoryById}
        fnDeleteDataByID={delCategoryById}
        customCols={columns}
        uploadAllowed={true}
        AddAllowed={false}
        height = "60vh"
        objectTypeId={CATEGORY_OBJECT_ID}
      ></EntityList>
    </>
  );
}
