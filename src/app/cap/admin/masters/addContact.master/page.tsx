import React from 'react';
import { getSession } from '@/app/services/session.service';
import { redirect } from 'next/navigation';
import ContactForm from '@/app/Widgets/masters/masterForms/contactForm/contactForm';
import Box from '@mui/material/Box';
import { logger } from '@/app/utils/logger.utils';

export default async function AddEnquirySource() {
  try {
    const session = await getSession();

    if (session) {
      
      return (
          <Box sx={{ m: 2, p: 5 }}>
            <ContactForm/>
          </Box>
      );
    }
  } catch (e) {
    // show error page
    logger.error(e)
  }
  redirect("/signin");
};

/*

*/