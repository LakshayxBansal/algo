"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { masterFormPropsT } from "@/app/models/models";
import Box from "@mui/material/Box";
import Seperator from "../../seperator";
import Snackbar from "@mui/material/Snackbar";
import { Paper } from "@mui/material";
import { Collapse, IconButton } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

export default function NotificationForm(props: masterFormPropsT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [channelType, setChannelType] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [nameType, setNameType] = useState("");
  const entityData: masterFormPropsT = props.data ? props.data : {};

  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  const handleCreate = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  const handleRead = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  const handleUpdate = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  const handleDelete = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    // const result = await persistEntity(data as masterFormPropsT);

    // if (result.status) {
    //   const newVal = { id: result.data[0].id, name: result.data[0].name };
    //   setSnackOpen(true);
    //   props.setDialogValue ? props.setDialogValue(newVal) : null;
    //   setTimeout(() => {
    //     props.setDialogOpen ? props.setDialogOpen(false) : null;
    //   }, 1000);
    //   setFormError({});
    // } else {
    //   const issues = result.data;
    //   // show error on screen
    //   const errorState: Record<string, { msg: string; error: boolean }> = {};
    //   for (const issue of issues) {
    //     for (const path of issue.path) {
    //       errorState[path] = { msg: issue.message, error: true };
    //     }
    //   }
    //   errorState["form"] = { msg: "Error encountered", error: true };
    //   setFormError(errorState);
    // }
  };

  //   async function persistEntity(data: notificationSchemaT) {
  //     let result;
  //     if (props.data) {
  //       Object.assign(data, { id: props.data.id });
  //       result = await updateNotification(data);
  //     } else {
  //       result = await createNotification(data);
  //     }
  //     return result;
  //   }

  const handleRecipientChange = (event: SelectChangeEvent) => {
    setRecipientName(event.target.value as string);
  };

  const handleChannelChange = (event: SelectChangeEvent) => {
    setChannelType(event.target.value as string);
  };

  const handleNameChange = (event: SelectChangeEvent) => {
    setNameType(event.target.value as string);
  };

  const clearFormError = () => {
    setFormError((curr) => {
      const { form, ...rest } = curr;
      return rest;
    });
  };

  return (
    <>
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
            {props.data ? "Update Notification" : "Add Notification"}
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
          sx={{ mb: 2 }}
        >
          {formError?.form?.msg}
        </Alert>
      </Collapse>
      <Box id="sourceForm" sx={{ m: 2, p: 3 }}>
        <form action={handleSubmit}>
          <Paper elevation={3} sx={{ mb: 4, p: 2 }} square={false}>
            <Seperator>Details</Seperator>
            <Box
              sx={{
                display: "grid",
                columnGap: 3,
                rowGap: 1,
                gridTemplateColumns: "repeat(5, 1fr)",
                p: 2,
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="name-label">Select Name</InputLabel>
                <Select
                  labelId="name-label"
                  id="name"
                  datatype="string"
                  name="name"
                  value={nameType}
                  label="name"
                  onChange={handleNameChange}
                >
                  <MenuItem value={2}>Enquiry</MenuItem>
                  <MenuItem value={3}>Executive</MenuItem>
                </Select>
              </FormControl>

              {nameType && (
                <>
                  <Button onClick={handleCreate}>Create</Button>
                  <Button onClick={handleRead}>Read</Button>
                  <Button onClick={handleUpdate}>Update</Button>
                  <Button onClick={handleDelete}>Delete</Button>
                </>
              )}
            </Box>
          </Paper>

          <Paper elevation={3} sx={{ mb: 4, p: 2 }}>
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
                  Notification
                  <Button
                    sx={{ marginBottom: "2%" }}
                    type="submit"
                    variant="contained"
                  >
                    Add
                  </Button>
                </Box>
              </Seperator>
            </Box>
            <Box
              sx={{
                display: "grid",
                columnGap: 4,
                rowGap: 1,
                gridTemplateColumns: "repeat(3, 1fr)",
                p: 2,
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="recipient-label">Recipient</InputLabel>
                <Select
                  labelId="recipient-label"
                  id="recipient"
                  name="recipient"
                  value={recipientName}
                  label="Recipient"
                  onChange={handleRecipientChange}
                >
                  <MenuItem value="ind">XYZ</MenuItem>
                  <MenuItem value="int">ABC</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="channel-label">Channels</InputLabel>
                <Select
                  labelId="channel-label"
                  id="channel"
                  datatype="string"
                  name="channel"
                  value={channelType}
                  label="Channel"
                  onChange={handleChannelChange}
                >
                  <MenuItem value={2}>Email</MenuItem>
                  <MenuItem value={3}>Mobile Number</MenuItem>
                </Select>
              </FormControl>

              <InputControl
                inputType={InputType.TEXT}
                id="message"
                label="Message"
                name="message"
                // error={formError?.message.error}
                // helperText={formError?.message?.msg}
                // defaultValue={entityData.message}
              />

              {/* <Button type="submit" variant="contained">
                Add
              </Button> */}
            </Box>
          </Paper>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "15%", marginLeft: "5%" }}
            >
              Submit
            </Button>
          </Box>
        </form>
        <Snackbar
          open={snackOpen}
          autoHideDuration={1000}
          onClose={() => setSnackOpen(false)}
          message="Record Saved!"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Box>
    </>
  );
}
