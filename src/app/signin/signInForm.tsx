"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import { ClientSafeProvider, getCsrfToken } from "next-auth/react";
import Grid from "@mui/material/Grid";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { InputControl, InputType } from "../Widgets/input/InputControl";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import GoogleSignUpButton from "../signup/customGoogleButton";
import * as zs from "../zodschema/zodschema";
import { LoadingButton } from "@mui/lab";
import Image from "next/image";
import { styles } from "../utils/styles/sign.styles";

interface authPagePropsType {
  providers: ClientSafeProvider[];
}

export default function AuthPage(props: authPagePropsType) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});

  const [isPending, startTransition] = React.useTransition();

  const [email, setEmail] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  // const [loading, setLoading] = useState(false);

  const router = useRouter();
  let csrfToken;
  const successCallBackUrl = "/company";

  const contactHandler = () => {
    setEmail(!email);
    setFormError({});
  };

  function actValidate(formData: FormData) {
    // document.body.classList.add("cursor-wait");
    let data: { [key: string]: any } = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    console.log(data);
    const parsed = zs.signInSchema.safeParse(data);
    console.log(parsed);
    if (parsed.success) {
      let contact;
      if (data.email) {
        contact = data.email;
        delete data.email;
      } else {
        contact = data.phone;
        contact = contact?.replace(/ +/g, "");
        delete data.phone;
      }
      data.contact = contact;
      signIn("credentials", {
        redirect: false,
        userContact: data.contact,
        password: data.password,
      }).then(async (status) => {
        if (status?.ok) {
          startTransition(() => {
            router.push(successCallBackUrl);
          });
        } else {
          const errorState: Record<string, { msg: string; error: boolean }> =
            {};
          errorState["form"] = { msg: "Invalid Credentials", error: true };
          setFormError(errorState);
          if (status?.error === "CredentialsSignin") {
            console.log(status);
          }
        }
      });
    } else {
      const errorState: Record<string, { msg: string; error: boolean }> = {};
      for (const issue of parsed.error.issues) {
        console.log(issue);
        errorState[issue.path[0]] = { msg: issue.message, error: true };
      }
      setFormError(errorState);
    }
  }

  // useEffect(() => {
  //   return () => {
  //     document.body.classList.remove("cursor-wait");
  //   };
  // }, []);

  getCsrfToken()
    .then((token) => {
      csrfToken = token;
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <Grid sx={styles.container} container spacing={0}>
      <Grid item sx={styles.leftImageContainer} rowGap={2}>
        <Image
          src="/Illustration.png"
          alt="Log In Page Image"
          width={500}
          height={550}
          priority
          style={styles.leftImage}
        />
        <Typography variant="h3" sx={{ fontWeight: "600" }}>
          Welcome!
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "400" }}>
          Your business operations, streamlined at your fingertips!
        </Typography>
      </Grid>

      <Grid item sx={styles.rightFormContainerLogIn}>
        <Box sx={styles.rightFormTopSectionLogIn} rowGap={2}>
          <Typography variant="h3" sx={{ fontWeight: "700" }} color="primary.main">
            Log In
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: "400"}} color="primary.light" 
          >
            Don’t have an account?{" "}
            <Link
              // href={loading ? "#" : "/signup"}
              href={"/signup"}
              // style={{
              //   ...styles.links,
              //   ...(loading ? styles.linksLoading : {}),
              // }}
              style={styles.toggleLink}
              tabIndex={-1}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>

        <form
          action={actValidate}
          noValidate
          style={{ display: "flex", flexDirection: "column" }}
        >
          {formError?.form?.error && (
            <p style={{ color: "error.main" }}>{formError?.form.msg}</p>
          )}

          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

          {email && (
            <InputControl
              inputType={InputType.EMAIL}
              autoFocus={email ? true : false}
              error={formError?.email?.error}
              helperText={formError?.email?.msg}
              setFormError={setFormError}
              fullWidth
              id="usercontact"
              label="Email Address"
              name="email"
              autoComplete="off"
              // disabled={loading}
              sx={styles.emailPhoneInputFieldLogIn}
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
              // disabled={loading}
              fullWidth
              error={formError?.phone?.error}
              helperText={formError?.phone?.msg}
              setFormError={setFormError}
              country={"in"}
              preferredCountries={["in", "gb"]}
              dropdownClass={["in", "gb"]}
              disableDropdown={false}
              sx={styles.emailPhoneInputFieldLogIn}
            />
          )}

          <InputControl
            inputType={InputType.TEXT}
            fullWidth
            name="password"
            label="Password"
            type={!showPassword ? "password" : "text"}
            id="password"
            autoComplete="off"
            // disabled={isPending}
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
                  // disabled={loading}
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

          <Link
            // href={loading ? "#" : ""}
            href={"/forgotpassword"}
            // style={{
            //   ...styles.links,
            //   ...(loading ? styles.linksLoading : {}),
            //   alignSelf: "flex-end",
            // }}
            style={{ ...styles.toggleLink, alignSelf: "flex-end" }}
            tabIndex={-1}
          >
            Forgot Password?
          </Link>

          <Box sx={styles.loginSubmitButtonContainer} rowGap={2}>
            <LoadingButton
              type="submit"
              loading={isPending}
              sx={styles.pillStyledButton}
              // loading={loading}
              loadingIndicator={
                <CircularProgress
                  size={24}
                  sx={{
                    color: "primary.contrastText",
                  }}
                />
              }
            >
              Log In
            </LoadingButton>

            {props.providers.map((provider: any) => (
              <GoogleSignUpButton
                key={provider.id}
                provider={provider}
                callbackUrl="/company"
                tabIndex={-1}
                // disabled={loading}
                sx={styles.googleSignInButton}
              >
                Sign In With
              </GoogleSignUpButton>
            ))}
            <Link
              href={""}
              // style={{
              //   ...styles.links,
              //   ...(loading ? styles.linksLoading : {}),
              // }}
              style={styles.toggleLink}
              // onClick={loading ? () => {} : contactHandler}
              onClick={contactHandler}
              tabIndex={-1}
            >
              Log In with {email ? "Mobile No" : "Email"}.
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
