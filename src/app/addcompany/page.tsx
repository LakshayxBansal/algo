import { getSession } from "@/app/services/session.service";
import { redirect } from 'next/navigation';
import { logger } from '@/app/utils/logger.utils';
import { Box } from "@mui/material";
import CreateCompany from "../company/CreateCompany";

export default async function AddCompany() {
    try {
        const session = await getSession();
        if (session) {
            return (
                <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                    <Box sx={{ display: "flex", justifyContent: "center", width: " 100vw", height: "100vh" }}>
                        <CreateCompany />
                    </Box>
                </Box>
            );
        }
    } catch (e) {
        // show error page
        logger.error(e)
    }
    redirect("/signin");
};
