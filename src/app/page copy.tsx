'use client'
import Image from "next/image";
import React, { useState, FormEvent } from "react";
import { authenticate } from '../app/lib/actions'
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";


// Define custom styles for the login page
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 100,   //theme.spacing(8),
  },
  form: {
    width: "100%",
    marginTop: 10,  //theme.spacing(1),
  },
  submit: {
    //margin: 10,     //theme.spacing(3, 0, 2),
  },
}));


export default function Home() {
  // Use the custom styles
  const classes = useStyles();

  // Define the state variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Define the handler function for form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Prevent the default browser behavior
    event.preventDefault();

    try {
      await(authenticate(new FormData(event.currentTarget)));
    } catch (e) {
      console.log(e);
    }
  };

  // Define the handler function for email input change
  const handleEmailChange = (event) => {
    // Set the email state to the input value
    setEmail(event.target.value);
  };

  // Define the handler function for password input change
  const handlePasswordChange = (event) => {
    // Set the password state to the input value
    setPassword(event.target.value);
  };


  // Return the JSX element for the login page
  return (
    <Container component="main" maxWidth="xs">
      <Box className={classes.root}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};