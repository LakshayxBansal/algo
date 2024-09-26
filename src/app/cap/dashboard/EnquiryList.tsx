import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Paper, Typography } from "@mui/material";
import { getOpenEnquiries } from "@/app/controllers/dashboard.controller";
import { logger } from "@/app/utils/logger.utils";

export default async function EnquiryList() {
  let openEnquiries;
  try {
    openEnquiries = await getOpenEnquiries();
  } catch (e) {
    logger.info(e);
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "contactName",
      headerName: "Contact",
      width: 140,
    },
    {
      field: "category",
      headerName: "Category",
      width: 140,
    },
    {
      field: "subStatus",
      headerName: "Sub Status",
      width: 140,
    },
    {
      field: "date",
      headerName: "Created On",
      width: 140,
    },
  ];

  return (
    <Paper elevation={2} sx={{ borderRadius: "16px", py: 1, px: 2 }}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Recent Enquiries
      </Typography>
      <Box sx={{ height: 380 }}>
        <DataGrid
          rows={openEnquiries}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          sx={{
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
        />
      </Box>
    </Paper>
  );
}
