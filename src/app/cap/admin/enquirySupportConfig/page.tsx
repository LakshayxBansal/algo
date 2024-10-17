import EnquiryConfigForm from '../enquirySupportConfig/enquirySupportConfig';
import { loadEnquirySupportConfig } from '@/app/controllers/enquirySupportConfig.controller';
import { getSession } from '@/app/services/session.service';
import { redirect } from 'next/navigation';

const EnquiryConfigPage = async () => {
    const session = await getSession();
    if (session) {
        if (session.user.dbInfo.roleId) {
            const enquiryConfig = await loadEnquirySupportConfig();

            if (!enquiryConfig) {
                redirect('/signin');
            }

            return <EnquiryConfigForm {...enquiryConfig} />;
        } else {
            redirect("/company")
        }
    }else{
        redirect("/signin");
    }
};

export default EnquiryConfigPage;
