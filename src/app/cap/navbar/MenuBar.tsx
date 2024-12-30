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
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useRouter } from "next/navigation";
import LeftMenuTree from "./leftmenutree";
import { menuTreeT, searchDataT } from "../../models/models";
import ProfileMenu from "@/app/cap/admin/profile/ProfileMenu";
import logo from "../../../../public/logo.png";
import companyLogo from "../../../../public/companyLogo.png";
import notification from "../../../../public/notificationIcon.png";
import searchIcon from "../../../../public/searchIcon.png";
import Image from "next/image";
import {
  Autocomplete,
  Button,
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

const drawerWidth: number = 290;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  height: 64,
  backgroundColor: "#4870AC",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // ...(open && {
  //   marginLeft: drawerWidth,
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   transition: theme.transitions.create(["width", "margin"], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // }),
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
  backgroundColor: "#4870AC",
  "& .MuiOutlinedInput-root": {
    padding: "2px 8px",
    borderRadius: 0,
    "& fieldset": {
      borderColor: "transparent", // Default state
      borderWidth: "0 0 2px 0",
      borderBottomColor: "#FFFFFF",
    },
    "&:hover fieldset": {
      borderWidth: "0 0 2px 0",
      borderBottomColor: "#FFFFFF",
    },
    "&.Mui-focused fieldset": {
      borderWidth: "0 0 2px 0",
      borderBottomColor: "#FFFFFF",
    },
    "& input": {
      padding: "6px 0",
      fontSize: "0.875rem",
      color: "#FFFFFF",
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
  const children: React.ReactNode = props.children;
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<searchDataT[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  const childrenRef = useRef<React.ReactNode>(props.children);

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      top: 64, // Matches the height of the AppBar
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
      ...(!open &&
        hovered && {
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
  }, [search]);

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

  return (
    <>
      <CssBaseline />
      <AppBar open={open}>
        <Toolbar
          sx={{
            height: 64,
            "&.MuiToolbar-root": {
              paddingLeft: 0,
              paddingRight: 0,
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Image
              src={logo}
              alt="Algofast Logo"
              width={20}
              height={20}
              style={{ marginLeft: 16 }}
            />
            <Image
              src={companyLogo}
              alt="Company Logo"
              width={30}
              height={30}
              style={{ marginRight: 10, marginLeft: 40 }}
            />
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: { xs: 1, md: 0 }, fontWeight: 600 }}
            >
              {props.companyName}
            </Typography>
          </Box>

          <Box
            justifyContent="flex-end"
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            <Autocomplete
              options={options}
              getOptionLabel={(option) => option.result}
              groupBy={(option) => option.tableName}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  placeholder="Search"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <Image
                        src={searchIcon}
                        alt="Search Icon"
                        width={28}
                        height={28}
                      />
                    ),
                    endAdornment: null,
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
          </Box>

          <IconButton title="title" color="inherit">
            <Badge
              badgeContent={4}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#FF4C4C",
                  color: "white",
                },
              }}
            >
              <Image
                src={notification}
                alt="notification"
                width={20}
                height={20}
              />
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
        <Drawer variant="permanent" anchor="left" open={open} >
          {/* need to work on this as on xs it should be at the top */}
          <IconButton
            title={open ? "Close Menu" : "Open Menu"}
            onClick={toggleDrawer}
            aria-label="open drawer"
            tabIndex={-1}
            sx={{
              display: "flex",
              alignItems: "center",
              marginY: "7px",
              paddingLeft: `${open ? "13px" : "4px"}`,
              justifyContent: `${open ? "flex-start" : "center"}`,
            }}
          >
            {open ? <CloseRoundedIcon /> : <MenuIcon />}
          </IconButton>
          <LeftMenuTree
            pages={pages}
            openDrawer={open}
            setOpenDrawer={setOpenDrawer}
            isHover={hovered}
          />
        </Drawer>
        <Box style={{ width: "96vw" }}>{children}</Box>
      </Box>
    </>
  );
}
