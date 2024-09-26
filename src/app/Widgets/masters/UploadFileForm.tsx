"use client";
import React, { useState } from "react";
import { Box, Button, IconButton, Snackbar, Typography } from "@mui/material";
import Seperator from "../seperator";
import { GridCloseIcon, GridColDef } from "@mui/x-data-grid";
import { VisuallyHiddenInput } from "@/app/utils/styledComponents";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Papa from "papaparse";

// to get only 2 values
// 1. name of the sample file
// 2. funtion to uplad the data
export default function UploadFileForm({
  setDialogOpen,
  fnFileUpad,
  sampleFileName,
}: {
  setDialogOpen: any;
  fnFileUpad: any;
  sampleFileName: any;
}) {
  console.log(fnFileUpad);
  const [snackOpen, setSnackOpen] = useState(false);
  const [data, setData] = useState();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [snackMessage, setSnackMessage] = useState("File Uploaded Successfully!");

  const handleCancel = () => {
    setDialogOpen ? setDialogOpen(false) : null;
  };

  const handleSubmit = async () => {
    const batchResult = await fnFileUpad(data as any);

    console.log(batchResult);

    if (batchResult.status) {
      setErrorMessages(Array.from(batchResult.data.values()).flat().map((error: any) => `${error.path}: ${error.message}`));
      setSnackMessage("Error in Upload File!"); 
      setSnackOpen(true);
    } else {
      setSnackMessage("File Uploaded Successfully!"); 
      setSnackOpen(true);
    }
    
    setSnackOpen(true);
    
    setTimeout(() => {
      setSnackOpen(false);
    }, 5000);
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    console.log("csv file : ", file);
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
          const fileData = results.data;
          setData(fileData as any);
        },
      });
    }
  };

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
        <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple />
      </Button>
      {/* <Button onClick={handleCreate}>Sample File</Button> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button style={{ paddingRight: "20px" }} onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "15%", marginLeft: "5%" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
      <Snackbar
        open={snackOpen}
        autoHideDuration={1000}
        onClose={() => setSnackOpen(false)}
        message={snackMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
      {errorMessages.length > 0 && (
        <Box sx={{ mt: 2 }}>
          {errorMessages.map((error, index) => (
            <Typography key={index} color="error">
              {error}
            </Typography>
          ))}
        </Box>
      )}
    </>
  );
}
