"use client";
import { GridColDef } from "@mui/x-data-grid";
import {
  deleteCompanyById,
  getCompanies,
  getCompanyById,
} from "../controllers/company.controller";
import EntityList from "../Widgets/masters/EntityList";
import CreateCompany from "./CreateCompany";
import CellDbName from "./cellDBName";
import AuthWrapper from "./AuthWrapper";
import { Typography } from "@mui/material";
import React from "react";

export default function CompanyEntityList() {

  const columns: GridColDef[] = [
    { field: "RowID", headerName: "ID", width: 90 },
    {
      field: "companyName",
      headerName: "Name",
      width: 150,
      renderCell: (params) => (
        <CellDbName
          row={params.row}
          userId={params.row.userId as number}
        ></CellDbName>
      ),
    },
    {
      field: "companyAlias",
      headerName: "Alias",
      width: 150,
    },
    {
      field: "roleId",
      headerName: "Role",
      width: 150,
      renderCell: (params) => {
        let role = "none";
        if(params.row.roleId===1){
          role = "Admin";
        }else if(params.row.roleId===2){
          role = "Manager";
        }else if(params.row.roleId===3){
          role = "Executive";
        }
        return (
          <h6>{role}</h6>
      )},
    },
    {
      field: "createdBy",
      headerName: "Created By",
      width: 150,
    },
    {
      field: "createdOn",
      headerName: "Created On",
      width: 150,
    }
  ];
  return (
    <>
      <AuthWrapper>
        <EntityList
          title="Company List"
          renderForm={(fnDialogOpen, fnDialogValue, data) => (
            <CreateCompany
              setDialogOpen={fnDialogOpen}
              setDialogValue={fnDialogValue}
              data={data}
            />
          )}
          fetchDataFn={getCompanies}
          fnFetchDataByID={getCompanyById}
          fnDeleteDataByID={deleteCompanyById}
          customCols={columns}
          AddAllowed={true}
          height="20em"
        ></EntityList>
      </AuthWrapper>
    </>
  );
}
