"use client";

import { createTheme } from "@mui/material/styles";

interface autocompleteTextfieldSxT {
  color: string;
  fontWeight: string;
  background: string;
  border: string;
  fontSize: number;
  padding: string;
  borderRadius: string;
  backgroundColor: string;
  boxShadow: string;
  height?: string | number;
  width?: string | number; 
}


export const theme = createTheme({
  spacing: 8,
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root, & .MuiInputLabel-root": {
            fontSize: "0.9rem",
          },
          "& .MuiInputLabel-root.MuiInputLabel-shrink": {
            // With the smaller font size, the shrink effect
            // shouldn't go quite as high ("-6px" instead of "-9px")
            // in order for it to look correct.
            transform: "translate(13px, -6px) scale(0.75)",
          },
          background: "#F8FAFB",
        },
      },
      defaultProps: {
        variant: "outlined",
        size: "small",
        margin: "dense",
      },
    },
  },
});

/*
    MuiTab: {
      styleOverrides: {
        root: {
          backgroundColor: '#f0f0f0', // Gray background color for tabs
          borderRadius: '10px', // Rounded corners
        },
      },
    },
*/


export const autocompleteTextfieldSx: autocompleteTextfieldSxT = {
  color: "white",
  fontWeight: 'bold',
  background: "linear-gradient(to right, #1769aa, #4dabf5)",
  border: "1px solid #ccc",
  fontSize: 12,
  padding: "10px",
  borderRadius: "4px",
  backgroundColor: "white",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
};
