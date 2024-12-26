import React from "react";
import { LoadingButton } from "@mui/lab";
import { signIn } from "next-auth/react";
import { ClientSafeProvider } from "next-auth/react";
import { ButtonProps, styled, useMediaQuery, useTheme } from "@mui/material";
import googleImage from "../../../public/google.svg";

interface IButtonProps extends ButtonProps {
  provider: ClientSafeProvider;
  callbackUrl: string;
}

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
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

export function GoogleSignUpButton({
  provider,
  callbackUrl,
  children,
  ...rest
}: IButtonProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(
    `(max-width:${theme.breakpoints.values.sm - 1}px)`
  );

  return (
    <div key={provider.name} style={{ width: "100%" }}>
      <StyledLoadingButton
        onClick={() => {
          signIn(provider.id, { callbackUrl: callbackUrl });
        }}
        variant="contained"
        startIcon={
          <img
            src="/google.svg"
            alt="Google"
            style={{ height: "1.5rem", width: "1.5rem" }}
          />
        }
        {...rest}
      >
        {isSmallScreen ? "" : `${children} ${provider.name}`}
      </StyledLoadingButton>
    </div>
  );
}

export default GoogleSignUpButton;

// /** @jsxImportSource @emotion/react */
// import React from "react";
// import {
//   Box,
//   Button,
//   ButtonProps,
//   styled,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import { signIn } from "next-auth/react";
// import { ClientSafeProvider } from "next-auth/react";
// import LoadingButton from "@mui/lab/LoadingButton";

// interface IButtonProps extends ButtonProps {
//   provider: ClientSafeProvider;
//   callbackUrl: string;
// }
// // const CustomButton = styled(Box)(({ theme }) => ({
// // const CustomButton = styled(LoadingButton)(({ theme }) => ({
// //   userSelect: "none",
// //   WebkitAppearance: "none",
// //   backgroundColor: "#131314",
// //   backgroundImage: "none",
// //   border: "1px solid #747775",
// //   borderRadius: "4px",
// //   boxSizing: "border-box",
// //   color: "#e3e3e3",
// //   cursor: "pointer",
// //   fontFamily: "'Roboto', arial, sans-serif",
// //   fontSize: "14px",
// //   height: "37px",
// //   letterSpacing: "0.25px",
// //   outline: "none",
// //   overflow: "hidden",
// //   padding: "0 2rem",
// //   position: "relative",
// //   textAlign: "center",
// //   transition: "background-color .218s, border-color .218s, box-shadow .218s",
// //   whiteSpace: "nowrap",
// //   borderColor: "#8e918f",
// //   display: "flex",
// //   alignItems: "center",
// //   justifyContent: "space-between",
// //   "& .icon": {
// //     // height: "20px",
// //     // marginRight: "5px",
// //     minWidth: "20px",
// //     width: "27px",
// //   },
// //   "& .content-wrapper": {
// //     display: "flex",
// //     alignItems: "center",
// //     flexDirection: "row",
// //     flexWrap: "nowrap",
// //     height: "100%",
// //     justifyContent: "center",
// //     width: "100%",
// //   },
// //   "& .contents": {
// //     flexGrow: 1,
// //     fontFamily: "'Roboto', arial, sans-serif",
// //     fontWeight: 500,
// //     overflow: "hidden",
// //     textOverflow: "ellipsis",
// //   },
// //   "& .state": {
// //     transition: "opacity .218s",
// //     position: "absolute",
// //     top: 0,
// //     right: 0,
// //     bottom: 0,
// //     left: 0,
// //     opacity: 0,
// //   },
// //   "&:disabled": {
// //     cursor: "default",
// //     backgroundColor: "#13131461",
// //     borderColor: "#8e918f1f",
// //   },
// //   "&:disabled .state": {
// //     backgroundColor: "#e3e3e31f",
// //   },
// //   "&:disabled .contents": {
// //     opacity: "38%",
// //   },
// //   "&:disabled .icon": {
// //     opacity: "38%",
// //   },
// //   "&:not(:disabled):active .state, &:not(:disabled):focus .state": {
// //     backgroundColor: "white",
// //     opacity: "12%",
// //   },
// //   "&:not(:disabled):hover": {
// //     boxShadow:
// //       "0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15)",
// //   },
// //   "&:not(:disabled):hover .state": {
// //     backgroundColor: "white",
// //     opacity: "8%",
// //   },
// // }));
// const CustomButton = styled(Box)(({ theme }) => ({
//   backgroundColor: "#131314",
//   backgroundImage: "none",
//   border: "1px solid #747775",
//   borderRadius: "4px",
//   boxSizing: "border-box",
//   color: "#e3e3e3",
//   cursor: "pointer",
//   fontFamily: "'Roboto', arial, sans-serif",
//   fontSize: "14px",
//   height: "37px",
//   letterSpacing: "0.25px",
//   outline: "none",
//   // overflow: "hidden",
//   padding: "0 2rem",
//   position: "relative",
//   textAlign: "center",
//   transition: "background-color .218s, border-color .218s, box-shadow .218s",
//   whiteSpace: "nowrap",
//   borderColor: "#8e918f",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-between",
//   "& .icon": {
//     // height: "20px",
//     // marginRight: "5px",
//     minWidth: "20px",
//     width: "27px",
//   },
//   "& .content-wrapper": {
//     display: "flex",
//     alignItems: "center",
//     flexDirection: "row",
//     flexWrap: "nowrap",
//     height: "100%",
//     justifyContent: "center",
//     width: "100%",
//   },
//   "& .contents": {
//     flexGrow: 1,
//     fontFamily: "'Roboto', arial, sans-serif",
//     fontWeight: 500,
//     overflow: "hidden",
//     textOverflow: "ellipsis",
//   },
//   "& .state": {
//     transition: "opacity .218s",
//     position: "absolute",
//     top: 0,
//     right: 0,
//     bottom: 0,
//     left: 0,
//     opacity: 0,
//   },
//   "&:disabled": {
//     cursor: "default",
//     backgroundColor: "#13131461",
//     borderColor: "#8e918f1f",
//   },
//   "&:disabled .state": {
//     backgroundColor: "#e3e3e31f",
//   },
//   "&:disabled .contents": {
//     opacity: "38%",
//   },
//   "&:disabled .icon": {
//     opacity: "38%",
//   },
//   "&:not(:disabled):active .state, &:not(:disabled):focus .state": {
//     backgroundColor: "white",
//     opacity: "12%",
//   },
//   "&:not(:disabled):hover": {
//     boxShadow:
//       "0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15)",
//   },
//   "&:not(:disabled):hover .state": {
//     backgroundColor: "white",
//     opacity: "8%",
//   },
// }));

