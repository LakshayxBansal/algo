"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import { InputControl, InputType } from "../Widgets/input/InputControl";
import { LoadingButton } from "@mui/lab";
import Image from "next/image";
import { styles } from "../utils/styles/forgotPasswordFormStyles";
import { changePassword } from "../controllers/forgotPassword.controller";
import Slide, { SlideProps } from "@mui/material/Slide";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

export default function ResetPasswordForm({ contact }: { contact: string }) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRePassword, setShowRePassword] = useState<boolean>(false);
  const [changed, setChanged] = useState<boolean>(false);
  const router = useRouter();

  const formSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    const passwordChanged = await changePassword(
      contact,
      data.password,
      data.repassword
    );

    if (passwordChanged.status) {
      setChanged(true);
      setTimeout(() => {
        router.push("/signin");
      }, 3000);
    } else {
      setFormError({
        [passwordChanged.path]: { msg: passwordChanged.msg, error: true },
      });
    }
  };

  const clearFormError = () => {
    setFormError((curr) => {
      const { form, ...rest } = curr;
      return rest;
    });
  };

  function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
  }

  return (
    <Grid container sx={styles.mainContainer}>
      <Box sx={styles.centerContainer}>
        <Image
          src="/forgotPassword.png"
          alt="Forgot Password Page Image"
          width={250}
          height={250}
        />
        <Typography variant="h3" sx={styles.mainHeading}>
          Reset Password
        </Typography>
        <Typography variant="body2" sx={{ ...styles.subHeading, mb: 2 }}>
          Reset password for your account : {contact}
        </Typography>

        <form
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
          noValidate
          action={formSubmit}
        >
          <InputControl
            inputType={InputType.TEXT}
            id="password"
            label="Password"
            name="password"
            autoComplete="off"
            fullWidth
            required
            type={!showPassword ? "password" : "text"}
            error={formError?.password?.error}
            helperText={formError?.password?.msg}
            setFormError={setFormError}
            sx={styles.passwordInputField}
            InputProps={{
              endAdornment: (
                <IconButton
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  sx={{
                    marginRight: -1,
                    marginTop: 0,
                    color: "primary.main",
                  }}
                >
                  {showPassword ? (
                    <RemoveRedEyeOutlinedIcon />
                  ) : (
                    <VisibilityOffOutlinedIcon />
                  )}
                </IconButton>
              ),
            }}
          />

          <InputControl
            inputType={InputType.TEXT}
            id="repassword"
            label="Re-enter Password"
            name="repassword"
            autoComplete="off"
            fullWidth
            required
            type={!showRePassword ? "password" : "text"}
            error={formError?.repassword?.error}
            helperText={formError?.repassword?.msg}
            setFormError={setFormError}
            onCopy={(event: any) => event.preventDefault()}
            onPaste={(event: any) => event.preventDefault()}
            sx={styles.passwordInputField}
            InputProps={{
              endAdornment: (
                <IconButton
                  type="button"
                  onClick={() => setShowRePassword(!showRePassword)}
                  tabIndex={-1}
                  sx={{
                    marginRight: -1,
                    marginTop: 0,
                    color: "primary.main",
                  }}
                >
                  {showRePassword ? (
                    <RemoveRedEyeOutlinedIcon />
                  ) : (
                    <VisibilityOffOutlinedIcon />
                  )}
                </IconButton>
              ),
            }}
          />

          <LoadingButton
            type="submit"
            // loading={isPending}
            sx={styles.pillButton}
            loadingIndicator={
              <CircularProgress
                size={24}
                sx={{
                  color: "white",
                }}
              />
            }
          >
            Reset Password
          </LoadingButton>
        </form>

        <Snackbar
          open={formError?.form?.error || changed}
          autoHideDuration={3000}
          onClose={
            changed
              ? () => {
                  setChanged(false);
                }
              : clearFormError
          }
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          TransitionComponent={SlideTransition}
        >
          <Alert
            onClose={
              changed
                ? () => {
                    setChanged(false);
                  }
                : clearFormError
            }
            severity={changed ? "success" : "error"}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {changed ? "Password Changed Successfully!" : formError?.form?.msg}
          </Alert>
        </Snackbar>
      </Box>
    </Grid>
  );
}
