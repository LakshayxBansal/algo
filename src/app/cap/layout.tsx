import AppMenu from './navbar/AppMenu';
import Box from '@mui/material/Box';

export default function CapLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <AppMenu>
        <Box>
          {children}
        </Box>
      </AppMenu>
    </section>
  )
}