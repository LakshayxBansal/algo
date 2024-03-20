
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import MenuBar from './MenuBar';
import Box from '@mui/material/Box';
import {getSession} from '../cap/lib/session';

const pages = [
                { label: 'Call', link: '\MyForm', disabled: false, id:'call' },
                { label: 'Campaign', link: '#', disabled: false, id:'campaign' },
                { label: 'Tasks', link: '#', disabled: false, id:'tasks' },
                { label: 'Reports', link: '\dashboard', disabled: false, id:'reports' },
                { label: 'Admin', link: '#', disabled: false, id:'admin' }
];


export default async function AppMenu(props) {
  //const menuOpen = true;
  //const session = await getSession(false);

    return (
      <MenuBar 
        pages= {pages}
        >
          <Box component="span" sx={{ display: 'block' }}>
          {props.children}
          </Box>
          </MenuBar>
    );
}
