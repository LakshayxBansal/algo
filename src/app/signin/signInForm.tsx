"use client";
import React, { startTransition, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {
  Box,
  CircularProgress,
  InputAdornment,
  Typography,
} from "@mui/material";
import Link from "next/link";
import ProviderButton from "../Widgets/providerButton";
import { ClientSafeProvider, getCsrfToken } from "next-auth/react";
import Grid from "@mui/material/Grid";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { InputControl, InputType } from "../Widgets/input/InputControl";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import Google from "next-auth/providers/google";
import GoogleSignUpButton from "../signup/customGoogleButton";
import * as zs from "../zodschema/zodschema";
import { LoadingButton } from "@mui/lab";
import { styles } from "./signInFormStyles";
import Image from "next/image";

interface authPagePropsType {
  providers: ClientSafeProvider[];
}

/**
 *
 * @param formData to be used with form action
 */

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
  const providerArr = props.providers;
  const successCallBackUrl = "/company";

  

  const contactHandler = () => {
    setEmail(!email);
    setFormError({});
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
          })
          
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


  getCsrfToken()
    .then((token) => {
      csrfToken = token;
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <Grid sx={styles.container} container spacing={0}>
      <Grid item sx={styles.left} rowGap={2}>
        <Image
          src="/Illustration.png"
          alt="Log In Page Image"
          width={500}
          height={550}
          style={styles.mainImg}
          priority
        />
        <Typography variant="h3" sx={{ fontWeight: "600" }}>
          Welcome!
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "400" }}>
          Your business operations, streamlined at your fingertips!
        </Typography>
      </Grid>

      <Grid item sx={styles.right}>
        <Box sx={styles.rightTop} rowGap={2}>
          <Typography variant="h3" sx={{ color: "#4870ac", fontWeight: "700" }}>
            Log In
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: "400", color: "#777F8C" }}
          >
            Don’t have an account?{" "}
            <Link
              // href={loading ? "#" : "/signup"}
              href={"/signup"}
              // style={{
              //   ...styles.links,
              //   ...(loading ? styles.linksLoading : {}),
              // }}
              style={styles.links}
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
            <p style={{ color: "#FF4C4C" }}>{formError?.form.msg}</p>
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
              sx={{
                "& .MuiInputBase-input": {
                  height: "45px",
                  padding: "0 14px",
                  backgroundColor: "#E8F0FE",
                  // cursor: loading ? "wait" : "normal",
                },
                "& .MuiOutlinedInput-root": {
                  height: "45px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "1rem",
                  textAlign: "center",
                },
                my: 3,
              }}
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
              // onkeydown={onPhoneChange}
              sx={{
                "& .MuiInputBase-input": {
                  height: "45px",
                  padding: "0 14px",
                  backgroundColor: "#E8F0FE",
                  // cursor: loading ? "wait" : "normal",
                },
                "& .MuiOutlinedInput-root": {
                  height: "45px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "1rem",
                  textAlign: "center",
                },
                my: 3,
              }}
            />
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <InputControl
              inputType={InputType.TEXT}
              fullWidth
              name="password"
              label="Password"
              type={!showPassword ? "password" : "text"}
              id="password"
              autoComplete="off"
              disabled={isPending}
              error={formError?.password?.error}
              helperText={formError?.password?.msg}
              setFormError={setFormError}
              sx={{
                "& .MuiInputBase-input": {
                  height: "45px",
                  padding: "0 14px",
                  backgroundColor: "#E8F0FE",
                  // cursor: loading ? "wait" : "normal",
                },
                "& .MuiOutlinedInput-root": {
                  height: "45px",
                  backgroundColor: "#E8F0FE",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "1rem",
                  textAlign: "center",
                },
                mt: 3,
                mb: 1,
              }}
              InputProps={{
                endAdornment: (
                  <Button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    // disabled={loading}
                    sx={{ marginRight: -1, marginTop: 1 }}
                  >
                    {showPassword ? (
                      <RemoveRedEyeOutlinedIcon />
                    ) : (
                      <VisibilityOffOutlinedIcon />
                    )}
                  </Button>
                ),
              }}
            />
          </Box>

          <Link
            // href={loading ? "#" : ""}
            href={""}
            // style={{
            //   ...styles.links,
            //   ...(loading ? styles.linksLoading : {}),
            //   alignSelf: "flex-end",
            // }}
            style={{ ...styles.links, alignSelf: "flex-end" }}
            tabIndex={-1}
          >
            Forgot Password?
          </Link>

          <Box sx={styles.btnBox} rowGap={2}>
            <LoadingButton
              type="submit"
              loading={isPending}
              sx={styles.pillButton}
              // loading={loading}
              loadingIndicator={
                <CircularProgress
                  size={24}
                  sx={{
                    color: "white",
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
                sx={styles.googleBtn}
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
              style={styles.links}
              // onClick={loading ? () => {} : contactHandler}
              onClick={contactHandler}
              tabIndex={-1}
            >
              Log In with {email ? "Mobile No" : "Email"}.
            </Link>
          </Box>
        </form>

        <Typography sx={styles.cpyRight} variant="caption">
          © 2024 Algofast India Pvt. Ltd. ALL RIGHTS RESERVED
        </Typography>
      </Grid>
    </Grid>
  );
}
