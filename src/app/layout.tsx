import { Suspense, useEffect,useState } from 'react';
import { usePathname } from 'next/navigation';
// Adjust the path if your styles are in a different directory
import { AppProps } from 'next/app';
import { Box } from "@mui/material";

import { theme } from "@/app/utils/styles/theme.util";
import { ThemeProvider } from "@mui/material/styles";
import "./globals.css";

export const metadata = {
  title: {
    template: '%s - Algofast CRM',
    default: 'Sign In - Algofast CRM',
  },
  description: 'Manage your customer relationship with ease',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <body>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
