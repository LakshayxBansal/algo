"use client";
import React, { useState, ChangeEvent } from "react";
import { Box, Divider, Paper, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { registerUser, checkInActiveUser, makeUserActive, deleteUser } from "@/app/controllers/user.controller";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import { useRouter } from "next/navigation";
import { CountryData } from "react-phone-input-material-ui";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { userSchemaT } from "../models/models";
import Image from "next/image";
import GoogleSignUpButton from "./customButton";
import { AddDialog } from "../Widgets/masters/addDialog";
import Confirmation from "./Confirmation";
import { logger } from "../utils/logger.utils";

export default function SignupForm1(props: any) {
  const router = useRouter();
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [inActiveUserId, setInActiveUserId] = useState<number | undefined>();
  const [signUpData,setSignUpData] = useState<userSchemaT>();
  const [emailElement, setEmailElement] = useState(true);
  const [contact, setContact] = useState("phone");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const contactHandler = () => {
    if (contact === "phone") {
      setEmailElement(false);
      setContact("email");
    } else {
      setEmailElement(true);
      setContact("phone");
    }
  };

  async function makeUserActiveAgain(userId: number | undefined) {
    try {
      await makeUserActive(userId);
      router.push("/congrats");
    } catch (error) {
      logger.info(error);
    } finally {
      setDialogOpen(false);
    }
  }
  async function deleteUserPrevDetail(userId: number | undefined) {
    try {
      await deleteUser(userId);
      await handleRegister(signUpData as userSchemaT);
    } catch (error) {
      logger.info(error);
    } finally {
      setDialogOpen(false);
    }
  }

  async function handleRegister(data : userSchemaT) {
    const result = await registerUser(data as userSchemaT);
    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name };
      setFormError({});
      router.push("/congrats");
    } else {
      // show error on screen
      const issues = result.data;
      const errorState: Record<string, { msg: string; error: boolean }> = {};
      for (const issue of issues) {
        if (issue.path[0] === "contact") {
          emailElement ? (issue.path[0] = "email") : (issue.path[0] = "phone");
          emailElement
            ? (issue.message = "Email already exist")
            : (issue.message = "Phone already exist");
        }
        errorState[issue.path[0]] = { msg: issue.message, error: true };
      }
      console.log(issues);
      errorState["form"] = { msg: "Error encountered", error: true };
      setFormError(errorState);
    }
  }

  const formSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    const inActiveUser = await checkInActiveUser(data.email || data.phone as string);
    if (inActiveUser) {
      setSignUpData(data as userSchemaT);
      setInActiveUserId(inActiveUser.id);
      setDialogOpen(true);
    } else {
      await handleRegister(data as userSchemaT);
    }
  };

  function onPhoneChange(
    value: string,
    data: {} | CountryData,
    event: ChangeEvent<HTMLInputElement>,
    formattedValue: string
  ) {
    setPhoneNumber(value);
  }

  return (
    // <Paper
    //   sx={{
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     alignContent: "center",
    //     borderRadius: "52px",
    //     overflow: "hidden",
    //     border: "1px solid black",
    //     elevation: 3,
    //     padding: 2,
    //   }}
    // >
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#AEC4F1",
        padding: "5% 5%",
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
            style={{
              // margin: "5%",
              display: "flex",
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
              alt="Sign Up Image"
              src="/signup.png"
            />
          </Grid>
          {dialogOpen && (
            <AddDialog title={""} open={dialogOpen} setDialogOpen={setDialogOpen}>
              {/* <Confirmation setDialogOpen={setDialogOpen} userId={inActiveUserId}/> */}
              <Box>
                <h2>Do you want continue with previous credentials ? </h2>
                <Button onClick={() => makeUserActiveAgain(inActiveUserId)}>Yes</Button>
                <Button onClick={() => deleteUserPrevDetail(inActiveUserId)}>No</Button>
              </Box>
            </AddDialog>
          )}
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
              Sign Up
            </Typography>
            <form noValidate action={formSubmit}>
              <Grid item xs={12} sm={12} md={12}>
                <InputControl
                  inputType={InputType.TEXT}
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  error={formError?.name?.error}
                  helperText={formError?.name?.msg}
                  sx={{
                    "& .MuiInputBase-input": {
                      height: "40px",
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
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                {emailElement && (
                  <InputControl
                    inputType={InputType.EMAIL}
                    error={formError?.email?.error}
                    helperText={formError?.email?.msg}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    sx={{
                      "& .MuiInputBase-input": {
                        height: "40px",
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
                      mt: 1.5,
                    }}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                {!emailElement && (
                  <InputControl
                    inputType={InputType.PHONE}
                    id="phone"
                    label="Phone No"
                    name="phone"
                    fullWidth
                    required
                    error={formError?.phone?.error}
                    helperText={formError?.phone?.msg}
                    country={"in"}
                    preferredCountries={["in", "gb"]}
                    dropdownClass={["in", "gb"]}
                    disableDropdown={false}
                    onkeydown={onPhoneChange}
                    sx={{
                      "& .MuiInputBase-input": {
                        height: "40px",
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
                    fontSize: "smaller",
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
                  Use {contact} instead
                </Link>
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row", md: "row" },
                    justifyContent: "space-between",
                  }}
                >
                  <Grid item xs={12} sm={5} md={5.5}>
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
                          height: "40px",
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
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={5} md={5.5}>
                    <InputControl
                      inputType={InputType.TEXT}
                      error={formError?.repassword?.error}
                      helperText={formError?.repassword?.msg}
                      required
                      fullWidth
                      name="repassword"
                      label="Re-enter Password"
                      type={!showRePassword ? "password" : "text"}
                      id="repassword"
                      sx={{
                        "& .MuiInputBase-input": {
                          height: "40px",
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
                      onClick={() => setShowRePassword(!showRePassword)}
                    >
                      {showRePassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </Button>
                  </Grid>
                </Grid>
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
                      Sign Up
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
                  <Grid item xs={12} sm={5.5} md={5.5}>
                    {props.provider.map((provider: any) => (
                      <GoogleSignUpButton
                        key={provider.id}
                        provider={provider}
                        callbackUrl="/company"
                      >
                        {" "}
                        Sign Up With
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
                <Link href="\signin" variant="body2">
                  Already have an account? Sign in
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

    //  </Paper>
  );
}
