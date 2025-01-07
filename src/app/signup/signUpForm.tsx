"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { userSchemaT } from "../models/models";
import { logger } from "../utils/logger.utils";
import { AddDialog } from "../Widgets/masters/addDialog";
import GoogleSignUpButton from "./customGoogleButton";
import {
  registerUser,
  checkInActiveUser,
  makeUserActive,
} from "@/app/controllers/user.controller";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import { styles } from "../utils/styles/sign.styles";

export default function SignupForm(props: any) {
  const router = useRouter();
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [inActiveUserId, setInActiveUserId] = useState<number | undefined>();
  const [signUpData, setSignUpData] = useState<userSchemaT>();
  const [contact, setContact] = useState("phone");
  const [emailElement, setEmailElement] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const contactHandler = () => {
    if (contact === "phone") {
      setEmailElement(false);
      setContact("email");
      setFormError({});
    } else {
      setEmailElement(true);
      setContact("phone");
      setFormError({});
    }
  };

  const handleDefault = (event: any) => {
    event.preventDefault();
  };

  async function makeUserActiveAgain(userId: number | undefined) {
    try {
      await makeUserActive(userId);
      router.push("/signin");
    } catch (error) {
      logger.info(error);
    } finally {
      setDialogOpen(false);
    }
  }

  async function handleRegister(data: userSchemaT) {
    const result = await registerUser(data as userSchemaT);
    if (result.status) {
      router.push("/signin");
    } else {
      const issues = result.data;
      const errorState: Record<string, { msg: string; error: boolean }> = {};
      for (const issue of issues) {
        if (issue.path[0] === "contact") {
          emailElement ? (issue.path[0] = "email") : (issue.path[0] = "phone");
          issue.message = emailElement
            ? issue.message.replace("Contact", "Email")
            : issue.message.replace("Contact", "Phone No.");
        }
        errorState[issue.path[0]] = { msg: issue.message, error: true };
      }
      setFormError(errorState);
    }
  }

  const formSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    const inActiveUser = await checkInActiveUser(
      data.email || (data.phone?.replace(/ +/g, "") as string)
    );
    if (inActiveUser) {
      setSignUpData(data as userSchemaT);
      setInActiveUserId(inActiveUser.id);
      setDialogOpen(true);
    } else {
      await handleRegister(data as userSchemaT);
    }
  };

  return (
    <Grid sx={styles.container} container spacing={0}>
      {dialogOpen && (
        <AddDialog title={""} open={dialogOpen} setDialogOpen={setDialogOpen}>
          <Box sx={styles.confirmationDialogBox}>
            <h2>
              User Already Exists! <br></br>Please login with previous
              credentials
            </h2>
            <Button
              variant="contained"
              onClick={() => makeUserActiveAgain(inActiveUserId)}
              sx={styles.dialogOkButton}
            >
              Ok
            </Button>
          </Box>
        </AddDialog>
      )}

      <Grid item sx={styles.leftImageContainer} rowGap={2}>
        <Image
          src="/Illustration.png"
          alt="Log In Page Image"
          width={500}
          height={550}
          style={styles.leftImage}
        />
        <Typography
          variant="h3"
          sx={{ fontWeight: "600" }}
          color="primary.contrastText"
        >
          Welcome!
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: "400" }}
          color="primary.contrastText"
        >
          Your business operations, streamlined at your fingertips!
        </Typography>
      </Grid>

      <Grid item sx={styles.rightFormContainerSignUp}>
        <Box sx={styles.rightFormTopSectionSignUp} rowGap={2}>
          <Typography
            variant="h3"
            sx={{ fontWeight: "700" }}
            color="primary.main"
          >
            Sign Up
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: "400" }}
            color="primary.light"
          >
            Already have an account?{" "}
            <Link href={"/signin"} style={styles.toggleLink} tabIndex={-1}>
              Log In
            </Link>
          </Typography>
        </Box>

        <form
          noValidate
          action={formSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          {formError?.form?.error && (
            <p style={{ color: "error.main" }}>{formError?.form.msg}</p>
          )}

          <InputControl
            inputType={InputType.TEXT}
            id="name"
            label="Name"
            name="name"
            autoComplete="off"
            fullWidth
            required
            autoFocus
            titleCase={true}
            error={formError?.name?.error}
            helperText={formError?.name?.msg}
            setFormError={setFormError}
            sx={styles.nameInputField}
          />

          {emailElement && (
            <InputControl
              inputType={InputType.EMAIL}
              id="email"
              label="Email Id"
              name="email"
              autoComplete="off"
              fullWidth
              required
              error={formError?.email?.error}
              helperText={formError?.email?.msg}
              setFormError={setFormError}
              sx={styles.emailPhoneInputFieldSignUp}
            />
          )}

          {!emailElement && (
            <InputControl
              inputType={InputType.PHONE}
              id="phone"
              label="Mobile No."
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
              sx={styles.emailPhoneInputFieldSignUp}
            />
          )}

          <Grid
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row", md: "row" },
              justifyContent: "space-between",
            }}
          >
            <Grid item xs={12} sm={5.5} md={5.8}>
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
                      sx={{ marginRight: -1, marginTop: 0, color: "primary.main" }}
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
            </Grid>
            <Grid item xs={12} sm={5.5} md={5.8}>
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
                onCopy={(event: any) => handleDefault(event)}
                onPaste={(event: any) => handleDefault(event)}
                sx={styles.passwordInputField}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      type="button"
                      onClick={() => setShowRePassword(!showRePassword)}
                      tabIndex={-1}
                      sx={{ marginRight: -1, marginTop: 0, color: "primary.main" }}
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
            </Grid>
          </Grid>

          <Box
            sx={{
              ...styles.signUpSubmitButtonContainer,
              marginTop: `${formError?.password?.error ? "0%" : "7%"}`,
            }}
            rowGap={2}
          >
            <LoadingButton
              type="submit"
              sx={styles.pillStyledButton}
              loadingIndicator={
                <CircularProgress
                  size={24}
                  sx={{ color: "primary.contrastText" }}
                />
              }
            >
              Sign Up
            </LoadingButton>

            {props.provider.map((provider: any) => (
              <GoogleSignUpButton
                key={provider.id}
                provider={provider}
                callbackUrl="/company"
                tabIndex={-1}
                sx={styles.googleSignInButton}
              >
                Sign In With
              </GoogleSignUpButton>
            ))}
            <Link
              href={""}
              style={styles.toggleLink}
              onClick={contactHandler}
              tabIndex={-1}
            >
              Sign Up with {emailElement ? "Mobile No" : "Email Id"}.
            </Link>
          </Box>
        </form>

        <Typography sx={styles.copyrightText} variant="caption">
          © 2024 Algofast India Pvt. Ltd. ALL RIGHTS RESERVED
        </Typography>
      </Grid>
    </Grid>
  );
}
