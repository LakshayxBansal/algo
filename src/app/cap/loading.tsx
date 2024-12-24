"use client"
import { useEffect } from "react";
import { ReactNode } from "react";

interface TransitionLinkProps{
    children: ReactNode;
    // href:string;
}
export default function Loading({children}:TransitionLinkProps){

    useEffect(()=>{

        document.body.classList.add('cursor-wait');
        return () => {
            document.body.classList.remove('cursor-wait');
        };
    },[]);

    return(
        <div>
            {children}
        </div>
    )
}