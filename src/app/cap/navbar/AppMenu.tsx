
import * as React from 'react';
import MenuBar from './MenuBar';
import Box from '@mui/material/Box';
import {getSession} from '../../services/session.service';
import { redirect, usePathname } from 'next/navigation';
import { getMenuOptions } from '../../controllers/masters.controller';
import { getExecutiveProfileImageByCrmUserId } from '@/app/controllers/executive.controller';
import { headers } from 'next/headers';
import { getCompanyById } from '@/app/controllers/company.controller';
import { viewExecutiveDoc } from '@/app/controllers/document.controller';

const pages = [
                { label: 'Call', link: '\MyForm', disabled: false, id:'call' },
                { label: 'Campaign', link: '#', disabled: false, id:'campaign' },
                { label: 'Tasks', link: '#', disabled: false, id:'tasks' },
                { label: 'Reports', link: '\dashboard', disabled: false, id:'reports' },
                { label: 'Admin', link: '#', disabled: false, id:'admin' }
                
];

type Pathname = '/cap/enquiry'; // Add all possible paths

const pathNameToTitle:Record<Pathname, string>={
  '/cap/enquiry': 'Enquiry',
  // '/cap/dashboard': 'Dashboard',
  // '/cap/admin/lists/users': 'Users',
  // '/cap/admin/lists/companies': 'Companies',
  // '/cap/admin/lists/roles': 'Roles',
  // '/cap/admin/lists/products': 'Products',
  // '/cap/admin/lists/countries': 'Countries',
  // '/cap/admin/lists/states': 'States',
  // '/cap/admin/lists/cities': 'Cities',
  // '/cap/admin/lists/regions': 'Regions',
  // '/cap/admin/lists/areas': 'Areas',
  // '/cap/Support': 'Support',
  // '/cap/admin/lists/executives': 'Executives',
  // '/cap/callExplorer': 'Call Explorer',

}

export default async function AppMenu(props: {pathname: string,children: React.ReactNode}) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      
      const menuOptions= await getMenuOptions(session.user.dbInfo.dbName);
      const img_src = await getExecutiveProfileImageByCrmUserId(session.user.userId);
      let imageFile;
      if(img_src)
      {
        imageFile = await viewExecutiveDoc(img_src);
      }
      const companyDetails = await getCompanyById(session.user.dbInfo.id);
      const routeTitleMap: { [key: string]: string } = {
        '/cap/enquiry': 'Enquiry',
        '/cap/support': 'Support',
        '/cap/callExplorer': 'Call Explorer',
        '/cap/fieldConfigurator': 'Field Configurator',
        '/cap/admin/profile': 'Profile',
      };
      
      const title = routeTitleMap[props.pathname] || 'AlgoFast';
      
      
      // const title = pathNameToTitle[props.pathname] || "Default";
      if (menuOptions) {
        return (
          <MenuBar
            pages= {menuOptions}
            username = {session.user?.name!}
            companyName = {session.user?.dbInfo?.companyName}
            companyLogo = {companyDetails[0].docData?.file}
            userId = {session.user.userId}
            companyId = {session.user.dbInfo.id}
            profileImg = {imageFile?.buffer}
            >
            <Box component={"span"} sx={{ display: 'block',  mt: 8 }}>
              <div>
                  {props.children}
              </div>
              
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