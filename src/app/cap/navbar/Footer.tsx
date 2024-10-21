import { getSession } from "@/app/services/session.service";
import StatusBar from "./StatusBar";
import { getStatusData } from "@/app/controllers/navbar.controller";
import { logger } from "@/app/utils/logger.utils";
import { redirect } from "next/navigation";



export default async function Footer() {
    try {
        const session = await getSession();
        if (session) {
            let statusData = await getStatusData(session.user.userId);
            const jsonStr = statusData?.data;
            if(jsonStr){
                statusData = { id: statusData?.id, data: JSON.parse(jsonStr) };
                return (
                    <StatusBar statusData={statusData} />
                )
            }else{
                return (
                    <></>
                )
            }
        }
    } catch (error) {
        logger.error(error)
    }
    redirect("/signin");
}