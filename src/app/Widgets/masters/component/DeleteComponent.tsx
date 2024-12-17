import { useState } from "react";
import { Box, Typography, Button, Snackbar, Collapse, Alert, IconButton, Portal } from "@mui/material";
import { deleteCompT } from "@/app/models/models";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const DeleteComponent = (props: deleteCompT) => {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = useState<boolean>(false);

  async function onDeleteDialog(modId: number) {
    if (props.fnDeleteDataByID && modId) {
      const result = await props.fnDeleteDataByID(modId);

      if (!result.status) {
        const issues = result.data;
        const errorState: Record<string, { msg: string; error: boolean }> = {};
        for (const issue of issues) {
          errorState[issue.path[0]] = { msg: issue.message, error: true };
          if (issue.path[0] === "delete") {
            errorState["form"] = { msg: issue.message, error: true };
          }
        }
        setFormError(errorState);
      } else {
        setFormError({});
        setSnackOpen(true);

        setTimeout(() => {
          props.open ? props.setDialogOpen(false) : null;
          setSnackOpen(false);
        }, 1000)
      }
    }
  }

  const clearFormError = () => {
    setFormError((curr) => {
      const { form, ...rest } = curr;
      return rest;
    });
  };

  return (
    <Box id="sourceForm" style={{ padding: "20px", marginTop: "20px" }}>
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
      <form>
        <Typography variant={"h5"} style={{ paddingBottom: "10px" }}>
          Are you sure you want to delete?
        </Typography>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          m={1}
        >
          <Button
            style={{ paddingRight: "20px" }}
            onClick={() => {
              props.setDialogOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onDeleteDialog(props.modId);
            }}
            variant="contained"
          >
            Delete
          </Button>
        </Box>
      </form>
      <Portal>
        <Snackbar
          open={snackOpen}
          autoHideDuration={1000}
          onClose={() => setSnackOpen(false)}
          message={"Record Deleted Successfully"}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Portal>
    </Box>
  );
};

export default DeleteComponent;