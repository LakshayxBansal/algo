import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from "next/link";
import { Box } from '@mui/material';
import ProfileImage from './ProfileImage';
import { deleteSession } from '../services/session.service';
import { deRegisterFromAllCompany, deRegisterFromApp,deRegisterFromCompany } from '../controllers/user.controller';
import { redirectToPage } from '../company/SelectCompany';
import { signOut } from "next-auth/react";

type profileModalT = { 
    img? : string,
    name : string,
    userId : number,
    companyId : number,
    companyName : string
}

export default function ProfileModal(props : profileModalT) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = async() => {
        await deleteSession(props.userId);
        // signOut({ callbackUrl: 'http://localhost:3000/signin' });
        signOut();
        handleClose();
        redirectToPage("/signin");
    }
    const handleDeregisterFormCompany = async()=>{
        await Promise.all([deRegisterFromCompany(null,props.userId,props.companyId),deleteSession(props.userId)]);
        handleClose();
        redirectToPage("/company");
    }
    const handleDeregisterFormApp = async()=>{
        await Promise.all([deRegisterFromApp(props.userId),deRegisterFromAllCompany(props.userId),deleteSession(props.userId)]);
        handleClose();
        redirectToPage("/signin");
    }
    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {props?.img ? <Box
                    component="img"
                    sx={{
                        height: 40,
                        width: 40,
                        borderRadius: "50%",
                    }}
                    alt={props?.img}
                    src={props?.img}
                /> : <ProfileImage name={props.name}/>}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>
                <Link href="/cap/admin/profile" style={{textDecoration: "none",
  color :"black"}}>
                    Profile
                </Link>
                </MenuItem>
                <MenuItem onClick={handleDeregisterFormCompany}>De register with {props.companyName}</MenuItem>
                <MenuItem onClick={handleDeregisterFormApp}>De register from App</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}
