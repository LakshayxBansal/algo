import React, { FormEvent } from "react";
import { getProviders } from "next-auth/react";
import AuthPage from "./signInForm";
import { Metadata } from "next";

export const metadata : Metadata = {
  title : 'Sign In'
}


export default async function SignIn() {
  const providerArr = Object.values((await getProviders())!).filter(
    (provider) => provider.name !== "Credentials"
  );

  return <AuthPage providers={providerArr}></AuthPage>;

  // return (
  //   <Grid container component="main" sx={{ height: '100vh' }}>
  //     <CssBaseline />
  //     <Grid
  //       item
  //       xs={false}
  //       sm={4}
  //       md={7}
  //       sx={{
  //         backgroundImage: `url(${bgImage.src})`,
  //         backgroundRepeat: 'no-repeat',
  //         backgroundSize: 'cover',
  //         backgroundPosition: 'center',
  //       }}
  //     />
  //     <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
  //       <Box
  //         sx={{
  //           my: 8,
  //           mx: 4,
  //           display: 'flex',
  //           flexDirection: 'column',
  //           alignItems: 'center',
  //         }}
  //       >
  //         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
  //           <LockOutlinedIcon />
  //         </Avatar>
  //         <Typography component="h1" variant="h5">
  //           Sign in
  //         </Typography>
  //         <Divider />
  //         <AuthPage providers={providerArr}></AuthPage>
  //       </Box>
  //     </Grid>
  //   </Grid>
  // );
}

/*

*/