// export function GoogleSignUpButton({
//   provider,
//   callbackUrl,
//   children,
//   ...rest
// }: IButtonProps) {
//   const theme = useTheme();

//   const isBetweenWidth = useMediaQuery(
//     "(min-width:600px) and (max-width:850px)"
//   );

//   return (
//     <div key={provider.name}>
//       <LoadingButton
//         onClick={() => signIn(provider.id, { callbackUrl: callbackUrl })}
//         sx={{
//           // backgroundColor: "#131314",
//           // color: "white",
//           backgroundColor: "black",
//           backgroundImage: "none",
//           transition: "background-color .218s, border-color .218s, box-shadow .218s",
//           border:"2px solid black",
//           textAlign: "center",
//           display: "flex",
//           alignItems: "centre",
//           justifyContent: "space-between",
//           padding: "0 2rem",
//           fontFamily: "'Roboto', arial, sans-serif",
//           fontSize: "14px",
//           height: "37px",

//           "& .icon": {
//             // height: "20px",
//             // marginRight: "5px",
//             minWidth: "20px",
//             width: "27px",
//           },
//         }}
//       >
//         {/* <CustomButton
//         onClick={() => signIn(provider.id, { callbackUrl: callbackUrl })}
//         > */}
//         <div className="state"></div>
//         <div className="content-wrapper">
//           {isBetweenWidth ? (
//             <div className="icon">
// <svg
//   version="1.1"
//   xmlns="http://www.w3.org/2000/svg"
//   viewBox="0 0 48 48"
//   xmlnsXlink="http://www.w3.org/1999/xlink"
//   style={{ display: "block", margin: "auto" }}
// >
//   <path
//     fill="#EA4335"
//     d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
//   ></path>
//   <path
//     fill="#4285F4"
//     d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
//   ></path>
//   <path
//     fill="#FBBC05"
//     d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
//   ></path>
//   <path
//     fill="#34A853"
//     d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
//   ></path>
//   <path fill="none" d="M0 0h48v48H0z"></path>
// </svg>
//             </div>
//           ) : (
//             <div className="content-wrapper">
//               <div className="icon">
//                 <svg
//                   version="1.1"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 48 48"
//                   xmlnsXlink="http://www.w3.org/1999/xlink"
//                   style={{ display: "block", marginRight: "8px" }}
//                 >
//                   <path
//                     fill="#EA4335"
//                     d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
//                   ></path>
//                   <path
//                     fill="#4285F4"
//                     d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
//                   ></path>
//                   <path
//                     fill="#FBBC05"
//                     d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
//                   ></path>
//                   <path
//                     fill="#34A853"
//                     d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
//                   ></path>
//                   <path fill="none" d="M0 0h48v48H0z"></path>
//                 </svg>
//               </div>
//               <span className="contents">
//                 {children} {provider.name}
//               </span>
//             </div>
//           )}
//         </div>
//       </LoadingButton>
//       {/* </CustomButton> */}
//     </div>
//   );
// }

// export default GoogleSignUpButton;
