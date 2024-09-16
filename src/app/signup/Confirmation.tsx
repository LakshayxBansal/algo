import { Box,Button } from "@mui/material";
import { makeUserActive,deleteUser } from "../controllers/user.controller";
import { redirect, useRouter } from "next/navigation";

export default function Confirmation({setDialogOpen,userId}:{setDialogOpen:any,userId:number | undefined}){
    const router = useRouter();
    async function makeUserActiveAgain(userId:number | undefined) {
        try{
            await makeUserActive(userId);
            router.push("/congrats");
        }catch(error){
            throw(error);
        }finally{
            setDialogOpen(false);
        }
    }
    async function deleteUserPrevDetail(userId : number | undefined) {
        try{
            await deleteUser(userId);
        }catch(error){
            throw(error);
        }finally{
            setDialogOpen(false);
        }
    }
    return (
        <Box>
            <h2>Do you want continue with previous credentials ? </h2>
            <Button onClick={()=>makeUserActiveAgain(userId)}>Yes</Button>
            <Button onClick={()=>deleteUserPrevDetail(userId)}>No</Button>
        </Box>
    )
}