"use client";
import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  ClickAwayListener,
  Grow,
  IconButton,
  Paper,
  Popper,
  Snackbar,
  Tooltip,
} from "@mui/material";
import Seperator from "../../seperator";
import { GridCloseIcon } from "@mui/x-data-grid";
import { VisuallyHiddenInput } from "@/app/utils/styledComponents";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { masterFormPropsT } from "@/app/models/models";

export default function UploadFile(props: masterFormPropsT) {
  const [snackOpen, setSnackOpen] = useState(false);
  const [dialogOpenDelete, setDialogOpenDelete] = useState<boolean>(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };
  const handleCreate = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  // const handleCloseButtonMenu = (event: Event) => {
  //     if (
  //       anchorRef.current &&
  //       anchorRef.current.contains(event.target as HTMLElement)
  //     ) {
  //       return;
  //     }

  //     setOpen(false);
  //   };

  // const handleMenuItemClick = (
  //     event: React.MouseEvent<HTMLElement, MouseEvent>
  //   ) => {
  //     setOpen(false);
  //   };

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: "0px",
          zIndex: 2,
          paddingY: "10px",
          bgcolor: "white",
        }}
      >
        <Seperator>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {"Upload Form"}
            <IconButton onClick={handleCancel}>
              <GridCloseIcon />
            </IconButton>
          </Box>
        </Seperator>
      </Box>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload files
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => console.log(event.target.files)}
          multiple
        />
      </Button>
      <Button onClick={handleCreate}>Sample File</Button>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          style={{ paddingRight: "20px" }}
          onClick={() => {
            setDialogOpenDelete(false);
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "15%", marginLeft: "5%" }}
        >
          Submit
        </Button>
      </Box>
      <Snackbar
        open={snackOpen}
        autoHideDuration={1000}
        onClose={() => setSnackOpen(false)}
        message="File Uploaded Successfully!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
}
