"use client";

import React, { ReactNode } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from '@mui/icons-material/Home';

const NextBreadcrumb = () => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  const hiddenSegments = ['cap','admin',];

  return (
    <div>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link href={"/cap"}>{<HomeIcon fontSize="small" />}</Link>
        {pathNames.map((value, index) => {
        if (hiddenSegments.includes(value)) {
          return null; // Skip this segment
        }
        if(value == "lists"){
          value = "Masters"
        }
        const routeTo = `/${pathNames.slice(0, index + 1).join('/')}`;
        return (
          <Link key={routeTo} href={routeTo} color="inherit">
            <Typography variant="caption">
            {value.charAt(0).toUpperCase() + value.slice(1)}
            </Typography>
          </Link>
        );
      })}
      </Breadcrumbs>
    </div>
  );
};

export default NextBreadcrumb;
