"use client"
import { Box, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { statusMap } from "./StatusBar";

export let updateStatusObject: Dispatch<SetStateAction<any>>;

export default function Footer(){
    const [statusObject, setStatusObject] = useState({key1: statusMap.get("key1"),key2: statusMap.get("key2"),key3: statusMap.get("key3"),key4: statusMap.get("key4"),key5: statusMap.get("key5")});

    useEffect(() => {
        console.log("footer useeffect...")
        updateStatusObject = setStatusObject;
        console.log("from map : ",statusMap.get("key1"));
    })
    return (
        <Box sx={{
            bgcolor: '#CCCCCC',
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            boxShadow: 1,
            zIndex: 1,
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                margin: 'auto',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
            }}>
                <Typography sx={{ width: "40%" }}>
                    {`the value of first key is : ${statusObject["key1"]}`}
                </Typography>
                {/* <Typography sx={{ width: "40%" }}>
                    {new Date().toLocaleString()}
                </Typography> */}
            </Box>
        </Box>
    )
}