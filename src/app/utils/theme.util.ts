'use client'

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root, & .MuiInputLabel-root": {
            fontSize: "0.9rem"
          },
          "& .MuiInputLabel-root.MuiInputLabel-shrink": {
            // With the smaller font size, the shrink effect
            // shouldn't go quite as high ("-6px" instead of "-9px")
            // in order for it to look correct.
            transform: "translate(13px, -6px) scale(0.75)"
          },
          background: "#F8FAFB"
        }
      },
      defaultProps: {
        variant: "outlined",
        size: 'small',
        margin: "dense"
      }
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