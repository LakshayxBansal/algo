
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import MenuBar from './MenuBar';
import {getSession} from '../lib/session';

const pages = [
                { label: 'Call', link: '\MyForm', disabled: false, id:'call' },
                { label: 'Campaign', link: '#', disabled: false, id:'campaign' },
                { label: 'Tasks', link: '#', disabled: false, id:'tasks' },
                { label: 'Reports', link: '\dashboard', disabled: false, id:'reports' },
                { label: 'Admin', link: '#', disabled: false, id:'admin' }
];


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



export default async function AppMenu() {
  //const menuOpen = true;
  //const session = await getSession(false);

    return (
      <MenuBar 
        pages= {pages}
        />
    );
}
