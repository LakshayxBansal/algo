'use client'

import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useRouter } from 'next/navigation'
import NestedList from './listitemsexpand';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
//const defaultTheme = createTheme();
interface propsType {
  pages: {label: string,
    link: string, 
    disabled: boolean,
    id: string}[],
  username: string,
  companyName: string,
  children: React.ReactNode
}

export default function MenuBar(props : propsType) {
  const pages = props.pages;
  const [open, setOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(true);
  const router = useRouter();
  const children = props.children;
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const currentTarget = event.currentTarget;
    console.log(currentTarget);
    // Your logic here
    const menuOption = pages.find(obj => obj.id === currentTarget.getAttribute("id"));
    router.push(menuOption?.link!);
  };


  if (!menuOpen) {
    return(<></>);
  } else {
    return (
        <>
          <CssBaseline />
          <AppBar open={open}>
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),                  
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: {xs: 1, md:0 }}}
              >
                Zodo
              </Typography>
              <Box justifyContent='flex-end' sx={{flexGrow: 1, display: 'flex' }}>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
              >

                  {props.companyName}
              </Typography>    
              </Box>
              <Box justifyContent='flex-end' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {props.username}
              </Box>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box sx={{display: 'flex'}}>

            <Drawer variant="permanent" open={open}
              >
              <Toolbar
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  px: [1],
                }}
              >
                <IconButton onClick={toggleDrawer}>
                  <ChevronLeftIcon />
                </IconButton>
              </Toolbar>
              <Divider />
                <NestedList></NestedList>
            </Drawer>
            <Box>
              {children}
            </Box>
          </Box>

        </>
    );
  }
}


/**
 *                 {pages.map((page) => (
                  <Button
                    key={page.label}
                    id={page.id}
                    disabled={page.disabled}
                    onClick={handleClick}
                    sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none' }}
                  >
                    {page.label}
                  </Button>
                ))}
 */

/*
              <List component="nav">
                {mainListItems}
                <Divider sx={{ my: 1 }} />
                {secondaryListItems}
              </List>
*/

                // <AppBar position="absolute" open={open}></AppBar>