
import { getProviders } from "next-auth/react"
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import ProviderButton from '../Widgets/providerButton';
import SignUpForm from "./SignupForm";

export default async function SignUp() {
  const providerArr = Object.values((await getProviders())!).filter((provider) => provider.name!=="Credentials");

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
        <SignUpForm></SignUpForm>

      </Box>
      <Divider orientation="horizontal" variant="fullWidth" flexItem={true} component="li">Or</Divider>

      <Paper>
        {providerArr.map((provider) => (
          <ProviderButton
            key={provider.id}
            provider={provider}
            callbackUrl="/company"
            >
          </ProviderButton>
        ))}
      </Paper>

    </Container>
  );
}

// onClick={() => signIn(provider.id)}