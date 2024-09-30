"use client";
import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import Seperator from "../seperator";
import { GridCloseIcon, GridColDef } from "@mui/x-data-grid";
import { VisuallyHiddenInput } from "@/app/utils/styledComponents";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Papa from "papaparse";
import { blue } from "@mui/material/colors";

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
  // console.log(fnFileUpad);
  const [snackOpen, setSnackOpen] = useState(false);
  const [data, setData] = useState();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [snackMessage, setSnackMessage] = useState(
    "File Uploaded Successfully!"
  );
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const handleCancel = () => {
    setDialogOpen ? setDialogOpen(false) : null;
  };

  const handleSubmit = async () => {
    const batchResult = await fnFileUpad(data as any);
   
    console.log("batchresult : ",batchResult);

    if (!batchResult.status) {
      setErrorMessages(
        Array.from(batchResult.data.values)
          .flat()
          .map((error: any) => `${error.path}: ${error.message}`)
      );
      setSnackMessage("Error in Upload File!");
      setSnackOpen(true);
    } else {
      setSnackMessage("File Uploaded Successfully!");
      setSnackOpen(true);
    }

    setTimeout(() => {
      setDialogOpen(false);
      setTimeout(() => {
        setSnackOpen(false);
      }, 3000);
    }, 3000);
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    // const file = event.target.files ? event.target.files[0] : null;
    // console.log("Type of File", typeof file);
    if (file) {
      setSelectedFileName(file.name);
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
        sx={{ margin: "1rem" }}
      >
        Upload files
        <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple />
      </Button>
      {selectedFileName && ( // Display selected file name if it exists
        <Typography
          variant="subtitle1"
          sx={{
            textAlign: "center",
            fontFamily: ["Roboto", "Helvetica", "Arial"].join(", "),
            color: "blue",
            textDecoration: "underline",
            textDecorationColor: "#1976D2",
          }}
        >
          File: {selectedFileName}
        </Typography>
      )}
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
      {/* <Snackbar
        open={snackOpen}
        autoHideDuration={1000}
        onClose={() => setSnackOpen(false)}
        message={snackMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      /> */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity={snackMessage.includes("Error") ? "error" : "success"}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
      {errorMessages.length > 0 && (
        <Box sx={{ mt: 2 }}>
          {/* <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessages.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </Alert> */}
          {/* {errorMessages.map((error, index) => (
            <Alert key={index} severity="error" sx={{ mb: 1 }}>
              {error}
            </Alert>
          ))} */}
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
