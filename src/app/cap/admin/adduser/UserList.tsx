"use client"
import { GridColDef } from "@mui/x-data-grid";
// import { getInviteUserByCompany,getInviteUserById } from "@/app/controllers/inviteUser.controller";
import EntityList from "../../../Widgets/masters/EntityList";
import { deRegisterFromCompany, getCompanyUser } from "@/app/controllers/user.controller";
import { Box, Button, Typography } from "@mui/material";
import InviteUserForm from "@/app/Widgets/masters/masterForms/InviteUserForm";
import { deleteSession, getDbSession } from "@/app/services/session.service";
import { useState } from "react";
import { AddDialog } from "@/app/Widgets/masters/addDialog";
import { getProfileById, updateExecutive } from "@/app/controllers/executive.controller";



export default function UserList() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userCompanyInfo, setUserCompanyInfo] = useState({ userId: 0, companyId: 0,roleId:0 });
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
    {
      field: 'role',
      headerName: 'Role',
      width: 150
    },
    {
      field: 'remove',
      headerName: 'Remove',
      width: 150,
      renderCell: (params) => (
        <Button onClick={() => {
          setDialogOpen(true);
          setUserCompanyInfo({ userId: params.row.userId, companyId: params.row.companyId, roleId:params.row.roleId });
        }}>Remove</Button>
      )
    },
  ];


  const handleRemove = async () => {
    try {
      if(userCompanyInfo.roleId){
        const executiveDetail = await getProfileById(userCompanyInfo.userId);
        for(const key in executiveDetail[0]){
          if(executiveDetail[0][key]===null){
            executiveDetail[0][key]=""
          }
        }
        const updatedExecutiveDetail = {...executiveDetail[0],crm_user:"",crm_user_id:0,call_type:"Enquiry"};
        await updateExecutive(updatedExecutiveDetail,[]);
      }
      await deRegisterFromCompany(userCompanyInfo.userId, userCompanyInfo.companyId);
      const userSession = await getDbSession(userCompanyInfo.userId);
      if (userSession && userSession.id === userCompanyInfo.companyId) {
        await deleteSession(userCompanyInfo.userId);
      }
    } catch (error) {
      throw (error);
    }
  }

  return <>
    <EntityList
      title="User Management"
      fetchDataFn={getCompanyUser}
      customCols={columns}
      AddAllowed={false}
      height="20em"
    >
    </EntityList>
    {dialogOpen && (
      <AddDialog
        title={"Remove User"}
        open={dialogOpen}
        setDialogOpen={setDialogOpen}
      >
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "7rem", width: "25rem" }}>
          <Typography variant='h6' sx={{ margin: "auto" }}>Do you want to remove user ?</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
            <Button
              onClick={() => setDialogOpen(false)}
              tabIndex={-1}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ width: "15%", marginLeft: "5%" }}
              onClick={() => {
                handleRemove();
                setDialogOpen(false);
              }}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </AddDialog>
    )}
  </>
}