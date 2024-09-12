"use client"
import { GridColDef } from "@mui/x-data-grid";
import EntityList from "../Widgets/masters/EntityList"
import { acceptInvite, getInviteByUserContact, rejectInvite } from "../controllers/inviteUser.controller";
import { Button } from "@mui/material";
import { revalidatePage,redirectToPage } from "./SelectCompany";
import Router from "next/router";
import { useRouter } from "next/navigation";

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
            <Button onClick={()=>handleAccept(params)}>Accept</Button>
          )
    },
    {
        field: 'reject',
        headerName: 'Reject',
        width: 150,
        renderCell: (params) => (
        <Button onClick={()=>handleReject(params)}>Reject</Button>
        ),
      }
  ];
  async function handleAccept(params : any){
    try{
    await acceptInvite(params.row);
    console.log('OK');
    // router.refresh();
    await redirectToPage('/company')
    
    }catch(error){
      throw(error);
    }

  }
  async function handleReject(params : any){
    try{
      await rejectInvite(params.row);
      revalidatePage("/company")
    }catch(error){
      throw(error);
    }
  }
export default function InviteEntityList(){
    const router = useRouter();

    return <>
        <EntityList
        // renderForm={(fnDialogOpen, fnDialogValue, data) => (
        //   <CreateCompany
        //   setDialogOpen={fnDialogOpen}
        //   setDialogValue={fnDialogValue}
        //   data={data}
        //   />
        // )} 
        fetchDataFn={getInviteByUserContact}
        // fnFetchDataByID={getCompanyById}
        customCols={columns}
        AddAllowed={false}>
      </EntityList>
      </>
}