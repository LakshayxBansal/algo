import { getSession } from "@/app/services/session.service";
import StatusBar from "./StatusBar";
import { getStatusData } from "@/app/controllers/navbar.controller";

export let updateStatusBar: any;

export default async function Footer() {
    const session = await getSession();
    if (session) {
        const statusData = await getStatusData(session.user.userId);
        return (
            <StatusBar statusData={statusData} />
        )
    }
}