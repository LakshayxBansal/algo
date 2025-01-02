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
    paddingTop: "3%",
    paddingBottom: "0",
    display: "flex",
    flexDirection: "column",
    "@media (max-width: 768px)": { width: "100%" },
  },
  rightTop: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "4%",
  },
  btnBox: {
    width: "60%",
    marginTop: "7%",
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
  nameInput: {
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
    mt: 2,
    mb: 1,
  },
  emailPhoneInput: {
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
    my: 1,
  },
  passwordInput: {
    "& .MuiInputBase-input": {
      height: "45px",
      padding: "0 14px",
      backgroundColor: "#E8F0FE",
    },
    "& .MuiOutlinedInput-root": {
      height: "45px",
      backgroundColor: "#E8F0FE",
    },
    "& .MuiInputLabel-root": {
      fontSize: "1rem",
      textAlign: "center",
    },
    "& .MuiInputLabel-asterisk": {
      color: "#E63946",
    },
    my: 1,
  },
  dialogBox: {
    fontFamily: "Roboto, 'Helvetica Neue', sans-serif",
    display: "flex",
    flexDirection: "column",
    marginTop: "4%",
  },
  okButton: {
    alignSelf: "flex-end",
  },
};
