
"use client";
import React, { useState } from "react";
import { Alert, Box, Button, IconButton, Link, Snackbar } from "@mui/material";
import Seperator from "../seperator";
import { GridCloseIcon } from "@mui/x-data-grid";
import { VisuallyHiddenInput } from "@/app/utils/styledComponents";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Papa from "papaparse";
import { contactSchema } from "@/app/zodschema/zodschema";

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
  const [errorMessages, setErrorMessages] = useState<
    { key: string; message: string }[]
  >([]);
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

      const errorMap = new Map();
      for (const [key, messages] of batchResult.data.entries()) {
        const keyString = JSON.stringify(key);
        const aggregatedMessages = messages
          .map((error: any) => error.message)
          .join(", ");
        errorMap.set(keyString, aggregatedMessages);
      }

      const errors = Array.from(errorMap.entries()).map(([key, message]) => ({
        key,
        message,
      }));

      setErrorMessages(errors);
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
        complete: async (results:any) => {
          const fileData = results.data;
          setData(fileData as any);
        },
      });
    }
  };

  const downloadErrorFile = () => {
    const csvData = errorMessages.map((error) => ({
      data: error.key,
      message: error.message,
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

  const downloadSampleFile = (schema: any, fileName: string) => {
    const sampleData: { key: string; isOptional: string }[] = [];

    for (const [key, value] of Object.entries(schema.shape)) {
      const zodValue = value as any;
      console.log("ZodValue", zodValue);
      // const type = zodValue.constructor.name;
      const isOptional = zodValue.isOptional() ? "Optional" : "Mandatory";

      sampleData.push({
        key,
        isOptional,
      });
    }

    const csv = Papa.unparse(sampleData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
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
      {isError ? (
        <Link
          sx={{
            margin: "1rem",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            fontFamily: ["Roboto", "Helvetica", "Arial"],
            color: "red",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={downloadErrorFile}
        >
          Download Error File
        </Link>
      ) : (
        selectedFileName && (
          <Link
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              fontFamily: ["Roboto", "Helvetica", "Arial"],
              textDecoration: "underline",
              textDecorationColor: "#1976D2",
            }}
          >
            File: {selectedFileName}
          </Link>
        )
      )}
      <Link
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          fontFamily: ["Roboto", "Helvetica", "Arial"],
          textDecoration: "underline",
          textDecorationColor: "#1976D2",
          cursor: "pointer",
        }}
        onClick={() => downloadSampleFile(contactSchema, "Sample_file.csv")}
      >
        Sample File
      </Link>
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
    </>
  );
}

