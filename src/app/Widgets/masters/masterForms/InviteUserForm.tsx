"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import {Box,Grid,Link} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Paper from "@mui/material/Paper";
import {
  inviteUserSchemaT,
  masterFormPropsWithExecutive,
  selectKeyValueT,
} from "@/app/models/models";
import Seperator from "@/app/Widgets/seperator";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { Collapse, IconButton } from "@mui/material";
import { createUserToInvite } from "@/app/controllers/user.controller";
import axios from "axios";
import { getSession } from "@/app/services/session.service";

export default function InviteUserForm(props: masterFormPropsWithExecutive) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [emailElement,setEmailElement] = useState(true)
  const [contact, setContact] = useState("phone");
  const entityData: inviteUserSchemaT = props.data ? props.data : {};

  const contactHandler = () => {
    if (contact === "phone") {
      setEmailElement(false);
      setContact("email");
      setFormError({});
      setFormError({});
    } else {
      setEmailElement(true);
      setContact("phone");
      setFormError({});
      setFormError({});
    }
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      let data: { [key: string]: any } = {}; // Initialize an empty object
      const session = await getSession();
      for (const [key, value] of formData.entries()) {
        data[key] = value;
      }

      const result = await createUserToInvite(data as inviteUserSchemaT);
      if (result.status) {
        // let notifyBody;
        // if(result.data[0].usercontact.includes('@')){
        //   notifyBody = {event_type_id : 2, event_id : result.data[0].id,name:"algofast",passkey:"369",app_name:'crmapp'};
        // }
        // else{
        //   notifyBody = {event_type_id : 3, event_id : result.data[0].id,name:"algofast",passkey:"369",app_name:session?.user.dbInfo.dbName};
        // }
        // const notifResp = await axios.post('http://192.168.1.200:80/addNotification', notifyBody);
        // let newVal;
        // if(props.isExecutive === true){
        //   newVal = { id: result.data[0].id, name: result.data[0].usercontact };
        // }else{
        //   newVal = { id: result.data[0].id, name: result.data[0].name };
        // }
        // props.setDialogValue ? props.setDialogValue(newVal) : null;
        setFormError({});
        setSnackOpen(true);
        setTimeout(() => {
          props.setDialogOpen ? props.setDialogOpen(false) : null;
        }, 1000);
      } else {
        const issues = result.data;
        // show error on screen
        const errorState: Record<string, { msg: string; error: boolean }> = {};
        for (const issue of issues) {
          for (let path of issue.path) {
            if (path === "usercontact") {
              emailElement ? (path = "email") : (path = "phone");
            }
            errorState[path] = { msg: issue.message, error: true };
          }
        }
        errorState["form"] = { msg: "Error encountered", error: true };
        setFormError(errorState);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  const clearFormError = () => {
    setFormError((curr) => {
      // remove form key from object
      const { form, ...rest } = curr;
      return rest;
    });
  };

  return (
    <Paper elevation={3} sx={{ mt: 2, p: 2,width: "500px" }} square={false}>
      <Box
        sx={{
          position: "sticky",
          top: "0px",
          zIndex: 2,
          paddingY: "10px",
          bgcolor: "white",
        }}
      >
        <Seperator>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            Add Invite User
            <IconButton onClick={handleCancel}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Seperator>
      </Box>
      <Collapse in={formError?.form ? true : false}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={clearFormError}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 1 }}
        >
          {formError?.form?.msg}
        </Alert>
      </Collapse>
      <Box sx={{ m: 2, p: 3 }}>
        <form action={handleSubmit} noValidate>
        <Grid
          container
          style={{
            borderRadius: "13%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
            <Grid item xs={12} sm={12} md={12}>
                <InputControl
                  inputType={InputType.TEXT}
                  name="name"
                  id="name"
                  label="Name"
                  autoFocus
                  fullWidth
                  required
                  error={formError?.name?.error}
                  helperText={formError?.name?.msg}
                  onKeyDown={() => {
                    setFormError((curr) => {
                      const { name, ...rest } = curr;
                      return rest;
                    });
                  }}
                />
              </Grid>
            <Grid item xs={12} sm={12} md={12}>
                {emailElement && (
                  <InputControl
                    inputType={InputType.EMAIL}
                    error={formError?.email?.error}
                    helperText={formError?.email?.msg}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onKeyDown={() => {
                      setFormError((curr) => {
                        const { email, ...rest } = curr;
                        return rest;
                      });
                    }}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                {!emailElement && (
                  <InputControl
                    inputType={InputType.PHONE}
                    id="phone"
                    label="Phone No"
                    name="phone"
                    fullWidth
                    required
                    error={formError?.phone?.error}
                    helperText={formError?.phone?.msg}
                    country={"in"}
                    preferredCountries={["in", "gb"]}
                    dropdownClass={["in", "gb"]}
                    disableDropdown={false}
                    onKeyDown={()=>{
                      setFormError((curr) => {
                        const { phone, ...rest} = curr;
                        return rest;
                      });
                    }}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={12} sx={{ textAlign: "right" }}>
                <Link
                  onClick={contactHandler}
                  style={{
                    fontSize: "smaller",
                    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                  }}
                  sx={{
                    display: "inline-block",
                    textAlign: "right",
                    cursor: "pointer",
                    textDecoration: "none",
                    marginBottom: "1px",
                    ":hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Use {contact} instead
                </Link>
              </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} sx={{ mt: 3 }}>
                <Grid container>
                <Button onClick={handleCancel}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "15%", marginLeft: "5%" }}
            >
              Submit
            </Button>
                  
                </Grid>
              </Grid>
        </form>
        <Snackbar
          open={snackOpen}
          autoHideDuration={1000}
          onClose={() => setSnackOpen(false)}
          message="Record Saved!!"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Box>
    </Paper>
  );
}
