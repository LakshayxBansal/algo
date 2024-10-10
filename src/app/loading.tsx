
"use client"
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import "./globals.css";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton

    const pathname = usePathname();
    const searchParams = useSearchParams();
  

    useEffect(() => {
      document.body.classList.add('cursor-wait');
  
    //   const handleComplete = () => {
    //     document.body.classList.remove('cursor-wait');
    //   };
  
    //   const timeout = setTimeout(handleComplete, 1000); // Adjust the timeout as necessary
  
      return () => {
        document.body.classList.remove('cursor-wait');
      };
    }, [pathname,searchParams]);
  

    return<body>
        loder...
    </body>
  }