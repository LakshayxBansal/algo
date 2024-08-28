"use client"
import { GridColDef } from "@mui/x-data-grid";
import { getCompanies, getCompanyById } from "../controllers/company.controller"
import EntityList from "../Widgets/masters/EntityList"
import CreateCompany from "./CreateCompany"

export function CompanyEntityList(){
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'companyName',
          headerName: 'Name',
          width: 150,
          editable: true,
        },
        {
          field: 'companyAlias',
          headerName: 'Alias',
          width: 150,
          editable: true,
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