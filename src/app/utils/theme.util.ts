"use client";

import { createTheme } from "@mui/material/styles";
import { ThemeOptions } from '@mui/material/styles';

export const theme1: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#0f0',
    },
    background: {
      default: '#111111',
      paper: '#212121',
    },
  },
  typography: {
    fontFamily: 'Open Sans',
    h1: {
      fontFamily: 'Ubuntu Mono',
    },
    h2: {
      fontFamily: 'Ubuntu Mono',
    },
    h3: {
      fontFamily: 'Ubuntu Mono',
    },
    h4: {
      fontFamily: 'Ubuntu Mono',
    },
    h6: {
      fontFamily: 'Ubuntu Mono',
    },
    h5: {
      fontFamily: 'Ubuntu Mono',
    },
    subtitle1: {
      fontFamily: 'Ubuntu Mono',
    },
    subtitle2: {
      fontFamily: 'Ubuntu Mono',
    },
    button: {
      fontFamily: 'Ubuntu Mono',
      fontWeight: 900,
    },
    overline: {
      fontFamily: 'Ubuntu Mono',
    },
  },
};


const themeDefault: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
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
  // props: {
  //   MuiTooltip: {
  //     arrow: true,
  //   },
  // },
}

export const MUILight: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
  },
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
};


interface InputStyle {
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




export const theme = createTheme(MUILight);

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

// autocompleteTextfieldSxT
export const autocompleteTextfieldSx: any = {
  color: "grey",
  // fontWeight: 'bold',
  background: "#E6F1FE",
  border: "1px solid #ccc",
  fontSize: 12,
  padding: "10px",
  borderRadius: "4px",
  backgroundColor: "white",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
};