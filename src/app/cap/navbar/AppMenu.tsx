
import * as React from 'react';
import MenuBar from './MenuBar';
import Box from '@mui/material/Box';
import {getSession} from '../../services/session.service';
import { redirect } from 'next/navigation';
import { getMenuOptions } from '../../controllers/masters.controller';
import { getExecutiveProfileImageByCrmUserId } from '@/app/controllers/executive.controller';

const pages = [
                { label: 'Call', link: '\MyForm', disabled: false, id:'call' },
                { label: 'Campaign', link: '#', disabled: false, id:'campaign' },
                { label: 'Tasks', link: '#', disabled: false, id:'tasks' },
                { label: 'Reports', link: '\dashboard', disabled: false, id:'reports' },
                { label: 'Admin', link: '#', disabled: false, id:'admin' }
];


export default async function AppMenu(props: {children: React.ReactNode}) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const menuOptions= await getMenuOptions(session.user.dbInfo.dbName);
      const img_src = await getExecutiveProfileImageByCrmUserId(session.user.userId);
      if (menuOptions) {
        return (
          <MenuBar
            pages= {menuOptions}
            username = {session.user?.name!}
            companyName = {session.user.dbInfo.companyName}
            userId = {session.user.userId}
            companyId = {session.user.dbInfo.id}
            profileImg = {img_src ? img_src : session.user.image}
            >
            <Box component="span" sx={{ display: 'block',  mt: 8 }}>
              {props.children}
            </Box>
          </MenuBar>
        );
      } 
    }
  } catch (e) {
    console.log(e);
  }
  redirect("/signin");
}