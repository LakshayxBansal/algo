import { redirect } from 'next/navigation';
import { getSession } from '@/app/services/session.service';
import EnquiryConfigForm from '../enquirySupportConfig/enquirySupportConfig';
import { loadEnquirySupportConfig } from '@/app/controllers/enquirySupportConfig.controller';
import { enquiryConfigSchemaT } from '@/app/models/models';

const getEnquiryConfigData = async (): Promise<enquiryConfigSchemaT | null> => {
    try {
        const session = await getSession();

        if (!session) {
            return null;
        }

        const configData = await loadEnquirySupportConfig();
        return configData;

    } catch (error) {
        console.error('Error loading enquiry support config:', error);
        return null;
    }
};

const EnquiryConfigPage = async () => {
    const enquiryConfig = await getEnquiryConfigData();


    if (!enquiryConfig) {
        redirect('/signin');
    }

  
    return <EnquiryConfigForm {...enquiryConfig} />;
};

export default EnquiryConfigPage;
