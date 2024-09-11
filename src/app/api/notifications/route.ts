// import { getEnquiryDetails } from "@/app/services/enquiry.service";
import { getInviteDetailById } from "@/app/controllers/inviteUser.controller";
import { populateData } from "@/app/utils/notification";


export async function POST(
    req:Request)
    {
        
        const res = await req.json();
        
        console.log(res)
        const crmApp = res.app
        const event_id = Number(res.event_id);
        const event_type_id = Number(res.event_type_id);
        const companyName = res.companyName;
        let det;
        if(event_type_id === 1){
            // det = await getEnquiryDetails(crmApp,event_id as number);
        }
        if(event_type_id===2 || event_type_id===3) {
            det = await getInviteDetailById(event_id as number);
            // Object.assign(det,{companyName : companyName})
            det['companyName'] = companyName;
        }

        
        
        if (!det || det.length == 0){
            return Response.json({message : "No data found"});
        }
        let config = "";
        // for email
        if(event_type_id===2){
            config= '{"email":{"to":"${usercontact}","from":"admin@lgofast.in","replyTo":"admin@lgofast.in","subject":"Invite to Join the Company","text":"Hello ${name}, you are invited by ${companyName} to join."}}';
        }
        // for sms
        if(event_type_id===3){
            config= '{"email":{"to":"${allocated_to.email}","from":"${created_by.email}","cc":"[${received_by_id.email}, ${created_by.email}]","replyTo":"${created_by.email}","subject":"hello","text":"Sensei ${allocated_to.name}"},"sms":{"to":"${allocated_to.mobile}","from":"${created_by.mobile}"}}'
        }
        // const notif = {
        //     to : det[0].allocated_to,
        //     from: det[0].created_by,
        //     cc: [det[0].created_by , det[0].recieved_by_id],
        //     replyTo: det[0].created_by
        // }

        //TODO :will be fetched from db according to event_type_id
        // const config= '{"email":{"to":"${allocated_to.email}","from":"${created_by.email}","cc":"[${received_by_id.email}, ${created_by.email}]","replyTo":"${created_by.email}","subject":"hello","text":"Sensei ${allocated_to.name}"},"sms":{"to":"${allocated_to.mobile}","from":"${created_by.mobile}"}}'

         const notificationMessage = await populateData(config, det, crmApp)
        return Response.json(notificationMessage)
}