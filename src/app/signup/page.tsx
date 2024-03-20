
import { getServerSession } from "next-auth/next";
//import Congrats from './Congrats';
import { getProviders, signIn } from "next-auth/react"
//import { authOptions } from "../api/auth/[...nextauth]"
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import ProviderButton from '../Widgets/providerButton';
import { addUser } from '../cap/lib/user';

export default async function SignUp() {
  const providerArr = Object.values((await getProviders())!).filter((provider) => provider.name!=="Credentials");


  // Define the handler function for form submission
  const handleSubmit = async (formData: FormData) => {
    "use server"
    try {
      const userData = {email: formData.get("email") as string,
                        password: formData.get("password") as string,
                        firstname: formData.get("firstName") as string, 
                        lastname: formData.get("lastName") as string
                      };
      const authUser = await addUser(userData);
      //if (authUser) {
      // redirect("/dashboard");
        //router.refresh();
    } catch (e) {
      console.log(e);
    }
    //redirect("/dashboard");
  };
  
  const session = await getServerSession();
  if (session) {
    console.log("ok");
    // save the user
  }

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate action={handleSubmit} sx={{ mt: 3 }}>
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
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
                  autoComplete="new-password"
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
          </Box>
        </Box>
        <Divider orientation="horizontal" variant="fullWidth" flexItem={true} component="li">Or</Divider>
 
        <Paper>
          {providerArr.map((provider) => (
            <ProviderButton
              key={provider.id}
              provider={provider}
              >
            </ProviderButton>
          ))}
        </Paper>

      </Container>
    );
}

// onClick={() => signIn(provider.id)}