import React from 'react'
import { getSession } from "../../services/session.service";
import { redirect } from "next/navigation";
import { logger } from "@/app/utils/logger.utils";
import SupportTicketForm from './SupportTicketForm';

export default async function Support() {
    try {
        const session = await getSession();
    
        if (session) {
            const masterData = {
              userName: session.user?.name as string,
            };
    
           return <SupportTicketForm/>;
        }
      } catch (e) {
        // show error page
        logger.error(e);
      }
      redirect("/signin");
    }
    