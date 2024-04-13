'use client'

import Button from '@mui/material/Button';
import { TextField, Divider, Paper } from '@mui/material';
import Link from '@mui/material/Link';
import ProviderButton from '../Widgets/providerButton';
import { ClientSafeProvider, getCsrfToken } from "next-auth/react";
import Grid from '@mui/material/Grid';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

interface authPagePropsType {
  providers: ClientSafeProvider[];
}

/**
 * 
 * @param formData to be used with form action
 */


export default function AuthPage(props: authPagePropsType) {
  const router = useRouter();
  let csrfToken;
  const providerArr = props.providers;
  const successCallBackUrl = '/company';

  function actValidate(formData: FormData) {
    console.log(formData);
    signIn("credentials",  { redirect: false, username: formData.get("username"), password: formData.get("password") })
      .then((status)=>{
        if (status?.ok) {
          router.push(successCallBackUrl);
        } else {
          if (status?.error === "CredentialsSignin") {
            console.log(status);
          }
        }
      });  
  }

  getCsrfToken().then((token) => {csrfToken = token}).catch((error) => {console.log(error)});
  return (
    <form method="POST" action={actValidate}>
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Email Address"
        name="username"
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
      />
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
      <Divider orientation="horizontal" variant="fullWidth" flexItem={true} component="li">Or</Divider>
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