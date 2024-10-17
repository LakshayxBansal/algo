"use client"
import { GridColDef } from "@mui/x-data-grid";
// import { getInviteUserByCompany,getInviteUserById } from "@/app/controllers/inviteUser.controller";
import EntityList from "../../../Widgets/masters/EntityList";
import { deRegisterFromCompany, getCompanyUser } from "@/app/controllers/user.controller";
import { Button } from "@mui/material";
import InviteUserForm from "@/app/Widgets/masters/masterForms/InviteUserForm";
import { deleteSession } from "@/app/services/session.service";

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
  try{
    await deRegisterFromCompany(params.row.id,null,null);
    await deleteSession(params.row.userId);
  }catch(error){
    throw(error);
  }finally{
    window.location.reload();
  }
}

export default function UserList(){

    return <>
        <EntityList
        title="User List"
        fetchDataFn={getCompanyUser}
        // fnFetchDataByID={getInviteUserById}
        customCols={columns}
        AddAllowed={false}
        height="50vh"
        >
        
      </EntityList>
      </>
}