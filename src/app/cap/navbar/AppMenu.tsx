
import * as React from 'react';
import MenuBar from './MenuBar';
import Box from '@mui/material/Box';
import {getAppSession} from '../../services/session.service';
import { redirect } from 'next/navigation'

const pages = [
                { label: 'Call', link: '\MyForm', disabled: false, id:'call' },
                { label: 'Campaign', link: '#', disabled: false, id:'campaign' },
                { label: 'Tasks', link: '#', disabled: false, id:'tasks' },
                { label: 'Reports', link: '\dashboard', disabled: false, id:'reports' },
                { label: 'Admin', link: '#', disabled: false, id:'admin' }
];


export default async function AppMenu(props: {children: React.ReactNode}) {
  try {
    const session = await getAppSession();

    if (session?.dbSession?.dbInfo) {

      return (
        <MenuBar 
          pages= {pages}
          username = {session.session.user?.name!}
          companyName = {session.dbSession.dbInfo.nameVal}
          >
          <Box component="span" sx={{ display: 'block' }}>
            {props.children}
          </Box>
        </MenuBar>
      );
    } else {

    }
  } catch (e) {
    redirect("/error");
  }
}