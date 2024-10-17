// import { Box, Typography, Button, Snackbar } from "@mui/material";

// type propsT = {
//   deletefunction: any;

// }


// const DeleteComponent = (props: propsT) => {
//     return (
//       <Box id="sourceForm" style={{ padding: "20px", marginTop: "20px" }}>
//         <form>
//           <Typography variant={"h5"} style={{ paddingBottom: "10px" }}>
//             Are you sure you want to delete?
//           </Typography>
//           <Box
//             display="flex"
//             justifyContent="flex-end"
//             alignItems="flex-end"
//             m={1}
//           >
//             <Button
//               style={{ paddingRight: "20px" }}
//               onClick={() => {
//                 setDialogOpen(false);
//               }}
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={() => {
//                 onDeleteDialog(ids);
//               }}
//               variant="contained"
//             >
//               Delete
//             </Button>
//           </Box>
//         </form>
//         <Snackbar
//           open={snackOpen}
//           autoHideDuration={1000}
//           onClose={() => setSnackOpen(false)}
//           message={"Record Deleted Successfully"}
//           anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//         />
//       </Box>
//     );
//   };

//   export default DeleteComponent;
