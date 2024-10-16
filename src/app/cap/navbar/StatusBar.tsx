"use client"
import { Box, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { statusMap } from "./StatusMap";
import { updateStatusData } from "@/app/controllers/navbar.controller";

export let updateStatusBar : any;

async function updateStatus(data: string,id : number) {
    await updateStatusData(data,id);
}

export default function StatusBar({statusData}:{statusData:any}){
    
    const [statusObject,setStatusObject] = useState({"key1":"","key2":"","key3": statusData.data["key3"],"key4": statusData.data["key4"],"key5": statusData.data["key5"]});

    updateStatusBar = function(key : string,value : string){
        if(["key3","key4","key5"].includes(key)){
            statusData.data[key] = value;
            const statusDataStr = statusData.data;
            JSON.stringify(statusDataStr);
            updateStatus(statusDataStr,statusData.id);
        }
        setStatusObject((prevData : any)=>({
            ...prevData,[key] : value
        }));
    }

    return (
        <Box sx={{
            bgcolor: '#F1F1EF',
            boxShadow: "0 -2px 8px #ccccc5",
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            // boxShadow: 1,
            zIndex: 1300,
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                margin: 'auto',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
            }}>
                <Box sx={{ display: "flex",justifyContent: "center",width: "20%" }}>
                <Typography>
                    ${statusObject["key1"]}
                </Typography>
                </Box>
                <Box sx={{ display: "flex",justifyContent: "center",width: "20%",borderLeft : "0.25px solid gray"}}>
                <Typography>
                    ${statusObject["key2"]}
                </Typography>
                </Box>
                <Box sx={{ display: "flex",justifyContent: "center",width: "20%",borderLeft : "0.25px solid gray"}}>
                <Typography>
                    ${statusObject["key3"]}
                </Typography>
                </Box>
                <Box sx={{ display: "flex",justifyContent: "center",width: "20%",borderLeft : "0.25px solid gray"}}>
                <Typography>
                   ${statusObject["key4"]}
                </Typography>
                </Box>
                <Box sx={{ display: "flex",justifyContent: "center",width: "20%",borderLeft : "0.25px solid gray"}}>
                <Typography>
                    ${statusObject["key5"]}
                </Typography>
                </Box>
            </Box>
        </Box>
    )
}