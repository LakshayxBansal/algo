"use client"
import { GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { getInviteUserByCompany, getInviteUserById } from "@/app/controllers/user.controller";
import EntityList from "../../../Widgets/masters/EntityList";
import InviteUserForm from "@/app/Widgets/masters/masterForms/InviteUserForm";
import { updateStatusBar } from "../../navbar/StatusBar";
import { useEffect } from "react";
import { statusMap } from "../../navbar/StatusMap";
import { createUserToInviteDb, deleteInvite } from "@/app/services/user.service";
import { inviteUserSchemaT } from "@/app/models/models";
import { getCompanyDbByIdList, getCompanyDetailsById } from "@/app/services/company.service";

let companyID : number;

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
    renderCell: (params) =>(
      params.row.status === "pending" ? (
        <Button onClick={() => handleDelete(params)}>Delete</Button>
      ) : (
      <Button onClick={() => handleReInvite(params)}>Re Invite</Button>
    ))
  }
];

async function handleDelete(params:any) {
  try {
    const company = await getCompanyDbByIdList(3);
    console.log("company : ",company);
  } catch (error) {
    throw (error);
  }
  // }finally{
  //   window.location.reload();
  // }
}
async function handleReInvite(params:any) {
  try {
    const inviteData : inviteUserSchemaT = {name : params.row.name, usercontact : params.row.contact, companyId : companyID};
    await createUserToInviteDb(inviteData);
  } catch (error) {
    throw (error);
  }
  // }finally{
  //   window.location.reload();
  // }
}

export default function InviteList({companyId}:{companyId : number}) {
  companyID = companyId;
  // useEffect(() => {
  //   if (updateStatusBar) {
  //     updateStatusBar("key3","value3")
  //   }
  // },[]);

  return <>
    <EntityList
    title="Invited User"
      fetchDataFn={getInviteUserByCompany}
      fnFetchDataByID={getInviteUserById}
      customCols={columns}
      AddAllowed={false}
      height="20em">
    </EntityList>
  </>
}