import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import { getCallEnquiryDetails, getCallSupportDetails } from "../../controllers/callExplorer.controller";
import { StripedDataGrid } from "../../utils/styles/styledComponents";
import { Box, Paper, Popover, Tooltip, Typography } from "@mui/material";
import { adjustToLocal } from "@/app/utils/utcToLocal";

export default function CallDetailList({ selectedRow, refresh , callType , dateTimeFormat}: { selectedRow: any, refresh: any, callType:number, dateTimeFormat: string }) {
    const [columnVisibilityModel, setColumnVisibilityModel] = useState({} as any);
    const [data, setData] = useState([]);
    const [pageSize, setPageSize] = useState(10); // Default page size
    const [page, setPage] = useState(0); // Default page number (starting from 0)
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null); // State to manage anchor element for popover
    const [popoverContent, setPopoverContent] = useState<string>(''); // State to store full remark content
    const [open, setOpen] = useState(false); // State to control Popover visibility
    const popoverRef = useRef<HTMLDivElement | null>(null); // Ref for Popover

    const options = {
        timeZone: 'Asia/Kolkata',
        hour12: true, // Use 12-hour format with AM/PM
        hour: '2-digit',
        minute: '2-digit',
    };


    useEffect(() => {

        async function getEnquiries() {
            let result;
            if(callType === 0 && selectedRow)
            {
                result = await getCallEnquiryDetails(selectedRow.id);
            }
            else if(callType === 1) result = await getCallSupportDetails(selectedRow?.id);
            setData(result);
        }
        getEnquiries();
    }, [selectedRow, refresh, callType]);

    const truncateText = (text: string, maxLength: number) => {
        if (text?.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    // const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, content: string) => {
    //     setAnchorEl(event.currentTarget);
    //     setPopoverContent(content);
    //     setOpen(true);
    // };

    // const handlePopoverClose = () => {
    //     setOpen(false);
    //     setAnchorEl(null);
    // };

    // const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
    //     const relatedTarget = event.relatedTarget as Node;
    //     if (popoverRef.current && !popoverRef.current.contains(relatedTarget)) {
    //         handlePopoverClose();
    //     }
    // };


    const column2: GridColDef[] = [
        { field: "tranType", headerName: "Type", width: 70
        },
        {
            field: "date", headerName: "Date", width: 130, renderCell: (params) => {
                return params.row.date ? adjustToLocal(params.row.date).format(dateTimeFormat):"";
            },
        },
        {
            field: "executive",
            headerName: "Allocated To",
            width: 100,
        },
        { field: "actionTaken", headerName: "Action Taken", width: 100 },
        { field: "status", headerName: "Call Status", width: 100 },
        { field: "subStatus", headerName: "Sub Status", width: 100 },
        { field: "nextAction", headerName: "Next Action", width: 100 },
        {
            field: "actionDate",
            headerName: "Next Action Date",
            width: 130,
            renderCell: (params) => {
                return params.row.actionDate ? adjustToLocal(params.row.actionDate).format(dateTimeFormat) : "";
            },
        },
        {
            field: "remark",
            headerName: "Remark",
            flex: 1, // Use flex to take up remaining space
            renderCell: (params) => {
              // Determine the full remark based on the tranType
              const type = params.row.tranType;
              let fullRemark;
          
              if (type === "Status Update") {
                fullRemark = params.row.action_taken_remark;
              } else if (type === "Allocation" && params.row.action_taken_remark) {
                  fullRemark = params.row.action_taken_remark;
              } else {
                fullRemark = params.row.suggested_action_remark;
              }
          
              // Truncate the full remark to 120 characters
              const truncatedRemark = truncateText(fullRemark || "", 120); 
          
              return (
                <Tooltip
                  title={
                    <Box
                      sx={{
                        maxHeight: 150,
                        overflowY: "auto",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {fullRemark}
                    </Box>
                  }
                  arrow
                  placement="bottom-start"
                >
                  <Box>{truncatedRemark}</Box>
                </Tooltip>
              );
            },
          }
          
    ];

    return (<>
        {/* <StripedDataGrid
            disableColumnMenu
            rows={data ? data : []}
            rowHeight={30}
            columnHeaderHeight={30}
            columns={column2}
            getRowId={(row) => row.id}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel: any) => setColumnVisibilityModel(newModel)}
            pagination // Enable pagination
            paginationModel={{ pageSize, page }}
            onPaginationModelChange={(newPaginationModel) => {
                setPageSize(newPaginationModel.pageSize); // Update the pageSize state
                setPage(newPaginationModel.page); // Update the current page state
            }}
            pageSizeOptions={[5, 10, 20]} // Options for rows per page
            paginationMode="client" // Set client-side pagination
            sx={{
                height: '140px',
                minHeight: '140px',
                overflowY: 'auto',
                '& .MuiDataGrid-footerContainer': {
                    height: '28px', // Force footer container to 30px
                    minHeight: '28px', // Override any minimum height constraints
                    display: "none",
                },
                '& .MuiTablePagination-root': {
                    height: '28px', // Ensure pagination component also respects 30px height
                    minHeight: '28px',
                    overflow: "hidden"
                },
                '& .MuiTablePagination-toolbar': {
                    height: '28px', // Adjust the toolbar within the pagination
                    minHeight: '28px',
                },
            }}
           
        /> */}
        <StripedDataGrid
  disableColumnMenu
  rows={data ? data : []}
  rowHeight={25} 
  columnHeaderHeight={30} 
  columns={column2}
  getRowId={(row) => row.id}
  columnVisibilityModel={columnVisibilityModel}
  onColumnVisibilityModelChange={(newModel: any) => setColumnVisibilityModel(newModel)}
 
  sx={{
    height: '140px',
    minHeight: '140px',
    overflowY: 'auto',
    fontSize: '12px', 
    '& .MuiDataGrid-row': {
      fontSize: '11px', 
    },
    '& .MuiDataGrid-columnHeaders': {
      fontSize: 'inherit', 
      fontWeight: 'bold', 
    },
    '& .MuiDataGrid-footerContainer': {
      display: 'none', // Hide footer container
    },
    '& .MuiTablePagination-root': {
      display: 'none', // Ensure pagination is completely hidden
    },
    "& .MuiDataGrid-cell:focus": {
        outline: "none", // Removes the default focus outline
      },
      "& .MuiDataGrid-cell:focus-within": {
        outline: "none", // Removes the outline when the cell has child focus
      },
  }}
/>

        {/* <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            slotProps={{
                paper: {
                    onMouseEnter: () => setOpen(true), // Keep open on mouse hover
                    onMouseLeave: () => {
                        setOpen(false);
                        setAnchorEl(null);
                    }
                }
            }}
            ref={popoverRef}
        >
            <Box
                sx={{
                    p: 2,
                    maxWidth: 600,
                    maxHeight: 200,
                    overflowY: 'auto', // Enable scrolling for long content
                    backgroundColor: 'black',
                    color: 'white',
                }}
            >
                <Typography sx={{ fontSize: '0.875rem', whiteSpace: 'pre-wrap' }}>
                    {popoverContent}
                </Typography>
            </Box>
        </Popover> */}
    </>
    )
}