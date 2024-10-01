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
import { GridCloseIcon } from "@mui/x-data-grid";
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
  const [snackOpen, setSnackOpen] = useState(false);
  const [data, setData] = useState();
  const [isError, setIsError] = useState(false);
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

    console.log("batchresult : ", batchResult);

    if (!batchResult.status) {
      const errorFileName = "errorFile.csv";
      setSelectedFileName(errorFileName);
      setErrorMessages(
        Array.from(batchResult.data.values())
          .flat()
          .map((error: any) => `${error.path}: ${error.message}`)
      );
      setSnackMessage("Error in Upload File!");
      setSnackOpen(true);
      setIsError(true);
    } else {
      setSnackMessage("File Uploaded Successfully!");
      setSnackOpen(true);
      setIsError(false);
    }

    setTimeout(() => {
      setDialogOpen(false);
      setTimeout(() => {
        setSnackOpen(false);
      }, 20000);
    }, 20000);
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
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

  const downloadErrorFile = () => {
    const csvData = errorMessages.map((msg) => ({
      path: msg.split(": ")[0],
      message: msg.split(": ")[1],
    }));

    const csv = Papa.unparse(csvData);

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = selectedFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
      {isError ? (
        <Button sx={{ margin: "1rem" }} onClick={downloadErrorFile}>
          Download Error File
        </Button>
      ) : (
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          sx={{ margin: "1rem" }}
        >
          Upload files
          <VisuallyHiddenInput
            type="file"
            onChange={handleFileChange}
            multiple
          />
        </Button>
      )}
      {selectedFileName && (
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
