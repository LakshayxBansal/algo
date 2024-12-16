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
    { field: "RowID", headerName: "S.no", width: 90 },
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
      field: "role",
      headerName: "Role",
      width: 150,
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

  // const companyDefaultColumns=["companyName","companyAlias","createdBy","createdOn"];

  return (
    <AuthWrapper>
      <EntityList
        title="Company"
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
        height="60vh"
      ></EntityList>
    </AuthWrapper>
  );
}
