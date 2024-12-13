"use client"
import { useEffect } from "react";
import { ReactNode } from "react";

interface TransitionLinkProps{
    children: ReactNode;
    // href:string;
}
export default function Loadered({children}:TransitionLinkProps){

    useEffect(()=>{

        document.body.classList.add('cursor-wait');
        return () => {
            document.body.classList.remove('cursor-wait');
            console.log("working 1 ")
        };
    },[]);

    return(
        <div>
            {children}
        </div>
    )
}