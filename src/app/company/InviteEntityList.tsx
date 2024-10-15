"use client"
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import EntityList from "../Widgets/masters/EntityList"
import { acceptInvite, getInviteByUserContact, rejectInvite } from "../controllers/user.controller";
import { Button } from "@mui/material";
import { revalidatePage, redirectToPage } from "./SelectCompany";
// import { useRouter } from "next/navigation";

const columns: GridColDef[] = [
  { field: 'RowID', headerName: 'ID', width: 90 },
  {
    field: 'companyName',
    headerName: 'Company Name',
    width: 150,
  },
  {
    field: 'inviteDate',
    headerName: 'Invite Date',
    width: 150,
  },
  {
    field: 'accept',
    headerName: 'Accept',
    width: 150,
    renderCell: (params) => (
      <Button onClick={() => handleAccept(params)}>Accept</Button>
    )
  },
  {
    field: 'reject',
    headerName: 'Reject',
    width: 150,
    renderCell: (params) => (
      <Button onClick={() => handleReject(params)}>Reject</Button>
    ),
  }
];

async function handleAccept(params: any) {
  try {
    await acceptInvite(params.row);
  } catch (error) {
    throw (error);
  }finally{
    window.location.reload();
  }

}

async function handleReject(params: any) {
  try {
    await rejectInvite(params.row);
  } catch (error) {
    throw (error);
  }finally{
    window.location.reload();
  }
}

export default function InviteEntityList() {
  return <>
    <EntityList
      title="Invite List" 
      fetchDataFn={getInviteByUserContact}
      customCols={columns}
      AddAllowed={false}>
    </EntityList>
  </>
}