"use client";

import * as React from "react";
import { useState, useEffect } from "react";
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
import Image from "next/image";
import { Autocomplete, debounce, useMediaQuery } from "@mui/material";
import { searchMainData } from "@/app/controllers/navbar.controller";
import {
  GroupHeader,
  StyledLink,
  CustomTextFieldForSearch,
  AppBar,
  barHeight,
} from "@/styledComponents";
import { Height } from "@mui/icons-material";

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

  const matches = useMediaQuery("(max-width:425px)");

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      top: barHeight, // Matches the height of the AppBar
      whiteSpace: "nowrap",
      width: open ? 290 : matches ? 0 : theme.spacing(7),
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      overflowY: "auto",
      ...(!open &&
        hovered && {
          // overflowX: "hidden",
          width: hovered ? theme.spacing(16) : theme.spacing(7),
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: "1.0s",
          }),
        }),
    },
  }));

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
            "&.MuiToolbar-root": {
              paddingLeft: 0,
              paddingRight: 0,
              minHeight: barHeight,
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              title={open ? "Close Menu" : "Open Menu"}
              onClick={toggleDrawer}
              aria-label="open drawer"
              tabIndex={-1}
              sx={{
                display: "flex",
                alignItems: "center",
                marginY: "7px",
                marginLeft: "8px",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Image
              src={"/companyLogo.png"}
              alt="Company Logo"
              width={40}
              height={40}
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
              tabIndex={-1}
              options={options}
              getOptionLabel={(option) => option.result}
              groupBy={(option) => option.tableName}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <CustomTextFieldForSearch
                  {...params}
                  placeholder={`search across ${props.companyName}`}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <Image
                        src={"/searchIcon.png"}
                        alt="Search Icon"
                        width={28}
                        height={28}
                      />
                    ),
                    endAdornment: null,
                  }}
                  // tabIndex={-1}
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

          <IconButton title="title" color="inherit" tabIndex={-1}>
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
                src={"/notificationIcon.png"}
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

      <Box sx={{ display: "flex", maxHeight: "100vh",overflow: "hidden"}}>
        <Drawer variant="permanent" anchor="left" open={open} 
        // sx={{ overflowY: "auto", height: "100vh" }}
        >
          {/* need to work on this as on xs it should be at the top */}
          <LeftMenuTree
            pages={pages}
            openDrawer={open}
            setOpenDrawer={setOpenDrawer}
            isHover={hovered}
          />

        </Drawer>
        <Box style={{  flex: 1, overflowY: "auto" , height:"100vh"}}>{children}</Box>
      </Box>  
    </div>
  );
}
