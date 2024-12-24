import { Suspense, useEffect,useState } from 'react';
import { usePathname } from 'next/navigation';
// Adjust the path if your styles are in a different directory
import { AppProps } from 'next/app';
import { Box } from "@mui/material";

import { theme } from "@/app/utils/theme.util";
import { ThemeProvider } from "@mui/material/styles";
import "./globals.css";

export const metadata = {
  title: {
    template: '%s - Algofast CRM',
    default: 'Algofast CRM',
  },
  description: 'Manage your customer relationship with ease',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const pathname = usePathname();
  

  // useEffect(() => {
  //   document.body.classList.add('cursor-wait');

  //   const handleComplete = () => {
  //     document.body.classList.remove('cursor-wait');
  //   };

  //   const timeout = setTimeout(handleComplete, 1000); // Adjust the timeout as necessary

  //   return () => {
  //     clearTimeout(timeout);
  //     document.body.classList.remove('cursor-wait');
  //   };
  // }, [pathname]);

  return (
    <html lang="en">
      <body>
        {/* {children} */}
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
