import AppMenu from './navbar/AppMenu';
import Box from '@mui/material/Box';
import {theme} from '@/app/utils/theme.util'
import { ThemeProvider } from "@mui/material/styles";
import SecondNavbar from './navbar/SecondNavbar';

export default function CapLayout({children} : {children: React.ReactNode}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}

        <AppMenu searchData='dashboard'>
          <Box id="cap_layout">
            <ThemeProvider theme={theme}>
              {/* <SecondNavbar title=""/> */}
           
              {children}
            </ThemeProvider>
          </Box>
        </AppMenu>

    </section>
  )
}
