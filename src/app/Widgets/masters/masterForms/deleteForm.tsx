"use client";
import React, { useRef, useState } from "react";
import { Box, Button, Grid, Portal, Snackbar, Typography } from "@mui/material";
import { masterFormPropsT } from "@/app/models/models";

export default function DeleteForm(props: masterFormPropsT) {
  const [snackOpen, setSnackOpen] = useState(false);

  console.log("thsi is delete form", props.data);

  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };
  const handleSubmit = async () => {
    const result: any = await props.data();
    props.setDialogOpen ? props.setDialogOpen(false) : null;
    setSnackOpen(true);
  };

  return (
    <Box id="sourceForm">
      <form>
        <Typography variant={"h4"}>Are you sure you want to delete?</Typography>

        <Grid container>
          <Grid item xs={6} md={6}>
            <Box margin={1} sx={{ display: "flex" }}></Box>
          </Grid>
          <Grid item xs={6} md={6}>
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
              m={1}
            >
              <Button onClick={handleCancel}>Cancel</Button>
              <Button
                // type="submit"
                onClick={handleSubmit}
                variant="contained"
              >
                Delete
              </Button>
            </Box>
          </Grid>
        </Grid>
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={handleCancel}>Cancel</Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            sx={{ width: "15%", marginLeft: "5%" }}
          >
            Delete
          </Button>
        </Box> */}
      </form>
      <Portal>
        <Snackbar
          open={snackOpen}
          autoHideDuration={3000}
          onClose={() => setSnackOpen(false)}
          message="Record Saved!"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Portal>
    </Box>
  );
}
