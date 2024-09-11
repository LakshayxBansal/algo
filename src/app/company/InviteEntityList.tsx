"use client"
import { GridColDef } from "@mui/x-data-grid";
import EntityList from "../Widgets/masters/EntityList"
import { acceptInvite, getInviteByUserContact, rejectInvite } from "../controllers/inviteUser.controller";
import { Button } from "@mui/material";

export default function InviteEntityList(){
    async function handleAccept(params : any){
      try{
      await acceptInvite(params.row);
      }catch(error){
        throw(error);
      }
    }
    async function handleReject(params : any){
      try{
        await rejectInvite(params.row);
      }catch(error){
        throw(error);
      }
    }

    const columns: GridColDef[] = [
        { field: 'RowID', headerName: 'ID', width: 90 },
        {
          field: 'companyName',
          headerName: 'Company Name',
          width: 150,
        },
        {
          field: 'inviteType',
          headerName: 'Invite Type',
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