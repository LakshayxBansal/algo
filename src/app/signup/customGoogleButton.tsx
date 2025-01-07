import React from "react";
import { LoadingButton } from "@mui/lab";
import { signIn } from "next-auth/react";
import { ClientSafeProvider } from "next-auth/react";
import { ButtonProps, styled, useMediaQuery, useTheme } from "@mui/material";
import { StyledLoadingButton } from "../utils/styles/styledComponents";

interface IButtonProps extends ButtonProps {
  provider: ClientSafeProvider;
  callbackUrl: string;
}

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
