import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

export default function CallDetailList() {
    const [columnVisibilityModel, setColumnVisibilityModel] = useState({} as any);

    const row2 = [
        {
            id: 1,
            type: "ClRc",
            date: "11-05-2024",
            time: "3:04PM",
            executive: "coordinator",
            subStatus: "Unallocated",
            actionTaken: "None",
            nextAction: "To Be Alllocated",
            actionDate: "11-05-2024",
        },
    ];

    const column2: GridColDef[] = [
        { field: "type", headerName: "Type", width: 70 },
        { field: "date", headerName: "Date", width: 130 },
        { field: "time", headerName: "Time", width: 130 },
        {
            field: "executive",
            headerName: "Executive",
            width: 200,
        },
        { field: "subStatus", headerName: "Sub Status", width: 130 },
        { field: "actionTaken", headerName: "Next Action", width: 130 },
        { field: "nextAction", headerName: "Next Action", width: 130 },
        {
            field: "actionDate",
            headerName: "Action Date",
            width: 130,
        },
    ];

    return (
        <DataGrid rows={row2} columns={column2} columnVisibilityModel={columnVisibilityModel} onColumnVisibilityModelChange={(newModel: any) => setColumnVisibilityModel(newModel)} />
    )
}