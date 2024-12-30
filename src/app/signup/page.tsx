import { getProviders } from "next-auth/react";
import SignupForm from "./signUpForm";
import { Metadata } from "next";

export const metadata : Metadata = {
  title : 'Sign Up'
}

export default async function SignUp() {
  const providerArr = Object.values((await getProviders())!).filter(
    (provider) => provider.name !== "Credentials"
  );
  return <SignupForm provider={providerArr} />;
  // return (
  // <Container
  // component="main"
  // maxWidth="xs"
  //   sx={{
  //     backgroundColor: "skyblue",
  //     border: "1px solid black",
  //     width: "100%",
  //   }}
  // >
  // <CssBaseline />

  {
    /* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      > */
  }
  {
    /* </Box> */
  }
  {
    /* <Divider
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
            callbackUrl="/company"
          ></ProviderButton>
        ))}
      </Paper> */
  }
  // </Container>
  // );
}

// onClick={() => signIn(provider.id)}
