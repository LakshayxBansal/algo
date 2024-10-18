import ExecutiveForm from "@/app/Widgets/masters/masterForms/executiveForm";
// import { getExecutiveDataById } from "@/app/controllers/executive.controller"
import { getSession } from "@/app/services/session.service";
import { redirect } from 'next/navigation';
import { logger } from '@/app/utils/logger.utils';
import { getExecutiveById, getProfileById } from "@/app/controllers/executive.controller";
import { executiveSchemaT } from "@/app/models/models";
import SnackModal from "@/app/miscellaneous/SnackModal";
import { Box, Paper } from "@mui/material";
// import { snackbarActive } from "@/app/company/CompanyEntityList";
// import { showSnackbar } from "@/app/company/page";

export default async function Profile() {
    try {
        const session = await getSession();
        if (session) {
                const executiveData = await getProfileById(session.user.userId);
                if (executiveData) {
                    return (
                        <Box sx={{ maxWidth: "100%" }}>
                            <Box sx={{ display: "flex", justifyContent: "center", width: "100vw" }}>
                                <ExecutiveForm
                                    data={executiveData[0]}
                                    parentData="profile"
                                />
                            </Box>
                        </Box>
                    );
                } else {
                    return (
                        <SnackModal open={true} msg={"Profile not Found"} />
                    )
                }
        }
    } catch (e) {
        // show error page
        logger.error(e)
    }
    redirect("/signin");
};
