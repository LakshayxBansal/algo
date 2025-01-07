"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
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
import { Autocomplete, debounce } from "@mui/material";
import { searchMainData } from "@/app/controllers/navbar.controller";
import {
  GroupHeader,
  StyledLink,
  CustomTextFieldForSearch,
  AppBar,
} from "@/styledComponents";
import { Height } from "@mui/icons-material";

const drawerWidth: number = 290;

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
      width: open ? 290 : hovered ? theme.spacing(16) : theme.spacing(7),
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open &&
        hovered && {
          overflowX: "hidden",
          width: hovered ? theme.spacing(16) : theme.spacing(7),
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
    <div>
      <CssBaseline />
      <AppBar>
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
                <CustomTextFieldForSearch
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
                  <ul style={{ padding: 0 }}>
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
                  </ul>
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

      <Box sx={{ display: "flex" , overflow: "hidden" , height: "100vh"}}>
        <Drawer variant="permanent" anchor="left" open={open} 
        // sx={{ overflowY: "auto", height: "100vh" }}
        >
          {/* need to work on this as on xs it should be at the top */}
          <Box>

          <IconButton
            title={open ? "Close Menu" : "Open Menu"}
            onClick={toggleDrawer}
            aria-label="open drawer"
            tabIndex={-1}
            // sx={{
            //   display: "flex",
            //   alignItems: "center",
            //   marginY: "7px",
            //   paddingLeft: `${open ? "13px" : "4px"}`,
            //   justifyContent: `${open ? "flex-start" : "center"}`,
            // }}
            >
            {open ? <CloseRoundedIcon /> : <MenuIcon />}
          </IconButton>
            </Box>
          <LeftMenuTree
            pages={pages}
            openDrawer={open}
            setOpenDrawer={setOpenDrawer}
            isHover={hovered}
          />
        </Drawer>
        <Box style={{ width: "96vw" }}>{children}</Box>
      </Box>
    </div>
  );
}
