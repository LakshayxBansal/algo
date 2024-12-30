"use client";
import React, { useState, ChangeEvent } from "react";
import {
  Box,
  CircularProgress,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import {
  registerUser,
  checkInActiveUser,
  makeUserActive,
  deleteUser,
} from "@/app/controllers/user.controller";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import { useRouter } from "next/navigation";
import { CountryData } from "react-phone-input-material-ui";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { userSchemaT } from "../models/models";
import Image from "next/image";
import GoogleSignUpButton from "./customButton";
import { AddDialog } from "../Widgets/masters/addDialog";
import { logger } from "../utils/logger.utils";
// import styles from "./SignUpForm.module.css";
import { styles } from "./signUpFormStyles";
import * as zs from "../zodschema/zodschema";
import { LoadingButton } from "@mui/lab";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { signIn } from "next-auth/react";

export default function SignupForm(props: any) {
  const router = useRouter();
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [inActiveUserId, setInActiveUserId] = useState<number | undefined>();
  const [signUpData, setSignUpData] = useState<userSchemaT>();
  const [emailElement, setEmailElement] = useState(true);
  const [contact, setContact] = useState("phone");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [email, setEmail] = useState(true);
  const providerArr = props.providers;
  const successCallBackUrl = "/company";

  // const contactHandler = () => {
  //   // setEmail(!email);
  //   setEmailElement(!emailElement);
  //   setFormError({});
  //   setFormError({});
  // };
  const contactHandler = () => {
    if (contact === "phone") {
      setEmailElement(false);
      setContact("email");
      setFormError({});
      setFormError({});
    } else {
      setEmailElement(true);
      setContact("phone");
      setFormError({});
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

  async function handleRegister(data: userSchemaT) {
    const result = await registerUser(data as userSchemaT);
    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name };
      setFormError({});
      router.push("/signin");
    } else {
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
    let data: { [key: string]: any } = {}; 
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    const inActiveUser = await checkInActiveUser(
      data.email || (data.phone as string)
    );
    if (inActiveUser) {
      setSignUpData(data as userSchemaT);
      setInActiveUserId(inActiveUser.id);
      setDialogOpen(true);
    } else {
      await handleRegister(data as userSchemaT);
    }
  };

  // return (
  //   <Box
  //     sx={{
  //       backgroundColor: "#AEC4F1",
  //       display: "flex",
  //       justifyContent: "center",
  //       alignItems: "center",
  //       height: "100vh",
  //     }}
  //     // sx={{
  //     //   display: "flex",
  //     //   justifyContent: "center",
  //     //   // backgroundColor: "#AEC4F1",
  //     //   // padding: "5% 5%",
  //     // }}
  //   >
  //     <Box
  //       style={{
  //         backgroundColor: "#ffff",
  //         borderRadius: "3rem",
  //         width: "78%",
  //         // height: "60%",
  //       }}
  //     >
  //       <Grid
  //         container
  //         style={{
  //           borderRadius: "13%",
  //           display: "flex",
  //           justifyContent: "space-between",
  //         }}
  //       >
  //         <Grid
  //           item
  //           xs={0}
  //           sm={4.75}
  //           md={4.75}
  //           style={
  //             {
  //               // margin: "5%",
  //               // display: "flex",
  //               // justifyContent: "center",
  //               // alignItems: "center",
  //             }
  //           }
  //         >
  //           <Box
  //             className={styles.image1}
  //             component="img"
  //             sx={{
  //               height: "100%",
  //               width: "100%",
  //               borderRadius: "3rem",
  //             }}
  //             alt="Sign Up Image"
  //             src="/signup.png"
  //           />
  //         </Grid>
  //         {dialogOpen && (
  //           <AddDialog
  //             title={""}
  //             open={dialogOpen}
  //             setDialogOpen={setDialogOpen}
  //           >
  //             {/* <Confirmation setDialogOpen={setDialogOpen} userId={inActiveUserId}/> */}
  //             <Box>
  //               <h2>Do you want continue with previous credentials ? </h2>
  //               <Button onClick={() => makeUserActiveAgain(inActiveUserId)}>
  //                 Yes
  //               </Button>
  //               <Button onClick={() => deleteUserPrevDetail(inActiveUserId)}>
  //                 No
  //               </Button>
  //             </Box>
  //           </AddDialog>
  //         )}
  //         <Grid item xs={12} sm={6} md={6} style={{ margin: "5%" }}>
  //           <Box style={{ display: "flex", flexDirection: "row" }}>
  //             <Image
  //               src={"/logo.png"}
  //               width={50}
  //               height={50}
  //               alt="Company Logo"
  //             />

  //             <Typography
  //               component="h1"
  //               variant="h4"
  //               style={{ paddingTop: "1%" }}
  //             >
  //               Algofast
  //             </Typography>
  //           </Box>
  //           <Typography
  //             component="h1"
  //             variant="h6"
  //             style={{ paddingTop: "7%" }}
  //           >
  //             Sign Up
  //           </Typography>
  //           <form noValidate action={formSubmit}>
  //             <Grid item xs={12} sm={12} md={12}>
  //               <InputControl
  //                 inputType={InputType.TEXT}
  //                 name="name"
  //                 id="name"
  //                 label="Name"
  //                 autoFocus
  //                 fullWidth
  //                 required
  //                 titleCase={true}
  //                 autoComplete="off"
  //                 error={formError?.name?.error}
  //                 helperText={formError?.name?.msg}
  //                 setFormError={setFormError}
  //                 onKeyDown={() => {
  //                   setFormError((curr) => {
  //                     const { name, ...rest } = curr;
  //                     return rest;
  //                   });
  //                 }}
  //                 sx={{
  //                   "& .MuiInputBase-input": {
  //                     height: "40px",
  //                     padding: "0 14px",
  //                     backgroundColor: "#E8F0FE",
  //                   },
  //                   "& .MuiOutlinedInput-root": {
  //                     height: "45px",
  //                   },
  //                   "& .MuiInputLabel-root": {
  //                     fontSize: "1rem",
  //                     textAlign: "center",
  //                   },
  //                   mt: 1,
  //                 }}
  //               />
  //             </Grid>
  //             <Grid item xs={12} sm={12} md={12}>
  //               {emailElement && (
  //                 <InputControl
  //                   inputType={InputType.EMAIL}
  //                   error={formError?.email?.error}
  //                   helperText={formError?.email?.msg}
  //                   setFormError={setFormError}
  //                   required
  //                   fullWidth
  //                   id="email"
  //                   label="Email Address"
  //                   name="email"
  //                   autoComplete="off"
  //                   onKeyDown={() => {
  //                     setFormError((curr) => {
  //                       const { email, ...rest } = curr;
  //                       return rest;
  //                     });
  //                   }}
  //                   sx={{
  //                     "& .MuiInputBase-input": {
  //                       height: "40px",
  //                       padding: "0 14px",
  //                       backgroundColor: "#E8F0FE",
  //                     },
  //                     "& .MuiOutlinedInput-root": {
  //                       height: "45px",
  //                     },
  //                     "& .MuiInputLabel-root": {
  //                       fontSize: "1rem",
  //                       textAlign: "center",
  //                     },
  //                     mt: 1.5,
  //                   }}
  //                 />
  //               )}
  //             </Grid>
  //             <Grid item xs={12} sm={12} md={12}>
  //               {!emailElement && (
  //                 <InputControl
  //                   inputType={InputType.PHONE}
  //                   id="phone"
  //                   label="Phone No"
  //                   name="phone"
  //                   fullWidth
  //                   required
  //                   autoComplete="off"
  //                   error={formError?.phone?.error}
  //                   helperText={formError?.phone?.msg}
  //                   setFormError={setFormError}
  //                   country={"in"}
  //                   preferredCountries={["in", "gb"]}
  //                   dropdownClass={["in", "gb"]}
  //                   disableDropdown={false}
  //                   onKeyDown={() => {
  //                     setFormError((curr) => {
  //                       const { phone, ...rest } = curr;
  //                       return rest;
  //                     });
  //                   }}
  //                   sx={{
  //                     "& .MuiInputBase-input": {
  //                       height: "40px",
  //                       padding: "0 14px",
  //                       backgroundColor: "#E8F0FE",
  //                     },
  //                     "& .MuiOutlinedInput-root": {
  //                       height: "45px",
  //                     },
  //                     "& .MuiInputLabel-root": {
  //                       fontSize: "1rem",
  //                       textAlign: "center",
  //                     },
  //                     mt: 1,
  //                   }}
  //                 />
  //               )}
  //             </Grid>
  //             <Grid item xs={12} sm={12} md={12} sx={{ textAlign: "right" }}>
  //               <Link
  //                 onClick={contactHandler}
  //                 style={{
  //                   fontSize: "smaller",
  //                   fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  //                 }}
  //                 sx={{
  //                   display: "inline-block",
  //                   textAlign: "right",
  //                   cursor: "pointer",
  //                   textDecoration: "none",
  //                   marginBottom: "1px",
  //                   ":hover": {
  //                     textDecoration: "underline",
  //                   },
  //                 }}
  //               >
  //                 Use {contact} instead
  //               </Link>
  //             </Grid>

  //             <Grid item xs={12} sm={12} md={12}>
  //               <Grid
  //                 sx={{
  //                   display: "flex",
  //                   flexDirection: { xs: "column", sm: "row", md: "row" },
  //                   justifyContent: "space-between",
  //                 }}
  //               >
  //                 <Grid item xs={12} sm={5} md={5.5}>
  //                   <InputControl
  //                     inputType={InputType.TEXT}
  //                     required
  //                     fullWidth
  //                     onCopy={(event: any) => handleDefault(event)}
  //                     onPaste={(event: any) => handleDefault(event)}
  //                     name="password"
  //                     label="Password"
  //                     type={!showPassword ? "password" : "text"}
  //                     id="password"
  //                     autoComplete="off"
  //                     error={formError?.password?.error}
  //                     helperText={formError?.password?.msg}
  //                     setFormError={setFormError}
  //                     onKeyDown={() => {
  //                       setFormError((curr) => {
  //                         const { password, ...rest } = curr;
  //                         return rest;
  //                       });
  //                     }}
  //                     sx={{
  //                       "& .MuiInputBase-input": {
  //                         height: "40px",
  //                         padding: "0 14px",
  //                         backgroundColor: "#E8F0FE",
  //                       },
  //                       "& .MuiOutlinedInput-root": {
  //                         height: "45px",
  //                       },
  //                       "& .MuiInputLabel-root": {
  //                         fontSize: "1rem",
  //                         textAlign: "center",
  //                       },
  //                       mt: 1,
  //                     }}
  //                   />
  //                   <Button
  //                     type="button"
  //                     sx={{ marginLeft: "-65px", marginTop: "12px" }}
  //                     onClick={() => setShowPassword(!showPassword)}
  //                     tabIndex={-1}
  //                   >
  //                     {showPassword ? (
  //                       <VisibilityOffIcon />
  //                     ) : (
  //                       <VisibilityIcon />
  //                     )}
  //                   </Button>
  //                 </Grid>
  //                 <Grid item xs={12} sm={5} md={5.5}>
  //                   <InputControl
  //                     inputType={InputType.TEXT}
  //                     error={formError?.repassword?.error}
  //                     helperText={formError?.repassword?.msg}
  //                     setFormError={setFormError}
  //                     required
  //                     fullWidth
  //                     onCopy={(event: any) => handleDefault(event)}
  //                     onPaste={(event: any) => handleDefault(event)}
  //                     name="repassword"
  //                     label="Re-enter Password"
  //                     type={!showRePassword ? "password" : "text"}
  //                     id="repassword"
  //                     sx={{
  //                       "& .MuiInputBase-input": {
  //                         height: "40px",
  //                         padding: "0 14px",
  //                         backgroundColor: "#E8F0FE",
  //                       },
  //                       "& .MuiOutlinedInput-root": {
  //                         height: "45px",
  //                       },
  //                       "& .MuiInputLabel-root": {
  //                         fontSize: "1rem",
  //                         textAlign: "center",
  //                       },
  //                       mt: 1,
  //                     }}
  //                   />
  //                 </Grid>
  //               </Grid>
  //             </Grid>
  //             <Grid item xs={12} sm={12} md={12} sx={{ mt: 3 }}>
  //               <Grid container>
  //                 <Grid item xs={12} sm={5.5} md={5.5}>
  //                   <Button
  //                     type="submit"
  //                     fullWidth
  //                     variant="contained"
  //                     size="medium"
  //                   >
  //                     Sign Up
  //                   </Button>
  //                 </Grid>
  //                 <Grid
  //                   item
  //                   xs={12}
  //                   sm={1}
  //                   md={1}
  //                   sx={{ paddingTop: "10px" }}
  //                   style={{
  //                     fontSize: "smaller",
  //                     fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  //                   }}
  //                 >
  //                   <Divider orientation="horizontal" flexItem>
  //                     Or
  //                   </Divider>
  //                 </Grid>
  //                 <Grid item xs={12} sm={5.5} md={5.5}>
  //                   {props.provider.map((provider: any) => (
  //                     <GoogleSignUpButton
  //                       key={provider.id}
  //                       provider={provider}
  //                       callbackUrl="/company"
  //                     >
  //                       {" "}
  //                       Sign Up With
  //                     </GoogleSignUpButton>
  //                   ))}
  //                 </Grid>
  //               </Grid>
  //             </Grid>
  //             <Grid
  //               item
  //               xs={12}
  //               sm={12}
  //               md={12}
  //               sx={{ display: "flex", justifyContent: "center", mt: "5%" }}
  //             >
  //               <Link href="\signin" variant="body2" tabIndex={-1}>
  //                 Already have an account? Sign in
  //               </Link>
  //             </Grid>
  //           </form>
  //           <Grid
  //             item
  //             xs={12}
  //             sm={12}
  //             md={12}
  //             sx={{
  //               display: "flex",
  //               justifyContent: "center",
  //               textAlign: "center",
  //               color: "text.secondary",
  //               fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  //               mt: 1,
  //             }}
  //           >
  //             <h6>© 2024 Algofast India Pvt. Ltd. ALL RIGHTS RESERVED</h6>
  //           </Grid>
  //         </Grid>
  //       </Grid>
  //     </Box>
  //   </Box>
  // );
  return (
    <Grid sx={styles.container} container spacing={0} >
      <Grid item sx={styles.left} rowGap={2}>
        <Image
          src="/Illustration.png"
          alt="Log In Page Image"
          width={500}
          height={550}
          style={styles.mainImg}
        />
        <Typography variant="h3" sx={{ fontWeight: "600" }}>
          Welcome!
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "400" }}>
          Your business operations, streamlined at your fingertips!
        </Typography>
      </Grid>

      {dialogOpen && (
        <AddDialog title={""} open={dialogOpen} setDialogOpen={setDialogOpen}>
          <Box>
            <h2>Do you want continue with previous credentials ? </h2>
            <Button onClick={() => makeUserActiveAgain(inActiveUserId)}>
              Yes
            </Button>
            <Button onClick={() => deleteUserPrevDetail(inActiveUserId)}>
              No
            </Button>
          </Box>
        </AddDialog>
      )}

      <Grid item sx={styles.right}>
        <Box sx={styles.rightTop} rowGap={2}>
          <Typography variant="h3" sx={{ color: "#4870ac", fontWeight: "700" }}>
            Sign Up
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: "400", color: "#777F8C" }}
          >
            Already have an account?{" "}
            <Link href={"/signin"} style={styles.links} tabIndex={-1}>
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
            <p style={{ color: "#FF4C4C" }}>{formError?.form.msg}</p>
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
                color: "#1A1D22",
              },
              "& .MuiInputLabel-asterisk": {
                color: "#E63946",
              },
              mt: 3,
              mb: 2,
            }}
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
              // autoFocus={email ? true : false}
              error={formError?.email?.error}
              helperText={formError?.email?.msg}
              setFormError={setFormError}
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
                  color: "#1A1D22",
                },
                "& .MuiInputLabel-asterisk": {
                  color: "#E63946",
                },
                my: 2,
              }}
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
              // autoFocus={!email ? true : false}
              error={formError?.phone?.error}
              helperText={formError?.phone?.msg}
              setFormError={setFormError}
              country={"in"}
              preferredCountries={["in", "gb"]}
              dropdownClass={["in", "gb"]}
              disableDropdown={false}
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
                  color: "#1A1D22",
                },
                "& .MuiInputLabel-asterisk": {
                  color: "#E63946",
                },
                my: 2,
              }}
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
                sx={{
                  "& .MuiInputBase-input": {
                    height: "45px",
                    padding: "0 14px",
                    backgroundColor: "#E8F0FE",
                  },
                  "& .MuiOutlinedInput-root": {
                    height: "45px",
                    backgroundColor: "#E8F0FE",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "1rem",
                    textAlign: "center",
                    color: "#1A1D22",
                  },
                  "& .MuiInputLabel-asterisk": {
                    color: "#E63946",
                  },
                  mt: 2,
                  mb: 1,
                }}
                InputProps={{
                  endAdornment: (
                    <Button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                      sx={{ marginRight: -3, marginTop: 0 }}
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
                sx={{
                  "& .MuiInputBase-input": {
                    height: "45px",
                    padding: "0 14px",
                    backgroundColor: "#E8F0FE",
                  },
                  "& .MuiOutlinedInput-root": {
                    height: "45px",
                    backgroundColor: "#E8F0FE",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "1rem",
                    textAlign: "center",
                    color: "#1A1D22",
                  },
                  "& .MuiInputLabel-asterisk": {
                    color: "#E63946",
                  },
                  mt: 2,
                  mb: 1,
                }}
                InputProps={{
                  endAdornment: (
                    <Button
                      type="button"
                      onClick={() => setShowRePassword(!showRePassword)}
                      tabIndex={-1}
                      sx={{ marginRight: -3, marginTop: 0 }}
                    >
                      {showRePassword ? (
                        <RemoveRedEyeOutlinedIcon />
                      ) : (
                        <VisibilityOffOutlinedIcon />
                      )}
                    </Button>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Box sx={styles.btnBox} rowGap={2}>
            <LoadingButton
              type="submit"
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
              Sign Up
            </LoadingButton>

            {props.provider.map((provider: any) => (
              <GoogleSignUpButton
                key={provider.id}
                provider={provider}
                callbackUrl="/company"
                tabIndex={-1}
                sx={styles.googleBtn}
              >
                Sign In With
              </GoogleSignUpButton>
            ))}
            <Link
              href={""}
              style={styles.links}
              onClick={contactHandler}
              tabIndex={-1}
            >
              Sign Up with {emailElement ? "Mobile No" : "Email Id"}.
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
