"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { registerUser } from "@/app/controllers/user.controller";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";

import { useRouter } from "next/navigation";
import { CountryData } from "react-phone-input-material-ui";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { userSchemaT } from "../models/models";

export default function SignUpForm() {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailElement, setEmailElement] = useState(true);
  const [contact, setContact] = useState("phone");
  const [showPassword, setShowPassword] = useState(false);

  const contactHandler = () => {
    if (contact === "phone") {
      setEmailElement(false);
      setContact("email");
    } else {
      setEmailElement(true);
      setContact("phone");
    }
  };
  const router = useRouter();

  const formSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    const result = await registerUser(data as userSchemaT);
    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name };
      setFormError({});
      router.push("/congrats");
    }else {
      // show error on screen
      const issues = result.data;
      const errorState: Record<string, { msg: string, error: boolean }> = {};
      for (const issue of issues) {
        if(issue.path[0]==="contact"){
          emailElement ? issue.path[0]= "email":issue.path[0] = "phone";
          emailElement ? issue.message = "Email already exist":issue.message = "Phone already exist";
        }
        errorState[issue.path[0]] = { msg: issue.message, error: true };
      }
      console.log(issues);
      errorState["form"] = { msg: "Error encountered", error: true };
      setFormError(errorState);
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
    <form noValidate action={formSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
          />
        </Grid>
        {emailElement && (
          <Grid item xs={12}>
            <InputControl
              inputType={InputType.EMAIL}
              error={formError?.email?.error}
              helperText={formError?.email?.msg}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
            />
          </Grid>
        )}
        {!emailElement && (
          <Grid item xs={12}>
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
            />
          </Grid>
        )}

        <Link
          onClick={contactHandler}
          sx={{
            display: "inline-block",
            textAlign: "right",
            width: "100%",
            cursor: "pointer",
            textDecoration: "none",
            marginTop: "14px",

            ":hover": {
              textDecoration: "underline",
            },
          }}
        >
          Use {contact} instead
        </Link>
        <Grid item xs={12}>
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
          />
          <Button
            type="button"
            sx={{ marginLeft: "-65px", marginTop: "8px" }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <InputControl
            inputType={InputType.TEXT}
            error={formError?.repassword?.error}
            helperText={formError?.repassword?.msg}
            required
            fullWidth
            name="repassword"
            label="Re-enter Password"
            type="password"
            id="repassword"
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="\signin" variant="body2">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </form>
  );
}
