"use client";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { DataGrid, DataGridProps, gridClasses } from "@mui/x-data-grid";
import { Button, Menu, TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { LoadingButton } from "@mui/lab";

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 2,
  // borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  backgroundColor: "rgba(128, 128, 128, 0.2)",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
    },
  },
}));

const ODD_OPACITY = 0.2;

export const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  backgroundColor: "#fff",
  height: 650,
  border: "none",

  // disableColumnMenu:true,
  "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
    outline: "none !important",
  },
  "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus":
    {
      outline: "none !important",
    },
  "& .MuiDataGrid-cell": {
    borderBottom: "none",
  },
  "& .MuiDataGrid-columnHeaders": {
    borderBottom: "none",
  },
  // '& .MuiDataGrid-columnSeparator': {
  //   display: 'none',
  // },
  "& .MuiDataGrid-cell:hover": {
    color: "primary.main",
  },
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
  // "&. MuiDataGrid-withBorderColor":{
  //   border:"none"
  // }
  // "&. MuiDataGrid-withBorderColor":{
  //   border:"none"
  // }
}));

export const MinimizedDataGrid = styled(DataGrid)(({ theme }) => ({
  backgroundColor: "#fff",
  height: 650,
  border: "none",

  "& .MuiDataGrid-cellCheckbox": {
    width: "30px",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  "& .MuiDataGrid-cellCheckbox .MuiCheckbox-root": {
    padding: 0,
  },
  "& .MuiDataGrid-cellCheckbox .MuiSvgIcon-root": {
    width: "15px",
    height: "15px",
  },
  "& .MuiDataGrid-columnHeaderCheckbox": {
    width: "38px",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  "& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root": {
    padding: 0,
  },
  "& .MuiDataGrid-columnHeaderCheckbox .MuiSvgIcon-root": {
    width: "15px",
    height: "15px",
  },
  "& .MuiDataGrid-footerContainer": {
    height: "28px", // Force footer container to 30px
    minHeight: "28px", // Override any minimum height constraints
  },
  "& .MuiTablePagination-root": {
    height: "28px", // Ensure pagination component also respects 30px height
    minHeight: "28px",
    overflow: "hidden",
  },
  "& .MuiTablePagination-toolbar": {
    height: "28px", // Adjust the toolbar within the pagination
    minHeight: "28px",
  },

  // disableColumnMenu:true,
  "& .MuiDataGrid-cell": {
    borderBottom: "none",
  },
  "& .MuiDataGrid-columnHeaders": {
    borderBottom: "none",
  },
  // '& .MuiDataGrid-columnSeparator': {
  //   display: 'none',
  // },
  "& .MuiDataGrid-cell:hover": {
    color: "primary.main",
  },
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
  // "&. MuiDataGrid-withBorderColor":{
  //   border:"none"
  // }
  // "&. MuiDataGrid-withBorderColor":{
  //   border:"none"
  // }
}));

export const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    // minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "0 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 22,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[300],
    }),
  },
}));

export const ContainedButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#e05a5a", // Change this to your desired color
  color: theme.palette.common.white, // Change text color if needed
  "&:hover": {
    backgroundColor: "#EA8E8E", // Hover effect
  },
}));

export const OutlinedButton = styled(Button)(({ theme }) => ({
  bordercolor: "#e05a5a",
  color: "#e05a5a", // Change this to your desired color
  "&:hover": {
    bordercolor: "#EA8E8E", // Hover effect
    color: "#EA8E8E", // Change this to your desired color
  },
}));

// export const CombinedButton = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   padding: 0,
//   minWidth: 0,
//   height: "40px", // Adjust the height as needed
//   borderRadius: theme.shape.borderRadius,
//   border: `1px solid ${theme.palette.divider}`,
//   backgroundColor: theme.palette.primary.main,
//   "& .separator": {
//     height: "30px", // Adjust the height as needed
//     width: "1px",
//     backgroundColor: "#fff",
//     margin: "0 4px", // Adjust spacing between icons and separator
//   },
//   "& .MuiBox-root":{
//     padding:0,
//     margin:0,
//     minWidth: 0,
//   },
//   "& .MuiButtonBase-root":{
//     color:"#fff",
//     fontSize:20,
//     fontWeight:500,
//     minWidth:0,

