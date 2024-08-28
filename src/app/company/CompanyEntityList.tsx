"use client"
import { GridColDef } from "@mui/x-data-grid";
import { getCompanies, getCompanyById } from "../controllers/company.controller"
import EntityList from "../Widgets/masters/EntityList"
import CreateCompany from "./CreateCompany"
import CellDbName from "./cellDBName";

export function CompanyEntityList(){
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'companyName',
          headerName: 'Name',
          width: 150,
        },
        {
          field: 'companyAlias',
          headerName: 'Alias',
          width: 150,
        },
        {
          field: "Open",
          headerName: "Select",
          width: 150,
          renderCell: (params) => (
            <CellDbName
              row={params.row}
              userEmail={params.row.email as string}
            ></CellDbName>
          ),
        }
      ];
    return <>
        <EntityList
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <CreateCompany
          setDialogOpen={fnDialogOpen}
          setDialogValue={fnDialogValue}
          data={data}
          />
        )} 
        fetchDataFn={getCompanies}
        fnFetchDataByID={getCompanyById}
        customCols={columns}
        AddAllowed={true}>
      </EntityList>
      </>
}