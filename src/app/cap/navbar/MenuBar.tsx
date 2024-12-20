"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRouter } from "next/navigation";
import LeftMenuTree from "./leftmenutree";
import { menuTreeT, searchDataT } from "../../models/models";
import ProfileMenu from "@/app/cap/admin/profile/ProfileMenu";
import mainLogo from "../../../../public/logo.png";
import Image from "next/image";
import {
  Autocomplete,
  Button,
  ClickAwayListener,
  darken,
  debounce,
  InputAdornment,
  lighten,
  ListItemButton,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { searchMainData } from "@/app/controllers/navbar.controller";
import Link from "next/link";
import SecondNavbar from "./SecondNavbar";
import { AddDialog } from "@/app/Widgets/masters/addDialog";
import Loadered from "@/app/Widgets/link/Loadered";

const drawerWidth: number = 290;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  height:60,
  // backgroundColor: "#005a9f",
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

const StyledLink = styled("a")(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
  padding: "10px",
  display: "block", // Make it behave like a block element
  "&:hover": {
    backgroundColor: theme.palette.action.hover, // Change background on hover
    color: theme.palette.primary.main, // Change text color on hover
    cursor: "pointer",
  },
}));

const GroupItems = styled("ul")({
  padding: 0,
});

const CustomTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: "white",
  "& .MuiOutlinedInput-root": {
    padding: "2px 8px",
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
    "& input": {
      padding: "6px 0",
      fontSize: "0.875rem",
    },
  },
}));

interface propsType {
  pages: menuTreeT[];
  username: string;
  companyName: string;
  profileImg?: string;
  userId: number;
  companyId: number;
  children: React.ReactNode;
  params?: { searchData: string };
}

export default function MenuBar(props: propsType) {
  const pages = props.pages;
  const children:React.ReactNode = props.children;
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);
  const [searchIcon, setSearchIcon] = useState<boolean>(false);
  const [data, setData] = useState<searchDataT[]>([]);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState("");
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  const childrenRef = useRef<React.ReactNode>(props.children); 


const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    // width: open ? 290 : 72,
    width: open ? 290 : hovered ? theme.spacing(16) : theme.spacing(7),
    // height:"100vh",
    // overflowY: 'auto',
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...((!open && hovered) && {
      overflowX: "hidden",
      // transition: theme.transitions.create("width", {
      //   easing: theme.transitions.easing.sharp,
      //   duration: theme.transitions.duration.leavingScreen,
      // }),
      width: hovered ? theme.spacing(16) : theme.spacing(7),
      // [theme.breakpoints.up("sm")]: {
      //   width: theme.spacing(7),
      // },
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: "1.0s",
      }),
    }),
  },
}));


  const holdValue = useRef("newValue");

  useEffect(() => {
    const maindata = debounce(async (searchText: string) => {
      const result: any = await searchMainData(searchText);
      if (result) {
        setData(result);
      }
    }, 100);

    if (search.length > 0) {
      maindata(search);
    }


  }, [search,loading]);

  console.log(loading);

  let groupedData: Record<string, { result: string; href: string }[]> = {};

  if (Array.isArray(data) && data.length > 0) {
    groupedData = data.reduce((acc: any, item: any) => {
      if (!acc[item.table_name]) {
        acc[item.table_name] = [];
      }
      acc[item.table_name].push({ result: item.result, href: item.href });
      return acc;
    }, {});
  }

  const options = Object.entries(groupedData).flatMap(([tableName, results]) =>
    results.map(({ result, href }) => ({
      tableName,
      result,
      href,
    }))
  );

  const toggleDrawer = () => {
    setOpen(!open);
    setHovered(false);
  };

  const setOpenDrawer = (val: boolean) => {
    setOpen(val);
  };

  const handleMasterSearch = (searchDataParam: string, href: any) => {
    data.forEach((page) => {
      if ((page.tableName = "Menu Master")) {
        router.push(href + `?searchText=${searchDataParam}`);
      } else {
        router.push(href);
      }
    });
  };

  if (!menuOpen) {
    return <></>;
  } else {
    return (
      <>
        <CssBaseline />
        <AppBar open={open}>
          <Toolbar sx={{ pr: "24px", height:55 }}>
            <IconButton
              title="Title"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{ marginRight: "36px", ...(open && { display: "none" }) }}
              tabIndex={-1}
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
                    <Autocomplete
                      options={options}
                      getOptionLabel={(option) => option.result}
                      groupBy={(option) => option.tableName}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <CustomTextField
                          {...params}
                          placeholder="Search Across Algofast"
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: <SearchIcon />,
                          }}
                        />
                      )}
                      renderGroup={(params) => (
                        <li key={params.key}>
                          <GroupHeader>{params.group}</GroupHeader>
                          <GroupItems>
                            {Array.isArray(params.children) &&
                              params.children.map((child: any) => {
                                const option = options.find(
                                  (o) => o.result === child.props.children
                                );
                                return (
                                  <li key={child.key}>
                                    <StyledLink
                                      // href={option!.href}
                                      style={{
                                        textDecoration: "none",
                                        color: "inherit",
                                      }}
                                      onClick={() => {
                                        handleMasterSearch(
                                          child.props.children,
                                          option!.href
                                        );
                                      }}
                                    >
                                      {child.props.children}
                                    </StyledLink>
                                  </li>
                                );
                              })}
                          </GroupItems>
                        </li>
                      )}
                      inputValue={search}
                      onInputChange={(event, newInputValue) => {
                        setSearch(newInputValue);
                      }}
                    />
                  ) : (
                    <IconButton title="Title" onClick={() => setSearchIcon(true)}>
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
            <IconButton title="title" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <ProfileMenu
              userId={props.userId}
              companyId={props.companyId}
              img={props.profileImg}
              name={props.username}
              companyName={props.companyName}
            
            />
          </Toolbar>
        </AppBar>
        <Box sx={{ display: "flex" }}>
          <Drawer
            variant="permanent"
            anchor="left"
            open={open}
            sx={{ display: { xs: "none", sm: "flex" } }}
            // onMouseEnter={(e)=>setHovered(true)} onMouseLeave={(e)=>{setHovered(false)}}
          >
            {/* need to work on this as on xs it should be at the top */}
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton title="Title" onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>

            <LeftMenuTree
              pages={pages}
              openDrawer={open}
              setOpenDrawer={setOpenDrawer}
              isHover={hovered}
              setLoading={setLoading}
            />
          </Drawer>
          {/* <Box style={{ width: "96vw" }}>{loading ? <Loadered> {children}</Loadered> : children}</Box> */}
          <Box style={{ width: "96vw" }}>{children}</Box>
        </Box>
      </>
    );
  }
}
