import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getCallEnquiryDetails } from "../../controllers/callExplorer.controller";
import { StripedDataGrid } from "../../utils/styledComponents";

export default function CallDetailList({ selectedRow, refresh }: { selectedRow: any, refresh: any }) {
    const [columnVisibilityModel, setColumnVisibilityModel] = useState({} as any);
    const [data, setData] = useState([]);
    const options = {
        timeZone: 'Asia/Kolkata',
        hour12: true, // Use 12-hour format with AM/PM
        hour: '2-digit',
        minute: '2-digit',
    };


    useEffect(() => {

        async function getEnquiries() {
            const result = await getCallEnquiryDetails(selectedRow?.id);
            setData(result);
        }
        getEnquiries();
    }, [selectedRow, refresh])


    const column2: GridColDef[] = [
        { field: "type", headerName: "Type", width: 70 },
        {
            field: "date", headerName: "Date", width: 130, renderCell: (params) => {
                return params.row.date.toDateString();
            },
        },
        {
            field: "time", headerName: "Time", width: 100,
            renderCell: (params) => {
                return params.row.date.toLocaleString('en-IN', options);
            },
        },
        {
            field: "executive",
            headerName: "Executive",
            width: 100,
        },
        { field: "subStatus", headerName: "Sub Status", width: 100 },
        { field: "actionTaken", headerName: "Action Taken", width: 130 },
        { field: "nextAction", headerName: "Next Action", width: 130 },
        {
            field: "actionDate",
            headerName: "Action Date",
            width: 130,
        },
        {
            field: "actionTime", headerName: "Time", width: 130,
            renderCell: (params) => {
                return params.row.actionDate.toLocaleString('en-IN', options);
            },
        },
    ];

    return (
        <StripedDataGrid rows={data ? data : []}
            rowHeight={30}
            columnHeaderHeight={30}
            columns={column2}
            getRowId={(row) => row.id}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel: any) => setColumnVisibilityModel(newModel)}
            autoHeight
        />
    )
}