"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Box, TextField, Divider, Paper, Typography, styled } from "@mui/material";
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
import styles from "../signup/SignUpForm.module.css";
import * as zs from "../zodschema/zodschema";

interface authPagePropsType {
  providers: ClientSafeProvider[];
}

const OrCircle = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  border:"1px solid #e0e0e0",
  borderRadius: '50%',
  fontWeight: 'bold',
  // color: '#e0e0e0',
});

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
  const [loading, setLoading] = React.useState(false);

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
    setLoading(true);
    document.body.classList.add("cursor-wait");
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
              router.push(successCallBackUrl);
            }
          // }, 1000);
        } else {
          const errorState: Record<string, { msg: string; error: boolean }> =
            {};
          errorState["form"] = { msg: "Invalid Credentials", error: true };
          setFormError(errorState);
          if (status?.error === "CredentialsSignin") {
            console.log(status);
          }
          //loader cursor set
          if(errorState.form.error == true){
            setLoading(false)
            document.body.classList.remove("cursor-wait");
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
    <Box
      sx={{
        backgroundColor: "#AEC4F1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        style={{
          backgroundColor: "#ffff",
          borderRadius: "3rem",
          width: "78%",
          // height: "60%",
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
            sx={
              {
                // margin: "5%",
                // display: { xs: "none", sm: "flex" },
                // justifyContent: "center",
                // alignItems: "center",
              }
            }
          >
            <Box
              className={styles.image1}
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
            <form action={actValidate} noValidate>
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
                    setFormError={setFormError}
                    fullWidth
                    id="usercontact"
                    label="Email Address"
                    name="email"
                    autoComplete="off"
                    disabled={loading}
                    onKeyDown={() => {
                      setFormError((curr) => {
                        const { email, form, ...rest } = curr;
                        return rest;
                      });
                    }}
                    sx={{
                      "& .MuiInputBase-input": {
                        height: "45px",
                        padding: "0 14px",
                        backgroundColor: "#E8F0FE",
                        cursor: loading ? 'wait' : 'pointer',
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
                    name="phone"
                    autoComplete="off"
                    disabled={loading}
                    fullWidth
                    error={formError?.phone?.error}
                    helperText={formError?.phone?.msg}
                    setFormError={setFormError}
                    country={"in"}
                    preferredCountries={["in", "gb"]}
                    dropdownClass={["in", "gb"]}
                    disableDropdown={false}
                    onKeyDown={() => {
                      setFormError((curr) => {
                        const { phone, form, ...rest } = curr;
                        return rest;
                      });
                    }}
                    // onkeydown={onPhoneChange}
                    sx={{
                      "& .MuiInputBase-input": {
                        height: "45px",
                        padding: "0 14px",
                        backgroundColor: "#E8F0FE",
                        cursor: loading ? 'wait' : 'pointer',

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
                    cursor: loading ? 'wait' : 'pointer',
                    pointerEvents: loading ? 'none' : 'auto',
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
                    fullWidth
                    name="password"
                    label="Password"
                    type={!showPassword ? "password" : "text"}
                    id="password"
                    autoComplete="off"
                    disabled={loading}
 
                    error={formError?.password?.error}
                    helperText={formError?.password?.msg}
                    setFormError={setFormError}
                    onKeyDown={() => {
                      setFormError((curr) => {
                        const { password, form, ...rest } = curr;
                        return rest;
                      });
                    }}
                    sx={{
                      "& .MuiInputBase-input": {
                        height: "45px",
                        padding: "0 14px",
                        backgroundColor: "#E8F0FE",
                        cursor: loading ? 'wait' : 'pointer',
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
                    sx={{
                      marginLeft: "-65px",
                      marginTop: "0.8rem",
                      // mb: "0.5rem",
                      // border: "2px solid black",
                      maxHeight: "fit-content",
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
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
                    cursor: loading ? 'wait' : 'pointer',
                    pointerEvents: loading ? 'none' : 'auto',

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
                  tabIndex={-1}
                >
                  Forgot Password?
                </Link>
              </Grid>

              <Grid item xs={12} sm={12} md={12} sx={{ mt: 3 }}>
                <Grid container>
                  <Grid item xs={12} sm={5.5} md={5.5}>
                    <LoadingButton
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="medium"
                      loading={loading}
                    >
                      Sign In
                    </LoadingButton>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={1}
                    md={1}
                    sx={{ display:"flex", justifyContent:"center"}}
                    // style={{
                    //   fontSize: "smaller",
                    //   fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                    // }}
                    
                  >
                    {/* <Divider orientation="horizontal" flexItem> */}
                    <OrCircle>
                      OR
                    </OrCircle>
                    {/* </Divider> */}
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
                        tabIndex={-1}
                        disabled={loading}
                        style={{cursor: loading ? 'wait' : 'pointer'}} // not working
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
                sx={{ display: "flex", justifyContent: "center", mt: "5%" }}
              >
                <Link href="/signup" variant="body2" tabIndex={-1} style={{cursor: loading ? 'wait' : 'pointer', pointerEvents: loading ? 'none' : 'auto',}}>
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
