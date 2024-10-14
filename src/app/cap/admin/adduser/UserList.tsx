"use client"
import { GridColDef } from "@mui/x-data-grid";
// import { getInviteUserByCompany,getInviteUserById } from "@/app/controllers/inviteUser.controller";
import EntityList from "../../../Widgets/masters/EntityList";
import { deRegisterFromCompany, getCompanyUser } from "@/app/controllers/user.controller";
import { Button } from "@mui/material";
import InviteUserForm from "@/app/Widgets/masters/masterForms/InviteUserForm";

const columns: GridColDef[] = [
  { field: 'RowID', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150
  },
  {
    field: 'contact',
    headerName: 'Contact',
    width: 150
  },
  // {
  //   field: 'role',
  //   headerName: 'Role',
  //   width: 150
  // },
  {
    field: 'remove',
    headerName: 'Remove',
    width: 150,
    renderCell: (params) => (
          <Button onClick={()=>handleRemove(params)}>Remove</Button>
        )
  },
];

const handleRemove = async(params : any)=>{
  console.log(params.row)
  const id = params.row.id;
  await deRegisterFromCompany(id,null,null);
}

export default function UserList(){

    return <>
        <EntityList
        title="User List"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <InviteUserForm
          setDialogOpen={fnDialogOpen}
          setDialogValue={fnDialogValue}
          data={data}
          />
        )} 
        fetchDataFn={getCompanyUser}
        // fnFetchDataByID={getInviteUserById}
        customCols={columns}
        AddAllowed={true}
        height="50vh"
        >
        
      </EntityList>
      </>
}