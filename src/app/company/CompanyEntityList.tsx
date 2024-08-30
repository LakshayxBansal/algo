"use client"
import { GridColDef } from "@mui/x-data-grid";
import { getCompanies, getCompanyById } from "../controllers/company.controller"
import EntityList from "../Widgets/masters/EntityList"
import CreateCompany from "./CreateCompany"
import CellDbName from "./cellDBName";

export function CompanyEntityList(){
    const columns: GridColDef[] = [
        { field: 'RowID', headerName: 'ID', width: 90 },
        {
          field: 'companyName',
          headerName: 'Name',
          width: 150,
          renderCell: (params) => (
            <CellDbName
              row={params.row}
              userId={params.row.userId as number}
            ></CellDbName>
          ),
        },
        {
          field: 'companyAlias',
          headerName: 'Alias',
          width: 150,
        },
        {
          field: 'createdBy',
          headerName: 'Created By',
          width: 150,
        },
        {
          field: 'createdOn',
          headerName: 'Created On',
          width: 150,
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