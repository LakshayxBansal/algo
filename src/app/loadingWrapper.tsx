"use client"
import { Backdrop, CircularProgress } from "@mui/material";
import { set } from "lodash";
import { useEffect, useState } from "react";
import { ReactNode } from "react";

interface TransitionLinkProps{
    children: ReactNode;
    loadingg:boolean;
}

export default function LoadingWrapper({children, loadingg}:TransitionLinkProps){

const [loading, setLoading] = useState(false);
console.log("loading", loadingg)

    useEffect(()=>{

       if(loadingg){
           document.body.classList.add('cursor-wait');
        }else{
           document.body.classList.remove('cursor-wait');
       }
        return () => {
            // setLoading(false)
            document.body.classList.remove('cursor-wait');
        };
    },[loadingg]);

    return(
        <div>
        <Backdrop
  sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
  open={loadingg}
>
  <CircularProgress color="inherit" />
</Backdrop>
{children}
        </div>
    )
}