export const styles = {
  mainContainer: {
    // Main container for the entire page
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: { xs: "1rem", sm: "2rem", md: "3rem" },
  },
  centerContainer: {
    // Container to center all the contents of the page
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  mainHeading: {
    color: "#4870ac",
    fontWeight: "600",
    marginTop: "2rem",
    marginBottom: "1rem",
    textAlign: "center",
  },
  subHeading: {
    fontWeight: "400",
    color: "#777F8C",
    textAlign: "center",
  },
  credentialsInput: {
    //Email / Phone input field
    "& .MuiInputBase-input": {
      height: "45px",
      padding: "0 14px",
      backgroundColor: "#E8F0FE",
    },
    "& .MuiOutlinedInput-root": {
      height: "45px",
    },
    "& .MuiInputLabel-root": {
      fontSize: "1rem",
      textAlign: "center",
    },
    "& .MuiInputLabel-asterisk": {
      color: "#E63946",
    },
    mt: 3,
  },
  passwordInputField: {
    //Password input field for the reset password page
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
  links: {
    fontWeight: "600",
    color: "#4870ac",
    cursor: "pointer",
    textDecoration: "underline",
    fontFamily: "Roboto, 'Helvetica Neue', sans-serif",
    fontSize: "0.9rem",
  },
  pillButton: {
    //Submit button of the page
    width: "80%",
    borderRadius: "2rem",
    backgroundColor: "#4870ac !important",
    color: "#fff",
    fontWeight: "600",
    textTransform: "none",
    alignSelf: "center",
    marginY: "2%",
  },
};