//     "& .MuiSvgIcon-root":{
//       color:"#fff",
//       fontSize:25,
//     },
//   },

// }));

//  const StyledMenu = styled((props: MenuProps) => (
//   <Menu
//     elevation={0}
//     anchorOrigin={{
//       vertical: 'bottom',
//       horizontal: 'right',
//     }}
//     transformOrigin={{
//       vertical: 'top',
//       horizontal: 'right',
//     }}
//     {...props}
//   />
// ))(({ theme }) => ({
//   '& .MuiPaper-root': {
//     borderRadius: 6,
//     marginTop: theme.spacing(1),
//     minWidth: 180,
//     color:
//       theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
//     boxShadow:
//       'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
//     '& .MuiMenu-list': {
//       padding: '4px 0',
//     },
//     '& .MuiMenuItem-root': {
//       '& .MuiSvgIcon-root': {
//         fontSize: 18,
//         color: theme.palette.text.secondary,
//         marginRight: theme.spacing(1.5),
//       },
//       '&:active': {
//         backgroundColor: alpha(
//           theme.palette.primary.main,
//           theme.palette.action.selectedOpacity,
//         ),
//       },
//     },
//   },
// }));

export const entityDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

// export const StyledMenu = styled(Menu)(({ theme }) => ({
//   '& .MuiPaper-root': {
//     borderRadius: 6,
//     marginTop: theme.spacing(1),
//     // minWidth: 180,
//     color: 'rgb(55, 65, 81)',
//     boxShadow:
//       'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
//     '& .MuiMenu-list': {
//       padding: '4px 20px',
//     },
//     '& .MuiMenuItem-root': {
//       '& .MuiSvgIcon-root': {
//         fontSize: 22,
//         color: theme.palette.text.secondary,
//         marginRight: theme.spacing(1.5),
//       },
//       '&:active': {
//         backgroundColor: alpha(
//           theme.palette.primary.main,
//           theme.palette.action.selectedOpacity,
//         ),
//       },
//     },
//     ...theme.applyStyles('dark', {
//       color: theme.palette.grey[300],
//     }),
//   },
// }));

export const CombinedButton = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  minWidth: 0,
  height: "40px", // Adjust the height as needed
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.primary.main,
  "& .separator": {
    height: "30px", // Adjust the height as needed
    width: "1px",
    backgroundColor: "#fff",
    margin: "0 4px", // Adjust spacing between icons and separator
  },
  "& .MuiBox-root": {
    padding: 0,
    margin: 0,
    minWidth: 0,
  },
  "& .MuiButtonBase-root": {
    color: "#fff",
    fontSize: 20,
    fontWeight: 500,
    minWidth: 0,

    "& .MuiSvgIcon-root": {
      color: "#fff",
      fontSize: 25,
    },
  },
}));

export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const CustomTextField = styled(TextField)(({ theme }) => ({
  height: "fit-content",
  "& .MuiFormHelperText-root": {
    backgroundColor: "white",
    margin: 0,
  },
}));

export const CustomStyledDiv = styled("div")(({ theme }) => ({
  zIndex: 1300,
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  borderRadius: "4px",
  border: "1px solid #ddd",
}));

export const StyledTelInput = styled(MuiTelInput)(({ theme }) => ({
  height: "fit-content",
  "& .MuiFormHelperText-root": {
    backgroundColor: "white",
    margin: 0,
  },
}));

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  backgroundColor: "black !important",
  color: "#fff !important",
  maxWidth: "100%",
  width: "100%",
  minWidth: "100px",
  fontSize: "14px",
  fontFamily: "'Roboto', arial, sans-serif",
  letterSpacing: "0.25px",
  height: "37px",
  position: "relative",
  "&:hover": {
    backgroundColor: "#1a1a1a !important",
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(1, 2),
  textTransform: "none",
  "& .MuiLoadingButton-startIcon": {
    margin: 0,
    display: "flex",
    alignItems: "center",
  },
  "& .MuiButton-root": {
    backgroundColor: "black !important",
  },
  svg: {
    width: "24px",
    height: "24px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    minWidth: "100%",
    padding: theme.spacing(1, 1),
    fontSize: "0.875rem",
  },
}));

