import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from "next/link";
import { Box, Typography } from '@mui/material';
import ProfileImage from './ProfileImage';
import { deleteSession } from '@/app/services/session.service';
import { deRegisterFromAllCompany, deRegisterFromApp, deRegisterFromCompany } from '@/app/controllers/user.controller';
import { redirectToPage } from '@/app/company/SelectCompany';
import { signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { AddDialog } from '@/app/Widgets/masters/addDialog';

type profileModalT = {
    img?: string,
    name: string,
    userId: number,
    companyId: number,
    companyName: string
}

type AsyncFunction = () => Promise<void>;


export default function ProfileMenu(props: profileModalT) {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [fnController, setFnController] = React.useState<AsyncFunction | null>(null);
    const router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleLogout = async function () {
        await deleteSession(props.userId);
        // signOut({ callbackUrl: 'http://localhost:3000/signin' });
        signOut();
        handleClose();
        redirectToPage("/signin");
    }
    const handleDeregisterFormCompany = async function () {
        await Promise.all([deRegisterFromCompany(props.userId, props.companyId), deleteSession(props.userId)]);
        handleClose();
        redirectToPage("/company");
    }
    const handleDeregisterFormApp = async function () {
        await Promise.all([deRegisterFromApp(props.userId), deRegisterFromAllCompany(props.userId), deleteSession(props.userId)]);
        handleClose();
        redirectToPage("/signin");
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            {dialogOpen && (
                <AddDialog
                    title={"Modal"}
                    open={dialogOpen}
                    setDialogOpen={setDialogOpen}
                >
                    {/* <Confirmation setDialogOpen={setDialogOpen} userId={inActiveUserId}/> */}
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "7rem", width: "25rem" }}>
                        <Typography variant='h6' sx={{ margin: "auto" }}>{title}</Typography>
                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                            {/* <Button variant="contained" color='error' onClick={() => {
                                fnController?.()
                                setDialogOpen(false)
                            }}>
                                Yes
                            </Button> */}
                            {/* <Button variant="contained" onClick={() => setDialogOpen(false)}>
                                No
                            </Button> */}
                            <Button
                                onClick={() => setDialogOpen(false)}
                                tabIndex={-1}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ width: "15%", marginLeft: "5%" }}
                                onClick={() => {
                                    fnController?.()
                                    setDialogOpen(false)}}
                            >
                                Yes
                            </Button>
                        </Box>
                    </Box>
                </AddDialog>
            )}
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
                /> : <ProfileImage name={props.name} />}
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
                <MenuItem onClick={() => {
                    router.push('/cap/admin/profile')
                    handleClose()
                }}>
                    Profile
                </MenuItem>
                <MenuItem onClick={() => {
                    setDialogOpen(true)
                    setTitle(`Do you want De Register from ${props.companyName} ?`)
                    setFnController(() => handleDeregisterFormCompany)
                }}>De-register with {props.companyName}</MenuItem>
                <MenuItem onClick={() => {
                    setDialogOpen(true)
                    setTitle(`Do you want De Register from App ?`)
                    setFnController(() => handleDeregisterFormApp)
                }}>De-register from App</MenuItem>
                <MenuItem onClick={() => {
                    setDialogOpen(true)
                    setTitle(`Do you want to Logout ?`)
                    setFnController(() => handleLogout)
                }}>Logout</MenuItem>
            </Menu>
        </>
    );
}
