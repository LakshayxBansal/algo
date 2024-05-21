import React from 'react';
import { getSession } from '@/app/services/session.service';
import { redirect } from 'next/navigation';
import SourceForm from '@/app/Widgets/masters/masterForms/sourceForm';
import Box from '@mui/material/Box';

export default async function AddEnquirySource() {
  try {
    const session = await getSession();

    if (session) {
      
      return (
          <Box id="add_source_page" sx={{ m: 2, p: 5 }}>
            <SourceForm/>
          </Box>
      );
    }
  } catch (e) {
    // show error page
    console.log(e)
  }
  redirect("/signin");
};

/*

*/