import EnquiryConfigForm from '../enquirySupportConfig/enquirySupportConfig';
import { loadEnquirySupportConfig } from '@/app/controllers/enquirySupportConfig.controller';
import { redirect } from 'next/navigation';

const EnquiryConfigPage = async () => {
    const enquiryConfig = await loadEnquirySupportConfig();

    if (!enquiryConfig) {
        redirect('/signin');
    }

    return <EnquiryConfigForm {...enquiryConfig} />;
};

export default EnquiryConfigPage;
