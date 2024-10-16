import { getSession } from "@/app/services/session.service";
import StatusBar from "./StatusBar";
import { getStatusData } from "@/app/controllers/navbar.controller";



export default async function Footer() {
    const session = await getSession();
    if (session) {
        let statusData = await getStatusData(session.user.userId);
        statusData = {id: statusData?.id,data : JSON.parse(statusData?.data)};
        return (
            <StatusBar statusData={statusData} />
        )
    }
}