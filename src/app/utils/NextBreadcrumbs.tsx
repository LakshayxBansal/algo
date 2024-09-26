"use client";

import React, { ReactNode } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

type TBreadCrumbProps = {
  homeElement: ReactNode;
//   containerClasses?: string;
//   listClasses?: string;
//   activeClasses?: string;
  capitalizeLinks?: boolean;
};

const NextBreadcrumb = ({
  homeElement,
//   containerClasses,
//   listClasses,
//   activeClasses,
  capitalizeLinks,
}: TBreadCrumbProps) => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  return (
    <div>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link href={"/"}>{homeElement}</Link>
        {pathNames.length > 0}
        {pathNames.map((link, index) => {
          let href = `/${pathNames.slice(0, index + 1).join("/")}`;
        //   let itemClasses =
        //     paths === href ? `${listClasses} ${activeClasses}` : listClasses;
          let itemLink = capitalizeLinks
            ? link[0].toUpperCase() + link.slice(1, link.length)
            : link;
          return (
            <React.Fragment key={index}>
                <Typography variant="subtitle1">
              <Link href={href}>{itemLink}</Link>
                </Typography>
              {pathNames.length !== index + 1}
            </React.Fragment>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default NextBreadcrumb;
