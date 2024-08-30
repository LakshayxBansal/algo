import ExecutiveForm from "@/app/Widgets/masters/masterForms/executiveForm"
// import { getExecutiveDataById } from "@/app/controllers/executive.controller"
import { getSession } from "@/app/services/session.service"
import { redirect } from 'next/navigation';
import { logger } from '@/app/utils/logger.utils';
import { getExecutiveIdFromEmail,getExecutiveById} from "@/app/controllers/executive.controller";
import { executiveSchemaT } from "@/app/models/models";
import SnackModal from "@/app/miscellenous/SnackModal";

export default async function Profile() {
    try {
        const session = await getSession();
        if (session) {
            const id = await getExecutiveIdFromEmail(session.user.email as string);
            console.log(id);
            if(id){
                const executiveData = await getExecutiveById(id[0].id);
                if(executiveData){
                    return (
                        <ExecutiveForm
                            data={executiveData[0]}
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
