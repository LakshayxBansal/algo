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

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: true,
  },
];

export default function Category() {
  return (
    <>
      <EntityList
        title="Enquiry Category Master"
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
      ></EntityList>
    </>
  );
}
