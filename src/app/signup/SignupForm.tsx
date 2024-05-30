'use client'

import React, { useState, FormEvent, ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { registerUser } from '@/app/controllers/user.controller';
import {InputControl, InputType}  from '@/app/Widgets/input/InputControl';

import { useRouter } from 'next/navigation';
import { userSchema } from '../zodschema/zodschema';
import { CountryData } from 'react-phone-input-material-ui';


export default function SignUpForm() {
  const [formError, setFormError] = useState<Record<string, {msg: string, error: boolean}>>({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  const formSubmit = async (formData: FormData) => {
  
    let data: { [key: string]: any } = {}; // Initialize an empty object
    formData.append("phone", phoneNumber)

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    const parsed = userSchema.safeParse(data);
    let result;
    let issues;

    if (parsed.success) {
      const result = await registerUser(formData);
      if (result.status){
        const newVal = {id: result.data[0].id, name: result.data[0].name};
      } else {
        issues = result?.data;
      }
    } else {
      issues = parsed.error.issues;
    } 

    if (issues) {
      // show error on screen
      const errorState: Record<string, {msg: string, error: boolean}> = {};
      for (const issue of issues) {
        errorState[issue.path[0]] = {msg: issue.message, error: true};
      }
      setFormError(errorState);
    } else {
      router.push('/congrats');
    }
  }

  function onPhoneChange(value: string, data: {} | CountryData, event: ChangeEvent<HTMLInputElement>, formattedValue: string) {
    setPhoneNumber(value);
    console.log(phoneNumber);
  }

  return (
    <form noValidate action={formSubmit} >
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
        <Grid item xs={12}>
          <InputControl
            inputType={InputType.PHONE}     
            id="phone"
            label="Phone No"
            name="phone"
            error={formError?.phone?.error}
            helperText={formError?.phone?.msg} 
            country={'in'}
            preferredCountries={['in', 'gb']}
            dropdownClass={['in', 'gb']}
            disableDropdown={false}
            onChange={onPhoneChange}
          />
        </Grid>        
        <Grid item xs={12}>
          <InputControl
            inputType={InputType.TEXT}     
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            error={formError?.password?.error}
            helperText={formError?.password?.msg}           />
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
      <Button
        type="submit"
        fullWidth
        variant="contained"
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