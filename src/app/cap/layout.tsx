import AppMenu from './navbar/AppMenu';
import Box from '@mui/material/Box';
import {theme} from '@/app/utils/theme.util'
import { ThemeProvider } from "@mui/material/styles";
import Footer from './navbar/Footer';
import SecondNavbar from './navbar/SecondNavbar';

export default function CapLayout({children} : {children: React.ReactNode}) {


  const navbarToShow =["cap",""];
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
        <>
        <AppMenu>
          <Box id="cap_layout">
            <ThemeProvider theme={theme}>
              <SecondNavbar/>
              {children}
              <Footer/>
            </ThemeProvider>
          </Box>
        </AppMenu>
        </>

    </section>
  )
}
