"use client"
import { GridColDef } from "@mui/x-data-grid";
import { getInviteUserByCompany, getInviteUserById } from "@/app/controllers/inviteUser.controller";
import EntityList from "../../../Widgets/masters/EntityList";
import InviteUserForm from "@/app/Widgets/masters/masterForms/InviteUserForm";
import { updateStatusBar } from "../../navbar/Footer";
import { useEffect } from "react";
import { statusMap } from "../../navbar/StatusMap";

const columns: GridColDef[] = [
  { field: 'RowID', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150
  },
  {
    field: 'usercontact',
    headerName: 'Contact',
    width: 150
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 150
  }
];

export default function InviteList() {

  useEffect(() => {
    if (updateStatusBar) {
      updateStatusBar("key1","message from invite list");
    }
  },[]);

  return <>
    <EntityList
      title="Invited User"
      fetchDataFn={getInviteUserByCompany}
      fnFetchDataByID={getInviteUserById}
      customCols={columns}
      AddAllowed={false}>
    </EntityList>
  </>
}