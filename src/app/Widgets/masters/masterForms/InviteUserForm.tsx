"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Paper from "@mui/material/Paper";
import { inviteUserSchemaT, masterFormPropsWithExecutive, selectKeyValueT } from "@/app/models/models";
import Seperator from "@/app/Widgets/seperator";
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import { Collapse, IconButton } from "@mui/material";
import { createUserToInvite } from "@/app/controllers/inviteUser.controller";
import axios from "axios";
import { getSession } from "@/app/services/session.service";

export default function InviteUserForm(props: masterFormPropsWithExecutive) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = React.useState(false); 
  const entityData: inviteUserSchemaT = props.data ? props.data : {};

  
  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {}; // Initialize an empty object
    const session = await getSession();
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }   

    const result = await persistEntity(data as inviteUserSchemaT);
    if (result.status) {
      let notifyBody;
      if(result.data[0].usercontact.includes('@')){
        notifyBody = {event_type_id : 2, event_id : result.data[0].id,name:"algofast",passkey:"369",app_name:session?.user.dbInfo.companyName};
      }
      else{
        notifyBody = {event_type_id : 3, event_id : result.data[0].id,name:"algofast",passkey:"369",app_name:session?.user.dbInfo.companyName};
      }
      const notifResp = await axios.post('http://192.168.1.200:80/addNotification', notifyBody
      )
      let newVal;
      if(props.isExecutive===true){
        newVal = { id: result.data[0].id, name: result.data[0].usercontact };
      }else{
        newVal = { id: result.data[0].id, name: result.data[0].name };
      }
      props.setDialogValue ? props.setDialogValue(newVal) : null;
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
        for (const path of issue.path) {
          errorState[path] = { msg: issue.message, error: true };
        }
      }
      errorState["form"] = { msg: "Error encountered", error: true };
      setFormError(errorState);
    }
  };

  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  async function persistEntity(data: inviteUserSchemaT) {
    // let result;
    // if (entityData?.id) {
    //   data = { ...data, id: entityData.id };

    // //   result = await updateCompany(data);
    // }else{
    //     result = await createUserToInvite(data);
    // }
    const result = await createUserToInvite(data);
    return result;
  }

  const clearFormError = () => {
    setFormError(curr => {
      // remove form key from object
      const {form, ...rest} = curr;
      return rest;
    });
  }

  return (
    <Paper>
        <Seperator>{entityData.id ? "Update Invite User" : " Add Invite User"}</Seperator>
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
            sx={{ mb: 2 }}
          >
            {formError?.form?.msg}
          </Alert>
        </Collapse>
      <Box sx={{ m: 2, p: 3 }}>
        <form action={handleSubmit}>
          <Box
            sx={{
              display: "grid",
              columnGap: 3,
              gridTemplateColumns: "repeat(2, 1fr)",
              paddingBottom: "10px"
            }}
          >
            <InputControl
              inputType={InputType.TEXT}
              autoFocus
              id="name"
              label="Name"
              name="name"
              error={formError?.name?.error}
              helperText={formError?.name?.msg}
              defaultValue={entityData.name}
            />
            <InputControl
              inputType={InputType.TEXT}
              id="usercontact"
              label="User Contact"
              name="usercontact"
              error={formError?.usercontact?.error}
              helperText={formError?.usercontact?.msg}
              defaultValue={entityData.usercontact}
            />
          </Box>
          <Box
            sx={{
              mt: 3,
              display: "grid",
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
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
