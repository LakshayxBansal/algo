"use client"
import { Box, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { statusMap } from "./StatusMap";

export let updateStatusBar : any;

export default function Footer(){
    // const [flag, setFlag] = useState(false);
    // const [key, setKey] = useState("");
    // statusMap.set("key1","value1");
    // setKey(statusMap.get(key) as string);

    // updateStatusBar = function (key: string,value : string){
    //     statusMap.set(key,value);
    //     // setKey(statusMap.get(key) as string);
    //     setFlag(!flag);
    //     console.log("status map inside useeffect : ",statusMap);
    // }
    // console.log("status map outside useeffect : ",statusMap);

    const [statusObject,setStatusObject] = useState({key1 : "",key2 : "",key3 : "",key4 : "",key5 : ""});
    useEffect(()=>{
        updateStatusBar = setStatusObject;
    })

    return (
        <Box sx={{
            bgcolor: '#CCCCCC',
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            boxShadow: 1,
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
                <Typography sx={{ width: "40%" }}>
                    {`the value of first key is : `}
                </Typography>
                <Typography sx={{ width: "40%" }}>
                    {`the value of second key is : ${statusMap.get("key1")}`}
                </Typography>
                {/* <Typography sx={{ width: "40%" }}>
                    {new Date().toLocaleString()}
                </Typography> */}
            </Box>
        </Box>
    )
}