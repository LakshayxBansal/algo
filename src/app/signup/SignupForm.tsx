'use client'

import React, { useState, FormEvent } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { registerUser } from '../controllers/user.controller';
//import _ from "lodash";
import { debounce } from '@mui/material';
import { useRouter } from 'next/navigation';


export default function SignUpForm() {
  const [ifEmail, setIfEmail] = useState({status: true, msg: ""});
  const [passError, setPassError] = useState({status: false, msg: ""});
  const [buttonDisable, setButtonDisable] = useState(true);
  const router = useRouter();

  const formSubmit = async (formData: FormData) => {
    const result = await registerUser(formData);
    if (result.status){
      router.push('/congrats');
    }
    setIfEmail(result);
  }

  const debouncedFormValidation =  debounce((formData: FormData)=> {
    const basicEmailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const email = formData.get("email");
    const pass = formData.get("password");
    const repass = formData.get("repassword");

    if (email !== '' && !basicEmailRegex.test(email)) {
      setIfEmail({status: false, msg: "Please enter a valid email"});
    } else {
      setIfEmail({status: true, msg: ""});
    }

    if (pass !== '' && repass !== '' && pass !== repass) {
      setPassError({status: true, msg: 'The passwords should match'});
    } else {
      setPassError({status: false, msg: ''});
    }
    setButtonDisable(!(basicEmailRegex.test(email) && pass !== '' && pass === repass))
  }, 500);

  function checkFormValue(e: React.SyntheticEvent<HTMLFormElement>) {
    const formData = new FormData(e.currentTarget);
    debouncedFormValidation(formData);
  };

  return (
    <form noValidate onChange={checkFormValue} action={formSubmit} >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={!ifEmail.status}
            helperText={!ifEmail.status && ifEmail.msg}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={passError.status}
            helperText={passError.msg}
            required
            fullWidth
            name="repassword"
            label="Re-enter Password"
            type="password"
            id="repassword"
          />
        </Grid>

      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={buttonDisable}
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Up
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="\SignIn" variant="body2">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </form>
  );
}