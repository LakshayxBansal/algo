import ExecutiveForm from "@/app/Widgets/masters/masterForms/executiveForm"
// import { getExecutiveDataById } from "@/app/controllers/executive.controller"
import { getSession } from "@/app/services/session.service"
import { redirect } from 'next/navigation';
import { logger } from '@/app/utils/logger.utils';
import { getExecutive ,getExecutiveIdFromEmail} from "@/app/controllers/executive.controller";
import { executiveSchemaT } from "@/app/models/models";
import SnackModal from "@/app/miscellenous/SnackModal";

export default async function Profile() {
    try {
        const session = await getSession();
        if (session) {
            const id = await getExecutiveIdFromEmail(session.user.email as string);
            console.log(id);
            if(id){
                let executiveData;
                // const executiveData : executiveSchemaT = await getExecutiveDataByID(id);
                if(executiveData){
                    return (
                        <ExecutiveForm
                            data={executiveData}
                        />
                    );
                }else{
                    return (
                        <SnackModal open={true} msg={"Profile not Found"}/>
                    )
                }
            }else{
                return (
                    <SnackModal open={true} msg={"Profile not Found"}/>
                )
            }
        }
    } catch (e) {
        // show error page
        logger.error(e)
    }
    redirect("/signin");
};
