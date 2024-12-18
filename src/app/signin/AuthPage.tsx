"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField, Divider, Paper } from "@mui/material";
import Link from "@mui/material/Link";
import ProviderButton from "../Widgets/providerButton";
import { ClientSafeProvider, getCsrfToken } from "next-auth/react";
import Grid from "@mui/material/Grid";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { InputControl, InputType } from "../Widgets/input/InputControl";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { getTotalInvite } from "../controllers/user.controller";
import { getInvitesCount } from "../services/user.service";
import { getCompanyCount } from "../services/company.service";

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
        console.log("status : ", status);
        // const totalInvites = await getTotalInvite();
        // const totalCompanies = await getCompanyCount()
        // console.log("totat invites : ",totalInvites);
        // router.push(successCallBackUrl);
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
    <form action={actValidate}>
      {formError?.form?.error && (
        <p style={{ color: "red" }}>{formError?.form.msg}</p>
      )}
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      {/* <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Email Address or Phone"
        name="username"
        autoComplete="email"
        autoFocus
      /> */}
      {email && (
        <Grid item xs={12}>
          <InputControl
            inputType={InputType.EMAIL}
            error={formError?.email?.error}
            helperText={formError?.email?.msg}
            setFormError={setFormError}
            required
            fullWidth
            id="usercontact"
            label="Email Address"
            name="usercontact"
          />
        </Grid>
      )}
      {!email && (
        <Grid item xs={12}>
          <InputControl
            inputType={InputType.PHONE}
            id="usercontact"
            label="Phone No"
            name="usercontact"
            fullWidth
            required
            error={formError?.phone?.error}
            helperText={formError?.phone?.msg}
            setFormError={setFormError}
            country={"in"}
            preferredCountries={["in", "gb"]}
            dropdownClass={["in", "gb"]}
            disableDropdown={false}
            // onkeydown={onPhoneChange}
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
        Use {email ? "phone" : "email"} instead
      </Link>
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type={!showPassword ? "password" : "text"}
        id="password"
      />
      <Button
        type="button"
        sx={{ marginLeft: "-65px", marginTop: "24px" }}
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </Button>
      <Link href="#" variant="body2">
        Forgot password?
      </Link>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item>
          <Link href="/signup" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
      <Divider
        orientation="horizontal"
        variant="fullWidth"
        flexItem={true}
        component="li"
      >
        Or
      </Divider>
      <Paper>
        {providerArr.map((provider) => (
          <ProviderButton
            key={provider.id}
            provider={provider}
            callbackUrl={successCallBackUrl}
          >
            Sign In with
          </ProviderButton>
        ))}
      </Paper>
    </form>
  );
}
