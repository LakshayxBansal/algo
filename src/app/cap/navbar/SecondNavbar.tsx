"use client";
import NextBreadcrumb from "@/app/utils/NextBreadcrumbs";
import React, { useState } from "react";
import { Paper, Grid, Typography } from "@mui/material";
import { usePathname, useSearchParams } from "next/navigation";

function SecondNavbar(props:{title?:string}) {
  // const path = usePathname();
  // const searchParams = useSearchParams();
  // const title = searchParams.get("pgTitle")

  // const match1 = path.match(/\/([^/]+)$/);

  // let title: string;
  // if (match1) {
  //   title = match1[1]
  //     .replace(/([a-z])([A-Z])/g, "$1 $2")
  //     .replace(/^\w/, (c) => c.toUpperCase());
   
  // } else {
  //   title = "";
  // }

  return (
    <div>
      <Paper elevation ={3} style={{ padding: 5, marginTop:props.title == "Company"? 20:70,marginBottom:20, alignItems:"center" }}>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" style={{ verticalAlign: "baseline" }}>
              {`List of ${props.title}` }
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              paddingRight: 10,
            }}
          >
            <NextBreadcrumb />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default SecondNavbar;
