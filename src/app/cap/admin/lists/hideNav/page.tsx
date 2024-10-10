"use client";
import {
  AppBar,
  Grid,
  Paper,
  Slide,
  TextField,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import React from "react";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children?: React.ReactElement<any>;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

function HideNavbar() {
  return (
    <div>
      <div>
        {/* <HideOnScroll {...props}> */}
          <Paper>
            <Toolbar>
                <Grid container>
                    <Grid item xs={4}>
                    <Typography variant="h6" component="div">
                Heading
              </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    <TextField>

                    </TextField>

                    </Grid>

                </Grid>
        
            </Toolbar>
          </Paper>
        {/* </HideOnScroll> */}
      </div>
    </div>
  );
}

export default HideNavbar;
