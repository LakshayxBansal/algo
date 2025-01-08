"use client";

import React, { useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import { InputControl, InputType } from "../Widgets/input/InputControl";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { LoadingButton } from "@mui/lab";
import Image from "next/image";
import Link from "next/link";
import { styles } from "../utils/styles/forgotPasswordFormStyles";
import {
  checkIfActiveUser,
} from "../controllers/forgotPassword.controller";
import Slide, { SlideProps } from "@mui/material/Slide";
import { AddDialog } from "../Widgets/masters/addDialog";
import OtpForm from "./OtpForm";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState<boolean>(true);
  const [userVerified, setUserVerified] = useState<boolean>(false);
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [contactValue, setContactValue] = useState<string>("");

  const formSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    const isActiveUser = await checkIfActiveUser(
      data.email || (data.phone as string)
    );

    if (isActiveUser.status) {
      setUserVerified(true);
      // console.log("User Verified");
    } else {
      setUserVerified(false);
      // console.log("User NOT Verified");
      if (isActiveUser.path === "form") {
        setFormError({
          [isActiveUser.path]: { msg: isActiveUser.msg, error: true },
        });
      } else {
        setFormError({
          ...{
            [email ? "email" : "phone"]: {
              msg: isActiveUser.msg,
              error: true,
            },
          },
        });
      }
    }
  };

  const contactHandler = () => {
    setEmail(!email);
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
          Forgot Password?
        </Typography>
        <Typography variant="body2" sx={styles.subHeading}>
          "No worries, we’ll send you an OTP shortly to reset your password"
        </Typography>

        <form
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
          noValidate
          action={formSubmit}
        >
          {email && (
            <InputControl
              inputType={InputType.EMAIL}
              autoFocus={email ? true : false}
              error={formError?.email?.error}
              helperText={formError?.email?.msg}
              setFormError={setFormError}
              fullWidth
              required
              id="usercontact"
              label="Email Id"
              name="email"
              autoComplete="off"
              sx={styles.credentialsInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setContactValue(e.target.value)
              }
            />
          )}
          {!email && (
            <InputControl
              inputType={InputType.PHONE}
              autoFocus={!email ? true : false}
              id="usercontact"
              label="Phone No"
              name="phone"
              autoComplete="off"
              fullWidth
              required
              error={formError?.phone?.error}
              helperText={formError?.phone?.msg}
              setFormError={setFormError}
              country={"in"}
              preferredCountries={["in", "gb"]}
              dropdownClass={["in", "gb"]}
              disableDropdown={false}
              sx={styles.credentialsInput}
              onChange={(e: string) => setContactValue(e)}
            />
          )}

          <Link
            href={""}
            style={{
              ...styles.links,
              alignSelf: "flex-end",
              marginBottom: "10%",
            }}
            onClick={contactHandler}
            tabIndex={-1}
          >
            Use Mobile No.
          </Link>

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
            Send OTP
          </LoadingButton>
        </form>

        <Link
          href={"/signin"}
          style={{
            ...styles.links,
            marginTop: "5%",
            display: "flex",
            alignItems: "center",
          }}
          tabIndex={-1}
        >
          <ArrowBackRoundedIcon sx={{ marginRight: "5px" }} />
          Back to Log In
        </Link>

        <Snackbar
          open={formError?.form?.error}
          autoHideDuration={3000}
          onClose={clearFormError}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          TransitionComponent={SlideTransition}
        >
          <Alert
            onClose={clearFormError}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {formError?.form?.msg}
          </Alert>
        </Snackbar>

        {userVerified && (
          <AddDialog
            title="Enter OTP To Reset Your Password"
            open={userVerified}
            setDialogOpen={setUserVerified}
          >
            <OtpForm setOpen={setUserVerified} contact={contactValue} />
          </AddDialog>
        )}
      </Box>
    </Grid>
  );
}
