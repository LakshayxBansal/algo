"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Box, TextField, Divider, Paper, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import ProviderButton from "../Widgets/providerButton";
import { ClientSafeProvider, getCsrfToken } from "next-auth/react";
import Grid from "@mui/material/Grid";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { InputControl, InputType } from "../Widgets/input/InputControl";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Google from "next-auth/providers/google";
import GoogleSignUpButton from "../signup/customButton";
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

  const [email, setEmail] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  let csrfToken;
  const providerArr = props.providers;
  const successCallBackUrl = "/company";

  const contactHandler = () => {
    setEmail(!email);
  };
  function actValidate(formData: FormData) {
    console.log(formData);
    signIn("credentials", {
      redirect: false,
      userContact: formData.get("usercontact"),
      password: formData.get("password"),
    }).then((status) => {
      if (status?.ok) {
        router.push(successCallBackUrl);
      } else {
        const errorState: Record<string, { msg: string; error: boolean }> = {};
        errorState["form"] = { msg: "Invalid Credentials", error: true };
        setFormError(errorState);
        if (status?.error === "CredentialsSignin") {
          console.log(status);
        }
      }
    });
  }

  getCsrfToken()
    .then((token) => {
      csrfToken = token;
    })
    .catch((error) => {
      console.log(error);
    });
    
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#8FA8D7",
        padding: "5% 5%",
        height: "100%",
      }}
    >
      <Box
        style={{
          backgroundColor: "#ffff",
          borderRadius: "3rem",
          width: "78%",
          height: "60%",
        }}
      >
        <Grid
          container
          style={{
            borderRadius: "13%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid
            item
            xs={0}
            sm={4.75}
            md={4.75}
            sx={{
              // margin: "5%",
              display: { xs: "none", sm: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              sx={{
                height: "100%",
                width: "100%",
                borderRadius: "3rem",
              }}
              alt="Sign In Image"
              src="/signup.png"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} style={{ margin: "5%" }}>
            <Box style={{ display: "flex", flexDirection: "row" }}>
              <Image
                src={"/logo.png"}
                width={50}
                height={50}
                alt="Company Logo"
              />

              <Typography
                component="h1"
                variant="h4"
                style={{ paddingTop: "1%" }}
              >
                Algofast
              </Typography>
            </Box>
            <Typography
              component="h1"
              variant="h6"
              style={{ paddingTop: "7%" }}
            >
              Sign In
            </Typography>
            <form action={actValidate}>
              {formError?.form?.error && (
                <p style={{ color: "red" }}>{formError?.form.msg}</p>
              )}
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

              <Grid item xs={12} sm={12} md={12}>
                {email && (
                  <InputControl
                    inputType={InputType.EMAIL}
                    autoFocus
                    error={formError?.email?.error}
                    helperText={formError?.email?.msg}
                    required
                    fullWidth
                    id="usercontact"
                    label="Email Address"
                    name="usercontact"
                    sx={{
                      "& .MuiInputBase-input": {
                        height: "45px",
                        padding: "0 14px",
                        backgroundColor: "#E8F0FE",
                      },
                      "& .MuiOutlinedInput-root": {
                        height: "45px",
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: "1rem",
                        textAlign: "center",
                      },
                      mt: 1,
                    }}
                  />
                )}
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                {!email && (
                  <InputControl
                    inputType={InputType.PHONE}
                    id="usercontact"
                    label="Phone No"
                    name="usercontact"
                    fullWidth
                    required
                    error={formError?.phone?.error}
                    helperText={formError?.phone?.msg}
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
                      },
                      "& .MuiOutlinedInput-root": {
                        height: "45px",
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: "1rem",
                        textAlign: "center",
                      },
                      mt: 1,
                    }}
                  />
                )}
              </Grid>

              <Grid item xs={12} sm={12} md={12} sx={{ textAlign: "right" }}>
                <Link
                  onClick={contactHandler}
                  style={{
                    fontSize: "small",
                    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                  }}
                  sx={{
                    display: "inline-block",
                    textAlign: "right",
                    cursor: "pointer",
                    textDecoration: "none",
                    marginBottom: "1px",
                    ":hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Use {email ? "phone" : "email"} instead
                </Link>
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <InputControl
                    inputType={InputType.TEXT}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={!showPassword ? "password" : "text"}
                    id="password"
                    error={formError?.password?.error}
                    helperText={formError?.password?.msg}
                    sx={{
                      "& .MuiInputBase-input": {
                        height: "45px",
                        padding: "0 14px",
                        backgroundColor: "#E8F0FE",
                      },
                      "& .MuiOutlinedInput-root": {
                        height: "45px",
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: "1rem",
                        textAlign: "center",
                      },
                      mt: 1,
                    }}
                  />
                  <Button
                    type="button"
                    sx={{ marginLeft: "-65px", marginTop: "12px" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </Button>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12} md={12} sx={{ textAlign: "right" }}>
                <Link
                  href="#"
                  style={{
                    fontSize: "small",
                    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                  }}
                  sx={{
                    display: "inline-block",
                    textAlign: "right",
                    cursor: "pointer",
                    textDecoration: "none",
                    marginBottom: "1px",
                    ":hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Forgot Password?
                </Link>
              </Grid>

              <Grid item xs={12} sm={12} md={12} sx={{ mt: 3 }}>
                <Grid container>
                  <Grid item xs={12} sm={5.5} md={5.5}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="medium"
                    >
                      Sign In
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={1}
                    md={1}
                    sx={{ paddingTop: "10px" }}
                    style={{
                      fontSize: "smaller",
                      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                    }}
                  >
                    <Divider orientation="horizontal" flexItem>
                      Or
                    </Divider>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={5.5}
                    md={5.5}
                    sx={{ textAlign: "center" }}
                  >
                    {props.providers.map((provider: any) => (
                      <GoogleSignUpButton
                        key={provider.id}
                        provider={provider}
                        callbackUrl="/company"
                      >
                        Sign In With
                      </GoogleSignUpButton>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                sx={{ display: "flex", justifyContent: "center", mt: 2 }}
              >
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </form>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                color: "text.secondary",
                fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                mt: 1,
              }}
            >
              <h6>© 2024 Algofast India Pvt. Ltd. ALL RIGHTS RESERVED</h6>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
