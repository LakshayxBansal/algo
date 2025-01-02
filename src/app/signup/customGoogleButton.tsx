import React from "react";
import { LoadingButton } from "@mui/lab";
import { signIn } from "next-auth/react";
import { ClientSafeProvider } from "next-auth/react";
import { ButtonProps, styled, useMediaQuery, useTheme } from "@mui/material";

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
