export const styles = {
  container: {    // Main container for the entire page
    width: "100vw",
    height: "100vh",
  },
  leftImageContainer: {    // Left side container (for image or graphic)
    width: "55.56%",
    backgroundColor: "primary.main",
    textAlign: "center",
    color: "background.default",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 768px)": { display: "none" },
  },
  rightFormContainerLogIn: {    // Right side container for login form
    width: "44.44%",
    padding: "4%",
    paddingBottom: "0",
    display: "flex",
    flexDirection: "column",
    "@media (max-width: 768px)": { width: "100%" },
  },
  rightFormTopSectionLogIn: {    // Top section of the login form (heading area)
    display: "flex",
    flexDirection: "column",
    marginBottom: "5%",
  },
  loginSubmitButtonContainer: {    // Container for login submit button
    width: "60%",
    marginTop: "8%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
  },
  rightFormContainerSignUp: {    // Right side container for sign-up form
    width: "44.44%",
    padding: "4%",
    paddingTop: "3%",
    paddingBottom: "0",
    display: "flex",
    flexDirection: "column",
    "@media (max-width: 768px)": { width: "100%" },
  },
  rightFormTopSectionSignUp: {    // Top section of the sign-up form (heading area)
    display: "flex",
    flexDirection: "column",
    marginBottom: "4%",
  },
  signUpSubmitButtonContainer: {    // Container for sign-up submit button
    width: "60%",
    marginTop: "7%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
  },
  leftImage: {    // Image displayed on the left side of the page
    width: "60%",
    height: "auto",
    marginTop: "4%",
    transition: "all 0.3s ease",
  },
  pillStyledButton: {    // Pill-shaped styled button (for primary actions)
    width: "100%",
    borderRadius: "2rem",
    backgroundColor: "#4870AC !important",
    color: "background.default",
    fontWeight: "600",
    textTransform: "none",
  },
  copyrightText: {    // Footer section containing the copyright text
    marginTop: "auto",
    marginBottom: "2%",
    display: "flex",
    justifyContent: "center",
    color: "primary.light",
  },
  toggleLink: {    // Link to toggle between login and signup forms
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "underline",
    fontFamily: "Roboto, 'Helvetica Neue', sans-serif",
    fontSize: "0.9rem",
    color: "#4870AC"
  },
  // linksLoading: {
  //   cursor: "wait",
  // },
  passwordFieldContainer: {    // Container for password field with show/hide functionality
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  googleSignInButton: {    // Google sign-in button
    width: "100%",
    borderRadius: "2rem",
    textAlign: "center",
    fontWeight: "bold",
  },
  nameInputField: {    // Input field for the user's name
    "& .MuiInputBase-input": {
      height: "45px",
      padding: "0 14px",
      backgroundColor: "secondary.light",
    },
    "& .MuiOutlinedInput-root": {
      height: "45px",
    },
    "& .MuiInputLabel-root": {
      fontSize: "1rem",
      textAlign: "center",
    },
    mt: 2,
    mb: 1,
  },
  emailPhoneInputFieldLogIn: {    // Email/Phone input field for login
    "& .MuiInputBase-input": {
      height: "45px",
      padding: "0 14px",
      backgroundColor: "secondary.light",
      // cursor: loading ? "wait" : "normal",
    },
    "& .MuiOutlinedInput-root": {
      height: "45px",
    },
    "& .MuiInputLabel-root": {
      fontSize: "1rem",
      textAlign: "center",
    },
    my: 3,
  },
  emailPhoneInputFieldSignUp: {    // Email/Phone input field for sign-up
    "& .MuiInputBase-input": {
      height: "45px",
      padding: "0 14px",
      backgroundColor: "secondary.light",
    },
    "& .MuiOutlinedInput-root": {
      height: "45px",
    },
    "& .MuiInputLabel-root": {
      fontSize: "1rem",
      textAlign: "center",
    },
    my: 1,
  },
  passwordInputField: {    // Password input field
    "& .MuiInputBase-input": {
      height: "45px",
      padding: "0 14px",
      backgroundColor: "secondary.light",
    },
    "& .MuiOutlinedInput-root": {
      height: "45px",
      backgroundColor: "secondary.light",
    },
    "& .MuiInputLabel-root": {
      fontSize: "1rem",
      textAlign: "center",
    },
    my: 1,
  },
  confirmationDialogBox: {    // Dialog box for confirmation messages
    fontFamily: "Roboto, 'Helvetica Neue', sans-serif",
    display: "flex",
    flexDirection: "column",
    marginTop: "4%",
  },
  dialogOkButton: {    // "OK" button in the confirmation dialog
    alignSelf: "flex-end",
  },
};
