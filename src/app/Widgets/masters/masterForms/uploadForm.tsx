"use client";
import React, { useState } from "react";
import { Box, Button, IconButton, Snackbar } from "@mui/material";
import Seperator from "../../seperator";
import { GridCloseIcon, GridColDef } from "@mui/x-data-grid";
import { VisuallyHiddenInput } from "@/app/utils/styledComponents";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { masterFormPropsT } from "@/app/models/models";
import Papa from "papaparse";
import * as zs from "@/app/zodschema/zodschema";

export default function UploadFile(props: masterFormPropsT, expectedFields: any) {
  const [snackOpen, setSnackOpen] = useState(false);
  const [dialogOpenDelete, setDialogOpenDelete] = useState<boolean>(false);
  const [rows, setRows] = useState([] as any);
  const [columns, setColumns] = useState([] as any);

  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  const handleCreate = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  // const handleFileChange = (file: File) => {
  //   const reader = new FileReader();

  //   // Read the file as a Data URL (Base64)
  //   reader.readAsDataURL(file);

  //   reader.onload = () => {
  //     const buffer = reader.result; // This is the buffer or base64 string
  //     console.log(typeof buffer);

  //     console.log("File Buffer:", buffer); // Log the buffer
  //     setSnackOpen(true);
  //   };

  //   reader.onerror = (error) => {
  //     console.error("Error reading file:", error);
  //   };
  // };

  // const handleFileChange = (event: any) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     Papa.parse(file, {
  //       header: true,
  //       skipEmptyLines: true,
  //       complete: (results) => {
  //         const data = results.data;
  //         console.log("rows", data);

  //         // Set columns based on the keys of the first row
  //         const cols = Object.keys(data[0] || {}).map((key) => ({
  //           field: key,
  //           headerName: key,
  //           width: 150,
  //         }));
  //         console.log("columns", cols);
  //       },
  //     });
  //   }
  // };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data;

          const parsedResults = data.map((row: any) => {
            const parsed = zs.nameMasterData.safeParse(row);
            if (!parsed.success) {
              console.error("Validation errors:", parsed.error.errors);
              return null; 
            }
            return parsed.data; 
          }).filter(row => row !== null); // Filter out any invalid rows

          console.log("Valid Rows:", parsedResults);

          // Set columns based on the keys of the first valid row
          const cols = Object.keys(parsedResults[0] || {}).map((key) => ({
            field: key,
            headerName: key,
            width: 150,
          }));

          setColumns(cols);
          setRows(parsedResults);
        },
      });
    }
  };

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     Papa.parse(file, {
  //       header: true,
  //       skipEmptyLines: true,
  //       complete: (results) => {
  //         const data = results.data;
  //         console.log("CSV Data:", data);

  //         // Check for required fields in the CSV
  //         const missingFields = expectedFields.filter((field: PropertyKey) => !data[0]?.hasOwnProperty(field));
  //         if (missingFields.length > 0) {
  //           console.error("Missing fields:", missingFields);
  //           setSnackOpen(true); // Show an error snackbar
  //           return;
  //         }

  //         // Set columns based on the keys of the first row
  //         const cols = Object.keys(data[0] || {}).map((key) => ({
  //           field: key,
  //           headerName: key,
  //           width: 150,
  //         }));

  //         setColumns(cols);
  //         setRows(data);
  //       },
  //     });
  //   }
  // };

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
          onChange={handleFileChange}
          //   (event) => {
          //   const files = event.target.files;
          //   if (files && files.length > 0) {
          //     handleFileChange(files[0]); // Pass the first file to handleFileChange
          //     console.log("uploaded files", files[0]);
          //   }
          // }

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
