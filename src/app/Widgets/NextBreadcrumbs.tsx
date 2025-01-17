"use client";

import React, { ReactNode, useEffect, useState } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";

const NextBreadcrumb = () => {
  const paths = usePathname();
  const [history, setHistory] = useState([]);

  const pathNames = paths.split("/").filter((path) => path);

  const hiddenSegments = ["cap", "admin"];

  // useEffect(()=>{
  //   const fullPath = paths.map((_, index) => `/${paths.slice(0, index + 1).join('/')}`);
  //   if (fullPath[fullPath.length - 1] !== history[history.length - 1]) {
  //     setHistory((prev:any) => [...prev, fullPath[fullPath.length - 1]]);
  // }

  // },[pathname, history])

  return (
    <div>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link href={"/cap"} style={{ color: "#666666" }} tabIndex={-1}>
          {<HomeIcon fontSize="small" sx={{ mt: 1 }} />}
        </Link>
        {pathNames.map((value, index) => {
          if (hiddenSegments.includes(value)) {
            return null; // Skip this segment
          }
          if (value == "lists") {
            value = "Masters";
          }
          const routeTo = `/${pathNames.slice(0, index + 1).join("/")}`;
          return (
            <Link
              key={routeTo}
              href={routeTo}
              style={{ color: "#666666" }}
              tabIndex={-1}
            >
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
