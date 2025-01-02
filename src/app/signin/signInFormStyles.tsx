export const styles = {
  container: {
    width: "100vw",
    height: "100vh",
  },
  left: {
    width: "55.56%",
    backgroundColor: "#4870ac",
    textAlign: "center",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 768px)": { display: "none" },
  },
  mainImg: {
    width: "60%",
    height: "auto",
    marginTop: "4%",
    transition: "all 0.3s ease",
  },
  right: {
    width: "44.44%",
    padding: "4%",
    paddingBottom: "0",
    display: "flex",
    flexDirection: "column",
    "@media (max-width: 768px)": { width: "100%" },
  },
  rightTop: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "5%",
  },
  btnBox: {
    width: "60%",
    marginTop: "8%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
  },
  pillButton: {
    width: "100%",
    borderRadius: "2rem",
    backgroundColor: "#4870ac !important",
    color: "#fff",
    fontWeight: "600",
    textTransform: "none",
  },
  cpyRight: {
    marginTop: "auto",
    marginBottom: "2%",
    display: "flex",
    justifyContent: "center",
    color: "#777f8c",
  },
  links: {
    fontWeight: "600",
    color: "#4870ac",
    cursor: "pointer",
    textDecoration: "underline",
    fontFamily: "Roboto, 'Helvetica Neue', sans-serif",
    fontSize: "0.9rem",
  },
  // linksLoading: {
  //   cursor: "wait",
  // },
  passwordContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  googleBtn: {
    width: "100%",
    borderRadius: "2rem",
    textAlign: "center",
    fontWeight: "bold",
  },
  emailPhoneInput: {
    "& .MuiInputBase-input": {
      height: "45px",
      padding: "0 14px",
      backgroundColor: "#E8F0FE",
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
  passwordInput: {
    "& .MuiInputBase-input": {
      height: "45px",
      padding: "0 14px",
      backgroundColor: "#E8F0FE",
      // cursor: loading ? "wait" : "normal",
    },
    "& .MuiOutlinedInput-root": {
      height: "45px",
      backgroundColor: "#E8F0FE",
    },
    "& .MuiInputLabel-root": {
      fontSize: "1rem",
      textAlign: "center",
    },
    my: 1,
  },
};
