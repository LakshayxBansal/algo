import { useState } from "react";
import { Box, Typography, Button, Snackbar } from "@mui/material";
import { deleteCompT } from "@/app/models/models";

const DeleteComponent = (props: deleteCompT) => {
  const [snackOpen, setSnackOpen] = useState<boolean>(false);

  async function onDeleteDialog(modId: number) {
    if (props.fnDeleteDataByID && modId) {
      const data = await props.fnDeleteDataByID(modId);
      setSnackOpen(true);

      setTimeout(() => {
        props.open ? props.setDialogOpen(false) : null;
        setSnackOpen(false);
      }, 1000);
    }
  }

  return (
    <Box id="sourceForm" style={{ padding: "20px", marginTop: "20px" }}>
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
      <Snackbar
        open={snackOpen}
        autoHideDuration={1000}
        onClose={() => setSnackOpen(false)}
        message={"Record Deleted Successfully"}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
};

export default DeleteComponent;
