"use client";

import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRouter } from "next/navigation";
import LeftMenuTree from "./leftmenutree";
import {
  menuTreeT,
  optionsDataT,
  searchDataT,
  selectKeyValueT,
} from "../../models/models";
import ProfileModal from "@/app/miscellaneous/ProfileModal";
import mainLogo from "../../../../public/logo.png";
import Image from "next/image";
import {
  Autocomplete,
  ClickAwayListener,
  darken,
  debounce,
  InputAdornment,
  lighten,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { useEffect } from "react";
import { searchMainData } from "@/app/controllers/navbar.controller";
import { searchMainDataDB } from "@/app/services/navbar.service";
import AutocompleteDB from "@/app/Widgets/AutocompleteDB";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  backgroundColor: "#005a9f",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: open ? 240 : 72,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(7),
      },
      [theme.breakpoints.up("xs")]: {
        width: theme.spacing(7),
      },
    }),
  },
}));

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.primary.main,
  backgroundColor: lighten(theme.palette.primary.light, 0.85),
  ...theme.applyStyles("dark", {
    backgroundColor: darken(theme.palette.primary.main, 0.8),
  }),
}));

const GroupItems = styled("ul")({
  padding: 0,
});

// TODO remove, this demo shouldn't need to reset the theme.
//const defaultTheme = createTheme();
interface propsType {
  pages: menuTreeT[];
  username: string;
  companyName: string;
  profileImg?: string;
  children: React.ReactNode;
}

export default function MenuBar(props: propsType) {
  const pages = props.pages;
  const [open, setOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(true);
  const [searchIcon, setSearchIcon] = React.useState<boolean>(false);
  const [data, setData] = useState([] as any);
  const [search, setSearch] = React.useState("");
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [searchValues, setSearchValues] = useState<searchDataT>({});

  const children = props.children;
  // const [closeSub, setCloseSub] = React.useState(false);

  // useEffect(()=>{
  //   const maindata =  debounce(async(searchText:string)=>{
  //     const result:any = await searchMainData(searchText)
  //   // console.log(typeof result.data);
  //   data.push(result.data)
  //   setData(data);
  //   }, 400);
  //   // maindata("d")
  //   maindata(search);
  // },[search]);

  // console.log(
  //   searchMainData("d"))
  // console.log(data);

  // if(data){
  // const combinedData = [...data[0], ...data[1]];
  // const groupedData: Record<string, string[]> = data[0].reduce((acc:any, item:any) => {
  //   if (!acc[item.table_name]) {
  //     acc[item.table_name] = [];
  //   }
  //   acc[item.table_name].push(item.result);
  //   return acc;
  // }, {} as Record<string, string[]>);

  // }else{

  // }

  // const options = Object.entries(groupedData).flatMap(([tableName, results]) => results.map((result: any) => ({ tableName, result }))
  // );

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const setOpenDrawer = (val: boolean) => {
    setOpen(val);
  };

  if (!menuOpen) {
    return <></>;
  } else {
    return (
      <>
        <CssBaseline />
        <AppBar open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Image
              src={mainLogo}
              alt="Algofast Main Logo"
              width={20}
              height={20}
              style={{ marginRight: 10 }}
            />
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: { xs: 1, md: 0 } }}
            >
              Algofast
            </Typography>
            <Box
              justifyContent="flex-end"
              sx={{ flexGrow: 1, display: "flex" }}
            >
              <Typography component="h1" variant="h6" color="inherit">
                {props.companyName}
              </Typography>
            </Box>
            <Box
              justifyContent="flex-end"
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            >
              <Box>
                <ClickAwayListener onClickAway={() => setSearchIcon(false)}>
                  {searchIcon ? (
                      <AutocompleteDB
                        name={"Search"}
                        id={"Search"}
                        label={"Search ..."}
                        onChange={(e, val, s) =>
                        {setSelectValues({ ...selectValues, name: val });
                      // console.log(e.ta)
                    }
                        }
                        fetchDataFn={searchMainData}
                        defaultValue={
                          {
                            id: searchValues?.id,
                            name: searchValues?.tableName,
                            detail:searchValues?.name
                          } as optionsDataT
                        }

                        diaglogVal={{
                          id: searchValues?.id,
                          name: searchValues?.tableName,
                          detail: searchValues?.name,
                        }}
                        setDialogVal={function (value: React.SetStateAction<optionsDataT>): void {
                        }}
                        fnSetModifyMode={function (id: string): void {}}
                      />
                  ) : (
                    // <Autocomplete
                    // options={options}
                    // getOptionLabel={(option) => option.result}
                    // groupBy={(option) => option.tableName}
                    // sx={{ width: 300 }}
                    // renderInput={(params) => <TextField {...params} label="Search..." />}
                    // renderGroup={(params) => (
                    //   <li key={params.key}>
                    //     <GroupHeader>{params.group}</GroupHeader>
                    //     <GroupItems>{params.children}</GroupItems>
                    //   </li>
                    // )}
                    // // onInputChange={(e) => {
                    // //   setSearch(e.target.value)}
                    // />
                    <IconButton onClick={() => setSearchIcon(true)}>
                      <SearchIcon fontSize="medium" style={{ color: "#fff" }} />
                    </IconButton>
                  )}
                </ClickAwayListener>
              </Box>
              <Box>
                <Typography
                  variant="subtitle1"
                  style={{ paddingTop: 10, marginLeft: 20 }}
                >
                  {props.username}
                </Typography>
              </Box>
            </Box>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <ProfileModal
              img={props.profileImg}
              name={props.username}
              userId={0}
              companyId={0}
              companyName={""}
            />
          </Toolbar>
        </AppBar>
        <Box sx={{ display: "flex" }}>
          <Drawer variant="permanent" anchor="left" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <LeftMenuTree
              pages={pages}
              openDrawer={open}
              setOpenDrawer={setOpenDrawer}
            />
          </Drawer>
          <Box style={{ width: "100%" }}>{children}</Box>
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
