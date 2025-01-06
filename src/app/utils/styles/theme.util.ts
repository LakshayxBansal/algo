"use client";

import { createTheme } from "@mui/material/styles";
import { ThemeOptions } from "@mui/material/styles";

export const theme1: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#0f0",
    },
    background: {
      default: "#111111",
      paper: "#212121",
    },
  },
  typography: {
    fontFamily: "Open Sans",
    h1: {
      fontFamily: "Ubuntu Mono",
    },
    h2: {
      fontFamily: "Ubuntu Mono",
    },
    h3: {
      fontFamily: "Ubuntu Mono",
    },
    h4: {
      fontFamily: "Ubuntu Mono",
    },
    h6: {
      fontFamily: "Ubuntu Mono",
    },
    h5: {
      fontFamily: "Ubuntu Mono",
    },
    subtitle1: {
      fontFamily: "Ubuntu Mono",
    },
    subtitle2: {
      fontFamily: "Ubuntu Mono",
    },
    button: {
      fontFamily: "Ubuntu Mono",
      fontWeight: 900,
    },
    overline: {
      fontFamily: "Ubuntu Mono",
    },
  },
};

const themeDefault: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
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
};

export const MUILight: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#4870AC",
      light: "#777F8C",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f50057",
      light: "#F0F8FF",
      contrastText: "#98A1B2",
    },
    background: {
      default: "#fff",
      paper: "#fff",
    },
    error: {
      main: "#FF4C4C",
    },
  },
  spacing: 8,
  typography: {
    fontFamily: "Roboto, 'Helvetica Neue', sans-serif",
    button: {
      color: "#ffffff",
      backgroundColor: "#98A1B2",
      dark: "#1A1D22",
    },
  },
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
    MuiInputLabel: {
      styleOverrides: {
        asterisk: {
          color: "#E63946",
        },
      },
    },
    // MuiButton: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: "#4870AC", // Default background color
    //       color: "#fff", // Text color
    //       "&:hover": {
    //         backgroundColor: "#777F8C", // Darker shade of the button on hover
    //         color: "#fff", 
    //       },
    //     },
    //   },
    //   defaultProps: {
    //     variant: "contained",
    //   },
    // },
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
