"use client"
import { GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { delInviteById, getInviteUserByCompany, getInviteUserById, updateInvitedUser } from "@/app/controllers/user.controller";
import EntityList from "../../../Widgets/masters/EntityList";
import InviteUserForm from "@/app/Widgets/masters/masterForms/InviteUserForm";
import { updateStatusBar } from "../../navbar/StatusBar";
import { useEffect } from "react";
import { statusMap } from "../../navbar/StatusMap";
import { createUserToInviteDb, deleteInvite } from "@/app/services/user.service";
import { inviteUserSchemaT } from "@/app/models/models";
import { getCompanyDbByIdList, getCompanyDetailsById } from "@/app/services/company.service";
import { emailRegex } from "@/app/zodschema/zodschema";

let companyID: number;

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
    field: 'status',
    headerName: 'Status',
    width: 150
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 150,
    renderCell: (params) => (
      params.row.status === "Rejected" && (
        <Button onClick={() => handleReInvite(params)}>Re-Invite</Button>
      ))
  }
];

async function handleReInvite(params: any) {
  try {
    let inviteData: inviteUserSchemaT = {} as inviteUserSchemaT;
    if(emailRegex.test(params.row.contact)){
      inviteData = { id: params.row.id, name: params.row.name, email: params.row.contact, companyId: companyID, status : 1};
    }else{
      inviteData = { id: params.row.id, name: params.row.name, phone: params.row.contact, companyId: companyID, status : 1};
    }
    await updateInvitedUser(inviteData,true);
  } catch (error) {
    throw (error);
  }finally {
    window.location.reload();
  }
}

export default function InviteList({ companyId }: { companyId: number }) {
  companyID = companyId;
  // useEffect(() => {
  //   if (updateStatusBar) {
  //     updateStatusBar("key3","value3")
  //   }
  // },[]);

  return <Box>
    <EntityList
      // title="Invite User"
      renderForm={(fnDialogOpen, fnDialogValue, data) => (
        <InviteUserForm
          setDialogOpen={fnDialogOpen}
          setDialogValue={fnDialogValue}
          data={data}
        />
      )}
      fetchDataFn={getInviteUserByCompany}
      fnFetchDataByID={getInviteUserById}
      fnDeleteDataByID={delInviteById}
      customCols={columns}
      AddAllowed={true}
      height="40vh">
    </EntityList>
  </Box>
}