
"use client"
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import "./globals.css";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton

    const pathname = usePathname();
  

    useEffect(() => {
      document.body.classList.add('cursor-wait');
  
      const handleComplete = () => {
        document.body.classList.remove('cursor-wait');
      };
  
      const timeout = setTimeout(handleComplete, 1000); // Adjust the timeout as necessary
  
      return () => {
        clearTimeout(timeout);
        document.body.classList.remove('cursor-wait');
      };
    }, [pathname]);
  

    return <div>
            loading...
    </div>
  }