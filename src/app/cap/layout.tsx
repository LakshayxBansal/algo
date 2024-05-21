import AppMenu from './navbar/AppMenu';
import Box from '@mui/material/Box';
import {theme} from '@/app/utils/theme.util'
import { ThemeProvider } from "@mui/material/styles";

export default function CapLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <ThemeProvider theme={theme}>
        <AppMenu>
          <Box id="cap_layout">
            {children}
          </Box>
        </AppMenu>
      </ThemeProvider>
    </section>
  )
}