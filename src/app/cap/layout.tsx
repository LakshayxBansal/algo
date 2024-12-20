import AppMenu from './navbar/AppMenu';
import Box from '@mui/material/Box';
import {theme} from '@/app/utils/theme.util'
import { ThemeProvider } from "@mui/material/styles";
import Footer from './navbar/Footer';
import SecondNavbar from './navbar/SecondNavbar';
import { useState } from 'react';
import { Metadata } from 'next';

export const metadata : Metadata = {
  title : 'Dashboard'
}

export default function CapLayout({children} : {children?: React.ReactNode}) {


  const navbarToShow =["cap",""];
  // const [titlee, setTitlee] = useState("")

  //   const pathname = usePathname();
  

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
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
        <>
        <AppMenu>
          <Box id="cap_layout">
            <ThemeProvider theme={theme}>
              {children}
            </ThemeProvider>
          </Box>
               <Footer/>
        </AppMenu>
        </>

    </section>
  )
}
